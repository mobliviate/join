// async function loadHeader(htmlFile = "./header.html") {
//   const response = await fetch(htmlFile);
//   const headerHTML = await response.text();
//   document.getElementById("header").innerHTML = headerHTML;
// }

function loadHeader() {
  document.getElementById("header").innerHTML = getHeaderTemplate(loginState ? undefined : "");
}

function toggleUserMenu(action) {
  const userMenuOverlayRef = document.getElementById("user_menu_overlay");
  const userMenuRef = document.getElementById("user_menu");
  if (action === "close") {
    userMenuRef.classList.remove("show");
    setTimeout(() => {
      userMenuOverlayRef.classList.add("hidden");
    }, 300);
    return;
  } else if (action === "open") {
    userMenuOverlayRef.classList.remove("hidden");
    setTimeout(() => {
      userMenuRef.classList.add("show");
    }, 300);
    return;
  }
}

function logOut() {
  localStorage.setItem('isLoggedIn', 'false');
  setTimeout(() => {
    window.location.href = "index.html";
  }, 500);
}