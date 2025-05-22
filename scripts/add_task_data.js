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
    const taskURL = BASE + '/tasks.json';
    try {
        const getResponse = await fetch(taskURL);
        const existingTasks = await getResponse.json() || [];
        const taskArray = Array.isArray(existingTasks) ? existingTasks : Object.values(existingTasks);

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