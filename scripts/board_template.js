function getBoardTemplate() {
  return `
        <div class="main-board">
          <div class="header-board">
            <div class="board-search">
              <div>
                <h1>Board</h1>
              </div>
              <div>
                <input type="text" value="Find Task">
                <button>Add task +</button>
              </div>
            </div>
            <div class="tasks-board">
              <div class="task-board">
                <h3>To do</h3>
                <button></button>
              </div>
              <div class="task-board">
                <h3>In Progress</h3>
                <button></button>
              </div>
              <div class="task-board">
                <h3>Await feedback</h3>
                <button></button>
              </div>
              <div class="task-board">
                <h3>Done</h3>
              </div>
            </div>
          </div>
          <div class="column-divs">
            <div id="todo" class="columns"></div>
            <div id="progress" class="columns"></div>
            <div id="feedback" class="columns"></div>
            <div id="done" class="columns"></div>
          </div>
        </div>
    `;
}

function getRenderTask(task,indexTask) {
  return`
    <div>
      <div class="category_board">${task.category}</div>
      <div class="title_board">${task.title}</div>
      <div class="description_board">${task.description}</div>
      <div class="subtasks_board">
        <div id="progresbar${indexTask}"></div>
        <p id="subtask${indexTask}"></p>
      </div>
      <div class="initials_priority_board">
        <div class="initials_board" id="initials${indexTask}"></div>
        <img class="priority_board" src="./assets/svg/prio_${task.priority}.svg" alt="${task.priority}_icon">
      </div>
    </div>
  `;
}