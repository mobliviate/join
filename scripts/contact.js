/**
 * Firebase configuration for Realtime Database.
 */
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  databaseURL:
    "https://join-bc74a-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "YOUR_PROJECT_ID",
};

/**
 * Initializes the Contacts page:
 * - Injects layout
 * - Renders header/sidebar
 * - Loads contacts
 */
function initContacts() {
  document.body.innerHTML = getBodyTemplate();
  loadHeader();
  highlightActiveSidebarLink();
  document.getElementById("main").innerHTML = getContactsSectionTemplate();
  initializeFirebase();
  fetchAndRenderContacts();
}

/**
 * Initializes Firebase.
 */
function initializeFirebase() {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
}

/**
 * Fetches contacts from Firebase DB and renders the list.
 */
async function fetchAndRenderContacts() {
  const database = firebase.database();
  const snapshot = await database.ref("contacts").once("value");
  const dataObject = snapshot.val() || {};
  const contactArray = [];
  for (const key in dataObject) {
    const record = dataObject[key];
    const contact = {
      id: key,
      name: record.name,
      email: record.email,
      phone: record.phone,
      initials: getInitialsFromName(record.name),
    };
    contactArray.push(contact);
  }
  renderContactsList(contactArray);
}

/**
 * Generates the grouped HTML for all contacts.
 *
 * @param {Array} contactArray - Array of contact objects.
 * @returns {string} HTML string with group headers and contact items.
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
 * Renders the contacts into the container and attaches click listeners.
 *
 * @param {Array} contactArray - Array of contact objects.
 */
function renderContactsList(contactArray) {
  const container = document.getElementById("contacts-group-container");
  container.innerHTML = generateContactsListHTML(contactArray);
  attachContactItemListeners(contactArray);
}

/**
 * Attaches click listeners to each contact item.
 * @param {Array} contactArray
 */
function attachContactItemListeners(contactArray) {
  const listItems = document.querySelectorAll(".contact-item");
  for (const itemElement of listItems) {
    itemElement.addEventListener("click", function () {
      selectContact(itemElement, contactArray);
    });
  }
}

/**
 * Extracts initials from a full name.
 * @param {string} fullName
 * @returns {string}
 */
function getInitialsFromName(fullName) {
  const nameParts = fullName.split(" ");
  let initials = "";
  for (const part of nameParts) {
    if (part.length > 0) {
      initials += part.charAt(0).toUpperCase();
    }
  }
  return initials;
}

/**
 * Removes the 'active' class from any contact items and adds it to the clicked one.
 * @param {HTMLElement} itemElement
 */
function highlightContactItem(itemElement) {
  const activeItems = document.querySelectorAll(".contact-item.active");
  for (const active of activeItems) {
    active.classList.remove("active");
  }
  itemElement.classList.add("active");
}

/**
 * Renders the given contact’s details into the detail panel.
 * @param {{name:string,email?:string,phone?:string,initials:string}} contact
 */
function showContactDetail(contact) {
  const detailContainer = document.getElementById("contact-detail");
  detailContainer.innerHTML = createContactDetailTemplate(contact);
}

/**
 * Called when a contact is clicked: highlights it and shows its details.
 * @param {HTMLElement} itemElement
 * @param {Array<{id:string}>} contactArray
 */
function selectContact(itemElement, contactArray) {
  highlightContactItem(itemElement);

  const selectedId = itemElement.getAttribute("data-id");
  for (const contact of contactArray) {
    if (contact.id === selectedId) {
      showContactDetail(contact);
      break;
    }
  }
}

/**
 * Computes a deterministic hue value (0–359) from a string,
 * ensuring each name always maps to the same color.
 *
 * @param {string} text - The input string to hash.
 * @returns {number} A hue angle in degrees for use in HSL.
 */
function getHueFromString(text) {
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    hash = (hash * 31 + text.charCodeAt(i)) % 360;
  }
  return hash;
}

/**
 * Generates an avatar HTML snippet with initials and a unique background color.
 *
 * @param {string} name - The full name used to derive the color.
 * @param {string} initials - The initials to display inside the avatar.
 * @returns {string} HTML string for the avatar element.
 */
function createAvatarTemplate(name, initials) {
  const hue = getHueFromString(name);
  const color = `hsl(${hue}, 70%, 50%)`;
  return `
      <div class="avatar-circle" style="background-color: ${color}">
        ${initials}
      </div>
    `;
}
