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
            <div id="0" class="columns"></div>
            <div id="1" class="columns"></div>
            <div id="2" class="columns"></div>
            <div id="3" class="columns"></div>
          </div>
        </div>
    `;
}