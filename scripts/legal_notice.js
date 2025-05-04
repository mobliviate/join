/**
 * Initializes the legal notice page by setting up the main content and layout.
 * - Updates the body content with the appropriate template based on the login state.
 * - Loads the header section of the page.
 * - Highlights the active link in the sidebar.
 * - Populates the main content area with the legal notice content.
 *
 * @function
 */
function initLegalNotice() {
  loadBody();
  loadHeader();
  highlightActiveSidebarLink();
  document.getElementById("main").innerHTML = getLegalNoticeContent();
}

/**
 * Provides HTML strings for each section of the legal notice.
 *
 * @returns {string[]} Array of HTML strings representing legal subsections.
 */
function getLegalSections() {
  const sections = [
    {
      title: "Acceptance of Terms",
      content: `By accessing and using <span class="blue">Join</span>, you acknowledge and agree to the following terms and conditions, and any policies, guidelines, or amendments thereto that may be presented to you from time to time. We, the listed students, may update or change the terms and conditions from time to time without notice.`,
    },
    {
      title: "Scope and Ownership of the Product",
      content: `<span class="blue">Join</span> has been developed as part of a student group project in a web development bootcamp at the <span class="blue">Developer Akademie GmbH</span>. It has an educational purpose and is not intended for extensive personal & business usage. As such, we cannot guarantee consistent availability, reliability, accuracy, or any other aspect of quality regarding this Product.
        <br><br>
        The design of <span class="blue">Join</span> is owned by the <span class="blue">Developer Akademie GmbH</span>. Unauthorized use, reproduction, modification, distribution, or replication of the design is strictly prohibited.`,
    },
    {
      title: "Proprietary Rights",
      content: `Aside from the design owned by <span class="blue">Developer Akademie GmbH</span>, we, the listed students, retain all proprietary rights in <span class="blue">Join</span>, including any associated copyrighted
        material, trademarks, and other proprietary information.`,
    },
    {
      title: "Use of the Product",
      content: `<span class="blue">Join</span> is intended to be used for lawful purposes only, in accordance with all applicable laws and regulations. Any use of <span class="blue">Join</span> for illegal activities, or to harass, harm, threaten, or intimidate another person, is strictly prohibited. You are solely responsible for your interactions with other users of <span class="blue">Join</span>.`,
    },
    {
      title: "Disclaimer of Warranties and Limitation of Liability",
      content: `<span class="blue">Join</span> is provided "as is" without warranty of any kind, whether express or implied, including but not limited to the implied warranties of merchantability, fitness for a particular purpose, and non-infringement. In no event will we, the listed students, or the <span class="blue">Developer Akademie GmbH</span>, be liable for any direct, indirect, incidental, special, consequential or exemplary damages, including but not limited to, damages for loss of profits, goodwill, use, data, or other intangible losses, even if we have been advised of the possibility of such damages, arising out of or in connection with the use or performance of <span class="blue">Join</span>.`,
    },
    {
      title: "Indemnity",
      content: `You agree to indemnify, defend and hold harmless us, the listed students, the <span class="blue">Developer Akademie</span>, and our affiliates, partners, officers, directors, agents, and employees, from and against any claim, demand, loss, damage, cost, or liability (including reasonable legal fees) arising out of or relating to your use of <span class="blue">Join</span> and/or your breach of this Legal Notice.`,
    },
  ];

  return sections.map(createLegalSectionHTML);
}

/**
 * Generates the HTML for a single legal section.
 *
 * @param {Object} section - A section of the legal notice.
 * @param {string} section.title - Title of the section.
 * @param {string} section.content - HTML content of the section.
 * @returns {string} The rendered HTML string for that section.
 */
function createLegalSectionHTML(section) {
  return `
      <h3>${section.title}</h3>
      <p>${section.content}</p>
    `;
}
