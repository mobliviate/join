/**
 * Base URL for Firebase Realtime Database.
 * @type {string}
 */
const BASEURL =
  "https://join-bc74a-default-rtdb.europe-west1.firebasedatabase.app";

/**
 * Global flag to track mobile options menu state.
 * @type {boolean}
 */
let mobileOptionsMenuOpen = false;

/* ==========================================================================
   1. INIT & MAIN LOGIC
   ========================================================================== */

/**
 * Initialize Contacts Page: Loads UI and fetches contacts.
 */
function initContacts() {
  loadBody();
  loadHeader();
  highlightActiveSidebarLink();
  document.getElementById("main").innerHTML = getContactsSectionTemplate();
  fetchAndRenderContacts();
}

/* ==========================================================================
   2. API: FETCH, CREATE, UPDATE, DELETE CONTACTS
   ========================================================================== */

/**
 * Fetch contacts from Firebase and render the list.
 * @returns {Promise<void>}
 */
async function fetchAndRenderContacts() {
  try {
    const response = await fetch(`${BASEURL}/contacts.json`);
    const dataObject = (await response.json()) || {};
    const contactArray = [];

    for (const id in dataObject) {
      if (!dataObject.hasOwnProperty(id)) continue;
      const record = dataObject[id];
      contactArray.push({
        id: id,
        name: record.name,
        email: record.email,
        phone: record.phone,
        initials: getInitials(record.name),
      });
    }
    sortContactsByName(contactArray);
    window.currentContacts = contactArray;
    renderContactsList(contactArray);
  } catch (err) {
    console.error("Failed to load contacts:", err);
  }
}

/**
 * Create a new contact in Firebase.
 * @param {Object} contactData
 * @returns {Promise<void>}
 */
async function saveNewContactToFirebase(contactData) {
  await fetch(`${BASEURL}/contacts.json`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(contactData),
  });
}

/**
 * Update a contact in Firebase.
 * @param {Event} event
 * @param {string} contactId
 */
async function handleEditContact(event, contactId) {
  event.preventDefault();
  const updated = {
    name: document.getElementById("edit-contact-name").value.trim(),
    email: document.getElementById("edit-contact-email").value.trim(),
    phone: document.getElementById("edit-contact-phone").value.trim(),
  };
  await fetch(`${BASEURL}/contacts/${contactId}.json`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updated),
  });
  hideEditContactOverlay();
  fetchAndRenderContacts();
  showToast("Contact successfully updated");
}

/**
 * Update a contact (Mobile).
 * @param {Event} event
 * @param {string} contactId
 */
async function handleEditContactMobile(event, contactId) {
  event.preventDefault();
  const updated = {
    name: document.getElementById("edit-contact-name-mobile").value.trim(),
    email: document.getElementById("edit-contact-email-mobile").value.trim(),
    phone: document.getElementById("edit-contact-phone-mobile").value.trim(),
  };
  await fetch(`${BASEURL}/contacts/${contactId}.json`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updated),
  });
  hideEditContactOverlayMobile();
  fetchAndRenderContacts();
  showToast("Contact successfully updated");
}

/**
 * Handles the form submission for creating a new contact.
 * Prevents the default form submit, collects form data, saves the new contact to Firebase,
 * closes all contact overlay modals, refreshes the contacts list, and shows a toast message.
 *
 * @async
 * @param {Event} event - The form submit event.
 */
async function handleCreateContact(event) {
  event.preventDefault();
  const data = collectNewContactData();
  await saveNewContactToFirebase(data);

  hideAddContactOverlay();
  hideAddContactOverlayMobile();

  fetchAndRenderContacts();
  showToast("Contact successfully created");
}

/**
 * Delete a contact from Firebase.
 * Also closes overlays if necessary.
 * @param {string} contactId
 */
async function deleteContact(contactId) {
  try {
    await fetch(`${BASEURL}/contacts/${contactId}.json`, { method: "DELETE" });
    fetchAndRenderContacts();
    const detail = document.getElementById("contact-detail");
    if (detail) detail.innerHTML = "";

    hideEditContactOverlay();
    hideEditContactOverlayMobile();
    closeMobileOptionsMenuWithAnimation?.();
  } catch (err) {
    showToast("Delete failed");
    console.error("Delete contact error:", err);
  }
}

/* ==========================================================================
   3. CONTACT LIST RENDERING & SORTING
   ========================================================================== */

/**
 * Sort contacts alphabetically by name.
 * @param {Array} contacts
 */
function sortContactsByName(contacts) {
  contacts.sort((a, b) => a.name.localeCompare(b.name));
}

/**
 * Render the contact list into the group container.
 * @param {Array} contactArray
 */
function renderContactsList(contactArray) {
  const container = document.getElementById("contacts-group-container");
  if (!container) return;
  container.innerHTML = generateContactsListHTML(contactArray);
}

/**
 * Generate HTML for the contact list (with A-Z grouping).
 * @param {Array} contactArray
 * @returns {string}
 */
