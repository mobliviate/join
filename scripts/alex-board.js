'use strict';

const TASKS_BASE_URL = "https://join-bc74a-default-rtdb.europe-west1.firebasedatabase.app/tasks.json";

function initBoardAlex() {
  loadBody();
  loadHeader();
  highlightActiveSidebarLink();
  document.getElementById("main").innerHTML = getAlexBoardTemplate();
  renderTasks();
}

async function fetchTasks() {
  let tasks = await fetch(TASKS_BASE_URL);
  let tasksJson = await tasks.json();
  console.log(tasksJson);
  return tasksJson;
}

async function renderTasks() {
  let tasks = await fetchTasks();
  // taskCnt.innerHTML = "";

  for (let index = 0; index < tasks.length; index++) {
    let category = tasks[index].category;
    let taskCategory = "technical";
    if (category === "User Story") {
      taskCategory = "user";
    }
    let taskCnt = document.getElementById(`${tasks[index].status}_cnt`);
    taskCnt.innerHTML += getTaskTemplate(tasks[index], taskCategory, index);
    renderSubtasks(tasks[index].subtasks, index);
    renderInitials(tasks[index].assignedContacts, index);
  }
}

function renderSubtasks(subtasks, indexTask) {
  if (!subtasks) {
    return;
  }
  let subtaskDone = subtasks.filter(subtask => subtask.status === true).length;
  let progressWidth = (100 / subtasks.length) * subtaskDone;
  let subtaskCntRef = document.getElementById(`subtask_cnt_${indexTask}`);
  subtaskCntRef.innerHTML = getSubtaskTemplate(progressWidth, subtaskDone, subtasks);
}

function renderInitials(contacts, indexTask) {
  if (!contacts) {
    return;
  }
  let initialsCntRef = document.getElementById(`initials_cnt_${indexTask}`);
  for (let index = 0; index < contacts.length; index++) {
    initialsCntRef.innerHTML += `<div class="initials" style="background-color: ${getColorFromInitialsHSL(contacts[index].initials)}">${contacts[index].initials}</div>`;
  }
}

function getColorFromInitialsHSL(initials) {
  let hash = 0;
  for (let i = 0; i < initials.length; i++) {
    hash = initials.charCodeAt(i) + ((hash << 5) - hash);
  }

  let hue = hash % 360;
  let saturation = 60;
  let lightness = 60;

  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

function getAlexBoardTemplate() {
  return `
    <main class="board-main">
    <header class="board-header">
      <h1 class="board-hdl">Board</h1>
      <div class="right-header-cnt">
        <div class="search-cnt">
          <input type="text" class="search-input" placeholder="Find Task" />
          <div class="search-btn-cnt">
            <div class="separator"></div>
            <button class="search-btn btn-transparent"><img src="./assets/svg/board_search.svg"
                alt="Search Icon"></button>
          </div>
        </div>
        <button class="creat-task-btn btn-standard">Add Task <img src="./assets/svg/board_add_white.svg"
            alt="Create Task Icon"></button>
      </div>
    </header>
    <section class="board-section">
      <section class="section-cnt">
        <div class="section-title-cnt">
          <h2 class="section-title">To do</h2>
          <button class="section-add-btn btn-transparent">
            <img src="./assets/svg/board_add.svg" alt="">
          </button>
        </div>
        <div id="todo_cnt" class="task-cnt">
          
          <p class="no-task d-none">No tasks To do</p>
        </div>
      </section>
      <section class="section-cnt">
        <div class="section-title-cnt">
          <h2 class="section-title">In progress</h2>
          <button class="section-add-btn btn-transparent">
            <img src="./assets/svg/board_add.svg" alt="">
          </button>
        </div>
        <div id="progress_cnt" class="task-cnt">
          
          <p class="no-task d-none">No tasks In progress</p>
        </div>
      </section>
      <section class="section-cnt">
        <div class="section-title-cnt">
          <h2 class="section-title">Await feedback</h2>
          <button class="section-add-btn btn-transparent">
            <img src="./assets/svg/board_add.svg" alt="">
          </button>
        </div>
        <div id="feedback_cnt" class="task-cnt">
          <p class="no-task d-none">No tasks Await feedback</p>
        </div>
      </section>
      <section class="section-cnt">
        <div class="section-title-cnt">
          <h2 class="section-title">Done</h2>
        </div>
        <div id="done_cnt" class="task-cnt">
          <p class="no-task d-none">No tasks Done</p>
        </div>
      </section>
    </section>
  </main>
    `;
}

function getTaskTemplate(task, taskCategory, indexTask) {
  return `
    <div class="task-item">
        <h3 class="task-category ${taskCategory}">${task.category}</h3>
        <h4 class="task-title">${task.title}</h4>
        <p class="task-description">${task.description}</p>
        <div id="subtask_cnt_${indexTask}" class="subtask-cnt">
 
        </div>
        <div class="assigned-users-cnt">
            <div id="initials_cnt_${indexTask}" class="initials-cnt">

            </div>
            <div class="priority-cnt">
                <img src="./assets/svg/prio_${task.priority}.svg" alt="">
            </div>
        </div>
    </div>
    `;
}

function getSubtaskTemplate(progressWidth, subtaskDone, subtasks) {
  return `
        <progress class="subtask-progress" value="${progressWidth}" max="100"></progress>
        <span class="subtask-count">${subtaskDone}/${subtasks.length} Subtasks</span>
    `;
}
