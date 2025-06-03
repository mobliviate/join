/* ==========================================================================
   CONTACT LIST RENDERING & SORTING
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

    if (window.lastSelectedContactId) {
        const item = container.querySelector(
            `.contact-item[data-id="${window.lastSelectedContactId}"]`
        );
        if (item) item.classList.add("active");
    }
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
 * Clears the currently selected contact.
 * - Removes the 'active' class from any selected contact item.
 * - Empties the contact detail section.
 * - Resets the last selected contact ID.
 */
function clearSelectedContact() {
    window.lastSelectedContactId = null;

    let items = document.querySelectorAll(".contact-item.active");
    for (let i = 0; i < items.length; i++) {
        items[i].classList.remove("active");
    }

    let detail = document.getElementById("contact-detail");
    if (detail) {
        detail.innerHTML = "";
    }
}


/**
 * Selects a contact by its ID.
 * - If already selected, it will deselect it using clearSelectedContact().
 * - Otherwise, it finds the matching contact element and selects it.
 *
 * @param {string} contactId - The ID of the contact to select.
 */
function selectContactById(contactId) {
    if (window.lastSelectedContactId === contactId) {
        clearSelectedContact();
        return;
    }

    window.lastSelectedContactId = contactId;

    let items = document.querySelectorAll(".contact-item");
    let selectedElement = null;

    for (let i = 0; i < items.length; i++) {
        if (items[i].dataset.id === contactId) {
            selectedElement = items[i];
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
