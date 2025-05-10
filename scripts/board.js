const tasksUrl = "https://join-bc74a-default-rtdb.europe-west1.firebasedatabase.app/tasks.json";

let currentDraggedElement;

function initBoard() {
  loadBody();
  loadHeader();
  highlightActiveSidebarLink();
  document.getElementById("main").innerHTML = getBoardTemplate();
  renderTasks();
}

async function renderTasks() {
  clearColumns();
  let taskRefUrl = await fetch(tasksUrl);
  let taskRefUrlToJson = await taskRefUrl.json();
  for (let indexTask = 0; indexTask < taskRefUrlToJson.length; indexTask++) {
    let taskRef = taskRefUrlToJson[indexTask];
    let background = taskRef.category === "User Story" ? "--user" : "--technical";
    let taskContentRef = document.getElementById(`${taskRef.status}`);
    taskContentRef.innerHTML += getRenderTask(taskRef, indexTask, background,);
    renderSubtasks(taskRef, indexTask);
    //renderInitials(taskRef,indexTask);
  }
  findEmptyColumn();
}

function clearColumns() {
  let columnConntetRef = document.getElementById("todo")
  columnConntetRef.innerHTML = ""
  columnConntetRef = document.getElementById("progress")
  columnConntetRef.innerHTML = ""
  columnConntetRef = document.getElementById("feedback")
  columnConntetRef.innerHTML = ""
  columnConntetRef = document.getElementById("done")
  columnConntetRef.innerHTML = ""
}

function findEmptyColumn() {
  const columnIds = {todo: "To do",progress: "In Progress",feedback: "Await feedback",done: "Done"};
  Object.keys(columnIds).forEach(id => {
    const column = document.getElementById(id);
    if (column && column.children.length === 0) {
      renderEmptyColumn(id, columnIds[id] );
    }
  });
}

function renderEmptyColumn(emptyColumn, text) {
  let emptyConntetRef = document.getElementById(emptyColumn)
  if (emptyConntetRef) {
    emptyConntetRef.innerHTML = ""
    emptyConntetRef.innerHTML = getRenderEmpty(text);
  }
}

function renderSubtasks(taskRef, indexTask){
  if (!taskRef.subtasks) {
    return    
  }
  let subTasks = taskRef.subtasks.length;
  let subtaskDone = taskRef.subtasks.filter(subtask => subtask.status === true).length;
  let widthProgress = (128/subTasks)*subtaskDone;
  let progressbarContactRef = document.getElementById(`progress_subtask_${indexTask}`);
  progressbarContactRef.innerHTML = getRenderProgressbar(widthProgress, subTasks, subtaskDone);
}

//renderInitials(taskRef,indexTask){
//
//}

function addTaskBoard(title){
  let openOverlayBoard = document.getElementById("open_overlay_board")
  openOverlayBoard.classList.remove("d-none")
  document.getElementById("add_task_board").innerHTML = getAddTaskTemplate(title);
}

function overlayProtection(event) {
  event.stopPropagation()
}

function closeOverlayBoard() {
  let closeOverlayBoard = document.getElementById("open_overlay_board")
  closeOverlayBoard.classList.add("d-none")
}

function startDragging(id) {
  currentDraggedElement = id;
}

function allowDrop(ev) {
  ev.preventDefault();
}

async function moveTo(category) {
  let taskUrlRef = `https://join-bc74a-default-rtdb.europe-west1.firebasedatabase.app/tasks/${currentDraggedElement}/status.json`
  let updatedTask = await fetch(taskUrlRef, {
    method: "PUT",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify(category),
  });
  if (updatedTask.ok) {
    renderTasks();
  }
  removeHighlight(`${category}`)
}

function highlight(id) {
  document.getElementById(id).classList.add('columns-highlight');
}

function removeHighlight(id) {
  document.getElementById(id).classList.remove('columns-highlight');
}

function clearPlaceholder(input) {
  if (input.value === "Find Task") {
    input.value = "";
    input.classList.add("active");
  }
}

async function handleSearch(searchTerm) {
  searchTerm = searchTerm.trim().toLowerCase();
  clearColumns();
  let response = await fetch(tasksUrl);
  let data = await response.json();
  let taskList = Object.values(data);
  let filteredTasks = taskList.filter(task =>
    task.title?.toLowerCase().includes(searchTerm) ||
    task.description?.toLowerCase().includes(searchTerm)
  );
  filteredTasks.forEach((taskRef, indexTask) => {
    let background = taskRef.category === "User Story" ? "--user" : "--technical";
    let taskContentRef = document.getElementById(`${taskRef.status}`);
    taskContentRef.innerHTML += getRenderTask(taskRef, indexTask, background);
    renderSubtasks(taskRef, indexTask);
  });
  findEmptyColumn();
}