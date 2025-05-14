let categoryDropdownOpen = false;
let assignDropdownOpen = false;
let selectedContactIds = [];
const BASEURL = "https://join-bc74a-default-rtdb.europe-west1.firebasedatabase.app"

/**
 * Initializes the Add Task page by loading base layout and template.
 */
function initAddTask() {
    loadBody();
    loadHeader();
    highlightActiveSidebarLink();
    document.getElementById("main").innerHTML = getAddTaskTemplate("todo");
}

/**
 * Closes open dropdowns when clicking outside.
 */
function onBodyClick() {
    closeCategoryDropdown();
    closeAssignDropdown();
}

/**
 * Selects a priority button and deselects others.
 * 
 * @param {HTMLElement} btn - The clicked priority button.
 */
function selectPriority(btn) {
    document.querySelectorAll('.prio-btn').forEach(b => {
        b.classList.remove('selected');
    });
    btn.classList.add('selected');
}

/**
 * Validates the title input field.
 */
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

/**
 * Validates the due date input field.
 */
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

/**
 * Validates the category dropdown.
 */
function validateCategory() {
    const box = document.getElementById("multiselect-category");
    const error = document.getElementById("error-msg-category");
    const selected = document.getElementById("category-selected");

    if (selected.innerText === "Select task category") {
        error.classList.remove("d-none");
        box.classList.add("red-border");
    } else {
        error.classList.add("d-none");
        box.classList.remove("red-border");
    }
}

/**
 * Toggles visibility of the assigned contacts dropdown.
 */
function toggleAssignDropdown() {
    assignDropdownOpen ? closeAssignDropdown() : openAssignDropdown();
}

/**
 * Opens the assigned contacts dropdown and loads contacts.
 */
function openAssignDropdown() {
    const container = document.getElementById("multiselect-assign-options");
    document.getElementById("multiselect-assign").focus();
    container.classList.remove("d-none");
    loadContacts();
    assignDropdownOpen = true;
}

/**
 * Closes the assigned contacts dropdown.
 */
function closeAssignDropdown() {
    document.getElementById("multiselect-assign-options").classList.add("d-none");
    assignDropdownOpen = false;
}

/**
 * Loads contacts from Firebase and renders them in the multiselect list.
 */
