/* ==========================================================================
   CONTACT TEMPLATES
   ========================================================================== */

/**
 * Returns the main contacts section template.
 * @returns {string}
 */
function getContactsSectionTemplate() {
    return `
    <div class="contacts-page">
      <aside class="contacts-list">
        <button id="add-contact-btn" class="btn btn-primary" onclick="showAddContactOverlay();">
          <span class="btn-text">Add new contact</span>
          <span class="btn-icon">
            <img src="assets/svg/person_add.svg" alt="" />
          </span>
        </button>
        <div id="contacts-group-container"></div>
      </aside>
      <section class="contact-container">
      <div class="contacts-header desktop-only">
          <h1 class="contacts-title">Contacts</h1>
          <span class="contacts-separator">|</span>
          <span class="contacts-subtitle">Better with a team</span>
          <div class="bottomDivider"></div>
        </div>
        <div class="contact-detail" id="contact-detail"></div>
        <button id="edit-contact-btn-mobile" class="btn btn-secondary" onclick="showEditOverlayMobile()">
          <img src="assets/svg/more_vert.svg" alt="options" />
        </button>
      </section>
      <button id="add-contact-btn-mobile" class="btn btn-secondary" onclick="showAddContactOverlayMobile()">
        <img src="assets/svg/person_add.svg" alt="+" />
      </button>
      <div id="mobile-options-menu-container" class="hidden"></div>
      <div id="add-contact-overlay-mobile" class="hidden"></div>
    </div>
  `;
}

/**
 * Render the contact detail view for desktop.
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
 * Returns the mobile options menu HTML template for a contact.
 * @param {string} contactId - The unique ID of the contact.
 * @returns {string} The HTML string for the mobile options menu.
 */
function getMobileOptionsMenuTemplate(contactId) {
    return `
    <div id="mobile-options-menu" class="mobile-options-menu">
      <div class="option-item" onclick="closeMobileOptionsMenuWithAnimation(); setTimeout(() => showEditContactOverlayMobile('${contactId}'), 180);">
        <img src="assets/svg/edit_contacts.svg" alt="Edit">
      </div>
      <div class="option-item" onclick="deleteContact('${contactId}'); closeMobileOptionsMenuWithAnimation();">
        <img src="assets/svg/delete_contact.svg" alt="Delete">
      </div>
    </div>
  `;
}

/**
 * Returns the contact detail HTML template for mobile view.
 * @param {Object} contact - The contact object to display details for.
 * @returns {string} The HTML string for the mobile contact detail view.
 */
function getMobileContactDetailHTML(contact) {
    return `
    <div class="mobile-contact-wrapper">
      <div class="contacts-header">
        <button class="back-btn-mobile" onclick="closeMobileContactDetail()">
          <img src="assets/svg/arrow-left-line.svg" alt="Back">
        </button>
        <h1 class="contacts-title">Contacts</h1>
        <span class="contacts-separator">|</span>
        <span class="contacts-subtitle">Better with a team</span>
        <div class="bottomDivider"></div>
      </div>
      ${getContactDetailHTML(contact)}
    </div>
  `;
}

/**
 * Returns the HTML for the group letter heading in the contact list.
 * @param {string} letter
 * @returns {string}
 */
function createGroupLetterTemplate(letter) {
    return `<div class="group-letter">${letter}</div>`;
}

/**
 * Builds the HTML for a single contact item in the list.
 * @param {string} id - The contact's ID.
 * @param {string} avatarHTML - HTML for the avatar.
 * @param {string} name - The contact's name.
 * @param {string} emailHTML - HTML for the email.
 * @returns {string}
 */
function buildContactItem(id, avatarHTML, name, emailHTML) {
    return `
    <div class="contact-item" data-id="${id}" onclick="selectContactById('${id}')">
      ${avatarHTML}
      <div class="info">
        <div class="name">${name}</div>
        ${emailHTML}
      </div>
    </div>
  `;
}

/**
 * Generates the avatar circle for a contact.
 * @param {string} name - The contact's name.
 * @param {string} initials - Initials of the contact.
 * @returns {string}
 */
function createAvatarTemplate(name, initials) {
    const hue = getHueFromString(name);
    const color = `hsl(${hue}, 70%, 50%)`;
    return `
    <div class="avatar-circle" style="background-color: ${color}">
      ${initials}
    </div>
  `;
}

/**
 * Builds the complete contact detail HTML (header + info section).
 * @param {Object} contact
 * @returns {string}
 */
function createContactDetailTemplate(contact) {
    return (
        buildContactHeaderSection(contact) + buildContactInfoSection(contact)
    );
}

