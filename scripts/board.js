const tasksUrl = "https://join-bc74a-default-rtdb.europe-west1.firebasedatabase.app/tasks.json";


function initBoard() {
  loadBody();
  loadHeader();
  highlightActiveSidebarLink();
  document.getElementById("main").innerHTML = getBoardTemplate();
  renderTasks();
}

async function renderTasks() {
  let taskRefUrl = await fetch(tasksUrl);
  let taskRefUrlToJson = await taskRefUrl.json();
  for (let indexTask = 0; indexTask < taskRefUrlToJson.length; indexTask++) {
    let taskRef = taskRefUrlToJson[indexTask];
    let background = "--technical";
    if (taskRef.category == "User Story") {
      background = "--user";
    }
    let taskContentRef = document.getElementById(`${taskRef.status}`);
    taskContentRef.innerHTML += getRenderTask(taskRef, indexTask, background);
    renderSubtasks(taskRef, indexTask);
    //renderInitials(taskRef,indexTask);
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