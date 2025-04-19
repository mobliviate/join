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

function checkFormValidity() {
    // Alle Felder müssen nicht leer sein und gültig (HTML5 Validity)  
    const allFilledAndValid = formInputs.every(input => input.value.trim() !== '' && input.checkValidity());

    // Passwörter müssen übereinstimmen  
    const passwordsMatch = passwordInputRef.value.trim() === confPasswordInputRef.value.trim();

    // Checkbox muss angehakt sein  
    const privacyAccepted = privacyCheckbox.checked;

    // Warnung anzeigen, wenn Passwörter nicht übereinstimmen  
    if (!passwordsMatch && passwordInputRef.value.trim() !== '' && confPasswordInputRef.value.trim() !== '') {
        signupWarningRef.classList.remove("d-none");
    } else {
        signupWarningRef.classList.add("d-none");
    }

    // Button aktivieren, wenn alles passt  
    submitBtn.disabled = !(allFilledAndValid && passwordsMatch && privacyAccepted);
}

async function loadData() {
    let response = await fetch(BASE_URL + ".json");
    let data = await response.json();
    usersData = data || [];
    console.log(usersData);
};

function addUser() {
    const name = nameInputRef.value.trim();
    const email = emailInputRef.value.trim();
    const password = passwordInputRef.value.trim();

    usersData.users.push({
        name: name,
        email: email,
        password: password
    });
    showSuccessMsg();

    console.log(usersData);


    // await saveData();
}

function showSuccessMsg() {
    const overlay = document.getElementById('success-message-cnt');
    const message = document.getElementById('success-message');
    requestAnimationFrame(() => {
        overlay.classList.add('active');
        message.classList.add('show-message');
    });
    setTimeout(() => {
        window.location.href = "login.html";
    }, 2000);
}

let newUsers = [];

function checkUser() {
    newUsers = usersData.users;
    console.log(newUsers);
}

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

