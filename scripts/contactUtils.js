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
    return {
        name: document.getElementById("new-contact-name").value.trim(),
        email: document.getElementById("new-contact-email").value.trim(),
        phone: document.getElementById("new-contact-phone").value.trim(),
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
