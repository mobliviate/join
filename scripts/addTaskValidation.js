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