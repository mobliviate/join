const tasksUrl = "https://join-bc74a-default-rtdb.europe-west1.firebasedatabase.app/tasks.json";
let currentDraggedElement;
let currentTask;

/**
 * Initializes the board by loading body and header content, 
 * highlighting the active sidebar, injecting the board template,
 * and rendering tasks.
 */
function initBoard() {
  loadBody();
  loadHeader();
  highlightActiveSidebarLink();
  document.getElementById("main").innerHTML = getBoardTemplate();
  renderTasks();
}

/**
 * Fetches all tasks from the backend, clears the columns, and renders them on the board.
 */
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
    renderInitials(taskRef, indexTask);
  }
  findEmptyColumn();
}

/**
 * Clears the content of all task columns on the board.
 */
function clearColumns() {
  let columnConntetRef = document.getElementById("todo");
  columnConntetRef.innerHTML = "";
  columnConntetRef = document.getElementById("progress");
  columnConntetRef.innerHTML = "";
  columnConntetRef = document.getElementById("feedback");
  columnConntetRef.innerHTML = "";
  columnConntetRef = document.getElementById("done");
  columnConntetRef.innerHTML = "";
}

/**
 * Checks for empty columns and renders a placeholder if necessary.
 */
function findEmptyColumn() {
  const columnIds = { todo: "To do", progress: "In Progress", feedback: "Await feedback", done: "Done" };
  Object.keys(columnIds).forEach(id => {
    const column = document.getElementById(id);
    if (column && column.children.length === 0) {
      renderEmptyColumn(id, columnIds[id]);
    }
  });
}

/**
 * Renders an empty column message.
 * @param {string} emptyColumn - The ID of the column to render into.
 * @param {string} text - The text content of the empty placeholder.
 */
function renderEmptyColumn(emptyColumn, text) {
  let emptyConntetRef = document.getElementById(emptyColumn);
  if (emptyConntetRef) {
    emptyConntetRef.innerHTML = "";
    emptyConntetRef.innerHTML = getRenderEmpty(text);
  }
}

/**
 * Renders subtasks progress for a task.
 * @param {Object} taskRef - The task object.
 * @param {number} indexTask - The index of the task.
 */
function renderSubtasks(taskRef, indexTask) {
  if (!taskRef.subtasks) {
    return;
  }
  let subTasks = taskRef.subtasks.length;
  let subtaskDone = taskRef.subtasks.filter(subtask => subtask.status === true).length;
  let widthProgress = (128 / subTasks) * subtaskDone;
  let progressbarContactRef = document.getElementById(`progress_subtask_${indexTask}`);
  progressbarContactRef.innerHTML = getRenderProgressbar(widthProgress, subTasks, subtaskDone);
}

/**
 * Renders up to 5 initials for assigned contacts of a task.
 * If there are more than 5 contacts, the 5th circle shows the number of additional contacts as "+X".
 *
 * @param {Object} taskRef - The task object containing assigned contacts.
 * @param {number} indexTask - The index of the task used to identify the HTML container.
 */
function renderInitials(taskRef, indexTask) {
  if (!taskRef.assignedContacts) return;
  let initialContactRef = document.getElementById(`initials_${indexTask}`);
  let contactRef = taskRef.assignedContacts;
  initialContactRef.innerHTML = "";
  let maxVisible = 5;
  let total = contactRef.length;
  for (let index = 0; index < Math.min(maxVisible, total); index++) {
    let initial = contactRef[index].initials;
    let color = getColorBoard(contactRef[index].name);
    initialContactRef.innerHTML += getRenderInitials(initial, color);
  }
  if (total > maxVisible) {
    let remaining = total - maxVisible;
    initialContactRef.innerHTML += getRenderInitials("+" + remaining, "#5c6f7b");
  }
}

/**
 * Generates a color value based on a string using HSL.
 * @param {string} text - The input string (e.g., contact name).
 * @returns {string} - An HSL color string.
 */
function getColorBoard(text) {
  let hash = 0;
  for (const char of text) hash = (hash * 31 + char.charCodeAt(0)) % 360;
  return `hsl(${hash}, 70%, 50%)`;
}

/**
 * Opens the add task overlay and renders the add task template.
 * @param {string} title - The title for the new task form.
 */
function addTaskBoard(title) {
  let openOverlayBoard = document.getElementById("open_overlay_board");
  openOverlayBoard.classList.remove("d-none");
  showDiv('add_task_board');
  document.getElementById("add_task_board").innerHTML = getAddTaskTemplate(title);
  renderCloseButton();
  const container = document.getElementById("add_task_board");
  container.addEventListener("click", handleGlobalClick, true);
}