function generateContactsListHTML(contactArray) {
  let html = "";
  let lastInitial = "";
  for (const contact of contactArray) {
    const initial = contact.name.charAt(0).toUpperCase();
    if (initial !== lastInitial) {
      lastInitial = initial;
      html += createGroupLetterTemplate(initial);
    }
    html += createContactItemTemplate(contact);
  }
  return html;
}

/**
 * Handle clicking a contact item (by ID).
 * @param {string} contactId
 */
function selectContactById(contactId) {
  const items = document.querySelectorAll(".contact-item");
  let selectedElement = null;
  for (const item of items) {
    if (item.dataset.id === contactId) {
      selectedElement = item;
      break;
    }
  }
  if (selectedElement) {
    selectContact(selectedElement, window.currentContacts);
  }
}

/**
 * Highlight the selected contact in the list.
 * @param {Element} itemElement
 */
function highlightSelectedContact(itemElement) {
  const activeElements = document.querySelectorAll(".contact-item.active");
  for (let i = 0; i < activeElements.length; i++) {
    activeElements[i].classList.remove("active");
  }
  itemElement.classList.add("active");
}

/**
 * Select and show contact detail.
 * @param {Element} itemElement
 * @param {Array} contactArray
 */
function selectContact(itemElement, contactArray) {
  highlightSelectedContact(itemElement);
  const selectedId = itemElement.dataset.id;
  let contact = null;
  for (let i = 0; i < contactArray.length; i++) {
    if (contactArray[i].id === selectedId) {
      contact = contactArray[i];
      break;
    }
  }
  if (contact !== null) {
    showContactDetail(contact);
  }
}

/* ==========================================================================
   4. CONTACT FORM & OVERLAY LOGIC
   ========================================================================== */

/**
 * Show the Add Contact overlay (mobile or desktop).
 */
function showAddContactOverlay() {
  if (window.innerWidth <= 980) {
    showAddContactOverlayMobile();
  } else {
    showAddContactOverlayDesktop();
  }
}

/**
 * Show the Add Contact overlay (desktop only).
 */
function showAddContactOverlayDesktop() {
  if (document.getElementById("add-contact-overlay")) return;
  const temp = document.createElement("div");
  temp.innerHTML = getAddContactOverlayTemplate().trim();
  document.body.appendChild(temp.firstElementChild);
}

/**
 * Hide the Add Contact overlay (desktop only).
 */
function hideAddContactOverlay() {
  const overlay = document.getElementById("add-contact-overlay");
  if (overlay) overlay.remove();
}

/**
 * Show the Edit Contact overlay (desktop).
 * @param {string} contactId
 */
function showEditContactOverlay(contactId) {
  const contact = (window.currentContacts || []).find(
    (contact) => contact.id === contactId
  );
  if (!contact) return;
  const temp = document.createElement("div");
  temp.innerHTML = getEditContactOverlayTemplate(contact).trim();
  document.body.appendChild(temp.firstElementChild);
  const avatarEl = document.getElementById("edit-avatar");
  if (avatarEl) {
    const hue = getHueFromString(contact.name);
    avatarEl.style.setProperty("--avatar-hue", hue);
  }
}

/**
 * Hide the Edit Contact overlay (desktop).
 */
function hideEditContactOverlay() {
  const overlay = document.getElementById("edit-contact-overlay");
  if (overlay) overlay.remove();
}

/**
 * Show the Edit Contact overlay (mobile).
 * @param {string} contactId
 */
function showEditContactOverlayMobile(contactId) {
  const container = document.getElementById("add-contact-overlay-mobile");
  const contact = (window.currentContacts || []).find(
    (c) => c.id === contactId
  );
  if (!contact || !container) return;
  container.innerHTML = getEditContactOverlayMobileTemplate(contact);

  const overlay = container.querySelector(".overlay-mobile");
  container.classList.remove("hidden");
  document.body.style.overflow = "hidden";
  setTimeout(() => {
    if (overlay) overlay.classList.add("show");
  }, 20);
  console.log("MOBILE OVERLAY");
}

/**
 * Hide the Edit Contact overlay (mobile).
 */
function hideEditContactOverlayMobile() {
  const container = document.getElementById("add-contact-overlay-mobile");
  if (!container) return;
  const overlay = container.querySelector(".overlay-mobile");
  if (overlay) {
    overlay.classList.remove("show");
    setTimeout(() => {
      container.innerHTML = "";
      container.classList.add("hidden");
      document.body.style.overflow = "";
    }, 250);
  } else {
    container.innerHTML = "";
    container.classList.add("hidden");
    document.body.style.overflow = "";
  }
}

/* ==========================================================================
   5. MOBILE: OPTIONS MENU (ACTION MENU)
   ========================================================================== */

/**
 * Show the mobile options (action) menu for contact actions.
 */
