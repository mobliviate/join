function initAddTask() {
    document.body.innerHTML = getBodyTemplate();
    loadHeader();
    highlightActiveSidebarLink();
    document.getElementById("main").innerHTML = getAddTaskTemplate();
    initializeFirebase();
    fetchContactsForAssign();
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