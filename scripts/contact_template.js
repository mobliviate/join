/**
 * Returns the HTML for the contacts view (header + list + detail placeholder).
 * @returns {string}
 */
function getContactsSectionTemplate() {
  return `
    <div class="contacts-page">
      <aside class="contacts-list">
        <button id="add-contact-btn"
                class="btn btn-primary"
                onclick="showAddContactOverlay()">
          <span class="btn-text">Add new contact</span>
          <span class="btn-icon">
            <img src="assets/svg/person_add.svg" alt="" />
          </span>
        </button>
        <div id="contacts-group-container"></div>
      </aside>

      <section class="contact-container">
        <div class="contacts-header">
          <h1 class="contacts-title">Contacts</h1>
          <span class="contacts-separator">|</span>
          <span class="contacts-subtitle">Better with a team</span>
        </div>
        <div class="contact-detail" id="contact-detail">
        </div>
      </section>
    </div>
  `;
}

/**
 * Returns the HTML for one letter‐group header.
 * @param {string} letter
 * @returns {string}
 */
function createGroupLetterTemplate(letter) {
  return `<div class="group-letter">${letter}</div>`;
}

/**
 * Builds the full contact‑item HTML given its parts.
 * @param {string} id
 * @param {string} avatarHTML
 * @param {string} name
 * @param {string} emailHTML
 * @returns {string}
 */
function buildContactItem(id, avatarHTML, name, emailHTML) {
  return `
    <div class="contact-item"
         data-id="${id}">
      ${avatarHTML}
      <div class="info">
        <div class="name">${name}</div>
        ${emailHTML}
      </div>
    </div>
  `;
}

/**
 * Generates an avatar HTML snippet with initials and a unique background color.
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
 * Creates the contact‑item template.
 */


/**
 * Builds the header section (avatar, name & action buttons) for contact details.
 * @param {{id:string,name:string,initials:string}} contact
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
                  onclick="/* edit not implemented */">
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
 * Builds the information section (email & phone) for contact details.
 * @param {{email?:string,phone?:string}} contact
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
 * Creates the full contact detail HTML by combining header + info.
 * @param {{id:string,name:string,email?:string,phone?:string,initials:string}} contact
 * @returns {string}
 */
function createContactDetailTemplate(contact) {
  return buildContactHeaderSection(contact) + buildContactInfoSection(contact);
}

/**
 * Returns the HTML for the "Add new contact" overlay.
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
          <button class="close-btn"
                  onclick="hideAddContactOverlay()">×</button>
          <div class="avatar-placeholder">
            <img src="assets/svg/person_icon.svg" alt="Avatar placeholder">
          </div>
          <form id="add-contact-form"
                onsubmit="handleCreateContact(event)">
            <div class="input-group">
              <input type="text" id="new-contact-name"
                     placeholder="Name" required>
              <img src="assets/svg/person_icon.svg"
                   class="input-icon" alt="">
            </div>
            <div class="input-group">
              <input type="email" id="new-contact-email"
                     placeholder="Email">
              <img src="assets/svg/mail_icon.svg"
                   class="input-icon" alt="">
            </div>
            <div class="input-group">
              <input type="tel" id="new-contact-phone"
                     placeholder="Phone">
              <img src="assets/svg/phone_icon.svg"
                   class="input-icon" alt="">
            </div>
            <div class="form-buttons">
              <button type="button" class="btn cancel-btn"
                      onclick="hideAddContactOverlay()">Cancel ×</button>
              <button type="submit"
                      class="btn btn-primary create-btn">
                Create contact ✓
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `;
}