/**
 * Builds the contact header section including avatar and actions.
 * @param {Object} contact
 * @returns {string}
 */
function buildContactHeaderSection(contact) {
    const avatarHTML = createAvatarTemplate(
        contact.name,
        contact.initials
    ).replace('avatar-circle"', 'avatar-circle large"');
    return `
    <div class="detail-header">
      ${avatarHTML}
      <div class="detail-title">
        <h2>${contact.name}</h2>
        <div class="detail-actions">
          <button class="btn-icon btn-secondary edit-btn"
                  onclick="showEditContactOverlayResponsive('${contact.id}')">
            <img src="assets/svg/edit_contacts.svg" alt="Edit">
          </button>
          <button class="btn-icon btn-danger delete-btn"
                  onclick="deleteContact('${contact.id}')">
            <img src="assets/svg/delete_contact.svg" alt="Delete">
          </button>
        </div>
      </div>
    </div>
  `;
}

/**
 * Builds the contact information section with email and phone.
 * @param {Object} contact
 * @returns {string}
 */
function buildContactInfoSection(contact) {
    let infoHTML = `<div class="detail-info"><h3>Contact Information</h3>`;
    if (contact.email) {
        infoHTML += `<p><strong>Email</strong><br>
                  <a href="mailto:${contact.email}">${contact.email}</a></p>`;
    }
    if (contact.phone) {
        infoHTML += `<p><strong>Phone</strong><br>${contact.phone}</p>`;
    }
    infoHTML += `</div>`;
    return infoHTML;
}

/**
 * Returns the Add Contact overlay template for desktop.
 * @returns {string}
 */
function getAddContactOverlayTemplate() {
    return `
    <div class="overlay" id="add-contact-overlay">
      <div class="overlay-content">
        <div class="overlay-left">
          <div class="sidebar-logo">
            <img src="assets/svg/join-logo.svg" alt="Join Logo">
          </div>
          <h2>Add contact</h2>
          <p class="overlay-subtitle">Tasks are better with a team!</p>
          <hr>
        </div>
        <div class="overlay-right">
          <button class="close-btn" onclick="hideAddContactOverlay()">×</button>
          <div class="avatar-placeholder">
            <img src="assets/svg/person_icon.svg" alt="Avatar placeholder">
          </div>
          <form id="add-contact-form" onsubmit="handleCreateContact(event)">
            <div class="input-group">
              <input type="text" id="new-contact-name" placeholder="Name" required>
              <img src="assets/svg/person_icon.svg" class="input-icon" alt="">
            </div>
            <div class="input-group">
              <input type="email" id="new-contact-email" placeholder="Email">
              <img src="assets/svg/mail_icon.svg" class="input-icon" alt="">
            </div>
            <div class="input-group">
              <input type="tel" id="new-contact-phone" placeholder="Phone">
              <img src="assets/svg/phone_icon.svg" class="input-icon" alt="">
            </div>
            <div class="form-buttons">
              <button type="button" class="btn cancel-btn" onclick="hideAddContactOverlay()">Cancel ×</button>
              <button type="submit" class="btn btn-primary create-btn">Create contact ✓</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `;
}

/**
 * Returns the Add Contact overlay template for mobile.
 * @returns {string}
 */
function getAddContactOverlayMobileTemplate() {
    return `
    <div class="overlay-mobile">
      <div class="overlay-mobile-content">
        <button class="close-btn-mobile" aria-label="Close" onclick="hideAddContactOverlayMobile()">×</button>
        <div class="mobile-header">
          <h2>Add contact</h2>
          <p>Tasks are better with a team!</p>
          <div class="underline"></div>
        </div>
        <div class="mobile-avatar">
          <img src="assets/svg/person_icon.svg" alt="Avatar placeholder">
        </div>
        <form id="add-contact-form-mobile" onsubmit="handleCreateContact(event)">
          <div class="input-group-mobile">
            <input type="text" id="new-contact-name" placeholder="Name" required>
            <img src="assets/svg/person_icon.svg" class="input-icon" alt="">
          </div>
          <div class="input-group-mobile">
            <input type="email" id="new-contact-email" placeholder="Email">
            <img src="assets/svg/mail_icon.svg" class="input-icon" alt="">
          </div>
          <div class="input-group-mobile">
            <input type="tel" id="new-contact-phone" placeholder="Phone">
            <img src="assets/svg/phone_icon.svg" class="input-icon" alt="">
          </div>
          <button type="submit" class="btn btn-primary mobile-create-btn">
            Create contact&nbsp;✓
          </button>
        </form>
      </div>
    </div>
  `;
}

