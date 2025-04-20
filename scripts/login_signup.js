'use strict';

const BASE_URL = "https://join-bc74a-default-rtdb.europe-west1.firebasedatabase.app/";
let usersData = [];
const nameInputRef = document.getElementById("signup_name");
const emailInputRef = document.getElementById("signup_email");
const passwordInputRef = document.getElementById("signup_password");
const confPasswordInputRef = document.getElementById("signup_confirm_password");
const signupWarningRef = document.getElementById("signup_warning");
const submitBtn = document.getElementById('signup_btn');
const privacyCheckbox = document.getElementById('signup_privacyCheckbox');
const formInputs = [
    nameInputRef,
    emailInputRef,
    passwordInputRef,
    confPasswordInputRef
];

async function init() {
    await loadData();
};


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


function validateName() {
    const v = nameInputRef.value;
    const w = document.getElementById("signup_warning_name");
    if (!v.trim()) return w.textContent = "", false;
    if (v.trim().length < 6) return w.textContent = "Name must be at least 6 characters long.", false;
    if (v.match(/^\s|\s$/)) return w.textContent = "Name cannot start or end with a space.", false;
    w.textContent = ""; return true;
}

function validateEmail() {
    const v = emailInputRef.value.trim();
    const w = document.getElementById("signup_warning_email");
    if (!v) return w.textContent = "", false;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) return w.textContent = "Please enter a valid email address.", false;
    w.textContent = ""; return true;
}

function validatePassword() {
    const v = passwordInputRef.value;
    const w = document.getElementById("signup_warning_password");
    if (!v) return w.textContent = "", false;
    if (v.length < 8) return w.textContent = "Password must be at least 8 characters!", false;
    if (/\s/.test(v)) return w.textContent = "Password cannot contain spaces.", false;
    w.textContent = ""; return true;
}

function validateConfirmPassword() {
    const pwd = passwordInputRef.value.trim();
    const cpwd = confPasswordInputRef.value.trim();
    const w = document.getElementById("signup_warning_confirm_password");
    if (!cpwd) return w.textContent = "", false;
    if (pwd !== cpwd) return w.textContent = "Your passwords don't match. Please try again.", false;
    w.textContent = ""; return true;
}

function checkFormValidity() {
    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();
    const isConfirmPasswordValid = validateConfirmPassword();
    const privacyAccepted = privacyCheckbox.checked;
    submitBtn.disabled = !(isNameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid && privacyAccepted);
}

async function loadData() {
    let response = await fetch(BASE_URL + ".json");
    let data = await response.json();
    usersData = data.users || [];
    console.log(usersData);
};

async function addUser() {
    const name = nameInputRef.value.trim();
    const email = emailInputRef.value.trim();
    const password = passwordInputRef.value.trim();

    usersData.push({
        name: name,
        email: email,
        password: password
    });
    await saveUserToDB(name, email, password);
    showSuccessMsg();

    console.log(usersData);
}

async function saveUserToDB() {
    await fetch(BASE_URL + "/users.json", {
        method: "PUT",
        body: JSON.stringify(usersData),
        headers: {
            "Content-Type": "application/json"
        }
    });
    loadData();
}

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

// let newUsers = [];

// function checkUser() {
//     newUsers = usersData.users;
//     console.log(newUsers);
// }

async function saveData() {
    const dataToSave = {
        // users: [{
        //     name: "Anna",
        //     email: "anna@example.com",
        //     id: "u1",
        // },
        // {
        //     name: "Ben",
        //     email: "ben@example.com",
        //     id: "u2",
        // }],
        // tasks: [{
        //     tastk_name: "Meeting organisieren"
        // },
        // {
        //     task_name: "Design besprechen"

        // }],
        // contacts: [{
        //     name: "Christina",
        //     email: "christina@example.com",
        //     id: "c1",
        // },
        // {
        //     name: "Daniel",
        //     email: "Daniel@example.com",
        //     id: "c2",
        // }]
    };
    await fetch(BASE_URL + ".json", {
        method: "PUT",
        body: JSON.stringify(dataToSave),
        headers: {
            "Content-Type": "application/json"
        }
    });
}

