function initAddTask() {
    document.body.innerHTML = getBodyTemplate();
    loadHeader();
    highlightActiveSidebarLink();
    document.getElementById("main").innerHTML = getAddTaskTemplate();
    initializeFirebase();
    fetchContactsForAssign();
}

