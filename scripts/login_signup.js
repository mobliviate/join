'use strict';

const BASE_URL = "https://join-bc74a-default-rtdb.europe-west1.firebasedatabase.app/";
let usersData = [];
let nameInputRef = document.getElementById("signup_name");
let emailInputRef = document.getElementById("signup_email");
let passwordInputRef = document.getElementById("signup_password");
let confPasswordInputRef = document.getElementById("signup_confirm_password");
let signupWarningRef = document.getElementById("signup_warning");

async function init() {
    await loadData();
};


async function loadData() {
    let response = await fetch(BASE_URL + ".json");
    let data = await response.json();
    usersData = data || [];
    console.log(usersData);
};

function formValidation(event) {
    event.preventDefault();
    const name = nameInputRef.value.trim();
    const email = emailInputRef.value.trim();
    const password = passwordInputRef.value.trim();
    const confPassword = confPasswordInputRef.value.trim();


    if (password !== confPassword) {
        signupWarningRef.classList.remove("d-none");
    } else {
        signupWarningRef.classList.add("d-none");
        addUser();
    }
}

function addUser() {
    const name = nameInputRef.value.trim();
    const email = emailInputRef.value.trim();
    const password = passwordInputRef.value.trim();

    usersData.users.push({
        name: name,
        email: email,
        password: password
    });

    console.log(usersData);


    // await saveData();
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
