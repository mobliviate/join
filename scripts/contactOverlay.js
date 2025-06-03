/* ==========================================================================
   CONTACT FORM & OVERLAY LOGIC
   ========================================================================== */

/**
 * Show the Add Contact overlay (mobile or desktop).
 */
function showAddContactOverlay() {
    if (window.innerWidth <= 980) {
        showAddContactOverlayMobile();
    } else {
        showAddContactOverlayDesktop();
    }
}

/**
 * Opens the correct Edit Contact overlay depending on screen size.
 * @param {string} contactId
 */
function showEditContactOverlayResponsive(contactId) {
    if (window.innerWidth <= 980) {
        showEditContactOverlayMobile(contactId);
    } else {
        showEditContactOverlay(contactId);
    }
}

/**
 * Show the Add Contact overlay (desktop only).
 */
function showAddContactOverlayDesktop() {
    closeAllContactOverlays();
    if (document.getElementById("add-contact-overlay")) return;
    const temp = document.createElement("div");
    temp.innerHTML = getAddContactOverlayTemplate().trim();
    document.body.appendChild(temp.firstElementChild);
    window.addContactOverlayOpen = true;
}

/**
 * Show the Add Contact overlay (mobile only).
 */
function showAddContactOverlayMobile() {
    closeAllContactOverlays();
    const container = document.getElementById("add-contact-overlay-mobile");
    if (!container) return;
    container.innerHTML = getAddContactOverlayMobileTemplate();
    container.classList.remove("hidden");
    document.body.style.overflow = "hidden";
    window.addContactOverlayOpen = true;
}

/**
 * Hide the Add Contact overlay (desktop only).
 */
function hideAddContactOverlay() {
    const overlay = document.getElementById("add-contact-overlay");
    if (overlay) overlay.remove();
    window.addContactOverlayOpen = false;
}

/**
 * Hide the Add Contact overlay (mobile only).
 */
function hideAddContactOverlayMobile() {
    const container = document.getElementById("add-contact-overlay-mobile");
    if (!container) return;
    container.innerHTML = "";
    container.classList.add("hidden");
    document.body.style.overflow = "";
    window.addContactOverlayOpen = false;
}

/**
 * Shows the Edit Contact overlay for desktop.
 * @param {string} contactId
 */
function showEditContactOverlay(contactId) {
    closeAllContactOverlays();
    const contact = findContactById(contactId);
    if (!contact) {
        return;
    }
    const temp = document.createElement("div");
    temp.innerHTML = getEditContactOverlayTemplate(contact).trim();
    document.body.appendChild(temp.firstElementChild);
    window.currentEditContactId = contactId;
    enableEditSaveButtonIfValid();
}

/**
 * Shows the Edit Contact overlay for mobile devices.
 * @param {string} contactId
 */
function showEditContactOverlayMobile(contactId) {
    closeAllContactOverlays();
    const container = document.getElementById("add-contact-overlay-mobile");
    const contact = findContactById(contactId);
    if (!contact || !container) {
        return;
    }
    container.innerHTML = getEditContactOverlayMobileTemplate(contact);
    showMobileOverlay(container);
    window.currentEditContactId = contactId;
    enableEditSaveButtonIfValid();
}

/**
 * Finds a contact by ID in window.currentContacts.
 * @param {string} contactId
 * @returns {Object|null}
 */
function findContactById(contactId) {
    if (!window.currentContacts) return null;
    for (let i = 0; i < window.currentContacts.length; i++) {
        if (window.currentContacts[i].id === contactId) {
            return window.currentContacts[i];
        }
    }
    return null;
}

/**
 * Shows the overlay and animates it for mobile.
 * @param {Element} container
 */
function showMobileOverlay(container) {
    const overlay = container.querySelector(".overlay-mobile");
    container.classList.remove("hidden");
    document.body.style.overflow = "hidden";
    setTimeout(function () {
        if (overlay) {
            overlay.classList.add("show");
        }
    }, 20);
}

/**
 * Hide the Edit Contact overlay (desktop).
 */
function hideEditContactOverlay() {
    const overlay = document.getElementById("edit-contact-overlay");
    if (overlay) overlay.remove();
    window.currentEditContactId = null;
}

/**
 * Hide the Edit Contact overlay (mobile).
 */
