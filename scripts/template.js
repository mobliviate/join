function getBodyTemplate(func = getSideBarUserTemplate()) {
  return `
    <div class="main-div">
      <div class="left">
        <div class="sidebar-logo">
          <img src="assets/svg/join-logo.svg" alt="Join Logo">
        </div>
        ${func}
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
              <div class="user-menu-item">
                <a href="../privacy_policy.html">Privacy Policy</a>
              </div>
              <div class="user-menu-item">
                <a href="../legal_notice.html">Legal Notice</a>
              </div>
              <div class="user-menu-item">
                <button class="logout-btn" onclick="logOut()">Log out</button>
              </div>
            </div>
          </div>
        <main class="main wrapper" id="main"></main>
      </div>
    </div>
  `;
}

function getSideBarUserTemplate() {
  return `
      <nav class="sidebar-nav">
        <a href="summary.html" class="sidebar-link" data-page="summary.html">
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
  `;
}

function getSideBarWithoutUserTemplate() {
  return `
      <nav class="sidebar-nav">
        <a href="index.html" class="sidebar-link" data-page="index.html">
          <img src="assets/svg/login.svg"> Log In
        </a>
      </nav>
  `;
}

function getHeaderTemplate(func = getHeaderUserTemplate()) {
  return `
    <div class="wrapper">
      <div class="header-content">
        <span class="header-title">Kanban Project Management Tool</span>
        ${func}
               
      </div>
    </div>
  `;
}

function getHeaderUserTemplate() {
  return `
    <div class="user-wrapper">
      <a href="help.html" class="help-link">
        <img src="assets/svg/help.svg" alt="Help" />
      </a>
      <button class="user-button" onclick="toggleUserMenu('open')">
        <span class="initials">SM</span>
      </button>
    </div>
  `;
}

function getHeaderHelpTemplate() {
  return `
    <div class="user-wrapper">     
      <button class="user-button" onclick="toggleUserMenu('open')">
        <span class="initials">SM</span>
      </button>
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
        <li><strong>Marc Odermatt, Gyözö Pere, Srdjan Velickovski, Aledxander Schmidt, Kevin Karoly</strong></li>
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
