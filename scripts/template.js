function getBodyTemplate() {
  return `
    <div class="main-div">
      <div class="left mobile-hide">
        <div class="sidebar-logo">
          <img src="assets/svg/join-logo.svg" alt="Join Logo">
        </div>
        <nav id="sidebar_nav_user" class="sidebar-nav d-none">
          <a href="summary.html" class="sidebar-link" data-page="summary.html">
            <svg class="nav-icon" viewBox="0 0 26 26">
              <use href="assets/svg/sprite.svg#summary_icon"></use>
            </svg> Summary
          </a>
          <a href="addTask.html" class="sidebar-link" data-page="addTask.html">
            <svg class="nav-icon" viewBox="0 0 26 26">
              <use href="assets/svg/sprite.svg#add_task_icon"></use>
            </svg> Add Task
          </a>
          <a href="board.html" class="sidebar-link" data-page="board.html">
            <svg class="nav-icon" viewBox="0 0 30 26">
              <use href="assets/svg/sprite.svg#board_icon"></use>
            </svg> Board
          </a>
          <a href="contact.html" class="sidebar-link" data-page="contact.html">
            <svg class="nav-icon" viewBox="0 0 24 26">
              <use href="assets/svg/sprite.svg#contacts_icon"></use>
            </svg> Contacts
          </a>
        </nav>
        <nav id="sidebar_nav_without_user" class="sidebar-nav d-none">
          <a href="index.html" class="sidebar-link" data-page="index.html">
            <svg class="login-icon" viewBox="0 0 20 20">
              <use href="assets/svg/sprite.svg#login_icon"></use>
            </svg> Log In
          </a>
      </nav>
        <div class="sidebar-footer">
          <a href="privacy_policy.html" class="sidebar-link" data-page="privacy_policy.html">Privacy Policy</a>
          <a href="legal_notice.html" class="sidebar-link" data-page="legal_notice.html">Legal Notice</a>
        </div>
      </div>
      <div class="right">
        <header class="header" id="header"></header>
        <div class="user-menu-overlay hidden" id="user_menu_overlay" onclick="toggleUserMenu('close')"></div>
        <div class="wrapper-user-menu hidden" id="wrapper_user_menu" onclick="toggleUserMenu('close')">
          <div class="user-menu" id="user_menu" onclick="event.stopPropagation()">
            <div class="user-menu-item user-menu-help-item mobile-flex">
              <a href="help.html">Help</a>
            </div>
            <div class="user-menu-item">
              <a href="privacy_policy.html">Privacy Policy</a>
            </div>
            <div class="user-menu-item">
              <a href="legal_notice.html">Legal Notice</a>
            </div>
            <div class="user-menu-item">
              <button class="logout-btn" onclick="logOut()">Log out</button>
            </div>
          </div>
        </div>
        
        <main class="main wrapper" id="main"></main>
      
        <footer id="footer_mobile" class="footer-nav-cnt mobile-flex">
        </footer>
      </div>
    </div>
  `;
}

function getFooterTemplate() {
  return `
    <nav id="footer_nav_user" class="footer-nav d-none">
      <a href="summary.html" class="footer-nav-link" data-page="summary.html">
        <div class="footer-nav-link-cnt">
          <svg class="nav-icon" viewBox="0 0 26 26">
            <use href="assets/svg/sprite.svg#summary_icon"></use>
          </svg>
          <span>Summary</span>
        </div>
      </a>
      <a href="addTask.html" class="footer-nav-link" data-page="addTask.html">
        <div class="footer-nav-link-cnt">
          <svg class="nav-icon" viewBox="0 0 26 26">
            <use href="assets/svg/sprite.svg#add_task_icon"></use>
          </svg>
          <span>Add Task</span>
        </div>
      </a>
      <a href="board.html" class="footer-nav-link" data-page="board.html">
        <div class="footer-nav-link-cnt">
          <svg class="nav-icon" viewBox="0 0 30 26">
            <use href="assets/svg/sprite.svg#board_icon"></use>
          </svg>
          <span>Board</span>
        </div>
      </a>
      <a href="contact.html" class="footer-nav-link" data-page="contact.html">
        <div class="footer-nav-link-cnt">
          <svg class="nav-icon" viewBox="0 0 24 26">
            <use href="assets/svg/sprite.svg#contacts_icon"></use>
          </svg>
          <span>Contacts</span>
        </div>
      </a>
    </nav>
    <nav id="footer_without_user" class="footer d-none">
      <a href="index.html" class="login-link" data-page="index.html">
        <svg class="login-icon" viewBox="0 0 20 20">
            <use href="assets/svg/sprite.svg#login_icon"></use>
        </svg> Log In
      </a>
      <div class="footer-link-cnt">
        <a href="privacy_policy.html" class="footer-nav-link" data-page="privacy_policy.html">Privacy Policy</a>
        <a href="legal_notice.html" class="footer-nav-link" data-page="legal_notice.html">Legal Notice</a>
      </div>
    </nav>
  `;
}

