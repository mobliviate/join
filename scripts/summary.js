function initSummary() {
    document.body.innerHTML = getBodyTemplate();
    loadHeader();
    highlightActiveSidebarLink();
    document.getElementById("main").innerHTML = getSummaryTemplate();
  }

  function getSummaryTemplate() {
    return `
        <div class="summary_container">
            <div class="summary_wrapper">

                <div class="summary_header">
                    <div class="summary_headline">
                        <h1 class="summary_headline_title"> Join 360 </h1>
                        <div class="summary_headline_line"></div>
                        <span> Key Metrics at a Glance </span>
                    </div>
                </div>

                <div class="summary_content">
                    <div class="summary_content_left">

                            <div class="summary_content_left_top_wrapper">
                                
                                <div class="summary_buttons summary_button_width_264 gap_16" id="summary-todo">

                                    <img src="./assets/svg/summary-todo-icon.svg" alt="To-do">

                                    <div class="summary_bottons_counter_and_text_wrapper">
                                        <span class="summary_todo_counter" id="summary-todo-counter">1</span>
                                        <span>To-do</span>
                                    </div>

                                </div>

                                <div class="summary_buttons summary_button_width_264 gap_16" id="summary-done">done</div>
                            </div>

                            <div class="summary_content_left_middle_wrapper">
                                <div class="summary_buttons summary_button_width_560" id="summary-urgent">urgent</div>
                            </div>

                            <div class="summary_content_left_bottom_wrapper">
                                <div class="summary_buttons summary_button_width_168" id="summary-tasks-in-board">t-i-board</div>
                                <div class="summary_buttons summary_button_width_168" id="summary-tasks-in-progress">t-i-progress</div>
                                <div class="summary_buttons summary_button_width_168" id="summary-awaiting-feedback">aw-feedback</div>
                            </div>
                    </div>
                    <div class="summary_content_right">
                        <span> Right </span>
                    </div>
                </div>

            </div>
        </div>
    `;
  }