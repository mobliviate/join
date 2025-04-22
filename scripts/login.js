'use restrict';
const loginEmailInputRef = document.getElementById("login_email");
const loginPasswordInputRef = document.getElementById("login_password");
const loginBtn = document.getElementById('login_btn');





function validateLoginEmail() {
    const v = loginEmailInputRef.value.trim();
    const w = document.getElementById("login_warning_email");
    if (!v) return w.textContent = "", false;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) return w.textContent = "Please enter a valid email address.", false;
    if (!usersData.some(u => u.toLowerCase() === v.toLowerCase())) return w.textContent = "This email is not registered.", false;
    w.textContent = ""; return true;
}

function validateLoginPassword() {
    const v = loginPasswordInputRef.value;
    const w = document.getElementById("login_warning_password");
    if (!v) return w.textContent = "", false;
    if (v.length < 8) return w.textContent = "Password must be at least 8 characters!", false;
    if (/\s/.test(v)) return w.textContent = "Password cannot contain spaces.", false;
    w.textContent = ""; return true;
}

async function fetchUsers() {
    const response = await fetch(BASE_URL + ".json");
    const data = await response.json();
    return data.users || [];
}

async function handleLoginSubmit() {
    const w = document.getElementById("login_warning_password");
    const v = loginEmailInputRef.value.trim().toLowerCase();
    const password = loginPasswordInputRef.value;

    try {
        const users = await fetchUsers();
        const user = users.find(u => u.email.toLowerCase() === v && u.password === password);

        if (!user) {
            w.textContent = "Email or password is incorrect.";
        } else {
            w.textContent = "";
            openSummaryPage();
        }
    } catch (error) {
        w.textContent = "Server error. Please try again later.";
    }
}

function checkLoginFormValidity() {
    const isEmailValid = validateLoginEmail();
    const isPasswordValid = validateLoginPassword();
    loginBtn.disabled = !(isEmailValid && isPasswordValid);
}

// function loginUser() {
//     openSummaryPage();
// }

function openSummaryPage() {
    window.location.href = "summary.html";
}



