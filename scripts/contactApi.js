/* ==========================================================================
    API: FETCH, CREATE, UPDATE, DELETE CONTACTS
   ========================================================================== */

/**
 * Base URL for Firebase Realtime Database.
 * @type {string}
 */
const BASEURL = "https://join-bc74a-default-rtdb.europe-west1.firebasedatabase.app";

/**
 * Fetches and renders all contacts.
 * @returns {Promise<void>}
 */
async function fetchAndRenderContacts() {
    try {
        const obj = await fetchContactsFromFirebase() || {};
        const arr = parseContactsObjectToArray(obj);
        sortContactsByName(arr);
        window.currentContacts = arr;
        renderContactsList(arr);
    } catch (e) { console.error("Failed to load contacts:", e); }
}

/**
 * Fetches all contacts from Firebase.
 * @returns {Promise<Object>}
 */
async function fetchContactsFromFirebase() {
    return (await fetch(`${BASEURL}/contacts.json`)).json();
}

/**
 * Converts Firebase contacts object to array.
 * @param {Object} data
 * @returns {Array}
 */
function parseContactsObjectToArray(data) {
    return Object.keys(data).map(id => ({
        id,
        name: data[id].name,
        email: data[id].email,
        phone: data[id].phone,
        initials: getInitials(data[id].name),
    }));
}

/**
 * Saves a new contact to Firebase.
 * @param {Object} data
 * @returns {Promise<string>}
 */
async function saveNewContactToFirebase(data) {
    const res = await fetch(`${BASEURL}/contacts.json`, {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data)
    });
    return (await res.json()).name;
}

/**
 * Handles creation of a new contact.
 * @param {Event} e
 * @returns {Promise<void>}
 */
async function handleCreateContact(e) {
    e.preventDefault();
    await saveNewContactToFirebase(collectNewContactData());
    hideAddContactOverlay(); hideAddContactOverlayMobile();
    fetchAndRenderContacts(); showToast("Contact successfully created");
}

/**
 * Handles editing a contact (desktop).
 * @param {Event} e
 * @param {string} id
 * @returns {Promise<void>}
 */
async function handleEditContact(e, id) {
    e.preventDefault();
    await updateContactInFirebase(id, getEditContactFormValues());
    hideEditContactOverlay();
    updateContactInMemory(id, getEditContactFormValues());
    window.lastSelectedContactId = id;
    sortContactsByName(window.currentContacts);
    renderContactsList(window.currentContacts);
    showContactDetail(findContactById(id));
    showToast("Contact successfully updated");
}

/**
 * Returns values from the desktop edit form.
 * @returns {Object}
 */
function getEditContactFormValues() {
    return {
        name: document.getElementById("edit-contact-name").value.trim(),
        email: document.getElementById("edit-contact-email").value.trim(),
        phone: document.getElementById("edit-contact-phone").value.trim(),
    };
}

/**
 * Updates a contact in window.currentContacts.
 * @param {string} id
 * @param {Object} upd
 */
function updateContactInMemory(id, upd) {
    const c = window.currentContacts.find(c => c.id === id);
    if (c) Object.assign(c, upd, { initials: getInitials(upd.name) });
}

/**
 * Handles editing a contact (mobile).
 * @param {Event} e
 * @param {string} id
 * @returns {Promise<void>}
 */
async function handleEditContactMobile(e, id) {
    e.preventDefault();
    await updateContactInFirebase(id, getEditContactFormValuesMobile());
    hideEditContactOverlayMobile();
    await fetchAndRenderContacts();
    showMobileContactDetailIfAvailable(id);
    showToast("Contact successfully updated");
}

/**
 * Returns values from the mobile edit form.
 * @returns {Object}
 */
function getEditContactFormValuesMobile() {
    return {
        name: document.getElementById("edit-contact-name-mobile").value.trim(),
        email: document.getElementById("edit-contact-email-mobile").value.trim(),
        phone: document.getElementById("edit-contact-phone-mobile").value.trim(),
    };
}

/**
 * Shows the updated contact detail (mobile).
 * @param {string} id
 */
function showMobileContactDetailIfAvailable(id) {
    const c = findContactById(id);
    if (c) showContactDetail(c);
}

/**
 * Updates a contact in Firebase.
 * @param {string} id
 * @param {Object} upd
 * @returns {Promise<void>}
 */
async function updateContactInFirebase(id, upd) {
    await fetch(`${BASEURL}/contacts/${id}.json`, {
        method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(upd)
    });
}

/**
 * Deletes a contact and cleans up.
 * @param {string} id
 * @returns {Promise<void>}
 */
async function deleteContact(id) {
    try {
        await deleteContactFromFirebase(id);
        await removeContactFromAllTasks(id);
        refreshContactUIAfterDelete();
    } catch (e) {
        showToast("Delete failed");
        console.error("Delete contact error:", e);
    }
}

/**
 * Deletes a contact from Firebase.
 * @param {string} id
 * @returns {Promise<void>}
 */
async function deleteContactFromFirebase(id) {
    await fetch(`${BASEURL}/contacts/${id}.json`, { method: "DELETE" });
}

/**
 * Updates all UI after a contact is deleted.
 */
function refreshContactUIAfterDelete() {
    fetchAndRenderContacts();
    clearContactDetailSection();
    closeAllContactModals();
    window.lastSelectedContactId = null;
    closeMobileOptionsMenuWithAnimation?.();
}

/**
 * Clears the contact detail UI section.
 */
function clearContactDetailSection() {
    const d = document.getElementById("contact-detail");
    if (d) d.innerHTML = "";
}

/**
 * Closes all overlays/modals related to contacts.
 */
function closeAllContactModals() {
    closeMobileContactDetail?.();
    hideEditContactOverlayMobile?.();
    hideEditContactOverlay?.();
}

/**
 * Fetches all tasks from Firebase.
 * @returns {Promise<Object>}
 */
async function fetchAllTasks() {
    return (await fetch(`${BASEURL}/tasks.json`)).json();
}

/**
 * Removes a contact from assignedContacts in one task.
 * @param {string} taskId
 * @param {Array} assigned
 * @param {string} contactId
 * @returns {Promise<void>}
 */
async function removeContactFromTask(taskId, assigned, contactId) {
    const filtered = assigned.filter(c => c.id !== contactId);
    await fetch(`${BASEURL}/tasks/${taskId}.json`, {
        method: "PATCH", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ assignedContacts: filtered }),
    });
}

/**
 * Removes a contact from all tasks in Firebase.
 * @param {string} contactId
 * @returns {Promise<void>}
 */
async function removeContactFromAllTasks(contactId) {
    try {
        const tasks = await fetchAllTasks();
        if (!tasks) return;
        for (let taskId in tasks) {
            const t = tasks[taskId];
            if (t.assignedContacts && t.assignedContacts.some(c => c.id === contactId)) {
                await removeContactFromTask(taskId, t.assignedContacts, contactId);
            }
        }
    } catch (e) {
        console.error("Failed to clean tasks from deleted contact:", e);
    }
}