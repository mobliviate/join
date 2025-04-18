function getBodyTemplate() {
  return `
    <div class="main-div">
      <div class="left">
        <div class="sidebar-logo">
          <img src="assets/svg/join-logo.svg" alt="Join Logo">
        </div>
        <nav class="sidebar-nav">
          <a href="index.html" class="sidebar-link" data-page="index.html">
            <img src="assets/svg/summary-icon.svg"> Summary
          </a>
          <a href="add_task.html" class="sidebar-link" data-page="add_task.html">
            <img src="assets/svg/edit-icon.svg"> Add Task
          </a>
          <a href="board.html" class="sidebar-link" data-page="board.html">
            <img src="assets/svg/board-icon.svg"> Board
          </a>
          <a href="contact.html" class="sidebar-link" data-page="contact.html">
            <img src="assets/svg/contact-icon.svg"> Contacts
          </a>
        </nav>
        <div class="sidebar-footer">
          <a href="privacy_policy.html">Privacy Policy</a>
          <a href="legal_notice.html">Legal Notice</a>
        </div>
      </div>
      <div class="right">
        <header class="header" id="header"></header>
        <main class="main" id="main"></main>
      </div>
    </div>
  `;
}