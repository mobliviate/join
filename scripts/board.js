const tasksUrl = "https://join-bc74a-default-rtdb.europe-west1.firebasedatabase.app/tasks.json";

let currentDraggedElement;

let currentTask;

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
    renderInitials(taskRef, indexTask);
  }
  findEmptyColumn();
}

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

function findEmptyColumn() {
  const columnIds = { todo: "To do", progress: "In Progress", feedback: "Await feedback", done: "Done" };
  Object.keys(columnIds).forEach(id => {
    const column = document.getElementById(id);
    if (column && column.children.length === 0) {
      renderEmptyColumn(id, columnIds[id]);
    }
  });
}

function renderEmptyColumn(emptyColumn, text) {
  let emptyConntetRef = document.getElementById(emptyColumn);
  if (emptyConntetRef) {
    emptyConntetRef.innerHTML = "";
    emptyConntetRef.innerHTML = getRenderEmpty(text);
  }
}

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

function renderInitials(taskRef, indexTask) {
  if (!taskRef.assignedContacts) {
    return;
  }
  let initialContactRef = document.getElementById(`initials_${indexTask}`);
  let contactRef = taskRef.assignedContacts;
  for (let index = 0; index < contactRef.length; index++) {
    let initial = contactRef[index].initials;
    let color = getColorBoard(contactRef[index].name);
    initialContactRef.innerHTML += getRenderInitials(initial, color);
  }
}

function getColorBoard(text) {
  let hash = 0;
  for (const char of text) hash = (hash * 31 + char.charCodeAt(0)) % 360;
  return `hsl(${hash}, 70%, 50%)`;
}

function addTaskBoard(title) {
  let openOverlayBoard = document.getElementById("open_overlay_board");
  openOverlayBoard.classList.remove("d-none");
  showDiv('add_task_board');
  document.getElementById("add_task_board").innerHTML = getAddTaskTemplate(title);
  renderTasks()
}

function overlayProtection(event) {
  event.stopPropagation();
}

function closeOverlayBoard(divID,overlay) {
  let closeOverlayBoard = document.getElementById(overlay);
  hideDiv(divID)
  function handleEnd() {
  closeOverlayBoard.classList.add("d-none");
  closeOverlayBoard.removeEventListener("animationend", handleEnd);
  }
  closeOverlayBoard.addEventListener("animationend", handleEnd);
  renderTasks()
}

function closeOverlayButtonBoard(divID,overlay) {
  let closeOverlayBoard = document.getElementById(overlay);
  hideDiv(divID)
  function handleEnd() {
    closeOverlayBoard.classList.add("d-none");
    closeOverlayBoard.removeEventListener("animationend", handleEnd);
  }
  closeOverlayBoard.addEventListener("animationend", handleEnd);
  renderTasks()
}

function showDiv(divID) {
  const div = document.getElementById(divID);
  div.classList.remove("d-none", "slide-out");
  div.classList.add("slide-in");
}

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

function startDragging(id) {
  currentDraggedElement = id;
}

function allowDrop(ev) {
  ev.preventDefault();
}

async function moveTo(category) {
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
}

function highlight(id) {
  document.getElementById(id).classList.add('columns-highlight');
}

function removeHighlight(id) {
  document.getElementById(id).classList.remove('columns-highlight');
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

async function openTaskBoard(indexTask, color) {
  let openTaskRef = await fetch(`https://join-bc74a-default-rtdb.europe-west1.firebasedatabase.app/tasks/${indexTask}.json`)
  let openTaskRefToJson = await openTaskRef.json();
  let openOverlayBoard = document.getElementById("open_overlay_task_board")
  let openOverlayTaskBoard = document.getElementById("open_task_board")
  openOverlayTaskBoard.innerHTML = ""
  openOverlayBoard.classList.remove("d-none");
  showDiv('open_task_board');
  document.getElementById("open_task_board").innerHTML = getOpenTaskBoard(openTaskRefToJson, color, indexTask);
  if (openTaskRefToJson.assignedContacts?.length > 0) {
    renderOpenAssignedContacts(indexTask)
  } if (openTaskRefToJson.subtasks?.length > 0) {
    renderOpenSubtasks(indexTask)
  }
}

async function renderOpenAssignedContacts(indexTask){
  let openAssignedContactsRef = await fetch(`https://join-bc74a-default-rtdb.europe-west1.firebasedatabase.app/tasks/${indexTask}.json`)
  let openAssignedContactsRefToJson = await openAssignedContactsRef.json();
  let allAssignedContacts = openAssignedContactsRefToJson.assignedContacts;
  let assignedContactsContentRef = document.getElementById("open-task-assigned")
  for (let assignedContactsIndex = 0; assignedContactsIndex < allAssignedContacts.length; assignedContactsIndex++) {
    let contact = allAssignedContacts[assignedContactsIndex]
    let color = getColorBoard(contact.name);
   assignedContactsContentRef.innerHTML += getRenderAssignedContacts(contact.initials, contact.name, color);
  }
}

async function renderOpenSubtasks(indexTask){
  let openTaskRef = await fetch(`https://join-bc74a-default-rtdb.europe-west1.firebasedatabase.app/tasks/${indexTask}.json`)
  let openTaskRefToJson = await openTaskRef.json();
  let allSubtasks = openTaskRefToJson.subtasks
  let subtaskContentRef = document.getElementById("open_task_subtasks")
  subtaskContentRef.innerHTML = ""
  for (let subtaskIndex = 0; subtaskIndex < allSubtasks.length; subtaskIndex++) {
    if (allSubtasks[subtaskIndex].status === true) {
      subtaskContentRef.innerHTML += getrenderSubtasksTrueBoard(allSubtasks[subtaskIndex],indexTask,subtaskIndex)
    } else {
      subtaskContentRef.innerHTML += getrenderSubtasksFalseBoard(allSubtasks[subtaskIndex],indexTask,subtaskIndex)
    }    
  }
}

async function setSubtaskTrue(openedTask,subtaskIndex){
  let taskUrlRef = `https://join-bc74a-default-rtdb.europe-west1.firebasedatabase.app/tasks/${openedTask}/subtasks/${subtaskIndex}/status.json`;
  let updatedSubtask = await fetch(taskUrlRef, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(true),
  });
  if (updatedSubtask.ok) {
    renderOpenSubtasks(openedTask);
  }
}

