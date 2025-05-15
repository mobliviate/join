/**
 * Base URL for Realtime Database REST endpoint.
 * @type {string}
 */
const BASEURL =
  "https://join-bc74a-default-rtdb.europe-west1.firebasedatabase.app";

/**
 * Initializes the Contacts page layout and data.
 * @returns {void}
 */
function initContacts() {
  loadBody();
  loadHeader();
  highlightActiveSidebarLink();
  document.getElementById("main").innerHTML = getContactsSectionTemplate();
  fetchAndRenderContacts();
}

/**
 * Fetch contacts via REST, sort them, store globally,
 *
 * @async
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
 * Sorts contacts alphabetically by name.
 * @param {Array<{name:string}>} contacts
 */
function sortContactsByName(contacts) {
  contacts.sort((a, b) => a.name.localeCompare(b.name));
}

/**
 * Renders contact list and attaches click listeners.
 * @param {Array<Object>} contactArray
 */
function renderContactsList(contactArray) {
  const container = document.getElementById("contacts-group-container");
  container.innerHTML = generateContactsListHTML(contactArray);
  attachContactItemListeners(contactArray);
}

/**
 * Generates grouped HTML for contacts.
 * @param {Array<Object>} contactArray
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
 * Attaches click listeners for each contact item.
 * @param {Array<Object>} contactArray
 */
function attachContactItemListeners(contactArray) {
  document.querySelectorAll(".contact-item").forEach((item) => {
    item.addEventListener("click", () => selectContact(item, contactArray));
  });
}

/**
 * Removes the "active" class from all currently selected contact items
 * and adds it to the specified item element.
 *
 * @param {HTMLElement} itemElement - The contact element that was clicked.
 */
function highlightSelectedContact(itemElement) {
  const activeElements = document.querySelectorAll(".contact-item.active");
  for (let i = 0; i < activeElements.length; i++) {
    activeElements[i].classList.remove("active");
  }
  itemElement.classList.add("active");
}

/**
 * Handles the selection of a contact: highlights it and shows its details.
 *
 * @param {HTMLElement} itemElement - The clicked contact element.
 * @param {Array<Object>} contactArray - The list of contact objects.
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

/**
 * Reads and trims new contact form values.
 * @returns {{name:string,email:string,phone:string}}
 */
function collectNewContactData() {
  return {
    name: document.getElementById("new-contact-name").value.trim(),
    email: document.getElementById("new-contact-email").value.trim(),
    phone: document.getElementById("new-contact-phone").value.trim(),
  };
}

/**
 * Saves a new contact via REST POST.
 * @param {{name:string,email:string,phone:string}} contactData
 * @async
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
 * Handles new contact form submission.
 * @param {Event} event
 * @async
 * @returns {Promise<void>}
 */
async function handleCreateContact(event) {
  event.preventDefault();
  const data = collectNewContactData();
  await saveNewContactToFirebase(data);
  hideAddContactOverlay();
  fetchAndRenderContacts();
  showToast("Contact successfully created");
}

/**
 * Updates an existing contact via REST PATCH.
 * @param {Event} event
 * @param {string} contactId
 * @async
 * @returns {Promise<void>}
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

function showAddContactOverlay() {
  if (window.innerWidth <= 980) {
    showAddContactOverlayMobile();
  } else {
    showAddContactOverlayDesktop();
  }
}

function showAddContactOverlayDesktop() {
  const temp = document.createElement("div");
  temp.innerHTML = getAddContactOverlayTemplate().trim();
  document.body.appendChild(temp.firstElementChild);
}

/**
 * Hides the Add Contact overlay.
 */
function hideAddContactOverlay() {
  const overlay = document.getElementById("add-contact-overlay");
  if (overlay) overlay.remove();
}

/**
 * Hides the Add Contact overlay in Mobile view.
 */
function hideAddContactOverlayMobile() {
  const overlay = document.getElementById("add-contact-overlay-mobile");
  if (overlay) {
    overlay.remove();
    document.body.style.overflow = "";
  }
}

/**
 * Shows the Edit Contact overlay for a given contact ID.
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
 * Hides the Edit Contact overlay.
 */
function hideEditContactOverlay() {
  const overlay = document.getElementById("edit-contact-overlay");
  if (overlay) overlay.remove();
}

/**
 * Deletes a contact via REST DELETE and refreshes the list.
 * @param {string} contactId
 * @async
 * @returns {Promise<void>}
 */
async function deleteContact(contactId) {
  await fetch(`${BASEURL}/contacts/${contactId}.json`, {
    method: "DELETE",
  });
  fetchAndRenderContacts();
  document.getElementById("contact-detail").innerHTML = "";
}

/**
 * Computes initials from a full name.
 * @param {string} fullName
 * @returns {string}
 */
function getInitials(fullName) {
  const parts = fullName.trim().split(" ");
  return (parts[0][0] + (parts[1]?.[0] || "")).toUpperCase();
}

/**
 * Generates a deterministic hue from text.
 * @param {string} text
 * @returns {number}
 */
function getHueFromString(text) {
  let hash = 0;
  for (const char of text) hash = (hash * 31 + char.charCodeAt(0)) % 360;
  return hash;
}

/**
 * Computes avatar background color for a name.
 * @param {string} name
 * @returns {string}
 */
function getAvatarColor(name) {
  return `hsl(${getHueFromString(name)}, 70%, 50%)`;
}

/**
 * Returns email HTML fragment or an empty string.
 * @param {string} email
 * @returns {string}
 */
function getEmailPart(email) {
  return email ? `<div class="email">${email}</div>` : "";
}

/**
 * Builds contact item template.
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
 * Shows a transient toast message.
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
