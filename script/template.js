function getBodyTemplate() {
  return `
      <div class="main-div">
        <div class="left">
          <div class="sidebar-logo">
            <img src="assets/svg/join-logo.svg" alt="Join Logo">
          </div>
          <nav class="sidebar-nav">
            <a href="#" class="sidebar-link active"><img src="assets/svg/summary-icon.svg">Summary</a>
            <a href="#" class="sidebar-link"><img src="assets/svg/edit-icon.svg">Add Task</a>
            <a href="#" class="sidebar-link"><img src="assets/svg/board-icon.svg">Board</a>
            <a href="#" class="sidebar-link"><img src="assets/svg/contact-icon.svg">Contacts</a>
          </nav>
          <div class="sidebar-footer">
            <a href="#">Privacy Policy</a>
            <a href="#">Legal notice</a>
          </div>
        </div>
        <div class="right">
          <header class="header" id="header"></header>
          <main class="main" id="main">Main</main>
        </div>
      </div>
    `;
}
