'use strict';

const BASE_URL = "https://join-bc74a-default-rtdb.europe-west1.firebasedatabase.app/";
let usersEmails = [];
const nameInputRef = document.getElementById("signup_name");
const emailInputRef = document.getElementById("signup_email");
const passwordInputRef = document.getElementById("signup_password");
const confPasswordInputRef = document.getElementById("signup_confirm_password");
const submitBtn = document.getElementById('signup_btn');
const privacyCheckbox = document.getElementById('signup_privacyCheckbox');
const formInputs = [
    nameInputRef,
    emailInputRef,
    passwordInputRef,
    confPasswordInputRef
];

/**
 * Initializes the application by loading user data from the database.
 * @async
 * @function init
 * @returns {Promise<void>} Resolves when data is loaded.
 */
async function init() {
    await loadUsersEmails();
};

/**
 * Loads user data from the database.
 * @async
 * @function loadData
 * @returns {Promise<void>} Resolves when data is loaded and stored in the `usersData` array.
 */
async function loadUsersEmails() {
    let data = await loadData();
    data.forEach(u => {
        u.email = u.email.toLowerCase();
        usersEmails.push(u.email);
    });
    console.log(usersEmails);
};

async function loadData() {
    let response = await fetch(BASE_URL + ".json");
    let data = await response.json();
    return data.users || [];
}


async function loadDataTest() {
    let response = await fetch(BASE_URL + ".json");
    let data = await response.json();
    console.log(data);
};

/**
 * Change the password input field icon to the visibility icon and updates the icon accordingly.
 * @function passwordOption
 * @param {string} inputId - The ID of the password input field.
 * @param {string} passwordCntId - The ID of the container for the password visibility button.
 * @param {string} iconId - The ID of the visibility icon.
 */
function passwordOption(inputId, passwordCntId, iconId) {
    const passwordInputRef = document.getElementById(inputId);
    const passwordCntRef = document.getElementById(passwordCntId);
    if (passwordInputRef.value.length > 0) {
        if (passwordInputRef.type === "password") {
            passwordCntRef.innerHTML = getButtonTemplate(inputId, iconId);
        }
    } else {
        passwordCntRef.innerHTML = getIconTemplate(iconId);
    }
}

/**
 * Toggeles the password visibility icon and the input type between "password" and "text".
 * @function changePasswordIcon
 * @param {string} inputId - The ID of the password input field.
 * @param {string} iconId - The ID of the visibility icon.
 */
function changePasswordIcon(inputId, iconId) {
    const passwordInputRef = document.getElementById(inputId);
    const passwordIconRef = document.getElementById(iconId);
    if (passwordIconRef.src.includes("visibility_off.png")) {
        passwordIconRef.src = 'assets/png/visibility.png';
        passwordInputRef.type = "text";
    } else {
        passwordIconRef.src = 'assets/png/visibility_off.png';
        passwordInputRef.type = "password";
    }
}

/**
 * Validates the name input field. At least 6 characters long, no leading or trailing spaces.
 * @function validateName
 * @returns {boolean} True if the name is valid, otherwise false.
 */
function validateName() {
    const v = nameInputRef.value;
    const w = document.getElementById("signup_warning_name");
    if (!v.trim()) return w.textContent = "", false;
    if (v.trim().length < 6) return w.textContent = "Name must be at least 6 characters long.", false;
    if (v.match(/^\s|\s$/)) return w.textContent = "Name cannot start or end with a space.", false;
    w.textContent = ""; return true;
}

/**
 * Validates the email input field. Checks for a valid email format ("@", "." and min two characters after "."). Checks if the email is already registered.
 * @function validateEmail
 * @returns {boolean} True if the email is valid and not already registered, otherwise false.
 */
function validateEmail() {
    const v = emailInputRef.value.trim();
    const w = document.getElementById("signup_warning_email");
    if (!v) return w.textContent = "", false;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) return w.textContent = "Please enter a valid email address.", false;
    if (usersEmails.some(u => u.toLowerCase() === v.toLowerCase())) return w.textContent = "This email is already registered.", false;
    w.textContent = ""; return true;
}

/**
 * Validates the password input field. Checks for a minimum length of 8 characters and no spaces.
 * @function validatePassword
 * @returns {boolean} True if the password is valid, otherwise false.
 */
function validatePassword() {
    const v = passwordInputRef.value;
    const w = document.getElementById("signup_warning_password");
    if (!v) return w.textContent = "", false;
    if (v.length < 8) return w.textContent = "Password must be at least 8 characters!", false;
    if (/\s/.test(v)) return w.textContent = "Password cannot contain spaces.", false;
    w.textContent = ""; return true;
}

/**
 * Validates the confirm password input field by checking if it matches the password.
 * @function validateConfirmPassword
 * @returns {boolean} True if the confirm password matches the password, otherwise false.
 */
function validateConfirmPassword() {
    const pwd = passwordInputRef.value.trim();
    const cpwd = confPasswordInputRef.value.trim();
    const w = document.getElementById("signup_warning_confirm_password");
    if (!cpwd) return w.textContent = "", false;
    if (pwd !== cpwd) return w.textContent = "Your passwords don't match. Please try again.", false;
    w.textContent = ""; return true;
}

/**
 * Checks the overall form validity and enables/disables the submit button accordingly.
 * @function checkFormValidity
 */
function checkFormValidity() {
    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();
    const isConfirmPasswordValid = validateConfirmPassword();
    const privacyAccepted = privacyCheckbox.checked;
    submitBtn.disabled = !(isNameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid && privacyAccepted);
}

/**
 * Adds a new user to the `usersData` array and saves it to the database.
 * @async
 * @function addUser
 * @returns {Promise<void>} Resolves when the user is added and saved.
 */
async function addUser() {
    const name = nameInputRef.value.trim();
    const email = emailInputRef.value.trim();
    const password = passwordInputRef.value.trim();
    let usersData = await loadData();
    usersData.push({
        name: name,
        email: email,
        password: password
    });
    await saveUserToDB(usersData);
    showSuccessMsg();

    // console.log(usersData);
}

/**
 * Saves the current `usersData` array to the database.
 * @async
 * @function saveUserToDB
 * @returns {Promise<void>} Resolves when the data is successfully saved.
 */
async function saveUserToDB(usersData) {
    await fetch(BASE_URL + "/users.json", {
        method: "PUT",
        body: JSON.stringify(usersData),
        headers: {
            "Content-Type": "application/json"
        }
    });
    loadData();
}

/**
 * Displays a success message overlay and redirects the user to the index page after a short delay.
 * @function showSuccessMsg
 */
function showSuccessMsg() {
    const overlay = document.getElementById('success-message-cnt');
    const message = document.getElementById('success-message');
    requestAnimationFrame(() => {
        overlay.classList.add('active');
        message.classList.add('show-message');
    });
    setTimeout(() => {
        window.location.href = "index.html";
    }, 2000);
}