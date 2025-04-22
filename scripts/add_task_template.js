function getAddTaskTemplate() {
    return `
<div class="add-task-page">
  <h1 class="page-title">Add Task</h1>
  <form id="task-form" class="task-form">
    <div class="form-columns">
      <div class="form-column form-column--left">
        <div class="form-group">
          <label for="title">Title<span class="required">*</span></label>
          <input type="text" id="title" name="title" placeholder="Enter a title" required />
        </div>
        <div class="form-group">
          <label for="description">Description</label>
          <textarea id="description" name="description" rows="4" placeholder="Enter a description"></textarea>
        </div>
        <div class="form-group">
          <label for="due-date">Due Date<span class="required">*</span></label>
          <input type="date" id="due-date" name="due-date" required />
        </div>
      </div>
      <div class="form-column form-column--right">
        <div class="form-group">
          <label>Priority</label>
          <div class="priority-options">
            <button type="button" class="prio-btn urgent" data-prio="urgent">
              Urgent <span class="prio-icon"><img src="./assets/svg/prio_high.svg" alt="Prio High"></span>
            </button>
            <button type="button" class="prio-btn medium" data-prio="medium">
              Medium <span class="prio-icon"><img src="./assets/svg/prio_medium.svg" alt="Prio Medium"></span>
            </button>
            <button type="button" class="prio-btn low" data-prio="low">
              Low <span class="prio-icon"><img src="./assets/svg/prio_low.svg" alt="Prio Low"></span>
            </button>
          </div>
        </div>
        

        <div class="form-group">
        <label for="assigned-input">Assigned to</label>
            <div class="multiselect" id="assigned-box">
                <div class="select-box">
                <input type="text" placeholder="Select contacts to assign" id="assigned-input" />
                <span class="arrow">&#9662;</span>
                </div>
                <div class="selected-chips" id="assigned-chips"></div>
                <div class="checkboxes" id="assigned-options">
                <div class="options-list" id="assigned-options-list"></div>
                </div>
            </div>
        </div>

        <div class="form-group">
          <label for="category">Category<span class="required">*</span></label>
          <select id="category" name="category" required>
            <option value="">Select task category</option>
            <!-- Optionen werden via JS eingefügt -->
          </select>
        </div>
        
        <div class="form-group">
          <label>Subtasks</label>

          <ul id="subtasks-list" class="subtasks-list"></ul>

          <div class="select-box">
            <input type="text" id="subtask-input" placeholder="Add new subtask" />
            <span class="plus">+</span>
          </div>
        </div>

      </div>
    </div>
    <div class="form-actions">
      <button type="reset" class="btn btn-clear">Clear</button>
      <button type="submit" class="btn btn-primary">Create Task</button>
    </div>
  </form>
</div>
`;
}