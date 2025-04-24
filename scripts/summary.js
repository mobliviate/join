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

                                    <div class="summary_bottons_amount_and_text_wrapper">
                                        <span class="summary_amount_font_weight_and_size" id="summary-todo-amount">1</span>
                                        <span class="summary_text_font_weight_and_size">To-do</span>
                                    </div>

                                </div>

                                <div class="summary_buttons summary_button_width_264 gap_16" id="summary-done">
                                    
                                    <img src="./assets/svg/summary-done-icon.svg" alt="Done">

                                    <div class="summary_bottons_amount_and_text_wrapper">
                                        <span class="summary_amount_font_weight_and_size" id="summary-done-amount">1</span>
                                        <span class="summary_text_font_weight_and_size">Done</span>
                                    </div>
                                    
                                </div>

                            </div>

                            <div class="summary_content_left_middle_wrapper">
                                <div class="summary_buttons summary_button_width_560" id="summary-urgent">
                                    <div class="summary_urgent_wrapper">

                                        <div class="summary_urgent_left">
                                            <img src="./assets/svg/summary-urgent-icon.svg" alt="Urgent">

                                            <div class="summary_bottons_amount_and_text_wrapper">
                                                <span class="summary_amount_font_weight_and_size" id="summary-urgent-amount">1</span>
                                                <span class="summary_text_font_weight_and_size">Urgent</span>
                                            </div>                                        
                                        </div>

                                        <div class="summary_urgent_line"></div>

                                        <div class="summary_urgent_text_wrapper">    
                                            <span> October 16, 2022 </span>
                                            <span> Sofia Müller </span>
                                        </div>

                                    </div>                                
                                </div>
                            </div>

                            <div class="summary_content_left_bottom_wrapper">

                                <div class="summary_buttons summary_button_width_168" id="summary-tasks-in-board">
                                    <div class="summary_bottons_amount_and_text_wrapper">
                                        <span class="summary_amount_font_weight_and_size" id="summary-tasks-in-board-amount">5</span>
                                        <span class="summary_text_font_weight_and_size">Tasks in<br>Board</span>
                                    </div>                                
                                </div>

                                <div class="summary_buttons summary_button_width_168" id="summary-tasks-in-progress">
                                    <div class="summary_bottons_amount_and_text_wrapper">
                                        <span class="summary_amount_font_weight_and_size" id="summary-tasks-in-progress-amount">2</span>
                                        <span class="summary_text_font_weight_and_size">Tasks in<br>Progress</span>
                                    </div>                                                                
                                </div>

                                <div class="summary_buttons summary_button_width_168" id="summary-awaiting-feedback">
                                    <div class="summary_bottons_amount_and_text_wrapper">
                                        <span class="summary_amount_font_weight_and_size" id="summary-awaiting-feedback-amount">2</span>
                                        <span class="summary_text_font_weight_and_size">Awaiting<br>Feedback</span>
                                    </div>                                                                                                
                                </div>
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