function getHeaderTemplate(initials) {
  return `
    <div class="wrapper">
      <div class="header-content">
        <span class="header-title mobile-hide">Kanban Project Management Tool</span>
        <img src="assets/svg/join_logo.svg" alt="Join Logo" class="header-logo mobile-flex">
        <div id="user_wrapper" class="user-wrapper">
          <a href="help.html" id="help_link" class="help-link mobile-hide">
            <img src="assets/svg/help.svg" alt="Help" />
          </a>
          <button class="user-button" onclick="toggleUserMenu('open')">
            <span class="user-initials">${initials}</span>
          </button>
        </div>
               
      </div>
    </div>
  `;
}

function getPrivacyPolicyContent() {
  return `
    <div class="privacy_policy">
      <h1>Privacy Policy</h1>

      ${getPrivacySections().join("")}
    </div>
  `;
}

function getLegalNoticeContent() {
  return `
    <div class="legal_notice">
      <h1>Legal Notice</h1>

      <h2>Imprint</h2>
      <ul>
        <li><strong>Marc Odermatt, Gyözö Pere, Srdjan Velickovski, Alexander Schmidt, Kevin Karoly</strong></li>
        <li><strong>Tassiloplatz 25</strong></li>
        <li><strong>81541 München</strong></li>
      </ul>

      <h2>Exploring the Board</h2>
      <p>Email: info@developerakademie.com</p>

      ${getLegalSections().join("")}
    </div>
  `;
}

function getHelpContent() {
  return `
    <div class="help">
      <div class="header_help">
        <h1 class="heading_help">Help</h1>
      </div>
      <div class="help_text">
        <span class="text">
          Welcome to the help page for <span class="blue">Join</span>, your guide to using our kanban
          project management tool. Here, we'll provide an overview of what <span class="blue">Join</span>
          is, how it can benefit you, and how to use it.
        </span>
        <div class="explanation_join">
          <h2 class="subheading_help">What is Join?</h2>
          <span>
            <span class="blue">Join</span> is a kanban-based project management tool designed and
            built by a group of dedicated students as part of their web development bootcamp at the
            Developer Akademie.
            <br><br>
            Kanban, a Japanese term meaning "billboard", is a highly effective method to visualize
            work, limit work-in-progress, and maximize efficiency (or flow). <span class="blue">Join</span>
            leverages the principles of kanban to help users manage their tasks and projects in an
            intuitive, visual interface.
            <br><br>
            It is important to note that <span class="blue">Join</span> is designed as an
            educational exercise and is not intended for extensive business usage. While we strive to ensure the
            best possible user experience, we cannot guarantee consistent availability, reliability,
            accuracy, or other aspects of quality regarding <span class="blue">Join</span>.
          </span>
        </div>

        <h2 class="subheading_help">How to use it?</h2>
        <div class="explanation_join">
          <span>Here is a step-by-step guide on how to use <span class="blue">Join</span>:</span>

          ${getSteps()}
          
          <h2 class="subheading_help">Enjoy using Join!</h2>
        </div>
      </div>
    </div>
  `;
}

function createStepHTML(step, index) {
  return `
      <div class="steps_use_join">
        <span class="subheading_help">${index + 1}.</span>
        <div class="step_use_join">
          <span class="subheading2_help">${step.title}</span>
          <span>${step.text}</span>
        </div>
      </div>
    `;
}
