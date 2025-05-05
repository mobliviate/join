'use strict';
const loginEmailInputRef = document.getElementById("login_email");
const loginPasswordInputRef = document.getElementById("login_password");
const loginBtn = document.getElementById('login_btn');

/**
 * Validates the email input field for login.
 * @returns {boolean} - Returns true if the email is valid, otherwise false.
 */
function validateLoginEmail() {
    const v = loginEmailInputRef.value.trim();
    const w = document.getElementById("login_warning_email");
    if (!v) return w.textContent = "", false;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) return w.textContent = "Please enter a valid email address.", false;
    if (!usersEmails.some(u => u.toLowerCase() === v.toLowerCase())) return w.textContent = "This email is not registered.", false;
    w.textContent = ""; return true;
}

/**
 * Validates the password input field for login.
 * @returns {boolean} - Returns true if the password is valid, otherwise false.
 */
function validateLoginPassword() {
    const v = loginPasswordInputRef.value;
    const w = document.getElementById("login_warning_password");
    if (!v) return w.textContent = "", false;
    if (v.length < 8) return w.textContent = "Password must be at least 8 characters!", false;
    if (/\s/.test(v)) return w.textContent = "Password cannot contain spaces.", false;
    w.textContent = ""; return true;
}

/**
 * Handles the login form submission.
 * Validates the email and password, and attempts to log in the user.
 * Displays appropriate warnings if login fails.
 * @async
 * @returns {Promise<void>} - A promise that resolves when the login process is complete.
 */
async function handleLoginSubmit() {
    const w = document.getElementById("login_warning_password");
    const v = loginEmailInputRef.value.trim().toLowerCase();
    const password = loginPasswordInputRef.value;

    try {
        const users = await fetchUsers();
        const index = users.findIndex(u => u.email.toLowerCase() === v && u.password === password);

        if (index === -1) {
            w.textContent = "Email or password is incorrect.";
        } else {
            w.textContent = "";
            localStorage.setItem('userInitials', getUserInitials(users, index));
            openSummaryPage(index);
        }
    } catch (error) {
        w.textContent = "Server error. Please try again later.";
    }
}

function getUserInitials(users, index) {
    const name = users[index].name;
    const initials = name.split(" ").map(word => word[0].toUpperCase()).join("");
    return initials;
}

/**
 * Fetches the list of users from the server.
 * @async
 * @returns {Promise<Array>} - A promise that resolves to an array of user objects.
 */
async function fetchUsers() {
    const response = await fetch(BASE_URL + ".json");
    const data = await response.json();
    return data.users || [];
}

/**
 * Checks the validity of the login form inputs.
 * Enables or disables the login button based on the validity of the inputs.
 */
function checkLoginFormValidity() {
    const isEmailValid = validateLoginEmail();
    const isPasswordValid = validateLoginPassword();
    loginBtn.disabled = !(isEmailValid && isPasswordValid);
}

/**
 * Redirects the user to the summary page upon successful login.
 */
function openSummaryPage(userIndex) {
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userIndex', userIndex);
    setTimeout(() => {
        window.location.href = "summary.html";
    }, 500);
}

function doGuestLogin() {
    localStorage.setItem('userInitials', 'SM');
    localStorage.setItem('isLoggedIn', 'true');
    window.location.href = 'summary.html';
}