async function loadContacts() {
    const contactURL = BASEURL + '/contacts.json';
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
                <div class="circle" style="background-color: ${bgColor}; margin-right: 5px;">
                    ${initials}
                </div>
            `;
        }
    });
    assignedContactsContainer.innerHTML = assignedHTML;
}

/**
 * Toggles visibility of the category dropdown.
 */
function toggleCategoryDropdown() {
    categoryDropdownOpen ? closeCategoryDropdown() : openCategoryDropdown();
}

/**
 * Opens the category dropdown.
 */
function openCategoryDropdown() {
    document.getElementById("multiselect-category").focus();
    document.getElementById("multiselect-category-options").classList.remove("d-none");
    categoryDropdownOpen = true;
}

/**
 * Closes the category dropdown.
 */
function closeCategoryDropdown() {
    document.getElementById("multiselect-category-options").classList.add("d-none");
    categoryDropdownOpen = false;
}

/**
 * Sets the selected category option and closes the dropdown.
 * 
 * @param {string} option - The selected category label.
 */
function selectCategoryOption(option) {
    document.getElementById("category-selected").innerText = option;
    validateCategory();
    checkFormValidity();
    closeCategoryDropdown();
}

/**
 * Focuses the subtask input when clicking the plus icon.
 */
function subtaskInputIcon() {
    document.getElementById('subtask-input')?.focus();
}

/**
 * Checks form validity and enables/disables the Create Task button.
 */
function checkFormValidity() {
    const title = document.getElementById("title").value.trim();
    const dueDate = document.getElementById("due-date").value.trim();
    const category = document.getElementById("category-selected").innerText.trim();
    const btn = document.getElementById("create-task-button");

    btn.disabled = !(title && dueDate && category !== "Select task category");
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

/**
 * Collects all input data from the form and returns it as a task object.
 * 
 * @param {string} status - The task status (e.g., "todo").
 * @returns {Object} Task data object.
 */
function collectNewTaskData(status) {
    const title = document.getElementById('title').value.trim();
    const description = document.getElementById('description').value.trim();
    const dueDate = document.getElementById('due-date').value.trim();
    const priority = document.querySelector('.prio-btn.selected')?.dataset.prio || '';
    const category = document.getElementById('category-selected').innerText.trim();

    return {
        title,
        description,
        dueDate,
        priority,
        assignedContacts: getAssignedContacts(),
        category,
        subtasks: getSubtasks(),
        createdAt: Date.now(),
        status
    };
}

/**
 * Saves the given task data to Firebase.
 * 
 * @param {Object} taskData - The task object to store.
 */
async function saveNewTaskToFirebase(taskData) {
    const taskURL = BASEURL + '/tasks.json';
    try {
        const getResponse = await fetch(taskURL);
        const existingTasks = await getResponse.json() || [];
        const taskArray = Array.isArray(existingTasks)
            ? existingTasks
            : Object.values(existingTasks);

        taskArray.push(taskData);
        await fetch(taskURL, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(taskArray)
        });
    } catch (error) {
        console.error('Error saving task:', error);
    }
}

/**
 * Creates a task based on form input and saves it to Firebase.
 * 
 * @param {string} status - The initial status of the task (e.g., "todo").
 */
async function createTask(status) {
    const taskData = collectNewTaskData(status);

    try {
        await saveNewTaskToFirebase(taskData);
        clearForm();
        showTaskOverlay();
    } catch (error) {
        console.error("Error creating task:", error);
    }
}

/**
 * Clears all text-based input fields in the form.
 */
function clearTextFields() {
    document.getElementById('title').value = '';
    document.getElementById('description').value = '';
    document.getElementById('due-date').value = '';
}

/**
 * Hides all error messages and removes red borders.
 */
function clearErrorMessages() {
    document.getElementById('error-msg-title').classList.add('d-none');
    document.getElementById('error-msg-duedate').classList.add('d-none');
    document.getElementById('error-msg-category').classList.add('d-none');
    document.getElementById('title').classList.remove('red-border');
    document.getElementById('due-date').classList.remove('red-border');
    document.getElementById('multiselect-category').classList.remove('red-border');
}

/**
 * Resets the priority buttons to default (medium selected).
 */
function clearPriority() {
    document.querySelectorAll('.prio-btn').forEach(btn => btn.classList.remove('selected'));
    document.querySelector('.prio-btn[data-prio="medium"]').classList.add('selected');
}

/**
 * Resets the category selector.
 */
function clearCategory() {
    document.getElementById('category-selected').innerText = 'Select task category';
}

/**
 * Clears the selected contacts from the assigned list.
 */
function clearAssignedContacts() {
    selectedContactIds = [];
    document.getElementById('assigned-contacts').innerHTML = '';
    const options = document.querySelectorAll('.multiselect-option-contact');
    options.forEach(option => option.classList.remove('selected'));
}

/**
 * Clears all subtasks from the UI and resets input/edit state.
 */
function clearSubtasks() {
    document.getElementById('subtask-input').value = '';
    document.querySelector('.subtask-list').innerHTML = '';
    subtaskDelete();
    cancelEditSubtask();
}

/**
 * Clears all form fields and resets validation/UI state.
 */
function clearForm() {
    clearTextFields();
    clearErrorMessages();
    clearPriority();
    clearCategory();
    clearAssignedContacts();
    clearSubtasks();
    document.getElementById('create-task-button').disabled = true;
}

/**
 * Shows the "Task added" overlay and redirects to board.
 */
function showTaskOverlay() {
    const overlay = document.getElementById('task-overlay');
    overlay.classList.add('show');

    setTimeout(() => {
        window.location.href = "board.html";
    }, 700);
}