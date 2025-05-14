function getAddTaskTemplate(status) {
return `

<div class="add-task-page">
    <h1 class="page-title">Add Task</h1>
    <div class="form-scroll-container">
        <form id="task-form" class="task-form">
            <div class="form-columns">

                <div class="form-column form-column--left">
                    <div class="form-group">
                        <label for="title">Title<span class="required">*</span></label>
                        <input type="text" id="title" class="input-default" name="title" placeholder="Enter a title"
                            oninput="validateInputTitel(); checkFormValidity()" onblur="validateInputTitel()" />
                        <span id="error-msg-title" class="error-msg d-none">This field is required</span>
                    </div>

                    <div class="form-group">
                        <label for="description">Description</label>
                        <textarea id="description" class="textarea-default" name="description" rows="4"
                            placeholder="Enter a description"></textarea>
                    </div>

                    <div class="form-group">
                        <label for="due-date">Due Date<span class="required">*</span></label>
                        <div class="input-container">
                            <input type="date" id="due-date" class="input-default due-date" name="due-date" required
                                oninput="validateInputDate(); checkFormValidity()" onblur="validateInputDate()" />
                            <span id="error-msg-duedate" class="error-msg d-none">This field is required</span>
                        </div>
                    </div>
                </div>

                <div class="verticalline" id="verticalline"></div>

                <div class="form-column form-column--right">

                    <div class="form-group">
                        <label>Priority</label>
                        <div class="priority-options">
                            <button onclick="selectPriority(this)" type="button" class="prio-btn" data-prio="urgent">
                                Urgent <span class="prio-icon"><img src="./assets/svg/prio_urgent.svg"
                                        alt="Prio High"></span>
                            </button>
                            <button onclick="selectPriority(this)" type="button" class="prio-btn selected"
                                data-prio="medium">
                                Medium <span class="prio-icon"><img src="./assets/svg/prio_medium.svg"
                                        alt="Prio Medium"></span>
                            </button>
                            <button onclick="selectPriority(this)" type="button" class="prio-btn" data-prio="low">
                                Low <span class="prio-icon"><img src="./assets/svg/prio_low.svg" alt="Prio Low"></span>
                            </button>
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="assigned-input">Assigned to</label>
                        <div class="multiselect-container">
                            <div class="multiselect" id="multiselect-assign"
                                onclick="event.stopPropagation(); toggleAssignDropdown()" tabindex="0">
                                <input type="text" placeholder="Select contacts to assign" id="multiselect-input-assign"
                                    class="multiselect-input" oninput="filterContacts()" autocomplete="off" />
                                <img class="multiselect-icon" id="multiselect-icon-assign"
                                    src="./assets/svg/arrow_dropdown_down.svg" alt="Toggle options">
                            </div>
                            <div class="multiselect-options assigned d-none" id="multiselect-assign-options"
                                onclick="event.stopPropagation()">
                                <!-- Javascript insert Contacts from Firebase -->
                            </div>
                            <div class="assigned-contacts" id="assigned-contacts">
                                <!-- Javascript insert from Function -->
                            </div>
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="category-box">Category<span class="required">*</span></label>
                        <div class="multiselect-container">
                            <div class="multiselect" id="multiselect-category"
                                onclick="event.stopPropagation(); toggleCategoryDropdown()"
                                onfocusout="validateCategory()" tabindex="0">
                                <span class="label-text" id="category-selected">Select task category</span>
                                <img class="multiselect-icon" id="multiselect-icon-category"
                                    src="./assets/svg/arrow_dropdown_down.svg" alt="Toggle options">
                            </div>
                            <div class="multiselect-options d-none" id="multiselect-category-options">
                                <div class="multiselect-option"
                                    onclick="event.stopPropagation(); selectCategoryOption('Technical Task')">Technical
                                    Task</div>
                                <div class="multiselect-option"
                                    onclick="event.stopPropagation(); selectCategoryOption('User Story')">User Story
                                </div>
                            </div>
                        </div>
                        <span id="error-msg-category" class="error-msg d-none">This field is required</span>
                    </div>

                    <div class="form-group">
                        <label>Subtasks</label>
                        <div class="input-container">
                            <input id="subtask-input" class="input-custom-subtask" type="text" name="subtasks"
                                placeholder="Add new subtask" oninput="subtaskInput()" onclick="subtaskInput()">
                            <div class="buttons-box">
                                <img id="add-subtask-icon" class="input-default-icon" src="./assets/svg/subtask_add.svg"
                                    alt="Add subtask" onclick="subtaskInputIcon()">
                                <img id="delete-subtask-icon" class="input-default-icon d-none"
                                    src="./assets/svg/subtask_close.svg" alt="Delete subtask" onclick="subtaskDelete()">
                                <div class="verticalline-subtask d-none"></div>
                                <img id="save-subtask-icon" class="input-default-icon d-none"
                                    src="./assets/svg/subtask_check.svg" alt="Save subtask" onclick="subtaskSave()">
                            </div>
                        </div>
                        <div class="subtask-list">
                            <!-- Javascript insert from Function -->
                        </div>
                        <div class="input-container edit">
                            <input id="subtask-edit" class=" subtask-edit d-none" type="text" name="subtask-edit"
                                placeholder="Edit subtask">
                            <div class=" buttons-box">
                                <img id="edit-delete-icon" class="input-default-icon d-none"
                                    src="assets/svg/subtask_delete.svg" alt="Delete" onclick="cancelEditSubtask()">
                                <div class="verticalline-subtask"></div>
                                <img id="edit-save-icon" class="input-default-icon d-none"
                                    src="assets/svg/subtask_check.svg" alt="Save" onclick="saveEditedSubtask()">
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </form>
        <div class="required-text">
            <span class="required">*</span>
            <span class="text">This field is required</span>
        </div>
    </div>
    <div id="form-actions-add-task" class="form-actions-add-task">

        <div class="form-action-buttons">
            <button type="button" class="button-clear" onclick="clearForm()"> Clear
                <div class="button-clear-img">
                    <img class="button-clear-standard-img" src="assets/svg/add_task_cancel.svg" alt="Clear">
                    <img class="button-clear-hover-img" src="assets/svg/add_task_cancel_blue.svg" alt="Clear">
                </div>
            </button>
            <button type="button" class="button-create-task" id="create-task-button" onclick="createTask('${status}')"
                disabled> Create Task
                <img src="assets/svg/add_task_check_white.svg" alt="Check">
            </button>
        </div>
    </div>
</div>

<div id="task-overlay" class="task-overlay">
    <span class="task-overlay-text">Task added to board</span>
    <img src="./assets/svg/board-icon.svg" alt="Board Icon" class="task-overlay-icon" />
</div>
`;
}