function initSummary() {
    document.body.innerHTML = getBodyTemplate();
    loadHeader();
    highlightActiveSidebarLink();
    document.getElementById("main").innerHTML = getSummeryTemplate();
  }

  function getSummeryTemplate() {
    return `
        <div class="summary-container">
            <div class="summary-wrapper">
                <div class="summary_header">
                    <div class="summary-headline">
                        <span> Join 360 </span>
                        <hr>
                        <span> Key Metrics at a Glance </span>
                    </div>
                </div>
                <div class="summary-content"></div>
            </div>
        </div>
    `;
  }