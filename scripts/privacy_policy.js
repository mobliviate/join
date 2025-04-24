function initPrivacyPolicy() {
  if (loginState) {
    document.body.innerHTML = getBodyTemplate(getSideBarUserTemplate());
    loadHeader("header.html");
  } else {
    document.body.innerHTML = getBodyTemplate(getSideBarWithoutUserTemplate());
    loadHeader("header_without_user.html");
  }
  highlightActiveSidebarLink();
  document.getElementById("main").innerHTML = getPrivacyPolicyContent();
}

/**
 * Defines all privacy policy sections and their content.
 *
 * @returns {string[]} Array of HTML strings for each policy section.
 */
function getPrivacySections() {
  const sections = [
    {
      title: "Data Collection and Use",
      paragraphs: [
        `At Join, we are committed to protecting your personal information and respecting your privacy. When you use our website, we collect certain types of personal data that are necessary to provide our services and enhance your experience. This includes your name, email address, contact information, IP address, browsing activity, and any other details you choose to provide through forms or other interactions on our website.`,
        `We use the collected data to offer personalized services, improve our website's functionality, and communicate with you about updates, offers, and relevant information. For example, we may use your email address to send you newsletters, product updates, or promotional content, but only if you have opted-in to receive such communications. Additionally, browsing data is used to optimize our website performance, tailor content to your preferences, and analyze user behavior to improve our services.`,
        `By using our website, you consent to the collection and use of your personal data as described in this privacy policy. You may opt out of certain data collection practices, such as marketing communications, at any time through your account settings or by contacting us directly.`,
      ],
    },
    {
      title: "Data Protection and Third-Party Sharing",
      paragraphs: [
        `We take the security of your personal information seriously and employ a variety of technical and organizational measures to protect your data from unauthorized access, alteration, disclosure, or destruction. These measures include encryption, secure servers, firewalls, and regular security audits to ensure that your information remains safe and confidential.`,
        `We do not sell, rent, or lease your personal information to third parties. However, we may share your data with trusted third-party service providers who assist us in the operation of our website or business activities, such as payment processors, customer service platforms, email marketing providers, and website analytics tools. These third parties are obligated to protect your personal data in accordance with applicable privacy laws and our contractual agreements with them.`,
        `In some cases, we may also share your information if required to do so by law, such as in response to a subpoena, court order, or government request. We will always ensure that any disclosures are done in compliance with relevant data protection laws, and we will only share the necessary information to meet legal obligations.`,
        `We also reserve the right to transfer your data in the event of a merger, acquisition, or sale of all or part of our business, but we will notify you before such a transfer occurs and ensure that your rights are protected.`,
        `If you have any questions or concerns about our privacy practices or would like to exercise your rights regarding your personal information, please do not hesitate to contact us directly. We are here to help!`,
      ],
    },
  ];

  return sections.map(createPrivacySectionHTML);
}

/**
 * Generates the HTML for a single privacy policy section.
 *
 * @param {Object} section - The privacy section object.
 * @param {string} section.title - The section title.
 * @param {string[]} section.paragraphs - The section's content paragraphs.
 * @returns {string} HTML string for the section.
 */
function createPrivacySectionHTML(section) {
  const paragraphsHTML = section.paragraphs.map((p) => `<p>${p}</p>`).join("");
  return `
      <h2>${section.title}</h2>
      ${paragraphsHTML}
    `;
}
