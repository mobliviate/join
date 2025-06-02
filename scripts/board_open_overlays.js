let closeMoveToOverlay;

/**
 * Opens a task overlay with detailed task information.
 * @param {number} indexTask - Index of the task.
 * @param {string} color - The color to apply (e.g., from getColorBoard).
 */
async function openTaskBoard(indexTask, color) {
  let openTaskRef = await fetch(`https://join-bc74a-default-rtdb.europe-west1.firebasedatabase.app/tasks/${indexTask}.json`);
  let openTaskRefToJson = await openTaskRef.json();
  let openOverlayBoard = document.getElementById("open_overlay_task_board");
  let openOverlayTaskBoard = document.getElementById("open_task_board");
  openOverlayTaskBoard.innerHTML = "";
  openOverlayBoard.classList.remove("d-none");
  showDiv('open_task_board');
  document.getElementById("open_task_board").innerHTML = getOpenTaskBoard(openTaskRefToJson, color, indexTask);
  if (openTaskRefToJson.assignedContacts?.length > 0) {
    renderOpenAssignedContacts(indexTask);
  } if (openTaskRefToJson.subtasks?.length > 0) {
    renderOpenSubtasks(indexTask);
  }
  const container = document.getElementById("open_task_board");
  container.addEventListener("click", handleGlobalClick, true);
}

/**
 * Renders assigned contacts in the open task view.
 * @param {number} indexTask - Index of the task.
 */
async function renderOpenAssignedContacts(indexTask) {
  let openAssignedContactsRef = await fetch(`https://join-bc74a-default-rtdb.europe-west1.firebasedatabase.app/tasks/${indexTask}.json`);
  let openAssignedContactsRefToJson = await openAssignedContactsRef.json();
  let allAssignedContacts = openAssignedContactsRefToJson.assignedContacts;
  let assignedContactsContentRef = document.getElementById("open-task-assigned");
  for (let assignedContactsIndex = 0; assignedContactsIndex < allAssignedContacts.length; assignedContactsIndex++) {
    let contact = allAssignedContacts[assignedContactsIndex];
    let color = getColorBoard(contact.name);
    assignedContactsContentRef.innerHTML += getRenderAssignedContacts(contact.initials, contact.name, color);
  }
}

/**
 * Renders subtasks in the open task view.
 * @param {number} indexTask - Index of the task.
 */
async function renderOpenSubtasks(indexTask) {
  let openTaskRef = await fetch(`https://join-bc74a-default-rtdb.europe-west1.firebasedatabase.app/tasks/${indexTask}.json`);
  let openTaskRefToJson = await openTaskRef.json();
  let allSubtasks = openTaskRefToJson.subtasks;
  let subtaskContentRef = document.getElementById("open_task_subtasks");
  subtaskContentRef.innerHTML = "";
  for (let subtaskIndex = 0; subtaskIndex < allSubtasks.length; subtaskIndex++) {
    if (allSubtasks[subtaskIndex].status === true) {
      subtaskContentRef.innerHTML += getrenderSubtasksTrueBoard(allSubtasks[subtaskIndex], indexTask, subtaskIndex);
    } else {
      subtaskContentRef.innerHTML += getrenderSubtasksFalseBoard(allSubtasks[subtaskIndex], indexTask, subtaskIndex);
    }
  }
}

/**
 * Sets a subtask's status to true (completed).
 * @param {number} openedTask - Index of the task.
 * @param {number} subtaskIndex - Index of the subtask.
 */
