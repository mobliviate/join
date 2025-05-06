let summaryUser = {
    id: localStorage.getItem("userIndex"),
    name: "",
    tasks: {
         todo: 0,
         done: 0,
         urgent: {
             count: 0,
             deadline: "-"
         },
         tasksInBoard: 0,
         tasksInProgress: 0,
         awaitingFeedback: 0
    }
};

const DATABASEURL = "https://join-bc74a-default-rtdb.europe-west1.firebasedatabase.app/";

let users = [];
let tasks = [];


async function initSummary() {
  // uploadSummaryToFirebase();
  loadBody();
  loadHeader();
  highlightActiveSidebarLink();
  await loadUsersAndSetUserName();
  loadTasksStatus();

  // await loadDataFromFirebase(DATABASEURL, ".json");
  // await getSummaryDataFromUserIndex();
  // console.log(summaryData);
  document.getElementById("main").innerHTML = getSummaryTemplate();
}

function loadLocalStorage(key) {
  return (value = localStorage.getItem(key));
}

async function loadUsersAndSetUserName() {
  const users = await getData(DATABASEURL, "users.json");
  getNameFromUserId(users);
}

function getNameFromUserId(users) {
    if (summaryUser.id > -1) {
        summaryUser.name = users[summaryUser.id].name;
    } else {
        summaryUser.name = "Guest"
    }
}

async function loadUserName(userId) {}

async function loadTasksStatus() {
  tasks = await getData(DATABASEURL, "tasks.json");
}

async function getData(url, path) {
  try {
    const response = await fetch(url + path);
    if (!response.ok) {
      throw new Error("Fehler beim Abrufen");
    }
    return (data = await response.json());
  } catch (error) {
    console.error("Error: ", error.message);
  }
}

// async function uploadSummaryToFirebase() {
//     try {
//         const response = await fetch(DATABASEURL, {
//             method: 'PUT',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(summaryDatabaseSample)
//         });

//         if (!response.ok) {
//             throw new Error('Fehler beim Hochladen der Daten');
//         }

//         const responseData = await response.json();
//         console.log('Upload erfolgreich:', responseData);

//     } catch (error) {
//         console.error('Upload fehlgeschlagen:', error);
//     }
// }

// async function getSummaryDataFromUserIndex() {
//   try {
//     const response = await fetch(DATABASEURL);

//     if (!response.ok) {
//       throw new Error("Fehler beim Abrufen");
//     }

//     summaryData = await response.json();
//     console.log(summaryData);
//   } catch (error) {
//     console.error("Fehler:", error.message);
//   }
// }

