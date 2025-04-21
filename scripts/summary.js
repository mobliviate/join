function initSummary() {
    document.body.innerHTML = getBodyTemplate();
    loadHeader();
    highlightActiveSidebarLink();
    document.getElementById("main").innerHTML = getSummerySectionTemplate();
  }

  function getSummerySectionTemplate() {
    return `
        <section class="summary_container">
            <div class="summary_wrapper">
                <div class="summary_header"></div>
                <div class="summary_content"></div>
            </div>
        </section>
    `;
  }