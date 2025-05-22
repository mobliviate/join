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

