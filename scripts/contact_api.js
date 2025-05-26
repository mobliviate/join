/**
 * Base URL for Firebase Realtime Database.
 * @type {string}
 */
const BASEURL =
    "https://join-bc74a-default-rtdb.europe-west1.firebasedatabase.app";

/* ==========================================================================
    API: FETCH, CREATE, UPDATE, DELETE CONTACTS
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
        email: document
            .getElementById("edit-contact-email-mobile")
            .value.trim(),
        phone: document
            .getElementById("edit-contact-phone-mobile")
            .value.trim(),
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
        await fetch(`${BASEURL}/contacts/${contactId}.json`, {
            method: "DELETE",
        });
        fetchAndRenderContacts();
        const detail = document.getElementById("contact-detail");
        if (detail) detail.innerHTML = "";

        closeMobileContactDetail?.();
        hideEditContactOverlayMobile?.();
        hideEditContactOverlay?.();
        window.lastSelectedContactId = null;

        closeMobileOptionsMenuWithAnimation?.();
    } catch (err) {
        showToast("Delete failed");
        console.error("Delete contact error:", err);
    }
}
