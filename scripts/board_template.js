function getBoardTemplate() {
  return `
        <div class="main-board">
          <div class="header-board">
            <div class="board-search">
              <div>
                <h1>Board</h1>
              </div>
              <div class="search-addtask">
                <div class="search-wrapper-board">
                  <input type="text" placeholder="Find Task" class="search-board" oninput="handleSearch(this.value)">
                   <div class="separetor-board"></div>
                  <button class="button-search-board">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6.71181 13.2137C4.89463 13.2137 3.35669 12.5843 2.098 11.3256C0.839307 10.0669 0.209961 8.52899 0.209961 6.71181C0.209961 4.89463 0.839307 3.35669 2.098 2.098C3.35669 0.839307 4.89463 0.209961 6.71181 0.209961C8.52899 0.209961 10.0669 0.839307 11.3256 2.098C12.5843 3.35669 13.2137 4.89463 13.2137 6.71181C13.2137 7.44535 13.097 8.13721 12.8636 8.7874C12.6302 9.43758 12.3134 10.0127 11.9133 10.5129L17.5149 16.1145C17.6983 16.2979 17.79 16.5313 17.79 16.8147C17.79 17.0981 17.6983 17.3315 17.5149 17.5149C17.3315 17.6983 17.0981 17.79 16.8147 17.79C16.5313 17.79 16.2979 17.6983 16.1145 17.5149L10.5129 11.9133C10.0127 12.3134 9.43758 12.6302 8.7874 12.8636C8.13721 13.097 7.44535 13.2137 6.71181 13.2137ZM6.71181 11.2131C7.96217 11.2131 9.02497 10.7755 9.90022 9.90022C10.7755 9.02497 11.2131 7.96217 11.2131 6.71181C11.2131 5.46145 10.7755 4.39865 9.90022 3.5234C9.02497 2.64815 7.96217 2.21053 6.71181 2.21053C5.46145 2.21053 4.39865 2.64815 3.5234 3.5234C2.64815 4.39865 2.21053 5.46145 2.21053 6.71181C2.21053 7.96217 2.64815 9.02497 3.5234 9.90022C4.39865 10.7755 5.46145 11.2131 6.71181 11.2131Z" fill="#2A3647"/>
                    </svg>
                  </button>
                </div>
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
          <div id="add_task_board" class="add-task-overlay d-none" onclick="overlayProtection(event)"></div>
        </div>
        <div id="open_task_board" class="open-task-overlay d-none"></div>
        <div id="edit_task_board" class="edit-task-overlay d-none"></div>
        <div class="task-added-board d-none">
          <h3>Task added to board</h3>
          <svg width="30" height="30" viewBox="0 0 30 26" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M22.9544 2.75564L22.9545 23.21C22.9538 23.8125 22.7142 24.3903 22.2881 24.8163C21.862 25.2424 21.2843 25.4821 20.6817 25.4827L16.1363 25.4827C15.5338 25.4821 14.956 25.2424 14.53 24.8163C14.1039 24.3903 13.8642 23.8125 13.8636 23.21L13.8636 2.75564C13.8642 2.15306 14.1039 1.57534 14.53 1.14926C14.956 0.723172 15.5338 0.483533 16.1363 0.48293L20.6817 0.48293C21.2843 0.483533 21.862 0.723172 22.2881 1.14926C22.7142 1.57534 22.9538 2.15306 22.9544 2.75564ZM16.1363 23.21L20.6817 23.21L20.6817 2.75564L16.1363 2.75564L16.1363 23.21ZM16.1363 2.75564L16.1363 23.21C16.1357 23.8125 15.8961 24.3902 15.47 24.8163C15.0439 25.2424 14.4662 25.482 13.8636 25.4826L9.31823 25.4826C8.71566 25.482 8.13794 25.2424 7.71185 24.8163C7.28577 24.3902 7.04613 23.8125 7.04553 23.2099L7.04553 2.75561C7.04613 2.15304 7.28577 1.57532 7.71185 1.14923C8.13793 0.723148 8.71566 0.483513 9.31823 0.48291L13.8636 0.48291C14.4662 0.483512 15.0439 0.723148 15.47 1.14923C15.8961 1.57532 16.1357 2.15306 16.1363 2.75564ZM9.31823 23.2099L13.8636 23.21L13.8636 2.75564L9.31823 2.75561L9.31823 23.2099ZM9.31823 2.75561L9.31823 23.2099C9.31763 23.8125 9.07799 24.3902 8.65191 24.8163C8.22582 25.2424 7.6481 25.482 7.04553 25.4826L2.50012 25.4826C1.89755 25.482 1.31983 25.2424 0.893741 24.8163C0.467657 24.3902 0.228019 23.8125 0.227417 23.2099L0.227416 2.75561C0.228018 2.15304 0.467656 1.57532 0.89374 1.14923C1.31982 0.723148 1.89755 0.483513 2.50012 0.48291L7.04553 0.48291C7.6481 0.483513 8.22582 0.723148 8.6519 1.14923C9.07799 1.57532 9.31763 2.15304 9.31823 2.75561ZM2.50012 23.2099L7.04553 23.2099L7.04553 2.75561L2.50012 2.75561L2.50012 23.2099Z"fill="#CDCDCD" />
            <path
              d="M29.7726 2.75589L29.7726 23.2102C29.772 23.8128 29.5323 24.3905 29.1062 24.8166C28.6802 25.2427 28.1024 25.4823 27.4999 25.4829L22.9545 25.4829C22.3519 25.4823 21.7742 25.2427 21.3481 24.8166C20.922 24.3905 20.6824 23.8125 20.6817 23.21L20.6817 2.75564C20.6823 2.15306 20.922 1.57559 21.3481 1.14951C21.7742 0.723424 22.3519 0.483787 22.9544 0.483184L27.4999 0.483184C28.1024 0.483786 28.6801 0.723424 29.1062 1.14951C29.5323 1.57559 29.772 2.15331 29.7726 2.75589ZM22.9545 23.21L27.4999 23.2102L27.4999 2.75589L22.9544 2.75564L22.9545 23.21Z"fill="#CDCDCD" />
          </svg>
        </div>
    `;
}

function getRenderTask(task,indexTask,background,) {
  return`
    <div class="task-main" draggable="true" ondragstart="startDragging(${indexTask})">
      <button class="d-none move-to-board" onclick="moveToBoard">
      </button>
      <div class="category-board" style="background-color:var(${background})">${task.category}</div>
      <div class="title-description-board">
        <h3 class="title-board">${task.title}</h3>
        <h4 class="description-board">${task.description}</h4>
      </div>
      <div id="progress_subtask_${indexTask}"></div>      
      <div class="initials-priority_board">
        <div class="initials-board" id="initials_${indexTask}"></div>
        <img class="priority-board" src="./assets/svg/prio_${task.priority}.svg" alt="${task.priority}_icon">
      </div>
    </div>
  `;
}

function getRenderInitials(initial) {
  return`
    <div class="initials-single-board"><h3>${initial}</h3></div>
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

function getOpenTaskBoard(){
  return`
  
  `;
}