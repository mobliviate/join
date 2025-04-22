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