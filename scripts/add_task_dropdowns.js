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