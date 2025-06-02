let categoryDropdownOpen = false;
let assignDropdownOpen = false;
let selectedContactIds = [];
const BASE = "https://join-bc74a-default-rtdb.europe-west1.firebasedatabase.app"

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
 * Global click handler to automatically close dropdowns
 * when the user clicks outside of the respective dropdown components.
 *
 * Used in the Add Task view to close the "Assigned to" and "Category" dropdowns
 * when a click occurs outside their respective containers.
 *
 * @param {MouseEvent} event - The global click event from the document or container.
 */
function handleGlobalClick(event) {
    const isClickInsideAssign = document.getElementById('multiselect-assign')?.contains(event.target) ||
                                document.getElementById('multiselect-assign-options')?.contains(event.target);

    const isClickInsideCategory = document.getElementById('multiselect-category')?.contains(event.target) ||
                                  document.getElementById('multiselect-category-options')?.contains(event.target);

    if (assignDropdownOpen && !isClickInsideAssign) {
        closeAssignDropdown();
    }

    if (categoryDropdownOpen && !isClickInsideCategory) {
        closeCategoryDropdown();
    }
}