function getSummaryTemplate() {
  return `
        <div id="greet_overlay" class="greet-overlay d-none">
            <div class="greet-overlay-content">
                <h1 id="greet_overlay_title" class="greet-overlay-title">Good Morning,</h1>
                <span id="greet_overlay_name" class="greet-overlay-name">Sofia Müller</span>
            </div>
        </div>
        <div class="summary_container">
            <div class="summary_wrapper">

                <div class="summary_header">
                    <div class="summary_headline">
                        <div class="summary_headline_title"> Join 360 </div>
                        <div class="summary_headline_line"></div>
                        <span> Key Metrics at a Glance </span>
                    </div>
                </div>

                <div class="summary_content">
                    <div class="summary_content_left">

                            <div class="summary_content_left_top_wrapper">

                                <div class="summary_buttons summary_button_width_264 gap_16" id="summary-todo">
                                    
                                    <div class="summary_image_wrapper">
                                        <svg width="69" height="70" viewBox="0 0 69 70" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <circle class="circle" cx="34.5" cy="35" r="34.5" fill="#2A3647"/>
                                            <mask id="mask0_310617_6282" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="18" y="19" width="33" height="32">
                                                <rect x="18.5" y="19" width="32" height="32" fill="#D9D9D9"/>
                                            </mask>
                                            <g mask="url(#mask0_310617_6282)">
                                                <path class="icon_path_fill" d="M25.1667 44.3332H27.0333L38.5333 32.8332L36.6667 30.9665L25.1667 42.4665V44.3332ZM44.2333 30.8998L38.5667 25.2998L40.4333 23.4332C40.9444 22.9221 41.5722 22.6665 42.3167 22.6665C43.0611 22.6665 43.6889 22.9221 44.2 23.4332L46.0667 25.2998C46.5778 25.8109 46.8444 26.4276 46.8667 27.1498C46.8889 27.8721 46.6444 28.4887 46.1333 28.9998L44.2333 30.8998ZM42.3 32.8665L28.1667 46.9998H22.5V41.3332L36.6333 27.1998L42.3 32.8665Z" fill="white"/>
                                            </g>
                                        </svg>                                        
                                    </div>
                                    <div class="summary_bottons_amount_and_text_wrapper">
                                        <span class="summary_amount_font_weight_and_size" id="summary-todo-amount">${summaryUser.tasks.todo}</span>
                                        <span class="summary_text_font_weight_and_size">To-do</span>
                                    </div>

                                </div>

                                <div class="summary_buttons summary_button_width_264 gap_16" id="summary-done">

                                    <div class="summary_image_wrapper">
                                        <svg width="70" height="70" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <circle class="circle" cx="35" cy="35" r="34.5" fill="#2A3647"/>
                                            <path class="icon_path_stroke" d="M20.0283 35.0001L31.2571 46.0662L49.9717 23.9341" stroke="white" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                    </div>                                
                                
                                    <div class="summary_bottons_amount_and_text_wrapper">
                                        <span class="summary_amount_font_weight_and_size" id="summary-done-amount">${summaryUser.tasks.done}</span>
                                        <span class="summary_text_font_weight_and_size">Done</span>
                                    </div>
                                    
                                </div>

                            </div>

                            <div class="summary_content_left_middle_wrapper">
                                <div class="summary_buttons summary_button_width_560" id="summary-urgent">
                                    <div class="summary_urgent_wrapper">

                                        <div class="summary_urgent_left padding_28_48 gap_16">
                                            <img src="./assets/svg/summary-urgent-icon.svg" alt="Urgent">

                                            <div class="summary_bottons_amount_and_text_wrapper">
                                                <span class="summary_amount_font_weight_and_size" id="summary-urgent-amount">${summaryUser.tasks.urgent.count}</span>
                                                <span class="summary_urgent_text_info">Urgent</span>
                                            </div>                                        
                                        </div>

                                        <div class="summary_urgent_line"></div>

                                        <div class="summary_urgent_text_wrapper padding_28_48">    
                                            <span class="summary_urgent_text_date">${summaryUser.tasks.urgent.deadline}</span>
                                            <span class="summary_urgent_text_info"> Upcoming Deadline </span>
                                        </div>

                                    </div>                                
                                </div>
                            </div>

                            <div class="summary_content_left_bottom_wrapper">

                                <div class="summary_buttons summary_button_width_168" id="summary-tasks-in-board">
                                    <div class="summary_bottons_amount_and_text_wrapper">
                                        <span class="summary_amount_font_weight_and_size" id="summary-tasks-in-board-amount">${summaryUser.tasks.tasksInBoard}</span>
                                        <span class="summary_text_font_weight_and_size">Tasks in<br>Board</span>
                                    </div>                                
                                </div>

                                <div class="summary_buttons summary_button_width_168" id="summary-tasks-in-progress">
                                    <div class="summary_bottons_amount_and_text_wrapper">
                                        <span class="summary_amount_font_weight_and_size" id="summary-tasks-in-progress-amount">${summaryUser.tasks.tasksInProgress}</span>
                                        <span class="summary_text_font_weight_and_size">Tasks in<br>Progress</span>
                                    </div>                                                                
                                </div>

                                <div class="summary_buttons summary_button_width_168" id="summary-awaiting-feedback">
                                    <div class="summary_bottons_amount_and_text_wrapper">
                                        <span class="summary_amount_font_weight_and_size" id="summary-awaiting-feedback-amount">${summaryUser.tasks.awaitingFeedback}</span>
                                        <span class="summary_text_font_weight_and_size">Awaiting<br>Feedback</span>
                                    </div>                                                                                                
                                </div>
                            </div>
                    </div>

                    <div class="summary_content_right">
                        <div class="summary_content_right_wrapper">
                            <span id="summary_greeting" class="summary_content_right_greeting"> Good morning, </span>
                            <span id="summary_user" class="summary_content_right_user">${summaryUser.name}</span>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    `;
}
