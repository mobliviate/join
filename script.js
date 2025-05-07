const USERS_BASE_URL =
  "https://join-bc74a-default-rtdb.europe-west1.firebasedatabase.app/users.json";
let loginState = localStorage.getItem("isLoggedIn") === "true";
let userIndexStr = localStorage.getItem("userIndex");
let userIndex = Number(userIndexStr);

function loadBody() {
  document.body.innerHTML = getBodyTemplate();
  document.getElementById("footer_mobile").innerHTML = getFooterTemplate();
  const sidebarNavRef = document.getElementById("sidebar_nav_user");
  const sidebarNavWithoutUserRef = document.getElementById("sidebar_nav_without_user");
  const footerNavRef = document.getElementById("footer_nav_user");
  const footerWithoutUserRef = document.getElementById("footer_without_user");

  if (loginState) {
    sidebarNavRef.classList.remove("d-none");
    footerNavRef.classList.remove("d-none");
  } else {
    sidebarNavWithoutUserRef.classList.remove("d-none");
    footerWithoutUserRef.classList.remove("d-none");
  }
}

/**
 * Hides the help link in the sidebar.
 * @function
 */
function hideHelpLink() {
  const helpLinkRef = document.getElementById("help_link");
  helpLinkRef.style.display = "none";
}

function hideUserInfo() {
  const userInfoRef = document.getElementById("user_wrapper");

  if (!loginState) {
    userInfoRef.style.display = "none";
  }
}

function userGreetAndChangeUserName() {
  const overlayRef = document.getElementById("greet_overlay");
  renderUserInSummary();
  if (localStorage.getItem("showGreeting") === "true") {
    localStorage.removeItem("showGreeting");
    overlayRef.classList.remove("d-none");
    renderUserInOverlay();
    setTimeout(() => {
      overlayRef.classList.add("hidden");
      setTimeout(() => overlayRef.classList.add("d-none"), 1000);
    }, 2000);
  }
}

async function renderUserInSummary() {
  const summaryGreetingRef = document.getElementById("summary_greeting");
  const summaryUserRef = document.getElementById("summary_user");
  if (userIndex === -1) {
    summaryGreetingRef.textContent = `${getDayTime()}`;
    summaryUserRef.textContent = "";
  } else {
    let data = await fetchUsers();
    summaryGreetingRef.textContent = `${getDayTime()},`;
    summaryUserRef.textContent = data[userIndex].name;
  }
}

async function renderUserInOverlay() {
  const overlayTitleRef = document.getElementById("greet_overlay_title");
  const overlayNameRef = document.getElementById("greet_overlay_name");
  if (userIndex === -1) {
    overlayTitleRef.textContent = `${getDayTime()}!`;
    overlayNameRef.textContent = "";
  } else {
    let data = await fetchUsers();
    overlayTitleRef.textContent = `${getDayTime()},`;
    overlayNameRef.textContent = data[userIndex].name;
  }
}

/**
 * Fetches the list of users from the server.
 * @async
 * @returns {Promise<Array>} - A promise that resolves to an array of user objects.
 */
async function fetchUsers() {
  const response = await fetch(USERS_BASE_URL);
  const data = await response.json();
  console.log(data);
  return data || [];
}

function getDayTime() {
  const date = new Date();
  const berlinHour = new Intl.DateTimeFormat("de-DE", {
    hour: "numeric",
    hour12: false,
    timeZone: "Europe/Berlin",
  }).format(date);
  const hour = parseInt(berlinHour, 10);

  if (hour >= 5 && hour < 11) {
    return "Good Morning";
  } else if (hour >= 11 && hour < 17) {
    return "Good Afternoon";
  } else if (hour >= 17 && hour < 22) {
    return "Good Evening";
  } else {
    return "Good Night";
  }
}
