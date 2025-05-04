let loginState = localStorage.getItem("isLoggedIn") === "true";
let userIndexStr = localStorage.getItem("userIndex");
let userIndex = Number(userIndexStr);

function loadBody() {
    document.body.innerHTML = getBodyTemplate(loginState ? undefined : getSideBarWithoutUserTemplate());
    document.getElementById("footer_mobile").innerHTML = getFooterTemplate(loginState ? undefined : getFooterWithoutUserTemplate());
};

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
