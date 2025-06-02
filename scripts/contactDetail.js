/* ==========================================================================
   CONTACT DETAILS UI
   ========================================================================== */

/**
 * Show the detail view of a contact (responsive for mobile/desktop).
 * @param {Object} contact
 */
function showContactDetail(contact) {
    clearContactDetail();
    if (window.innerWidth <= 980) {
        renderMobileContactDetail(contact);
        document.body.classList.add("mobile-detail-open");
    } else {
        renderDesktopContactDetail(contact);
        document.body.classList.remove("mobile-detail-open");
    }
}

/**
 * Clears the contact detail container and removes any extra (duplicate) headers.
 */
function clearContactDetail() {
    const detail = document.getElementById("contact-detail");
    if (!detail) return;
    detail.innerHTML = "";
    const mobileContacts = document.querySelectorAll(".mobile-contact-wrapper");
    for (let i = 0; i < mobileContacts.length; i++) {
        const element = mobileContacts[i];
        element.remove();
    }

    const headers = document.querySelectorAll(".contacts-header");
    for (let i = 0; i < headers.length; i++) {
        const element = headers[i];
        if (!element.classList.contains("desktop-only")) {
            element.remove();
        }
    }
}

/**
 * Rendert die Detailansicht für Desktop.
 * @param {Object} contact
 */
function renderDesktopContactDetail(contact) {
    const detail = document.getElementById("contact-detail");
    detail.innerHTML = `
      <div class="detail-content animate-detail">
        ${getContactDetailHTML(contact)}
      </div>
    `;
}

/**
 * Render the contact detail view for mobile.
 * @param {Object} contact
 */
function renderMobileContactDetail(contact) {
    const detail = document.getElementById("contact-detail");
    detail.innerHTML = getMobileContactDetailHTML(contact);
}

/**
 * Close the mobile contact detail view.
 */
function closeMobileContactDetail() {
    document.body.classList.remove("mobile-detail-open");
    const detail = document.getElementById("contact-detail");
    if (detail) {
        detail.innerHTML = "";
    }

    const activeItems = document.querySelectorAll(".contact-item.active");
    for (let i = 0; i < activeItems.length; i++) {
        const element = activeItems[i];
        element.classList.remove("active");
    }
    window.lastSelectedContactId = null;
}

/**
 * Helper for getting contact detail HTML.
 * (Assumes function is defined in template file.)
 * @param {Object} contact
 * @returns {string}
 */
function getContactDetailHTML(contact) {
    return createContactDetailTemplate(contact);
}