function hideEditContactOverlayMobile() {
    const container = document.getElementById("add-contact-overlay-mobile");
    if (!container) return;
    const overlay = container.querySelector(".overlay-mobile");
    if (overlay) {
        overlay.classList.remove("show");
        setTimeout(() => {
            container.innerHTML = "";
            container.classList.add("hidden");
            document.body.style.overflow = "";
            window.currentEditContactId = null;
        }, 250);
    } else {
        container.innerHTML = "";
        container.classList.add("hidden");
        document.body.style.overflow = "";
        window.currentEditContactId = null;
    }
}

/**
 * Closes all overlays (add/edit, mobile/desktop).
 */
function closeAllContactOverlays() {
    hideAddContactOverlay();
    hideAddContactOverlayMobile();
    hideEditContactOverlay();
    hideEditContactOverlayMobile();
    window.addContactOverlayOpen = false;
    window.currentEditContactId = null;
}

/**
 * Handles reopening of overlays after resize.
 * @param {"desktop"|"mobile"} currentMode
 * @param {boolean} wasAddOpen - Was the Add Contact overlay open before resize?
 * @param {string|null} editContactId - The ID of the contact being edited (if any).
 */
function handleOverlayReopenAfterResize(
    currentMode,
    wasAddOpen,
    editContactId
) {
    if (wasAddOpen) {
        if (currentMode === "desktop") {
            showAddContactOverlayDesktop();
        } else {
            showAddContactOverlayMobile();
        }
    } else if (editContactId) {
        if (currentMode === "desktop") {
            showEditContactOverlay(editContactId);
        } else {
            showEditContactOverlayMobile(editContactId);
        }
    }
}

/**
 * Handles viewport resizing and triggers overlay/detail changes.
 */
function handleViewportResize() {
    let currentMode;
    if (window.innerWidth > 980) {
        currentMode = "desktop";
    } else {
        currentMode = "mobile";
    }

    if (currentMode === window.lastViewportMode) {
        return;
    }
    window.lastViewportMode = currentMode;

    const wasAddOpen = Boolean(window.addContactOverlayOpen);
    const editContactId = window.currentEditContactId;

    closeAllContactOverlays();
    handleOverlayReopenAfterResize(currentMode, wasAddOpen, editContactId);
    handleContactDetailResize(currentMode);
}

/**
 * Handles the contact detail view resize for desktop mode.
 * @param {HTMLElement} detail - The detail container element.
 */
function handleContactDetailResizeDesktop(detail) {
    document.body.classList.remove("mobile-detail-open");
    if (!detail) return;
    const active = document.querySelector(".contact-item.active");
    if (active && active.dataset.id && window.currentContacts) {
        for (let i = 0; i < window.currentContacts.length; i++) {
            if (window.currentContacts[i].id === active.dataset.id) {
                renderDesktopContactDetail(window.currentContacts[i]);
                return;
            }
        }
    }
    detail.innerHTML = "";
}

/**
 * Handles the contact detail view resize for mobile mode.
 * @param {HTMLElement} detail - The detail container element.
 */
function handleContactDetailResizeMobile(detail) {
    if (window.lastSelectedContactId && window.currentContacts) {
        for (let i = 0; i < window.currentContacts.length; i++) {
            if (window.currentContacts[i].id === window.lastSelectedContactId) {
                renderMobileContactDetail(window.currentContacts[i]);
                document.body.classList.add("mobile-detail-open");
                return;
            }
        }
    }
    detail.innerHTML = "";
    document.body.classList.remove("mobile-detail-open");
}

/**
 * Main function to handle contact detail resize.
 * @param {"desktop"|"mobile"} currentMode
 */
function handleContactDetailResize(currentMode) {
    const detail = document.getElementById("contact-detail");
    if (currentMode === "desktop") {
        handleContactDetailResizeDesktop(detail);
    } else {
        handleContactDetailResizeMobile(detail);
    }
}

/**
 * Utility function to remove the .active class from all contact items
 * and reset the last selected contact ID.
 */
function clearContactSelection() {
    let items = document.querySelectorAll(".contact-item.active");
    for (let i = 0; i < items.length; i++) {
        items[i].classList.remove("active");
    }
    window.lastSelectedContactId = null;
}