/**
 * Returns the HTML template for the Edit Contact overlay on desktop.
 * @param {Object} contact - The contact object to edit.
 * @param {string} contact.id - The contact's unique identifier.
 * @param {string} contact.name - The contact's name.
 * @param {string} [contact.email] - The contact's email address.
 * @param {string} [contact.phone] - The contact's phone number.
 * @param {string} [contact.initials] - The contact's initials.
 * @returns {string} The HTML string for the desktop edit contact overlay.
 */
function getEditContactOverlayTemplate(contact) {
    return `
    <div class="overlay" id="edit-contact-overlay">
      <div class="overlay-content">
        <div class="overlay-left">
          <div class="sidebar-logo">
            <img src="assets/svg/join-logo.svg" alt="Join Logo">
          </div>
          <h2>Edit contact</h2>
          <hr>
        </div>
        <div class="overlay-right">
          <button class="close-btn" onclick="hideEditContactOverlay()">×</button>
          <div id="edit-avatar-wrapper">
            <div class="avatar-circle large" id="edit-avatar">
              ${contact.initials}
            </div>
          </div>
          <form id="edit-contact-form" onsubmit="handleEditContact(event, '${
              contact.id
          }')">
            <div class="input-group">
              <input type="text" id="edit-contact-name" placeholder="Name" required value="${
                  contact.name
              }">
              <img src="assets/svg/person_icon.svg" class="input-icon" alt="">
            </div>
            <div class="input-group">
              <input type="email" id="edit-contact-email" placeholder="Email" value="${
                  contact.email || ""
              }">
              <img src="assets/svg/mail_icon.svg" class="input-icon" alt="">
            </div>
            <div class="input-group">
              <input type="tel" id="edit-contact-phone" placeholder="Phone" value="${
                  contact.phone || ""
              }">
              <img src="assets/svg/phone_icon.svg" class="input-icon" alt="">
            </div>
            <div class="form-buttons-desktop">
              <button type="button" class="btn delete-btn" onclick="deleteContact('${
                  contact.id
              }');">Delete</button>
              <button type="submit" class="btn btn-primary create-btn">Save ✓</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `;
}

/**
 * Returns the HTML template for the Edit Contact overlay on mobile devices.
 * @param {Object} contact - The contact object to edit.
 * @param {string} contact.id - The contact's unique identifier.
 * @param {string} contact.name - The contact's name.
 * @param {string} [contact.email] - The contact's email address.
 * @param {string} [contact.phone] - The contact's phone number.
 * @param {string} [contact.initials] - The contact's initials.
 * @returns {string} The HTML string for the mobile edit contact overlay.
 */
function getEditContactOverlayMobileTemplate(contact) {
    const initials = contact.initials || getInitials(contact.name);
    const hue = getHueFromString(contact.name);
    const color = `hsl(${hue}, 70%, 50%)`;

    return `
    <div class="overlay-mobile">
      <div class="overlay-mobile-content">
        <button class="close-btn-mobile" aria-label="Close" onclick="hideEditContactOverlayMobile()">×</button>
        <div class="mobile-header">
          <h2>Edit contact</h2>
          <div class="underline"></div>
        </div>
        <div class="mobile-avatar" style="background: ${color}; border: 4px solid white;">
          <span style="font-size: 38px; color: #fff; font-weight: bold;">${initials}</span>
        </div>
        <form id="edit-contact-form-mobile" onsubmit="handleEditContactMobile(event, '${
            contact.id
        }')">
          <div class="input-group-mobile">
            <input 
              type="text" 
              id="edit-contact-name-mobile" 
              placeholder="Name" 
              required
              value="${contact.name || ""}">
            <img src="assets/svg/person_icon.svg" class="input-icon" alt="">
          </div>
          <div class="input-group-mobile">
            <input 
              type="email" 
              id="edit-contact-email-mobile" 
              placeholder="Email"
              value="${contact.email || ""}">
            <img src="assets/svg/mail_icon.svg" class="input-icon" alt="">
          </div>
          <div class="input-group-mobile">
            <input 
              type="tel" 
              id="edit-contact-phone-mobile" 
              placeholder="Phone"
              value="${contact.phone || ""}">
            <img src="assets/svg/phone_icon.svg" class="input-icon" alt="">
          </div>
          <div class="form-buttons-mobile">
            <button type="button" class="btn delete-btn" onclick="deleteContact('${
                contact.id
            }');">Delete</button>
            <button 
              type="submit" 
              class="btn btn-primary mobile-create-btn">
              Save&nbsp;✓
            </button>
          </div>
        </form>
      </div>
    </div>
  `;
}
