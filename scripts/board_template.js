function getBoardTemplate() {
  return `
        <div class="main-board">
          <div class="header-board">
            <div class="board-search">
              <div>
                <h1>Board</h1>
              </div>
              <div class="search-addtask">
                <input type="text" value="Find Task" class="search-board">
                <button class="add-task-board" onclick="addTaskBoard('todo')">
                  <h2>Add task</h2>
                  <svg width="21" height="21" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.66602 11.3327H0.666016V8.66602H8.66602V0.666016H11.3327V8.66602H19.3327V11.3327H11.3327V19.3327H8.66602V11.3327Z" fill="white"/>
                  </svg>
                </button>
              </div>
            </div>
            <div class="tasks-board">
              <div class="task-board">
                <h3>To do</h3>
                <button class="button-board" onclick="addTaskBoard('todo')">
                  <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="1.6665" y="1.5" width="22" height="22" rx="7" stroke="currentColor" stroke-width="2" />
                  <path d="M12.6665 8.5V16.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                  <path d="M16.6665 12.5754L8.6665 12.5754" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                  </svg>
                </button>
              </div>
              <div class="task-board">
                <h3>In Progress</h3>
                <button class="button-board" onclick="addTaskBoard('progress')">
                  <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="1.6665" y="1.5" width="22" height="22" rx="7" stroke="currentColor" stroke-width="2" />
                  <path d="M12.6665 8.5V16.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                  <path d="M16.6665 12.5754L8.6665 12.5754" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                  </svg>
                </button>
              </div>
              <div class="task-board">
                <h3>Await feedback</h3>
                <button class="button-board" onclick="addTaskBoard('feedback')">
                  <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="1.6665" y="1.5" width="22" height="22" rx="7" stroke="currentColor" stroke-width="2" />
                  <path d="M12.6665 8.5V16.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                  <path d="M16.6665 12.5754L8.6665 12.5754" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                  </svg>
                </button>
              </div>
              <div class="task-board">
                <h3>Done</h3>
              </div>
            </div>
          </div>
          <div class="column-divs">
            <div id="todo" class="columns" ondrop="moveTo('todo')" ondragleave="removeHighlight('todo')" ondragover="allowDrop(event); highlight('todo')"></div>
            <div id="progress" class="columns" ondrop="moveTo('progress')" ondragleave="removeHighlight('progress')" ondragover="allowDrop(event); highlight('progress')"></div>
            <div id="feedback" class="columns" ondrop="moveTo('feedback')" ondragleave="removeHighlight('feedback')" ondragover="allowDrop(event); highlight('feedback')"></div>
            <div id="done" class="columns" ondrop="moveTo('done')" ondragleave="removeHighlight('done')" ondragover="allowDrop(event); highlight('done')"></div>
          </div>
        </div>
        <div id="open_overlay_board" class="open-overlay-board d-none" onclick="closeOverlayBoard()">
          <div id="add_task_board" class="add-task-overlay" onclick="overlayProtection(event)"></div>
        </div>
        <div id="open_task_board" class="open-task-overlay"></div>
    `;
}

function getRenderTask(task,indexTask,background,) {
  return`
    <div class="task-main" draggable="true" ondragstart="startDragging(${indexTask})">
      <div class="category-board" style="background-color:var(${background})">${task.category}</div>
      <div class="title-description-board">
        <h3 class="title-board">${task.title}</h3>
        <h4 class="description-board">${task.description}</h4>
      </div>
      <div id="progress_subtask_${indexTask}"></div>      
      <div class="initials-priority_board">
        <div class="initials-board" id="initials${indexTask}"></div>
        <img class="priority-board" src="./assets/svg/prio_${task.priority}.svg" alt="${task.priority}_icon">
      </div>
    </div>
  `;
}

function getRenderProgressbar(widthProgress, subTasks, subtaskDone){
  return`
    <div class="subtasks-board">
      <svg width="128" height="8" viewBox="0 0 128 8" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="128" height="8" rx="4" fill="#F4F4F4"/>
        <rect width="${widthProgress}" height="8" rx="4" fill="#4589FF"/>
      </svg>
      <h4>${subtaskDone}/${subTasks} Subtasks</h4>
    </div>
  `;
}

function getRenderEmpty(emptyColumn) {
  return`
    <div class="empty-task"><h3>No tasks ${emptyColumn}</h3></div>
  `;
}