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
 * Show the Add Contact overlay (desktop only).
 */
function showAddContactOverlayDesktop() {
  if (document.getElementById("add-contact-overlay")) return;
  const temp = document.createElement("div");
  temp.innerHTML = getAddContactOverlayTemplate().trim();
  document.body.appendChild(temp.firstElementChild);
}

/**
 * Hide the Add Contact overlay (desktop only).
 */
function hideAddContactOverlay() {
  const overlay = document.getElementById("add-contact-overlay");
  if (overlay) overlay.remove();
}

/**
 * Show the Edit Contact overlay (desktop).
 * @param {string} contactId
 */
function showEditContactOverlay(contactId) {
  const contact = (window.currentContacts || []).find(
    (contact) => contact.id === contactId
  );
  if (!contact) return;
  const temp = document.createElement("div");
  temp.innerHTML = getEditContactOverlayTemplate(contact).trim();
  document.body.appendChild(temp.firstElementChild);
  const avatarEl = document.getElementById("edit-avatar");
  if (avatarEl) {
    const hue = getHueFromString(contact.name);
    avatarEl.style.setProperty("--avatar-hue", hue);
  }
}

/**
 * Hide the Edit Contact overlay (desktop).
 */
function hideEditContactOverlay() {
  const overlay = document.getElementById("edit-contact-overlay");
  if (overlay) overlay.remove();
  currentEditContactId = null;
}

/**
 * Show the Edit Contact overlay (mobile).
 * @param {string} contactId
 */
function showEditContactOverlayMobile(contactId) {
  const container = document.getElementById("add-contact-overlay-mobile");
  const contact = (window.currentContacts || []).find(
    (c) => c.id === contactId
  );
  if (!contact || !container) return;
  container.innerHTML = getEditContactOverlayMobileTemplate(contact);

  const overlay = container.querySelector(".overlay-mobile");
  container.classList.remove("hidden");
  document.body.style.overflow = "hidden";
  setTimeout(() => {
    if (overlay) overlay.classList.add("show");
  }, 20);
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

function handleViewportResize() {
  const currentMode = window.innerWidth > 980 ? "desktop" : "mobile";
  if (currentMode === window.lastViewportMode) return;
  window.lastViewportMode = currentMode;

  handleEditOverlayResize();
  handleContactDetailResize(currentMode);
}

/**
 * Blendet ggf. das Edit-Overlay passend zum Modus ein/aus.
 */
function handleEditOverlayResize() {
  if (window.currentEditContactId) {
    hideEditContactOverlay();
    hideEditContactOverlayMobile();
    setTimeout(() => {
      showEditContactOverlayResponsive(window.currentEditContactId);
    }, 30);
  }
}

/**
 * Wechselt die Kontakt-Detailansicht je nach Modus.
 * @param {"desktop"|"mobile"} currentMode
 */
function handleContactDetailResize(currentMode) {
  const detail = document.getElementById("contact-detail");
  if (currentMode === "desktop") {
    document.body.classList.remove("mobile-detail-open");
    const active = document.querySelector(".contact-item.active");
    if (active && active.dataset.id && window.currentContacts) {
      const contact = window.currentContacts.find(
        (c) => c.id === active.dataset.id
      );
      contact ? renderDesktopContactDetail(contact) : (detail.innerHTML = "");
    } else {
      detail.innerHTML = "";
    }
  } else {
    if (window.lastSelectedContactId && window.currentContacts) {
      const contact = window.currentContacts.find(
        (c) => c.id === window.lastSelectedContactId
      );
      if (contact) {
        renderMobileContactDetail(contact);
        document.body.classList.add("mobile-detail-open");
      } else {
        detail.innerHTML = "";
        document.body.classList.remove("mobile-detail-open");
      }
    } else {
      detail.innerHTML = "";
      document.body.classList.remove("mobile-detail-open");
    }
  }
}

// Utility, damit keine .active-Klasse irgendwo bleibt
function clearContactSelection() {
  document
    .querySelectorAll(".contact-item.active")
    .forEach((el) => el.classList.remove("active"));
  window.lastSelectedContactId = null;
}

window.addEventListener("resize", handleViewportResize);

/**
 * Handles switching the edit contact overlay between desktop and mobile.
 * Hides the current overlay and shows the appropriate overlay for the new mode.
 *
 * @param {"desktop"|"mobile"} currentMode - The current viewport mode.
 * @returns {void}
 */
function handleEditOverlayModeSwitch(currentMode) {
  if (window.currentEditContactId) {
    hideEditContactOverlay();
    hideEditContactOverlayMobile();
    setTimeout(() => {
      showEditContactOverlayResponsive(window.currentEditContactId);
    }, 30);
  }
}

/**
 * Handles switching the contact detail view when changing modes.
 * On desktop, ensures the detail view is correctly rendered and mobile state is reset.
 *
 * @param {"desktop"|"mobile"} currentMode - The current viewport mode.
 * @returns {void}
 */
function handleContactDetailModeSwitch(currentMode) {
  if (currentMode === "desktop") {
    document.body.classList.remove("mobile-detail-open");
    const active = document.querySelector(".contact-item.active");
    if (active && active.dataset.id && window.currentContacts) {
      const contact = window.currentContacts.find(
        (c) => c.id === active.dataset.id
      );
      if (contact) {
        renderDesktopContactDetail(contact);
      }
    }
  }
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
      currentEditContactId = null;
    }, 250);
  } else {
    container.innerHTML = "";
    container.classList.add("hidden");
    document.body.style.overflow = "";
    currentEditContactId = null;
  }
}
