let categoryDropdownOpen = false
let assignDropdownOpen = false
let selectedContactIds = [];
let editingSubtaskItem = null;

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
    document.getElementById("main").innerHTML = getAddTaskTemplate("todo");
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

function subtaskInputIcon() {
    const input = document.getElementById('subtask-input');
    if (input) {
        input.focus();
    }
}

function subtaskInput() {
    const input = document.getElementById('subtask-input');
    const addIcon = document.getElementById('add-subtask-icon');
    const deleteIcon = document.getElementById('delete-subtask-icon');
    const verticalline = document.querySelector('.verticalline-subtask');
    const saveIcon = document.getElementById('save-subtask-icon');

    if (input.value.trim() !== '') {
        addIcon.classList.add('d-none');
        deleteIcon.classList.remove('d-none');
        verticalline.classList.remove('d-none');
        saveIcon.classList.remove('d-none');
    } else {
        addIcon.classList.remove('d-none');
        deleteIcon.classList.add('d-none');
        verticalline.classList.add('d-none');
        saveIcon.classList.add('d-none');
    }
};

function subtaskSave() {
    const input = document.getElementById('subtask-input');
    const subtaskText = input.value.trim();
    if (!subtaskText) return;

    const subtaskList = document.querySelector('.subtask-list');
    const subtaskItem = document.createElement('div');
    subtaskItem.className = 'subtask-item';
    subtaskItem.setAttribute('onmouseenter', "this.querySelector('.subtask-actions').classList.remove('d-none')");
    subtaskItem.setAttribute('onmouseleave', "this.querySelector('.subtask-actions').classList.add('d-none')");
    subtaskItem.setAttribute('ondblclick', "editSubtask(this.querySelector('.subtask-action-icon[alt=\\'Edit\\']))");
    subtaskItem.innerHTML = `
        <span class="subtask-text">• ${subtaskText}</span>
        <div class="subtask-actions d-none">
            <img src="./assets/svg/subtask_edit.svg" alt="Edit" class="subtask-action-icon" onclick="editSubtask(this)">
            <img src="./assets/svg/subtask_delete.svg" alt="Delete" class="subtask-action-icon" onclick="deleteSubtask(this)">
        </div>
    `;
    subtaskList.appendChild(subtaskItem);

    input.value = '';
    subtaskDelete();
}

function subtaskDelete() {
    const input = document.getElementById('subtask-input');
    const addIcon = document.getElementById('add-subtask-icon');
    const deleteIcon = document.getElementById('delete-subtask-icon');
    const verticalline = document.querySelector('.verticalline-subtask');
    const saveIcon = document.getElementById('save-subtask-icon');

    input.value = '';
    addIcon.classList.remove('d-none');
    deleteIcon.classList.add('d-none');
    verticalline.classList.add('d-none');
    saveIcon.classList.add('d-none');
}

function deleteSubtask(iconElement) {
    const subtaskItem = iconElement.closest('.subtask-item');
    if (subtaskItem) {
        subtaskItem.remove();
    }
}

function editSubtask(iconElement) {
    const subtaskItem = iconElement.closest('.subtask-item');
    const subtaskList = document.querySelector(".subtask-list");
    const textElement = subtaskItem.querySelector('.subtask-text');
    const editInput = document.getElementById('subtask-edit');
    const editDeleteIcon = document.getElementById('edit-delete-icon');
    const editSaveIcon = document.getElementById('edit-save-icon');

    editInput.classList.remove('d-none');
    editDeleteIcon.classList.remove('d-none');
    editSaveIcon.classList.remove('d-none');

    editInput.value = textElement.innerText.replace(/^•\s*/, '');
    subtaskList.style.display = 'none';
    editingSubtaskItem = subtaskItem;

    editInput.focus();
}

