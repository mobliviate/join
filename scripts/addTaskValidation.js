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
 * Handles UI validation and error display for due-date input.
 */
function validateInputDate() {
    const inputDateRef = document.getElementById("due-date");
    const errorMsgDateRef = document.getElementById("error-msg-duedate");

    const errorMessage = isValidDateInput(inputDateRef.value);

    if (errorMessage) {
        errorMsgDateRef.innerText = errorMessage;
        errorMsgDateRef.classList.remove("d-none");
        inputDateRef.classList.add("red-border");
    } else {
        errorMsgDateRef.classList.add("d-none");
        inputDateRef.classList.remove("red-border");
    }
}


/**
 * Validates a date input string for correct format, year and range.
 * @param {string} inputValue - The raw value of the input field.
 * @returns {string|null} - Returns error message if invalid, or null if valid.
 */
function isValidDateInput(inputValue) {
    if (!inputValue) return "This field is required";

    const date = new Date(inputValue);
    if (isNaN(date.getTime())) return "Invalid date format";

    const today = new Date().toISOString().split('T')[0];
    if (inputValue < today) return "Date cannot be in the past";

    return null;
}


/**
 * Prevents user from entering a year with more than 4 digits.
 */
function limitYearInputLength() {
    const input = document.getElementById("due-date");
    input.addEventListener("input", () => {
        const parts = input.value.split("-");
        if (parts.length === 3 && parts[0].length > 4) {
            parts[0] = parts[0].slice(0, 4);
            input.value = parts.join("-");
        }
    });
}


/**
 * Sets the minimum selectable date for the due-date input field to today's date.
 * Prevents users from selecting past dates in the datepicker.
 */
function setMinDate() {
    const today = new Date();
    const minDate = today.toISOString().split("T")[0];
    document.getElementById("due-date").setAttribute("min", minDate);
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