/**
 * Global flag to track mobile options menu state.
 * @type {boolean}
 */
let mobileOptionsMenuOpen = false;
let currentEditContactId = null;
let lastViewportMode = window.innerWidth > 980 ? "desktop" : "mobile";

/* ==========================================================================
   INIT & MAIN LOGIC
   ========================================================================== */

/**
 * Initialize Contacts Page: Loads UI and fetches contacts.
 */
function initContacts() {
    loadBody();
    loadHeader();
    highlightActiveSidebarLink();
    document.getElementById("main").innerHTML = getContactsSectionTemplate();
    fetchAndRenderContacts();
    renderContactsPage();
}

function renderContactsPage() {
    const main = document.getElementById("main");
    main.innerHTML = "";
    main.innerHTML = getContactsSectionTemplate();
}