async function setSubtaskFalse(openedTask,subtaskIndex){
  let taskUrlRef = `https://join-bc74a-default-rtdb.europe-west1.firebasedatabase.app/tasks/${openedTask}/subtasks/${subtaskIndex}/status.json`;
  let updatedSubtask = await fetch(taskUrlRef, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(false),
  });
  if (updatedSubtask.ok) {
    renderOpenSubtasks(openedTask);
  }
}

async function deleteTask(openedTask) {
  const url = 'https://join-bc74a-default-rtdb.europe-west1.firebasedatabase.app/tasks.json';
  const res = await fetch(url);
  const tasks = await res.json();
  if (!Array.isArray(tasks)) return;
    tasks.splice(openedTask, 1);
    let deleteCompleted = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(tasks)
  });
  if (deleteCompleted.ok) {
    closeOverlayButtonBoard('open_task_board', 'open_overlay_task_board');
  }
}

async function editTasskBoard(indexTask, color){
  let editTaskRef = await fetch(`https://join-bc74a-default-rtdb.europe-west1.firebasedatabase.app/tasks/${indexTask}.json`)
  let editTaskRefToJson = await editTaskRef.json();
  let openOverlayEditBoard = document.getElementById("open_task_board")
  openOverlayEditBoard.innerHTML = ""
  openOverlayEditBoard.innerHTML = getRenderEditBoard(editTaskRefToJson, indexTask, color)
  setPriority(indexTask)
  if (editTaskRefToJson.assignedContacts?.length > 0) {
    setAssignedContacts(indexTask);
  } if (editTaskRefToJson.subtasks?.length > 0) {
    setSubtasks(indexTask)
  }
}

async function setPriority(indexTask) {
  let priorityRef = await fetch(`https://join-bc74a-default-rtdb.europe-west1.firebasedatabase.app/tasks/${indexTask}/priority.json`)
  let priorityRefToJson = await priorityRef.json();
  let setButtons = document.querySelectorAll('[data-prio]');
  setButtons.forEach(btn => {
    if (btn.dataset.prio === priorityRefToJson) {
      btn.classList.add('selected');
    }
  });
}

async function setAssignedContacts(indexTask){
  await clearAssignedContacts();
  await loadContacts();
  let setAssignedContactsRef = await fetch(`https://join-bc74a-default-rtdb.europe-west1.firebasedatabase.app/tasks/${indexTask}/assignedContacts.json`)
  let setAssignedContactsRefToJson = await setAssignedContactsRef.json();
  let setAssignedContacts = document.querySelectorAll('[data-id]');
  let assignedIds = new Set(setAssignedContactsRefToJson.map(contact => contact.id));
  setAssignedContacts.forEach(el => {
    if (assignedIds.has(el.dataset.id)) {
      toggleSelectedContact(el);
    }
  });
}

async function setSubtasks(indexTask){
  let setSubtasksRef = await fetch(`https://join-bc74a-default-rtdb.europe-west1.firebasedatabase.app/tasks/${indexTask}/subtasks.json`)
  let setSubtasksRefToJson = await setSubtasksRef.json();
  for (let indexSetSubtasks = 0; indexSetSubtasks < setSubtasksRefToJson.length; indexSetSubtasks++) {
    const item = document.createElement('div');
    item.className = 'subtask-item';
    item.onmouseenter = () => item.querySelector('.subtask-actions').classList.remove('d-none');
    item.onmouseleave = () => item.querySelector('.subtask-actions').classList.add('d-none');
    item.ondblclick = () => editSubtask(item.querySelector('[alt="Edit"]'));
    item.innerHTML = `
      <span class="subtask-text">• ${setSubtasksRefToJson[indexSetSubtasks].text}</span>
      <div class="subtask-actions d-none">
        <img src="./assets/svg/subtask_edit.svg" alt="Edit" class="subtask-action-icon" onclick="editSubtask(this)">
        <img src="./assets/svg/subtask_delete.svg" alt="Delete" class="subtask-action-icon" onclick="deleteSubtask(this)">
      </div>`;
    document.querySelector('.subtask-list').appendChild(item);
  }
}

