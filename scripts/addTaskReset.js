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