window.addEventListener("resize", handleViewportResize);

/**
 * Validates a name input field.
 * Requirements: at least 3 characters, no leading or trailing spaces.
 * @param {string} inputId - The input field's id.
 * @param {string} warningId - The id of the warning span to show messages.
 * @returns {boolean} True if the name is valid, otherwise false.
 */
function validateNameField(inputId, warningId) {
    const value = document.getElementById(inputId).value.trim();
    const w = document.getElementById(warningId);
    if (!value) return (w.textContent = ""), false;
    if (value.length < 3)
        return (w.textContent = "Name must be at least 3 characters."), false;
    if (/^\s|\s$/.test(value))
        return (
            (w.textContent = "Name cannot start or end with a space."), false
        );
    w.textContent = "";
    return true;
}

/**
 * Validates an email input field.
 * Checks for a valid email format (including "@", ".", and at least 2 chars after the last dot).
 * @param {string} inputId - The input field's id.
 * @param {string} warningId - The id of the warning span to show messages.
 * @returns {boolean} True if the email is valid, otherwise false.
 */
function validateEmailField(inputId, warningId) {
    const value = document.getElementById(inputId).value.trim();
    const w = document.getElementById(warningId);
    if (!value) return (w.textContent = ""), false;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value))
        return (w.textContent = "Please enter a valid email address."), false;
    w.textContent = "";
    return true;
}

/**
 * Validates a phone number input field.
 * Checks for at least 3 characters and allows digits, spaces, +, -, and ().
 * @param {string} inputId - The input field's id.
 * @param {string} warningId - The id of the warning span to show messages.
 * @returns {boolean} True if the phone number is valid, otherwise false.
 */
function validatePhoneField(inputId, warningId) {
    const value = document.getElementById(inputId).value.trim();
    const w = document.getElementById(warningId);
    if (!value) return (w.textContent = ""), false;
    if (!/^[0-9+\-\s()]{3,}$/.test(value))
        return (w.textContent = "Please enter a valid phone number."), false;
    w.textContent = "";
    return true;
}

/**
 * Validates the add contact form (desktop).
 * Returns true only if all fields are valid.
 * @returns {boolean}
 */
function checkContactFormValidity() {
    const validName = validateNameField(
        "new-contact-name",
        "contact_warning_name"
    );
    const validEmail = validateEmailField(
        "new-contact-email",
        "contact_warning_email"
    );
    const validPhone = validatePhoneField(
        "new-contact-phone",
        "contact_warning_phone"
    );
    return validName && validEmail && validPhone;
}

/**
 * Validates the add contact form (mobile).
 * Returns true only if all fields are valid.
 * @returns {boolean}
 */
function checkContactFormValidityMobile() {
    const validName = validateNameField(
        "new-contact-name-mobile",
        "contact_warning_name_mobile"
    );
    const validEmail = validateEmailField(
        "new-contact-email-mobile",
        "contact_warning_email_mobile"
    );
    const validPhone = validatePhoneField(
        "new-contact-phone-mobile",
        "contact_warning_phone_mobile"
    );
    return validName && validEmail && validPhone;
}

/**
 * Validates the edit contact form (desktop).
 * Returns true only if all fields are valid.
 * @returns {boolean}
 */
function checkEditContactFormValidity() {
    const validName = validateNameField(
        "edit-contact-name",
        "edit_contact_warning_name"
    );
    const validEmail = validateEmailField(
        "edit-contact-email",
        "edit_contact_warning_email"
    );
    const validPhone = validatePhoneField(
        "edit-contact-phone",
        "edit_contact_warning_phone"
    );
    return validName && validEmail && validPhone;
}

/**
 * Validates the edit contact form (mobile).
 * Returns true only if all fields are valid.
 * @returns {boolean}
 */
function checkEditContactFormValidityMobile() {
    const validName = validateNameField(
        "edit-contact-name-mobile",
        "edit_contact_warning_name_mobile"
    );
    const validEmail = validateEmailField(
        "edit-contact-email-mobile",
        "edit_contact_warning_email_mobile"
    );
    const validPhone = validatePhoneField(
        "edit-contact-phone-mobile",
        "edit_contact_warning_phone_mobile"
    );
    return validName && validEmail && validPhone;
}
