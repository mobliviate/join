let editingSubtaskItem = null;

/**
 * Toggles visibility of subtask icons based on input field content.
 */
function subtaskInput() {
    const input = document.getElementById('subtask-input');
    const show = input.value.trim() !== '';
    document.getElementById('add-subtask-icon').classList.toggle('d-none', show);
    document.getElementById('delete-subtask-icon').classList.toggle('d-none', !show);
    document.querySelector('.verticalline-subtask').classList.toggle('d-none', !show);
    document.getElementById('save-subtask-icon').classList.toggle('d-none', !show);
}


/**
 * Creates a new subtask DOM element and adds it to the subtask list.
 */
function subtaskSave() {
    const input = document.getElementById('subtask-input');
    const text = input.value.trim();
    if (!text) return;
    const item = document.createElement('div');
    item.className = 'subtask-item';
    item.onmouseenter = () => item.querySelector('.subtask-actions').classList.remove('d-none');
    item.onmouseleave = () => item.querySelector('.subtask-actions').classList.add('d-none');
    item.ondblclick = () => editSubtask(item.querySelector('[alt="Edit"]'));
    item.innerHTML = `
        <span class="subtask-text">• ${text}</span>
        <div class="subtask-actions d-none">
            <img src="./assets/svg/subtask_edit.svg" alt="Edit" class="subtask-action-icon" onclick="editSubtask(this)">
            <img src="./assets/svg/subtask_delete.svg" alt="Delete" class="subtask-action-icon" onclick="deleteSubtask(this)">
        </div>`;
    document.querySelector('.subtask-list').appendChild(item);
    input.value = '';
    subtaskDelete();
}


/**
 * Clears the subtask input field and hides action icons.
 */
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


/**
 * Deletes the subtask element from the list.
 * 
 * @param {HTMLElement} iconElement - The clicked delete icon inside a subtask.
 */
function deleteSubtask(iconElement) {
    const subtaskItem = iconElement.closest('.subtask-item');
    if (subtaskItem) {
        subtaskItem.remove();
    }
}


/**
 * Activates edit mode for the selected subtask item.
 * 
 * @param {HTMLElement} icon - The edit icon that was clicked.
 */
function editSubtask(icon) {
    const item = icon.closest('.subtask-item');
    const input = document.getElementById('subtask-edit');
    editingSubtaskItem = item;
    input.value = item.querySelector('.subtask-text').innerText.replace(/^•\s*/, '');
    input.classList.remove('d-none');
    document.getElementById('edit-delete-icon').classList.remove('d-none');
    document.getElementById('edit-save-icon').classList.remove('d-none');
    document.querySelector(".subtask-list").style.display = 'none';
    input.focus();
}


/**
 * Cancels subtask edit mode and restores original state.
 */
function cancelEditSubtask() {
    document.getElementById('subtask-edit').classList.add('d-none');
    document.getElementById('edit-delete-icon').classList.add('d-none');
    document.getElementById('edit-save-icon').classList.add('d-none');
    document.getElementById('subtask-edit').value = '';
    if (editingSubtaskItem) document.querySelector(".subtask-list").style.display = 'flex';
    editingSubtaskItem = null;
}


/**
 * Saves changes to the currently edited subtask.
 */
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


/**
 * Returns an array of all current subtasks from the DOM.
 * 
 * @returns {Array<{text: string, status: boolean}>} Array of subtask objects.
 */
function getSubtasks() {
    return Array.from(document.querySelectorAll('.subtask-item .subtask-text')).map(s => ({
        text: s.innerText.replace(/^•\s*/, ''),
        status: false
    }));
}


/**
 * Handles the Enter key press in the subtask input field.
 * Prevents the default form submission and triggers saving the subtask.
 * 
 * @param {KeyboardEvent} event - The keydown event triggered in the input field.
 */
function handleSubtaskEnter(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        subtaskSave();
    }
}