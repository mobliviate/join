let categoryDropdownOpen = false

function initAddTask() {
    document.body.innerHTML = getBodyTemplate();
    loadHeader();
    highlightActiveSidebarLink();
    document.getElementById("main").innerHTML = getAddTaskTemplate();
    initializeFirebase();
    fetchContactsForAssign();
}

function onBodyClick() {
    closeCategoryDropdown();
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

function toggleCategoryDropdown() {
    if (categoryDropdownOpen) {
        closeCategoryDropdown();
    } else {
        openCategoryDropdown();
    }
}

function closeCategoryDropdown() { 
    const multiselectCategoryOptionsRef = document.getElementById("multiselect-category-options");
    if (categoryDropdownOpen) {
        multiselectCategoryOptionsRef.classList.add("d-none");
        categoryDropdownOpen = false 
    }     
}

function openCategoryDropdown() {
    const multiselectCategoryOptionsRef = document.getElementById("multiselect-category-options");
    const multiselectCategoryRef = document.getElementById('multiselect-category');
    if (!categoryDropdownOpen) {
        multiselectCategoryRef.focus();
        multiselectCategoryOptionsRef.classList.remove("d-none");
        categoryDropdownOpen = true 
    } 
}

function selectCategoryOption(option) {
    const multiselectCategorySelectedRef = document.getElementById("category-selected");
    multiselectCategorySelectedRef.innerHTML = option
    validateCategory();
    closeCategoryDropdown();    
}

