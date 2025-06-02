/* ==========================================================================
   MOBILE: OPTIONS MENU (ACTION MENU)
   ========================================================================== */


/**
 * Displays the mobile options menu for the selected contact.
 * If the menu is already open, it will close it instead.
 */
function showEditOverlayMobile() {
    const menuContainer = document.getElementById(
        "mobile-options-menu-container"
    );

    if (!menuContainer.classList.contains("hidden")) {
        closeMobileOptionsMenuWithAnimation();
        return;
    }

    const activeElement = document.querySelector(".contact-item.active");
    if (!activeElement) return;

    const contactId = activeElement.dataset.id;
    if (!contactId) return;

    menuContainer.innerHTML = getMobileOptionsMenuTemplate(contactId);
    menuContainer.classList.remove("hidden");
    mobileOptionsMenuOpen = true;

    showMobileMenuWithAnimation();
    addMobileMenuEventListeners();
}


/**
 * Triggers animation and sets up delayed visual transition for the menu.
 */
function showMobileMenuWithAnimation() {
    setTimeout(function () {
        const menu = document.getElementById("mobile-options-menu");
        if (menu) {
            menu.classList.add("show");
        }
    }, 10);
}


/**
 * Adds global event listeners for menu close interactions (outside click, ESC key).
 */
function addMobileMenuEventListeners() {
    setTimeout(function () {
        window.addEventListener("mousedown", handleClickOutsideMobileMenu);
        window.addEventListener("touchstart", handleClickOutsideMobileMenu);
        window.addEventListener("keydown", handleEscMobileMenu);
    }, 0);
}


/**
 * Handle click outside the mobile options menu.
 * @param {MouseEvent|TouchEvent} event
 */
function handleClickOutsideMobileMenu(event) {
    const menu = document.getElementById("mobile-options-menu");
    if (menu && !menu.contains(event.target)) {
        closeMobileOptionsMenuWithAnimation();
    }
}


/**
 * Handle ESC key for closing the mobile options menu.
 * @param {KeyboardEvent} e
 */
function handleEscMobileMenu(e) {
    if (e.key === "Escape") {
        closeMobileOptionsMenuWithAnimation();
    }
}


/**
 * Close the mobile options menu with animation and remove all event listeners.
 */
function closeMobileOptionsMenuWithAnimation() {
    const menuContainer = document.getElementById(
        "mobile-options-menu-container"
    );
    const menu = document.getElementById("mobile-options-menu");

    window.removeEventListener("mousedown", handleClickOutsideMobileMenu);
    window.removeEventListener("touchstart", handleClickOutsideMobileMenu);
    window.removeEventListener("keydown", handleEscMobileMenu);
    mobileOptionsMenuOpen = false;

    if (menu) {
        menu.classList.remove("show");
        menu.classList.add("closing");
        setTimeout(() => {
            menuContainer.innerHTML = "";
            menuContainer.classList.add("hidden");
        }, 180);
    } else {
        menuContainer.innerHTML = "";
        menuContainer.classList.add("hidden");
    }
}
