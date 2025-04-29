let categoryDropdownOpen = false
let assignDropdownOpen = false
let selectedContactIds = [];

const firebaseConfig = {
    databaseURL: "https://join-bc74a-default-rtdb.europe-west1.firebasedatabase.app"
};

function initializeFirebase() {
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }
}

function getHueFromString(text) {
    let hash = 0;
    for (let i = 0; i < text.length; i++) {
        hash = (hash * 31 + text.charCodeAt(i)) % 360;
    }
    return hash;
}

function getInitials(fullName) {
    const nameParts = fullName.trim().split(" ");
    let initials = "";

    if (nameParts.length >= 2) {
        initials = nameParts[0].charAt(0).toUpperCase() + nameParts[1].charAt(0).toUpperCase();
    } else {
        initials = nameParts[0].charAt(0).toUpperCase();
    }
    return initials;
}

function initAddTask() {
    document.body.innerHTML = getBodyTemplate();
    loadHeader();
    highlightActiveSidebarLink();
    document.getElementById("main").innerHTML = getAddTaskTemplate();
    initializeFirebase();
}

function onBodyClick() {
    closeCategoryDropdown();
    closeAssignDropdown();
}

function selectPriority(btn) {
    document.querySelectorAll('.prio-btn').forEach(b => {
        b.classList.remove('selected');
    });
    btn.classList.add('selected');
}

function validateInputTitel() {
    const inputTitleRef = document.getElementById("title");
    const errorMsgTitleRef = document.getElementById("error-msg-title");

    if (inputTitleRef.value == "") {
        errorMsgTitleRef.classList.remove("d-none");
        inputTitleRef.classList.add("red-border");
    } else {
        errorMsgTitleRef.classList.add("d-none");
        inputTitleRef.classList.remove("red-border");
    }
}

function validateInputDate() {
    const inputDateRef = document.getElementById("due-date");
    const errorMsgDateRef = document.getElementById("error-msg-duedate");

    if (inputDateRef.value == "") {
        errorMsgDateRef.classList.remove("d-none");
        inputDateRef.classList.add("red-border");
    } else {
        errorMsgDateRef.classList.add("d-none");
        inputDateRef.classList.remove("red-border");
    }
}

function validateCategory() {
    const multiselectCategoryRef = document.getElementById("multiselect-category");
    const errorMsgCategoryRef = document.getElementById("error-msg-category");
    const multiselectCategorySelectedRef = document.getElementById("category-selected");
    if (multiselectCategorySelectedRef.innerHTML === "Select task category") {
        errorMsgCategoryRef.classList.remove("d-none");
        multiselectCategoryRef.classList.add("red-border");
    } else {
        errorMsgCategoryRef.classList.add("d-none");
        multiselectCategoryRef.classList.remove("red-border");
    }
}

function toggleAssignDropdown() {
    if (assignDropdownOpen) {
        closeAssignDropdown()
    } else {
        openAssignDropdown()
    }
}

function openAssignDropdown() {
    const multiselectAssignOptionsRef = document.getElementById("multiselect-assign-options");
    const multiselectAssignRef = document.getElementById("multiselect-assign");
    multiselectAssignRef.focus();
    multiselectAssignOptionsRef.classList.remove("d-none");
    loadContacts();
    assignDropdownOpen = true;
}

function closeAssignDropdown() {
    const multiselectAssignOptionsRef = document.getElementById("multiselect-assign-options");
    multiselectAssignOptionsRef.classList.add("d-none");
    assignDropdownOpen = false;
}

async function loadContacts() {
    const db = firebase.database();
    const snapshot = await db.ref('contacts').once('value');
    const data = snapshot.val() || {};
    const container = document.getElementById('multiselect-assign-options');
    
    container.innerHTML = Object.entries(data).map(([id, contact]) => {
        const initials = getInitials(contact.name);
        const hue = getHueFromString(contact.name);
        const isSelected = selectedContactIds.includes(id);

        return `
    <div class="multiselect-option-contact ${isSelected ? 'selected' : ''}" onclick="event.stopPropagation(); toggleSelectedContact(this)" data-id="${id}">
        <div class="name-and-img">
            <div class="circle-and-name">
                <div class="circle" style="background-color: hsl(${hue}, 70%, 50%)">
                    ${initials}
                </div>
                <div>${contact.name}</div>
            </div>
            <div>
                <img src="./assets/svg/${isSelected ? 'check_box_checked_white' : 'check_box'}.svg" alt="Checkbox">
            </div>
        </div>
    </div>`;
    }).join('');
}


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

function updateAssignedContacts() {
    const assignedContactsContainer = document.getElementById('assigned-contacts');
    const selectedContacts = document.querySelectorAll('.multiselect-option-contact.selected');
    let assignedHTML = '';
    selectedContacts.forEach((contact, index) => {
        if (index < 5) {
            const initials = contact.querySelector('.circle').innerText.trim();
            const bgColor = contact.querySelector('.circle').style.backgroundColor;
            assignedHTML += `
                <div class="circle" style="background-color: ${bgColor}; margin-right: 5px;">
                    ${initials}
                </div>
            `;
        }
    });
    assignedContactsContainer.innerHTML = assignedHTML;
}





function toggleCategoryDropdown() {
    if (categoryDropdownOpen) {
        closeCategoryDropdown();
    } else {
        openCategoryDropdown();
    }
}

function closeCategoryDropdown() {
    const multiselectCategoryOptionsRef = document.getElementById("multiselect-category-options");
    multiselectCategoryOptionsRef.classList.add("d-none");
    categoryDropdownOpen = false
}

function openCategoryDropdown() {
    const multiselectCategoryOptionsRef = document.getElementById("multiselect-category-options");
    const multiselectCategoryRef = document.getElementById('multiselect-category');
    multiselectCategoryRef.focus();
    multiselectCategoryOptionsRef.classList.remove("d-none");
    categoryDropdownOpen = true
}

function selectCategoryOption(option) {
    const multiselectCategorySelectedRef = document.getElementById("category-selected");
    multiselectCategorySelectedRef.innerHTML = option
    validateCategory();
    checkFormValidity();
    closeCategoryDropdown();
}

function checkFormValidity() {
    const titleInput = document.getElementById("title");
    const dueDateInput = document.getElementById("due-date");
    const categorySelected = document.getElementById("category-selected");
    const createTaskButton = document.getElementById("create-task-button");

    const titleValid = titleInput.value.trim() !== "";
    const dueDateValid = dueDateInput.value.trim() !== "";
    const categoryValid = categorySelected.innerText.trim() !== "Select task category";

    if (titleValid && dueDateValid && categoryValid) {
        createTaskButton.disabled = false;
    } else {
        createTaskButton.disabled = true;
    }
}

