/**
 * Firebase configuration for Realtime Database.
 */
const firebaseConfig = {
  databaseURL:
    "https://join-bc74a-default-rtdb.europe-west1.firebasedatabase.app",
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
 * Initializes Firebase app.
 */
function initializeFirebase() {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
}

/**
 * Fetches contacts from the database, sorts them alphabetically by name,
 * and then renders the list.
 */
async function fetchAndRenderContacts() {
  const database = firebase.database();
  const snapshot = await database.ref("contacts").once("value");
  const dataObject = snapshot.val() || {};
  const contactArray = [];

  for (const id in dataObject) {
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
  renderContactsList(contactArray);
}

/**
 * Sorts an array of contacts in place by their `name` property (A to Z).
 * @param {Array<{name: string}>} contacts
 */
function sortContactsByName(contacts) {
  contacts.sort(function (firstContact, secondContact) {
    return firstContact.name.localeCompare(secondContact.name);
  });
}

/**
 * Renders the contacts into the container and attaches click listeners.
 */
function renderContactsList(contactArray) {
  const container = document.getElementById("contacts-group-container");
  container.innerHTML = generateContactsListHTML(contactArray);
  attachContactItemListeners(contactArray);
}

/**
 * Generates the grouped HTML for all contacts.
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
 * Attaches click listeners to each contact item.
 */
function attachContactItemListeners(contactArray) {
  const listItems = document.querySelectorAll(".contact-item");
  for (const item of listItems) {
    item.addEventListener("click", () => selectContact(item, contactArray));
  }
}

/**
 * Highlights the chosen item and shows its details.
 */
function selectContact(itemElement, contactArray) {
  document
    .querySelectorAll(".contact-item.active")
    .forEach((el) => el.classList.remove("active"));
  itemElement.classList.add("active");

  const selectedId = itemElement.dataset.id;
  for (const contact of contactArray) {
    if (contact.id === selectedId) {
      showContactDetail(contact);
      break;
    }
  }
}

/**
 * Renders the given contact’s details into the detail panel.
 */
function showContactDetail(contact) {
  const detailContainer = document.getElementById("contact-detail");
  detailContainer.innerHTML = createContactDetailTemplate(contact);
}

/**
 * Handles the form submission to add a new contact.
 */
/**
 * Reads and trims the values from the "Add Contact" form.
 * @returns {{ name: string, email: string, phone: string }}
 */
function collectNewContactData() {
  const nameValueInput = document.getElementById("new-contact-name");
  const emailValueInput = document.getElementById("new-contact-email");
  const phoneValueInput = document.getElementById("new-contact-phone");

  return {
    name: nameValueInput.value.trim(),
    email: emailValueInput.value.trim(),
    phone: phoneValueInput.value.trim(),
  };
}

/**
 * Sends a new contact object to Firebase Realtime Database.
 * @param {{ name: string, email: string, phone: string }} contactData
 * @returns {Promise<void>}
 */
async function saveNewContactToFirebase(contactData) {
  const contactsReference = firebase.database().ref("contacts");
  const newContactReference = contactsReference.push();
  await newContactReference.set(contactData);
}

/**
 * Handles the form submission:
 * - Prevents the default page reload
 * - Collects form data
 * - Saves it to Firebase
 * - Closes the overlay, reloads the list, and shows a toast
 *
 * @param {Event} event
 */
async function handleCreateContact(event) {
  event.preventDefault();
  const contactData = collectNewContactData();

  try {
    await saveNewContactToFirebase(contactData);

    hideAddContactOverlay();
    fetchAndRenderContacts();
    showToast("Contact successfully created");
  } catch (error) {
    console.error("Creating contact failed:", error);
    alert("Could not add contact. Please try again.");
  }
}

/**
 * Shows the overlay by appending its HTML via innerHTML.
 */
function showAddContactOverlay() {
  document.body.innerHTML += getAddContactOverlayTemplate();
}

/**
 * Removes the overlay from the DOM.
 */
function hideAddContactOverlay() {
  const overlay = document.getElementById("add-contact-overlay");
  if (overlay) overlay.remove();
}

/**
 * Deletes a contact by its ID from Firebase and refreshes the list.
 */
async function deleteContact(contactId) {
  try {
    await firebase
      .database()
      .ref("contacts/" + contactId)
      .remove();
    fetchAndRenderContacts();
    document.getElementById("contact-detail").innerHTML = "";
  } catch (error) {
    console.error("Error deleting contact:", error);
    alert("Could not delete contact.");
  }
}

/**
 * Returns one or two uppercase initials from a full name.
 * Splits the name on spaces, then:
 *  - if there are two or more parts, uses the first letter of the first two parts
 *  - otherwise uses the first letter of the only part
 *
 * @param {string} fullName - The person’s full name (e.g. "Hans Müller").
 * @returns {string} - The initials in uppercase (e.g. "HM" or "A").
 */
function getInitials(fullName) {
  const nameParts = fullName.trim().split(" ");
  let initials = "";

  // 2) Wenn mindestens zwei Wörter vorhanden sind
  if (nameParts.length >= 2) {
    const firstInitial = nameParts[0].charAt(0);
    const secondInitial = nameParts[1].charAt(0);
    initials = firstInitial + secondInitial;
  } else {
    initials = nameParts[0].charAt(0);
  }
  return initials.toUpperCase();
}

/**
 * Computes a deterministic hue value (0–359) from a string.
 */
function getHueFromString(text) {
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    hash = (hash * 31 + text.charCodeAt(i)) % 360;
  }
  return hash;
}

/**
 * Returns the email HTML fragment (or empty string if no email).
 */
function getEmailPart(email) {
  return email ? `<div class="email">${email}</div>` : "";
}

function createContactItemTemplate(contact) {
  const emailHTML = getEmailPart(contact.email);
  const avatarHTML = createAvatarTemplate(contact.name, contact.initials);
  return buildContactItem(contact.id, avatarHTML, contact.name, emailHTML);
}

/**
 * Displays a transient toast message centered at the bottom of the viewport.
 * The toast automatically fades out and is removed after its timeout.
 *
 * @param {string} message - The text to show inside the toast.
 */
function showToast(message) {
  // Create the toast container
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;

  // Append it to the document body
  document.body.appendChild(toast);

  // After 2 seconds, start fade‑out
  setTimeout(() => {
    toast.classList.add("fade-out");
  }, 2000);

  // After fade‑out transition (0.5s) completes, remove the element
  setTimeout(() => {
    if (toast.parentNode) {
      toast.parentNode.removeChild(toast);
    }
  }, 2500); // matches the CSS transition-duration of 0.5s
}
