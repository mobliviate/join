function initBoard() {
    document.body.innerHTML = getBodyTemplate();
  loadHeader();
  highlightActiveSidebarLink();
  document.getElementById("main").innerHTML = getBoardTemplate();
}