/**
 * Selects a priority button and deselects others.
 * 
 * @param {HTMLElement} btn - The clicked priority button.
 */
function selectPriority(btn) {
    document.querySelectorAll('.prio-btn').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
}


/**
 * Focuses the subtask input when clicking the plus icon.
 */
function subtaskInputIcon() {
    document.getElementById('subtask-input')?.focus();
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