async function setSubtaskTrue(openedTask, subtaskIndex) {
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

/**
 * Sets a subtask's status to false (incomplete).
 * @param {number} openedTask - Index of the task.
 * @param {number} subtaskIndex - Index of the subtask.
 */
async function setSubtaskFalse(openedTask, subtaskIndex) {
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

/**
 * Deletes a task by index from the database.
 * @param {number} openedTask - Index of the task to delete.
 */
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

/**
 * Opens the edit overlay with the task data pre-filled.
 * @param {number} indexTask - Index of the task.
 * @param {string} color - The task's color.
 */
async function editTasskBoard(indexTask, color) {
  let editTaskRef = await fetch(`https://join-bc74a-default-rtdb.europe-west1.firebasedatabase.app/tasks/${indexTask}.json`);
  let editTaskRefToJson = await editTaskRef.json();
  let openOverlayEditBoard = document.getElementById("open_task_board");
  openOverlayEditBoard.innerHTML = "";
  openOverlayEditBoard.innerHTML = getRenderEditBoard(editTaskRefToJson, indexTask, color);
  setPriority(indexTask);
  if (editTaskRefToJson.assignedContacts?.length > 0) {
    setAssignedContacts(indexTask);
  } if (editTaskRefToJson.subtasks?.length > 0) {
    setSubtasks(indexTask);
  }
}

/**
 * Highlights the selected priority in the edit view.
 * @param {number} indexTask - Task index to fetch priority for.
 */
async function setPriority(indexTask) {
  let priorityRef = await fetch(`https://join-bc74a-default-rtdb.europe-west1.firebasedatabase.app/tasks/${indexTask}/priority.json`);
  let priorityRefToJson = await priorityRef.json();
  let setButtons = document.querySelectorAll('[data-prio]');
  setButtons.forEach(btn => {
    if (btn.dataset.prio === priorityRefToJson) {
      btn.classList.add('selected');
    }
  });
}

/**
 * Matches assigned contacts in edit view with those stored in the task.
 * @param {number} indexTask - Index of the task.
 */
async function setAssignedContacts(indexTask) {
  await clearAssignedContacts();
  await loadContacts();
  let setAssignedContactsRef = await fetch(`https://join-bc74a-default-rtdb.europe-west1.firebasedatabase.app/tasks/${indexTask}/assignedContacts.json`);
  let setAssignedContactsRefToJson = await setAssignedContactsRef.json();
  let setAssignedContacts = document.querySelectorAll('[data-id]');
  let assignedIds = new Set(setAssignedContactsRefToJson.map(contact => contact.id));
  setAssignedContacts.forEach(el => {
    if (assignedIds.has(el.dataset.id)) {
      toggleSelectedContact(el);
    }
  });
}

/**
 * Renders existing subtasks in the edit view.
 * @param {number} indexTask - Index of the task.
 */
async function setSubtasks(indexTask) {
  let setSubtasksRef = await fetch(`https://join-bc74a-default-rtdb.europe-west1.firebasedatabase.app/tasks/${indexTask}/subtasks.json`);
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

/**
 * Loads a single task and stores it in `currentTask`.
 * @param {number} indexTask - Index of the task to load.
 */
async function loadTask(indexTask) {
  let currentTaskRef = await fetch(`https://join-bc74a-default-rtdb.europe-west1.firebasedatabase.app/tasks/${indexTask}.json`);
  currentTask = await currentTaskRef.json();
}

/**
 * Updates the `currentTask` object with values from the edit form and saves it.
 * @param {number} indexTask - Index of the task.
 * @param {string} color - The task's color.
 */
async function updateCurrentTask(indexTask, color) {
  currentTask.title = document.getElementById("title").value;
  currentTask.description = document.getElementById("description").value;
  currentTask.dueDate = document.getElementById("due-date").value;
  currentTask.priority = document.querySelector('.prio-btn.selected').dataset.prio;
  await assignedValue();
  currentTask.category = document.getElementById("category-selected").textContent;
  subtasksValue();
  await saveTaskToDataBase(indexTask, color);
}

/**
 * Collects assigned contacts from the edit view and updates `currentTask`.
 */
async function assignedValue() {
  currentTask.assignedContacts = [];
  let selectedElements = document.querySelectorAll('.selected[data-id]');
  let contactsRef = await fetch(`https://join-bc74a-default-rtdb.europe-west1.firebasedatabase.app/contacts.json`);
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

/**
 * Collects subtasks from the DOM and updates `currentTask.subtasks`.
 */
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

/**
 * Generates initials from a full name.
 * @param {string} name - The full name of a contact.
 * @returns {string} - Initials (e.g., "AB").
 */
function getInitials(name) {
  return name
    .split(' ')
    .map(word => word[0].toUpperCase())
    .join('');
}

/**
 * Saves the current task to the database and refreshes the view.
 * @param {number} openedTask - Index of the task.
 * @param {string} color - The task's color.
 */
async function saveTaskToDataBase(openedTask, color) {
  let taskUrlRef = `https://join-bc74a-default-rtdb.europe-west1.firebasedatabase.app/tasks/${openedTask}.json`;
  let updatedTask = await fetch(taskUrlRef, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(currentTask),
  });
  if (updatedTask.ok) {
    openTaskBoard(openedTask, color);
  }
}

/**
 * Opens the "Move To" overlay for task relocation.
 * @param {number} indexTask - Task index.
 * @param {string} status - Current status of the task.
 */
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

/**
 * Hides irrelevant "Move To" options based on current status.
 * @param {string} status - The current task status.
 */
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
    if (img) img.src = "./assets/svg/move_to_arrow_downward.svg";
  }
}

/**
 * Enables closing the "Move To" overlay when clicking outside or scrolling.
 */
function enableOverlayCloseOnOutsideClickAndScroll() {
  const overlay = document.querySelector('.move-task-cnt');
  const scrollContainer = document.getElementById('main');

  closeMoveToOverlay = () => {
    overlay?.remove();
    document.removeEventListener('click', outsideClickHandler);
    scrollContainer.removeEventListener('scroll', closeMoveToOverlay);
  };

  const outsideClickHandler = e => !overlay.contains(e.target) && closeMoveToOverlay();

  document.addEventListener('click', outsideClickHandler);
  scrollContainer.addEventListener('scroll', closeMoveToOverlay);
}