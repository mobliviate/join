/**
 * Loads the header template and hides user information if the user is not logged in.
 * @function
 */
function loadHeader() {
  document.getElementById("header").innerHTML = getHeaderTemplate(localStorage.getItem('userInitials'));
  hideUserInfo();
}

/**
 * Toggles the user menu based on the action.
 * @function
 * @param {string} action - The action to perform ('open' or 'close').
 */
function toggleUserMenu(action) {
  const overlay = document.getElementById("user_menu_overlay");
  const wrapper = document.getElementById("wrapper_user_menu");
  const menu = document.getElementById("user_menu");

  if (action === "close") {
    menu.classList.remove("show");
    setTimeout(() => {
      overlay.classList.add("hidden");
      wrapper.classList.add("hidden");
    }, 100);
  } else if (action === "open") {
    overlay.classList.remove("hidden");
    wrapper.classList.remove("hidden");
    setTimeout(() => menu.classList.add("show"), 100);
  }
}

/**
 * Logs out the user and redirects to the login page.
 * @function
 */
function logOut() {
  localStorage.setItem('isLoggedIn', 'false');
  setTimeout(() => {
    window.location.href = "index.html";
  }, 500);
}