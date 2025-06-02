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
    document.getElementById("multiselect-assign-options").classList.remove("d-none");
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
 * Toggles visibility of the category dropdown.
 */
function toggleCategoryDropdown() {
    categoryDropdownOpen ? closeCategoryDropdown() : openCategoryDropdown();
}


/**
 * Opens the category dropdown.
 */
function openCategoryDropdown() {
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
 * Global click handler that closes open dropdowns
 * when a click occurs outside of their respective elements.
 *
 * This ensures dropdowns stay open when interacting with inputs or options inside them,
 * and are closed automatically when clicking anywhere else on the page.
 *
 * @param {MouseEvent} event - The click event triggered by the user.
 */
document.addEventListener('click', function (event) {
    const assignWrapper = document.getElementById('multiselect-assign');
    const assignOptions = document.getElementById('multiselect-assign-options');

    const categoryWrapper = document.getElementById('multiselect-category');
    const categoryOptions = document.getElementById('multiselect-category-options');

    const clickedInsideAssign =
        assignWrapper?.contains(event.target) || assignOptions?.contains(event.target);

    const clickedInsideCategory =
        categoryWrapper?.contains(event.target) || categoryOptions?.contains(event.target);

    if (assignDropdownOpen && !clickedInsideAssign) {
        closeAssignDropdown();
    }

    if (categoryDropdownOpen && !clickedInsideCategory) {
        closeCategoryDropdown();
    }
});