function showEditOverlayMobile() {
  const menuContainer = document.getElementById(
    "mobile-options-menu-container"
  );
  if (!menuContainer.classList.contains("hidden")) {
    closeMobileOptionsMenuWithAnimation();
    return;
  }

  const activeElement = document.querySelector(".contact-item.active");
  if (!activeElement) return;

  const contactId = activeElement.dataset.id;
  if (!contactId) return;

  menuContainer.innerHTML = getMobileOptionsMenuTemplate(contactId);
  menuContainer.classList.remove("hidden");
  mobileOptionsMenuOpen = true;

  setTimeout(() => {
    const menu = document.getElementById("mobile-options-menu");
    if (menu) menu.classList.add("show");
  }, 10);
  setTimeout(() => {
    window.addEventListener("mousedown", handleClickOutsideMobileMenu);
    window.addEventListener("touchstart", handleClickOutsideMobileMenu);
    window.addEventListener("keydown", handleEscMobileMenu);
  }, 0);
}

/**
 * Handle click outside the mobile options menu.
 * @param {MouseEvent|TouchEvent} event
 */
function handleClickOutsideMobileMenu(event) {
  const menu = document.getElementById("mobile-options-menu");
  if (menu && !menu.contains(event.target)) {
    closeMobileOptionsMenuWithAnimation();
  }
}

/**
 * Handle ESC key for closing the mobile options menu.
 * @param {KeyboardEvent} e
 */
function handleEscMobileMenu(e) {
  if (e.key === "Escape") {
    closeMobileOptionsMenuWithAnimation();
  }
}

/**
 * Close the mobile options menu with animation and remove all event listeners.
 */
function closeMobileOptionsMenuWithAnimation() {
  const menuContainer = document.getElementById(
    "mobile-options-menu-container"
  );
  const menu = document.getElementById("mobile-options-menu");

  // Remove listeners
  window.removeEventListener("mousedown", handleClickOutsideMobileMenu);
  window.removeEventListener("touchstart", handleClickOutsideMobileMenu);
  window.removeEventListener("keydown", handleEscMobileMenu);
  mobileOptionsMenuOpen = false;

  if (menu) {
    menu.classList.remove("show");
    menu.classList.add("closing");
    setTimeout(() => {
      menuContainer.innerHTML = "";
      menuContainer.classList.add("hidden");
    }, 180);
  } else {
    menuContainer.innerHTML = "";
    menuContainer.classList.add("hidden");
  }
}

/* ==========================================================================
   6. CONTACT DETAILS UI
   ========================================================================== */

/**
 * Show the detail view of a contact (responsive for mobile/desktop).
 * @param {Object} contact
 */
function showContactDetail(contact) {
  const detail = document.getElementById("contact-detail");
  if (window.innerWidth <= 1080) {
    renderMobileContactDetail(contact);
    document.body.classList.add("mobile-detail-open");
  } else {
    renderDesktopContactDetail(contact);
  }
}

/**
 * Render the contact detail view for mobile.
 * @param {Object} contact
 */
function renderMobileContactDetail(contact) {
  const detail = document.getElementById("contact-detail");
  detail.innerHTML = getMobileContactDetailHTML(contact);
}

/**
 * Close the mobile contact detail view.
 */
function closeMobileContactDetail() {
  document.body.classList.remove("mobile-detail-open");
  document.getElementById("contact-detail").innerHTML = "";
}

/**
 * Helper for getting contact detail HTML.
 * (Assumes function is defined in template file.)
 * @param {Object} contact
 * @returns {string}
 */
function getContactDetailHTML(contact) {
  return createContactDetailTemplate(contact);
}

/* ==========================================================================
   7. UTILITIES & HELPERS
   ========================================================================== */

/**
 * Get initials from a full name.
 * @param {string} fullName
 * @returns {string}
 */
function getInitials(fullName) {
  const parts = fullName.trim().split(" ");
  return (parts[0][0] + (parts[1]?.[0] || "")).toUpperCase();
}

/**
 * Get a "hash" hue from a string for avatar colors.
 * @param {string} text
 * @returns {number}
 */
function getHueFromString(text) {
  let hash = 0;
  for (const char of text) hash = (hash * 31 + char.charCodeAt(0)) % 360;
  return hash;
}

/**
 * Get avatar background color as HSL.
 * @param {string} name
 * @returns {string}
 */
function getAvatarColor(name) {
  return `hsl(${getHueFromString(name)}, 70%, 50%)`;
}

/**
 * Create the email display HTML for a contact.
 * @param {string} email
 * @returns {string}
 */
function getEmailPart(email) {
  return email ? `<div class="email">${email}</div>` : "";
}

/**
 * Create the contact item HTML (list entry).
 * @param {Object} contact
 * @returns {string}
 */
function createContactItemTemplate(contact) {
  return buildContactItem(
    contact.id,
    createAvatarTemplate(contact.name, contact.initials),
    contact.name,
    getEmailPart(contact.email)
  );
}

/**
 * Collect input values from the add contact form.
 * @returns {Object}
 */
function collectNewContactData() {
  return {
    name: document.getElementById("new-contact-name").value.trim(),
    email: document.getElementById("new-contact-email").value.trim(),
    phone: document.getElementById("new-contact-phone").value.trim(),
  };
}

/**
 * Show a toast notification with the given message.
 * @param {string} message
 */
function showToast(message) {
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => toast.classList.add("fade-out"), 2000);
  setTimeout(() => toast.remove(), 2500);
}