/* ==========================================================================
   UTILITIES & HELPERS
   ========================================================================== */

/**
 * Get initials from a full name.
 * @param {string} fullName
 * @returns {string}
 */
function getInitials(fullName) {
    const parts = fullName.trim().split(" ");
    return (parts[0][0] + (parts[1]?.[0] || "")).toUpperCase();
}

/**
 * Get a "hash" hue from a string for avatar colors.
 * @param {string} text
 * @returns {number}
 */
function getHueFromString(text) {
    let hash = 0;
    for (const char of text) hash = (hash * 31 + char.charCodeAt(0)) % 360;
    return hash;
}

/**
 * Get avatar background color as HSL.
 * @param {string} name
 * @returns {string}
 */
function getAvatarColor(name) {
    return `hsl(${getHueFromString(name)}, 70%, 50%)`;
}

/**
 * Create the email display HTML for a contact.
 * @param {string} email
 * @returns {string}
 */
function getEmailPart(email) {
    return email ? `<div class="email">${email}</div>` : "";
}

/**
 * Create the contact item HTML (list entry).
 * @param {Object} contact
 * @returns {string}
 */
function createContactItemTemplate(contact) {
    return buildContactItem(
        contact.id,
        createAvatarTemplate(contact.name, contact.initials),
        contact.name,
        getEmailPart(contact.email)
    );
}

/**
 * Collect input values from the add contact form.
 * @returns {Object}
 */
function collectNewContactData() {
    let nameInput = document.getElementById("new-contact-name");
    let emailInput = document.getElementById("new-contact-email");
    let phoneInput = document.getElementById("new-contact-phone");

    if (!nameInput)
        nameInput = document.getElementById("new-contact-name-mobile");
    if (!emailInput)
        emailInput = document.getElementById("new-contact-email-mobile");
    if (!phoneInput)
        phoneInput = document.getElementById("new-contact-phone-mobile");

    return {
        name: nameInput ? nameInput.value.trim() : "",
        email: emailInput ? emailInput.value.trim() : "",
        phone: phoneInput ? phoneInput.value.trim() : "",
    };
}

/**
 * Show a toast notification with the given message.
 * @param {string} message
 */
function showToast(message) {
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.classList.add("fade-out"), 2000);
    setTimeout(() => toast.remove(), 2500);
}

/**
 * Updates the desktop Add Contact submit button disabled state.
 */
function updateAddContactSubmitButton() {
    const btn = document.getElementById("add-contact-btn-submit");
    if (btn) btn.disabled = !checkContactFormValidity();
}

/**
 * Updates the mobile Add Contact submit button disabled state.
 */
function updateAddContactMobileSubmitButton() {
    const btn = document.getElementById("add-contact-btn-mobile-submit");
    if (btn) btn.disabled = !checkContactFormValidityMobile();
}

/**
 * Updates the desktop Edit Contact submit button disabled state.
 */
function updateEditContactSubmitButton() {
    const btn = document.getElementById("edit-contact-btn-submit");
    if (btn) btn.disabled = !checkEditContactFormValidity();
}

/**
 * Updates the mobile Edit Contact submit button disabled state.
 */
function updateEditContactMobileSubmitButton() {
    const btn = document.getElementById("edit-contact-btn-mobile-submit");
    if (btn) btn.disabled = !checkEditContactFormValidityMobile();
}

/**
 * Enables or disables the save button in edit overlays based on form validity (desktop and mobile).
 */
function enableEditSaveButtonIfValid() {
    const saveBtn = document.getElementById("edit-contact-save-btn");
    if (saveBtn) saveBtn.disabled = !checkEditContactFormValidity();

    const saveBtnMobile = document.getElementById(
        "edit-contact-save-btn-mobile"
    );
    if (saveBtnMobile)
        saveBtnMobile.disabled = !checkEditContactFormValidityMobile();
}

/**
 * Validates the edit contact form fields on desktop.
 * Returns true only if all fields (name, email, phone) are valid.
 *
 * @returns {boolean} True if all form fields are valid, otherwise false.
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
 * Validates the edit contact form fields on mobile.
 * Returns true only if all fields (name, email, phone) are valid.
 *
 * @returns {boolean} True if all form fields are valid, otherwise false.
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