/**
 * Renders the close button inside the add task overlay.
 */
function renderCloseButton() {
  document.getElementById("add_task_board").innerHTML += getAddTaskcloseButtonTemplate();
}


/**
 * Prevents an overlay from closing when clicked inside.
 * @param {Event} event - The DOM event.
 */
function overlayProtection(event) {
  event.stopPropagation();
}

/**
 * Closes an overlay by hiding it and removing animation listeners.
 * @param {string} divID - The ID of the div to hide.
 * @param {string} overlay - The overlay element ID.
 */
function closeOverlayBoard(divID, overlay) {
  let closeOverlayBoard = document.getElementById(overlay);
  hideDiv(divID);
  function handleEnd() {
    closeOverlayBoard.classList.add("d-none");
    closeOverlayBoard.removeEventListener("animationend", handleEnd);
  }
  closeOverlayBoard.addEventListener("animationend", handleEnd);
  const container = document.getElementById("add_task_board");
  container.removeEventListener("click", handleGlobalClick, true);
  renderTasks();
}

/**
 * Closes an overlay via close button and rerenders the board.
 * @param {string} divID - The ID of the div to hide.
 * @param {string} overlay - The overlay element ID.
 */
function closeOverlayButtonBoard(divID, overlay) {
  let closeOverlayBoard = document.getElementById(overlay);
  hideDiv(divID);
  function handleEnd() {
    closeOverlayBoard.classList.add("d-none");
    closeOverlayBoard.removeEventListener("animationend", handleEnd);
  }
  closeOverlayBoard.addEventListener("animationend", handleEnd);
  renderTasks();
}

/**
 * Shows a div element with a slide-in animation.
 * @param {string} divID - The ID of the div to show.
 */
function showDiv(divID) {
  const div = document.getElementById(divID);
  div.classList.remove("d-none", "slide-out");
  div.classList.add("slide-in");
}

/**
 * Hides a div element with a slide-out animation.
 * @param {string} divID - The ID of the div to hide.
 */
function hideDiv(divID) {
  const div = document.getElementById(divID);
  div.classList.remove("slide-in");
  div.classList.add("slide-out");
  function handleEnd() {
    div.classList.add("d-none");
    div.removeEventListener("animationend", handleEnd);
  }
  div.addEventListener("animationend", handleEnd);
}

/**
 * Stores the ID of the dragged task.
 * @param {string} id - The ID of the dragged task.
 */
function startDragging(id) {
  currentDraggedElement = id;
}

/**
 * Allows dropping by preventing default behavior.
 * @param {Event} ev - The drag event.
 */
function allowDrop(ev) {
  ev.preventDefault();
}

/**
 * Updates the status of the dragged task and re-renders the board.
 * @param {string} category - The new task status (e.g., "done", "todo").
 */
async function moveTo(category) {
  if (!currentDraggedElement) {
      removeHighlight(category);
    return;
  }
  let taskUrlRef = `https://join-bc74a-default-rtdb.europe-west1.firebasedatabase.app/tasks/${currentDraggedElement}/status.json`;
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
  removeHighlight(`${category}`);
  currentDraggedElement = "";
}

/**
 * Highlights a drop area by adding a CSS class.
 * @param {string} id - The element ID to highlight.
 */
function highlight(id) {
  document.getElementById(id).classList.add('columns-highlight');
}

/**
 * Removes highlight from a drop area.
 * @param {string} id - The element ID to remove highlight from.
 */
function removeHighlight(id) {
  document.getElementById(id).classList.remove('columns-highlight');
}

/**
 * Searches tasks by title or description and renders filtered results.
 * @param {string} searchTerm - The search query.
 */
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
  if (filteredTasks.length === 0) {
    document.getElementById("no_results").classList.remove("d-none");
    document.getElementById("no_results_mobile").classList.remove("d-none");
    findEmptyColumn();
    return;
  } else {
    if (!document.getElementById("no_results").classList.remove("d-none")) {
      document.getElementById("no_results").classList.add("d-none");
      document.getElementById("no_results_mobile").classList.add("d-none");
    }
    filteredTasks.forEach((taskRef, indexTask) => {
      let background = taskRef.category === "User Story" ? "--user" : "--technical";
      let taskContentRef = document.getElementById(`${taskRef.status}`);
      taskContentRef.innerHTML += getRenderTask(taskRef, indexTask, background);
      renderSubtasks(taskRef, indexTask);
    });
  }
  findEmptyColumn();
}