/**
 * Represents the summarized task information for the Summary view.
 * Contains counters for various task statuses and the earliest deadline for urgent tasks.
 * Updated dynamically upon page initialization.
 * 
 * @type {Object}
 * @property {Object} tasks - Structured overview of task status.
 * @property {number} tasks.todo - Number of open tasks.
 * @property {number} tasks.done - Number of completed tasks.
 * @property {Object} tasks.urgent - Information about urgent tasks.
 * @property {number} tasks.urgent.count - Number of urgent tasks.
 * @property {string} tasks.urgent.deadline - Next deadline in readable date format.
 * @property {number} tasks.tasksInBoard - Total number of all tasks in the board.
 * @property {number} tasks.tasksInProgress - Number of tasks in progress.
 * @property {number} tasks.awaitingFeedback - Number of tasks in feedback status.
 */
let summaryUser = {
    tasks: {
        todo: 0,
        done: 0,
        urgent: {
            count: 0,
            deadline: '-',
        },
        tasksInBoard: 0,
        tasksInProgress: 0,
        awaitingFeedback: 0,
    },
};


/**
 * 
 * Collection of all deadlines for tasks with priority "urgent."
 * Used to calculate the earliest due date.
 * 
 * @type {Date[]}
 */
const urgentDates = [];


/**
 * Base URL to the Firebase Realtime Database.
 * 
 * @constant {string}
 */
const DATABASEURL = 'https://join-bc74a-default-rtdb.europe-west1.firebasedatabase.app/';


/**
 * Initializes the summary page.
 *
 * Performs the following steps:
 * 1. Loads the HTML layout (header, body and sidebar).
 * 2. Loads tasks and sets their status.
 * 3. Renders the summary template into the main content of the page.
 * 4. Greets the user (depending on the time of day and if necessary by name).
 *
 * @async
 * @returns {Promise<void>} Executes asynchronous initialization steps.
 */
async function initSummary() {
    loadHeaderBodySidebar();
    await loadTasksandSetTasksStatus();
    document.getElementById('main').innerHTML = getSummaryTemplate();
    userGreetAndChangeUserName();
}


/**
 * Loads the HTML layout of the page, including the header, body, and sidebar.
 * Also highlights the currently active link in the sidebar.
 *
 * @returns {void}
 */
function loadHeaderBodySidebar() {
    loadBody();
    loadHeader();
    highlightActiveSidebarLink();
}


/**
 * Loads tasks from the database and updates the task status.
 *
 * @async
 * @returns {Promise<void>} Loads tasks and updates status.
 */
async function loadTasksandSetTasksStatus() {
    try {
        const tasks = await getData(DATABASEURL, 'tasks.json');
        getTaskStatus(tasks);
    } catch (error) {
        console.error('Error: Cannot load and set Tasks', error.message);
    }
}


/**
 * Analyzes the submitted tasks and updates the counters for various statuses
 * (To-do, Done, Urgent, etc.) in the global `summaryUser` object.
 * It also determines the next due date for an urgent task.
 *
 * @param {Array<Object>} tasks - A list of task objects containing status and priorities.
 * @returns {void}
 */
function getTaskStatus(tasks) {
    summaryUser.tasks.tasksInBoard = tasks.length;
    tasks.forEach((task) => {
        setTaskStatus(task.status);
        setTaskPriorityAndGetDate(task.priority, task.dueDate);
    });
    setUpcomingDate();
}


/**
 * Increments the corresponding counter in the global `summary User` object
 * based on the passed task status.
 *
 * Supported status values:
 * - 'todo' -> Increases the number of open tasks
 * - 'done' -> Increases the number of completed tasks
 * - 'progress' -> Increases the number of tasks in progress
 * - 'feedback' -> Increases the number of tasks with pending feedback
 *
 * @param {string} taskStatus - The status of a task.
 * @returns {void}
 */
function setTaskStatus(taskStatus) {
    switch (taskStatus) {
        case 'todo':
            summaryUser.tasks.todo += 1;
            break;
        case 'done':
            summaryUser.tasks.done += 1;
            break;
        case 'progress':
            summaryUser.tasks.tasksInProgress += 1;
            break;
        case 'feedback':
            summaryUser.tasks.awaitingFeedback += 1;
            break;
        default:
            break;
    }
}


/**
 * Increments the urgent task counter if the priority is "urgent"
 * and stores a valid due date in the global `urgentDates` array.
 *
 * Skips erroneous or invalid date values.
 *
 * @param {string} taskPriority - The priority of the task (e.g. 'urgent', 'medium', 'low').
 * @param {string} taskDate - The due date of the task in ISO format (e.g. '2025-05-21').
 * @returns {void}
 */
function setTaskPriorityAndGetDate(taskPriority, taskDate) {
    if (taskPriority !== 'urgent') return;
    const date = new Date(taskDate);
    if (!isValidDate(date)) {
        console.warn(`Invalid date skipped: ${taskDate}`);
        return;
    }
    summaryUser.tasks.urgent.count += 1;
    urgentDates.push(date);
}


/**
 * Checks whether a Date object represents a valid date.
 *
 * @param {Date} date - The Date object to be checked.
 * @returns {boolean} true if the date is valid, otherwise false.
 */
function isValidDate(date) {
    return date instanceof Date && !isNaN(date);
}


/**
 * Determines the nearest valid date in the `urgentDates` list and
 * stores it formatted in the `summaryUser.tasks.urgent.deadline` field.
 *
 * - If no valid data is present, `"-"` is set.
 * - The date is displayed in the format "month day, year" (e.g. "June 5, 2025").
 *
 * @returns {void}
 */
function setUpcomingDate() {
    const validDates = urgentDates.filter(isValidDate);
    if (!validDates.length) {
        summaryUser.tasks.urgent.deadline = "-";
        return;
    }
    const earliest = new Date(Math.min(...validDates));
    const formatted = earliest.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
    summaryUser.tasks.urgent.deadline = formatted;
}


/**
 * Asynchronously retrieves data from a specified URL with a specific path.
 * Returns the parsed JSON data if the fetch is successful.
 * If an error occurs, it will be displayed in the console.
 *
 * @param {string} url - The base URL of the API or data source.
 * @param {string} path - The path appended to the URL to retrieve the resource.
 * @returns {Promise<any | undefined>} - Returns the retrieved data as an object or `undefined` on error.
 */
async function getData(url, path) {
    try {
        const response = await fetch(url + path);
        if (!response.ok) {
            throw new Error('Fehler beim Abrufen');
        }
        return (data = await response.json());
    } catch (error) {
        console.error('Error: ', error.message);
    }
}


/**
 * Opens the page "board.html".
 *
 * @returns {void}
 */
function openBoardPage() {
    window.location.href = 'board.html';
}