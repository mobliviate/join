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
                        <h1 class="summary-headline-title"> Join 360 </h1>
                        <div class="summary-headline-line"></div>
                        <span> Key Metrics at a Glance </span>
                    </div>
                </div>

                <div class="summary-content">
                    <div class="summary-content-left">
                        <span> Left </span>
                    </div>
                    <div class="summary-conent-right">
                        <span> Right </span>
                    </div>
                </div>

            </div>
        </div>
    `;
  }