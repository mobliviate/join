/**
 * Returns the HTML for the contacts view (header + list + detail placeholder).
 * @returns {string}
 */
function getContactsSectionTemplate() {
  return `
      <div class="contacts-page">
  <aside class="contacts-list">
    <button id="add-contact-btn" class="btn btn-primary">
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
  return '<div class="group-letter">' + letter + "</div>";
}

/**
 * Returns the HTML for one contact in the list.
 * @param {{id:string,name:string,email?:string,initials:string}} contact
 * @returns {string}
 */
function createContactItemTemplate(contact) {
  let emailPart = "";
  if (contact.email) {
    emailPart = '<div class="email">' + contact.email + "</div>";
  }
  return (
    '<div class="contact-item" data-id="' +
    contact.id +
    '">' +
    createAvatarTemplate(contact.name, contact.initials) +
    '<div class="info">' +
    '<div class="name">' +
    contact.name +
    "</div>" +
    emailPart +
    "</div>" +
    "</div>"
  );
}

/**
 * Returns the HTML for the detail panel of one contact,
 * @param {{name:string,email?:string,phone?:string,initials:string}} contact
 * @returns {string}
 */
function createContactDetailTemplate(contact) {
  let emailPart = "";
  if (contact.email) {
    emailPart =
      '<p><strong>Email</strong><br><a href="mailto:' +
      contact.email +
      '">' +
      contact.email +
      "</a></p>";
  }
  let phonePart = "";
  if (contact.phone) {
    phonePart = "<p><strong>Phone</strong><br>" + contact.phone + "</p>";
  }
  return (
    '<div class="detail-header">' +
    createAvatarTemplate(contact.name, contact.initials).replace(
      'avatar-circle"',
      'avatar-circle large"'
    ) +
    '<div class="detail-title">' +
    "<h2>" +
    contact.name +
    "</h2>" +
    '<div class="detail-actions">' +
    '<button class="btn-icon btn-secondary">' +
    '<img src="assets/svg/edit_contacts.svg" alt="Edit">' +
    "</button>" +
    '<button class="btn-icon btn-danger">' +
    '<img src="assets/svg/delete_contact.svg" alt="Delete">' +
    "</button>" +
    "</div>" +
    "</div>" +
    "</div>" +
    '<div class="detail-info">' +
    "<h3>Contact Information</h3>" +
    emailPart +
    phonePart +
    "</div>"
  );
}