async function loadTask(indexTask) {
  let currentTaskRef = await fetch(`https://join-bc74a-default-rtdb.europe-west1.firebasedatabase.app/tasks/${indexTask}.json`)
  currentTask = await currentTaskRef.json();
}

async function updateCurrentTask(indexTask, color){
  currentTask.title = document.getElementById("title").value;
  currentTask.description = document.getElementById("description").value;
  currentTask.dueDate = document.getElementById("due-date").value;
  currentTask.priority = document.querySelector('.prio-btn.selected').dataset.prio;
  await assignedValue();
  currentTask.category = document.getElementById("category-selected").textContent;
  subtasksValue()
  await saveTaskToDataBase(indexTask, color)
}

async function assignedValue(){
  currentTask.assignedContacts = [];
  let selectedElements = document.querySelectorAll('.selected[data-id]');
  let contactsRef = await fetch(`https://join-bc74a-default-rtdb.europe-west1.firebasedatabase.app/contacts.json`)
  let contactsRefToJson = await contactsRef.json();
  for (let i = 0; i < selectedElements.length; i++) {
    let id = selectedElements[i].dataset.id;
    let contact = contactsRefToJson[id];
    if (contact) {
      let name = contact.name;
      let initials = getInitials(name);
      currentTask.assignedContacts.push({
        id: id,
        initials: initials,
        name: name
      });
    }
  }
}

function subtasksValue() {
  let subtaskElements = document.querySelectorAll('#subtask_edit_board .subtask-item .subtask-text');
  let newSubtasks = [];
  for (let el of subtaskElements) {
    let rawText = el.innerText.trim();
    let cleanText = rawText.replace(/^•\s*/, '');
    let existing = currentTask.subtasks?.find(st => st.text === cleanText);
    newSubtasks.push({
      text: cleanText,
      status: existing ? existing.status : false
    });
  }
  currentTask.subtasks = newSubtasks;
}

function getInitials(name) {
  return name
    .split(' ')
    .map(word => word[0].toUpperCase())
    .join('');
}

async function saveTaskToDataBase(openedTask, color){
  let taskUrlRef = `https://join-bc74a-default-rtdb.europe-west1.firebasedatabase.app/tasks/${openedTask}.json`;
  let updatedTask = await fetch(taskUrlRef, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(currentTask),
  });
  if (updatedTask.ok) {
    openTaskBoard(openedTask, color)
  }
}


// added from Alex
function openMoveToOverlay(indexTask, status) {
  let moveToBtnRef = document.getElementById(`move_to_btn_${indexTask}`);

  let existingOverlay = document.querySelector('.move-task-cnt');
  if (existingOverlay) {
    existingOverlay.remove();
  }
  const overlay = document.createElement('div');
  overlay.classList.add('move-task-cnt');
  overlay.innerHTML = getMoveTaskOverlayTemplate();
  const rect = moveToBtnRef.getBoundingClientRect();
  overlay.style.top = `${rect.bottom + window.scrollY}px`;
  overlay.style.left = `${rect.left + window.scrollX}px`;

  document.body.appendChild(overlay);
  hideMoveToOverlayElements(status);
  enableOverlayCloseOnOutsideClickAndScroll();
}

function hideMoveToOverlayElements(status) {
  const hideMap = {
    todo: ["move_to_to_do", "move_to_feedback", "move_to_done"],
    progress: ["move_to_progress", "move_to_done"],
    feedback: ["move_to_to_do", "move_to_feedback"],
    done: ["move_to_to_do", "move_to_progress", "move_to_done"],
  };

  (hideMap[status] || []).forEach(id =>
    document.getElementById(id)?.classList.add("d-none")
  );

  const imgSelector = { todo: "#move_to_progress img", progress: "#move_to_feedback img" }[status];
  if (imgSelector) {
    const img = document.querySelector(imgSelector);
    if (img) img.src = "../assets/svg/move_to_arrow_downward.svg";
  }
}

function enableOverlayCloseOnOutsideClickAndScroll() {
  const overlay = document.querySelector('.move-task-cnt');
  const scrollContainer = document.getElementById('main');
  function closeMoveToOverlay() {
    if (overlay) {
      overlay.remove();
      document.removeEventListener('click', outsideClickListener);
      scrollContainer.removeEventListener('scroll', scrollListener);
    }
  }
  function outsideClickListener(event) {
    if (overlay && !overlay.contains(event.target)) {
      closeMoveToOverlay();
    }
  }
  function scrollListener() {
    closeMoveToOverlay();
  }
  document.addEventListener('click', outsideClickListener);
  scrollContainer.addEventListener('scroll', scrollListener);
}