function cancelEditSubtask() {
    const subtaskList = document.querySelector(".subtask-list");
    const editInput = document.getElementById('subtask-edit');
    const editDeleteIcon = document.getElementById('edit-delete-icon');
    const editSaveIcon = document.getElementById('edit-save-icon');

    editInput.classList.add('d-none');
    editDeleteIcon.classList.add('d-none');
    editSaveIcon.classList.add('d-none');
    editInput.value = '';
    if (editingSubtaskItem) {
        subtaskList.style.display = 'flex';
    }
    editingSubtaskItem = null;

}

function saveEditedSubtask() {
    const subtaskList = document.querySelector(".subtask-list");
    const editInput = document.getElementById('subtask-edit');
    const newText = editInput.value.trim();

    if (editingSubtaskItem && newText !== '') {
        const textElement = editingSubtaskItem.querySelector('.subtask-text');
        textElement.innerText = `• ${newText}`;
    }

    if (editingSubtaskItem) {
        subtaskList.style.display = 'flex';
    }

    cancelEditSubtask();
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

function collectNewTaskData(status) {
    const title = document.getElementById('title').value.trim();
    const description = document.getElementById('description').value.trim();
    const dueDate = document.getElementById('due-date').value.trim();
    const priorityButton = document.querySelector('.prio-btn.selected');
    const priority = priorityButton ? priorityButton.getAttribute('data-prio') : '';
    const category = document.getElementById('category-selected').innerText.trim();

    const assignedContacts = Array.from(document.querySelectorAll('.multiselect-option-contact.selected')).map(contact => {
        const id = contact.dataset.id;
        const name = contact.querySelector('.circle-and-name div:nth-child(2)').innerText.trim();
        const initials = contact.querySelector('.circle').innerText.trim();
        return { id, name, initials };
    });

    const subtaskElements = document.querySelectorAll('.subtask-item .subtask-text');
    const subtasks = Array.from(subtaskElements).map(subtask => {
        return {
            text: subtask.innerText.replace(/^•\s*/, ''),
            status: false
        };
    });

    const task = {
        title,
        description,
        dueDate,
        priority,
        assignedContacts,
        category,
        subtasks,
        createdAt: Date.now(),
        status
    };

    return task;
}

async function saveNewTaskToFirebase(taskData) {
    const tasksRef = firebase.database().ref('tasks');
    const snapshot = await tasksRef.once('value');
    const existingTasks = snapshot.val() || [];
    existingTasks.push(taskData);
    await tasksRef.set(existingTasks);
}

async function createTask(status) {
    const taskData = collectNewTaskData(status);

    try {
        await saveNewTaskToFirebase(taskData);
        // ToDo: Overlay
        clearForm();
    } catch (error) {
        console.error("Error creating task:", error);
    }
}

function clearTextFields() {
    document.getElementById('title').value = '';
    document.getElementById('description').value = '';
    document.getElementById('due-date').value = '';
}

function clearErrorMessages() {
    document.getElementById('error-msg-title').classList.add('d-none');
    document.getElementById('error-msg-duedate').classList.add('d-none');
    document.getElementById('error-msg-category').classList.add('d-none');
    document.getElementById('title').classList.remove('red-border');
    document.getElementById('due-date').classList.remove('red-border');
    document.getElementById('multiselect-category').classList.remove('red-border');
}

function clearPriority() {
    document.querySelectorAll('.prio-btn').forEach(btn => btn.classList.remove('selected'));
    document.querySelector('.prio-btn[data-prio="medium"]').classList.add('selected');
}

function clearCategory() {
    document.getElementById('category-selected').innerText = 'Select task category';
}

function clearAssignedContacts() {
    selectedContactIds = [];
    document.getElementById('assigned-contacts').innerHTML = '';
    const options = document.querySelectorAll('.multiselect-option-contact');
    options.forEach(option => option.classList.remove('selected'));
}

function clearSubtasks() {
    document.getElementById('subtask-input').value = '';
    document.querySelector('.subtask-list').innerHTML = '';
    subtaskDelete();
    cancelEditSubtask();
}

function clearForm() {
    clearTextFields();
    clearErrorMessages();
    clearPriority();
    clearCategory();
    clearAssignedContacts();
    clearSubtasks();
    document.getElementById('create-task-button').disabled = true;
}
