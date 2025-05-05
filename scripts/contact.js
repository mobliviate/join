/**
 * Firebase configuration for Realtime Database.
 */
const firebaseConfig = {
  databaseURL: "https://join-bc74a-default-rtdb.europe-west1.firebasedatabase.app",
};

/**
 * Initializes the Contacts page layout and data.
 */
function initContacts() {
  loadBody();
  loadHeader();
  highlightActiveSidebarLink();
  document.getElementById("main").innerHTML = getContactsSectionTemplate();
  initializeFirebase();
  fetchAndRenderContacts();
}

/**
 * Initializes the Firebase app if not already initialized.
 */
function initializeFirebase() {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
}

/**
 * Fetches contacts, sorts them, stores globally, and renders them.
 * @async
 */
async function fetchAndRenderContacts() {
  const snapshot = await firebase.database().ref("contacts").once("value");
  const dataObject = snapshot.val() || {};
  const contactArray = Object.keys(dataObject).map(id => ({
    id,
    name: dataObject[id].name,
    email: dataObject[id].email,
    phone: dataObject[id].phone,
    initials: getInitials(dataObject[id].name),
  }));
  sortContactsByName(contactArray);
  window.currentContacts = contactArray;
  renderContactsList(contactArray);
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
  document.querySelectorAll(".contact-item").forEach(item => {
    item.addEventListener("click", () => selectContact(item, contactArray));
  });
}

/**
 * Selects a contact, highlights it, and shows its details.
 * @param {HTMLElement} itemElement
 * @param {Array<Object>} contactArray
 */
function selectContact(itemElement, contactArray) {
  document.querySelectorAll(".contact-item.active")
    .forEach(el => el.classList.remove("active"));
  itemElement.classList.add("active");
  const selectedId = itemElement.dataset.id;
  const contact = contactArray.find(c => c.id === selectedId);
  if (contact) showContactDetail(contact);
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
 * Saves a new contact to Firebase Realtime Database.
 * @param {{name:string,email:string,phone:string}} contactData
 * @async
 */
async function saveNewContactToFirebase(contactData) {
  const newRef = firebase.database().ref("contacts").push();
  await newRef.set(contactData);
}

/**
 * Handles new contact form submission.
 * @param {Event} event
 * @async
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
 * Updates an existing contact in Firebase.
 * @param {Event} event
 * @param {string} contactId
 * @async
 */
async function handleEditContact(event, contactId) {
  event.preventDefault();
  const updated = {
    name: document.getElementById("edit-contact-name").value.trim(),
    email: document.getElementById("edit-contact-email").value.trim(),
    phone: document.getElementById("edit-contact-phone").value.trim(),
  };
  await firebase.database().ref(`contacts/${contactId}`).update(updated);
  hideEditContactOverlay();
  fetchAndRenderContacts();
  showToast("Contact successfully updated");
}

/**
 * Shows the Add Contact overlay.
 */
function showAddContactOverlay() {
  const temp = document.createElement("div");
  temp.innerHTML = getAddContactOverlayTemplate().trim();
  document.body.appendChild(temp.firstElementChild);
}

/**
 * Hides the Add Contact overlay.
 */
function hideAddContactOverlay() {
  const o = document.getElementById("add-contact-overlay");
  if (o) o.remove();
}

/**
 * Shows the Edit Contact overlay for a given contact ID,
 * injects the template, and sets the avatar color.
 * @param {string} contactId
 */
function showEditContactOverlay(contactId) {
  const contact = (window.currentContacts || []).find(c => c.id === contactId);
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
  const o = document.getElementById("edit-contact-overlay");
  if (o) o.remove();
}

/**
 * Deletes a contact by ID and refreshes the list.
 * @param {string} contactId
 * @async
 */
async function deleteContact(contactId) {
  await firebase.database().ref(`contacts/${contactId}`).remove();
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
 * Returns email HTML fragment or empty string.
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
