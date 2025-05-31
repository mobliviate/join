/**
 * Loads contacts from Firebase and renders them in the multiselect list.
 */
async function loadContacts() {
    const contactURL = BASE + '/contacts.json';
    const container = document.getElementById('multiselect-assign-options');

    try {
        const response = await fetch(contactURL);
        const data = await response.json() || {};

        const contactHTML = Object.entries(data).map(([id, contact]) =>
            createContactOptionHTML(id, contact)
        ).join('');

        container.innerHTML = contactHTML;
    } catch (error) {
        console.error('Error fetching contacts:', error);
    }
}

/**
 * Toggles selection state of a contact and updates the assigned list.
 * 
 * @param {HTMLElement} contact - The clicked contact element.
 */
function toggleSelectedContact(contact) {
    const contactId = contact.dataset.id;
    const isSelected = contact.classList.toggle('selected');
    const checkboxImg = contact.querySelector('img');

    if (isSelected) {
        checkboxImg.src = './assets/svg/check_box_checked_white.svg';
        if (!selectedContactIds.includes(contactId)) {
            selectedContactIds.push(contactId);
        }
    } else {
        checkboxImg.src = './assets/svg/check_box.svg';
        selectedContactIds = selectedContactIds.filter(id => id !== contactId);
    }
    updateAssignedContacts();
}

/**
 * Updates the visual display of selected contacts below the input.
 */
function updateAssignedContacts() {
    const assignedContactsContainer = document.getElementById('assigned-contacts');
    const selectedContacts = document.querySelectorAll('.multiselect-option-contact.selected');
    let assignedHTML = '';
    selectedContacts.forEach((contact, index) => {
        if (index < 5) {
            const initials = contact.querySelector('.circle').innerText.trim();
            const bgColor = contact.querySelector('.circle').style.backgroundColor;
            assignedHTML += `
                <div class="circle" style="background-color: ${bgColor};">
                    ${initials}
                </div>
            `;
        }
    });
    assignedContactsContainer.innerHTML = assignedHTML;
}

/**
 * Filters the contact list in the assign dropdown based on user input.
 */
function filterContacts() {
    const input = document.getElementById('multiselect-input-assign').value.toLowerCase();
    const contactElements = document.querySelectorAll('.multiselect-option-contact');

    contactElements.forEach(contact => {
        const name = contact.innerText.toLowerCase();
        contact.style.display = name.includes(input) ? '' : 'none';
    });
}

/**
 * Gathers the selected contacts from the UI.
 * 
 * @returns {Array<Object>} Array of selected contact objects.
 */
function getAssignedContacts() {
    return Array.from(document.querySelectorAll('.multiselect-option-contact.selected')).map(c => ({
        id: c.dataset.id,
        name: c.querySelector('.circle-and-name div:nth-child(2)').innerText.trim(),
        initials: c.querySelector('.circle').innerText.trim()
    }));
}