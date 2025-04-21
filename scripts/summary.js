function initSummary() {
    document.body.innerHTML = getBodyTemplate();
    loadHeader();
    highlightActiveSidebarLink();
    document.getElementById("main").innerHTML = getSummaryTemplate();
  }

  function getSummaryTemplate() {
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

                            <div class="summary-content-left-top-wrapper">
                                <div class="summary-buttons" id="summary-todo">todo</div>
                                <div class="summary-buttons" id="summary-done">done</div>
                            </div>

                            <div class="summary-content-left-middle-wrapper">
                                <div class="summary-buttons" id="summary-urgent">urgent</div>
                            </div>

                            <div class="summary-content-left-bottom-wrapper">
                                <div class="summary-buttons" id="summary-tasks-in-board">t-i-board</div>
                                <div class="summary-buttons" id="summary-tasks-in-progress">t-i-progress</div>
                                <div class="summary-buttons" id="summary-awaiting-feedback">aw-feedback</div>
                            </div>
                    </div>
                    <div class="summary-content-right">
                        <span> Right </span>
                    </div>
                </div>

            </div>
        </div>
    `;
  }