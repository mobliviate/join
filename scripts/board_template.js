function getBoardTemplate() {
  return `
    <div class="main-board">
      <div class="header-board board-mobile-hide">
      <div class="header-board board-mobile-hide">
        <div class="board-search">
          <div>
            <h1>Board</h1>
          </div>
          <div class="search-addtask">
            <div class="search-wrapper-board">
              <input type="text" placeholder="Find Task" class="search-board" oninput="handleSearch(this.value)">
              <div class="separetor-board"></div>
              <button class="button-search-board">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6.71181 13.2137C4.89463 13.2137 3.35669 12.5843 2.098 11.3256C0.839307 10.0669 0.209961 8.52899 0.209961 6.71181C0.209961 4.89463 0.839307 3.35669 2.098 2.098C3.35669 0.839307 4.89463 0.209961 6.71181 0.209961C8.52899 0.209961 10.0669 0.839307 11.3256 2.098C12.5843 3.35669 13.2137 4.89463 13.2137 6.71181C13.2137 7.44535 13.097 8.13721 12.8636 8.7874C12.6302 9.43758 12.3134 10.0127 11.9133 10.5129L17.5149 16.1145C17.6983 16.2979 17.79 16.5313 17.79 16.8147C17.79 17.0981 17.6983 17.3315 17.5149 17.5149C17.3315 17.6983 17.0981 17.79 16.8147 17.79C16.5313 17.79 16.2979 17.6983 16.1145 17.5149L10.5129 11.9133C10.0127 12.3134 9.43758 12.6302 8.7874 12.8636C8.13721 13.097 7.44535 13.2137 6.71181 13.2137ZM6.71181 11.2131C7.96217 11.2131 9.02497 10.7755 9.90022 9.90022C10.7755 9.02497 11.2131 7.96217 11.2131 6.71181C11.2131 5.46145 10.7755 4.39865 9.90022 3.5234C9.02497 2.64815 7.96217 2.21053 6.71181 2.21053C5.46145 2.21053 4.39865 2.64815 3.5234 3.5234C2.64815 4.39865 2.21053 5.46145 2.21053 6.71181C2.21053 7.96217 2.64815 9.02497 3.5234 9.90022C4.39865 10.7755 5.46145 11.2131 6.71181 11.2131Z" fill="#2A3647"/>
                </svg>
              </button>
            </div>
            <button class="add-task-board" onclick="addTaskBoard('todo')">
              <h2>Add task</h2>
              <svg width="21" height="21" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.66602 11.3327H0.666016V8.66602H8.66602V0.666016H11.3327V8.66602H19.3327V11.3327H11.3327V19.3327H8.66602V11.3327Z" fill="white"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div class="header-board board-mobile-flex">
        <div class="board-search">
          <div class="board-header-mobile">
            <h1>Boad</h1>
            <button class="button-board" onclick="addTaskBoard('todo')">
              <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="1.6665" y="1.5" width="22" height="22" rx="7" stroke="currentColor" stroke-width="2" />
                <path d="M12.6665 8.5V16.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                <path d="M16.6665 12.5754L8.6665 12.5754" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
              </svg>
            </button>
          </div>
          <div class="search-addtask-mobile">
            <div class="search-wrapper-board-mobile">
              <input type="text" placeholder="Find Task" class="search-board-mobile" oninput="handleSearch(this.value)">
              <div class="search-btn-cnt-mobile">
                <div class="separetor-board-mobile"></div>
                <button class="button-search-board-mobile">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M6.71181 13.2137C4.89463 13.2137 3.35669 12.5843 2.098 11.3256C0.839307 10.0669 0.209961 8.52899 0.209961 6.71181C0.209961 4.89463 0.839307 3.35669 2.098 2.098C3.35669 0.839307 4.89463 0.209961 6.71181 0.209961C8.52899 0.209961 10.0669 0.839307 11.3256 2.098C12.5843 3.35669 13.2137 4.89463 13.2137 6.71181C13.2137 7.44535 13.097 8.13721 12.8636 8.7874C12.6302 9.43758 12.3134 10.0127 11.9133 10.5129L17.5149 16.1145C17.6983 16.2979 17.79 16.5313 17.79 16.8147C17.79 17.0981 17.6983 17.3315 17.5149 17.5149C17.3315 17.6983 17.0981 17.79 16.8147 17.79C16.5313 17.79 16.2979 17.6983 16.1145 17.5149L10.5129 11.9133C10.0127 12.3134 9.43758 12.6302 8.7874 12.8636C8.13721 13.097 7.44535 13.2137 6.71181 13.2137ZM6.71181 11.2131C7.96217 11.2131 9.02497 10.7755 9.90022 9.90022C10.7755 9.02497 11.2131 7.96217 11.2131 6.71181C11.2131 5.46145 10.7755 4.39865 9.90022 3.5234C9.02497 2.64815 7.96217 2.21053 6.71181 2.21053C5.46145 2.21053 4.39865 2.64815 3.5234 3.5234C2.64815 4.39865 2.21053 5.46145 2.21053 6.71181C2.21053 7.96217 2.64815 9.02497 3.5234 9.90022C4.39865 10.7755 5.46145 11.2131 6.71181 11.2131Z"
                      fill="#2A3647" />
                  </svg>
                </button>
              </div>
            </div>           
          </div>
        </div>
      </div>
      <div class="tasks-board">
        <div class="task-board">
          <div class="board-task-header">
            <h3>To do</h3>
            <button class="button-board" onclick="addTaskBoard('todo')">
              <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="1.6665" y="1.5" width="22" height="22" rx="7" stroke="currentColor" stroke-width="2" />
                <path d="M12.6665 8.5V16.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                <path d="M16.6665 12.5754L8.6665 12.5754" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                <rect x="1.6665" y="1.5" width="22" height="22" rx="7" stroke="currentColor" stroke-width="2" />
                <path d="M12.6665 8.5V16.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                <path d="M16.6665 12.5754L8.6665 12.5754" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                <rect x="1.6665" y="1.5" width="22" height="22" rx="7" stroke="currentColor" stroke-width="2" />
                <path d="M12.6665 8.5V16.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                <path d="M16.6665 12.5754L8.6665 12.5754" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
              </svg>
            </button>
          </div>
          <div id="todo" class="columns" ondrop="moveTo('todo')" ondragleave="removeHighlight('todo')"
            ondragover="allowDrop(event); highlight('todo')"></div>
        </div>
        <div class="task-board">
          <div class="board-task-header">
          </div>
          <div id="todo" class="columns" ondrop="moveTo('todo')" ondragleave="removeHighlight('todo')"
            ondragover="allowDrop(event); highlight('todo')"></div>
        </div>
        <div class="task-board">
          <div class="board-task-header">
          </div>
          <div id="todo" class="columns" ondrop="moveTo('todo')" ondragleave="removeHighlight('todo')"
            ondragover="allowDrop(event); highlight('todo')"></div>
        </div>
        <div class="task-board">
          <div class="board-task-header">
            <h3>In Progress</h3>
            <button class="button-board" onclick="addTaskBoard('progress')">
              <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="1.6665" y="1.5" width="22" height="22" rx="7" stroke="currentColor" stroke-width="2" />
                <path d="M12.6665 8.5V16.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                <path d="M16.6665 12.5754L8.6665 12.5754" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                <rect x="1.6665" y="1.5" width="22" height="22" rx="7" stroke="currentColor" stroke-width="2" />
                <path d="M12.6665 8.5V16.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                <path d="M16.6665 12.5754L8.6665 12.5754" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                <rect x="1.6665" y="1.5" width="22" height="22" rx="7" stroke="currentColor" stroke-width="2" />
                <path d="M12.6665 8.5V16.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                <path d="M16.6665 12.5754L8.6665 12.5754" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
              </svg>
            </button>
          </div>
          <div id="progress" class="columns" ondrop="moveTo('progress')" ondragleave="removeHighlight('progress')"
            ondragover="allowDrop(event); highlight('progress')"></div>
        </div>
        <div class="task-board">
          <div class="board-task-header">
          </div>
          <div id="progress" class="columns" ondrop="moveTo('progress')" ondragleave="removeHighlight('progress')"
            ondragover="allowDrop(event); highlight('progress')"></div>
        </div>
        <div class="task-board">
          <div class="board-task-header">
          </div>
          <div id="progress" class="columns" ondrop="moveTo('progress')" ondragleave="removeHighlight('progress')"
            ondragover="allowDrop(event); highlight('progress')"></div>
        </div>
        <div class="task-board">
          <div class="board-task-header">
            <h3>Await feedback</h3>
            <button class="button-board" onclick="addTaskBoard('feedback')">
              <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="1.6665" y="1.5" width="22" height="22" rx="7" stroke="currentColor" stroke-width="2" />
                <path d="M12.6665 8.5V16.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                <path d="M16.6665 12.5754L8.6665 12.5754" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                <rect x="1.6665" y="1.5" width="22" height="22" rx="7" stroke="currentColor" stroke-width="2" />
                <path d="M12.6665 8.5V16.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                <path d="M16.6665 12.5754L8.6665 12.5754" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                <rect x="1.6665" y="1.5" width="22" height="22" rx="7" stroke="currentColor" stroke-width="2" />
                <path d="M12.6665 8.5V16.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                <path d="M16.6665 12.5754L8.6665 12.5754" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
              </svg>
            </button>
          </div>
          <div id="feedback" class="columns" ondrop="moveTo('feedback')" ondragleave="removeHighlight('feedback')"
            ondragover="allowDrop(event); highlight('feedback')"></div>
        </div>
        <div class="task-board">
          <div class="board-task-header">
            <h3>Done</h3>
          </div>
          <div id="done" class="columns" ondrop="moveTo('done')" ondragleave="removeHighlight('done')"
            ondragover="allowDrop(event); highlight('done')"></div>
          <div id="done" class="columns" ondrop="moveTo('done')" ondragleave="removeHighlight('done')"
            ondragover="allowDrop(event); highlight('done')"></div>
          <div id="done" class="columns" ondrop="moveTo('done')" ondragleave="removeHighlight('done')"
            ondragover="allowDrop(event); highlight('done')"></div>
        </div>
      </div>
    </div>
    <div id="open_overlay_board" class="open-overlay-board d-none" onclick="closeOverlayBoard('add_task_board','open_overlay_board')">
      <div id="add_task_board" class="add-task-overlay d-none" onclick="overlayProtection(event)"></div>
      <div class="task-added-board d-none">
        <h3>Task added to board</h3>
        <svg width="30" height="30" viewBox="0 0 30 26" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M22.9544 2.75564L22.9545 23.21C22.9538 23.8125 22.7142 24.3903 22.2881 24.8163C21.862 25.2424 21.2843 25.4821 20.6817 25.4827L16.1363 25.4827C15.5338 25.4821 14.956 25.2424 14.53 24.8163C14.1039 24.3903 13.8642 23.8125 13.8636 23.21L13.8636 2.75564C13.8642 2.15306 14.1039 1.57534 14.53 1.14926C14.956 0.723172 15.5338 0.483533 16.1363 0.48293L20.6817 0.48293C21.2843 0.483533 21.862 0.723172 22.2881 1.14926C22.7142 1.57534 22.9538 2.15306 22.9544 2.75564ZM16.1363 23.21L20.6817 23.21L20.6817 2.75564L16.1363 2.75564L16.1363 23.21ZM16.1363 2.75564L16.1363 23.21C16.1357 23.8125 15.8961 24.3902 15.47 24.8163C15.0439 25.2424 14.4662 25.482 13.8636 25.4826L9.31823 25.4826C8.71566 25.482 8.13794 25.2424 7.71185 24.8163C7.28577 24.3902 7.04613 23.8125 7.04553 23.2099L7.04553 2.75561C7.04613 2.15304 7.28577 1.57532 7.71185 1.14923C8.13793 0.723148 8.71566 0.483513 9.31823 0.48291L13.8636 0.48291C14.4662 0.483512 15.0439 0.723148 15.47 1.14923C15.8961 1.57532 16.1357 2.15306 16.1363 2.75564ZM9.31823 23.2099L13.8636 23.21L13.8636 2.75564L9.31823 2.75561L9.31823 23.2099ZM9.31823 2.75561L9.31823 23.2099C9.31763 23.8125 9.07799 24.3902 8.65191 24.8163C8.22582 25.2424 7.6481 25.482 7.04553 25.4826L2.50012 25.4826C1.89755 25.482 1.31983 25.2424 0.893741 24.8163C0.467657 24.3902 0.228019 23.8125 0.227417 23.2099L0.227416 2.75561C0.228018 2.15304 0.467656 1.57532 0.89374 1.14923C1.31982 0.723148 1.89755 0.483513 2.50012 0.48291L7.04553 0.48291C7.6481 0.483513 8.22582 0.723148 8.6519 1.14923C9.07799 1.57532 9.31763 2.15304 9.31823 2.75561ZM2.50012 23.2099L7.04553 23.2099L7.04553 2.75561L2.50012 2.75561L2.50012 23.2099Z"fill="#CDCDCD" />
          <path
            d="M29.7726 2.75589L29.7726 23.2102C29.772 23.8128 29.5323 24.3905 29.1062 24.8166C28.6802 25.2427 28.1024 25.4823 27.4999 25.4829L22.9545 25.4829C22.3519 25.4823 21.7742 25.2427 21.3481 24.8166C20.922 24.3905 20.6824 23.8125 20.6817 23.21L20.6817 2.75564C20.6823 2.15306 20.922 1.57559 21.3481 1.14951C21.7742 0.723424 22.3519 0.483787 22.9544 0.483184L27.4999 0.483184C28.1024 0.483786 28.6801 0.723424 29.1062 1.14951C29.5323 1.57559 29.772 2.15331 29.7726 2.75589ZM22.9545 23.21L27.4999 23.2102L27.4999 2.75589L22.9544 2.75564L22.9545 23.21Z"fill="#CDCDCD" />
        </svg>
      </div>
    </div>  
    <div id="open_overlay_task_board" class="open-overlay-board d-none" onclick="closeOverlayBoard('open_task_board','open_overlay_task_board')">
      <div id="open_task_board" class="open-task-overlay d-none" onclick="overlayProtection(event)">
        <button class="close-button-add-task-board" onclick="closeOverlayButtonBoard('open_task_board', 'open_overlay_task_board')">
         <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
           <mask id="mask0_71720_5535" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="4" y="4" width="24" height="24">
           <rect x="4" y="4" width="24" height="24" fill="#D9D9D9"/>
           </mask>
           <g mask="url(#mask0_71720_5535)">
           <path d="M16 17.4L11.1 22.3C10.9167 22.4834 10.6833 22.575 10.4 22.575C10.1167 22.575 9.88333 22.4834 9.7 22.3C9.51667 22.1167 9.425 21.8834 9.425 21.6C9.425 21.3167 9.51667 21.0834 9.7 20.9L14.6 16L9.7 11.1C9.51667 10.9167 9.425 10.6834 9.425 10.4C9.425 10.1167 9.51667 9.88338 9.7 9.70005C9.88333 9.51672 10.1167 9.42505 10.4 9.42505C10.6833 9.42505 10.9167 9.51672 11.1 9.70005L16 14.6L20.9 9.70005C21.0833 9.51672 21.3167 9.42505 21.6 9.42505C21.8833 9.42505 22.1167 9.51672 22.3 9.70005C22.4833 9.88338 22.575 10.1167 22.575 10.4C22.575 10.6834 22.4833 10.9167 22.3 11.1L17.4 16L22.3 20.9C22.4833 21.0834 22.575 21.3167 22.575 21.6C22.575 21.8834 22.4833 22.1167 22.3 22.3C22.1167 22.4834 21.8833 22.575 21.6 22.575C21.3167 22.575 21.0833 22.4834 20.9 22.3L16 17.4Z" fill="#2A3647"/>
           </g>
         </svg>
        </button>
      </div>
    </div>   
  `;
}

function getRenderTask(task, indexTask, background,) {
  return `
    <div class="task-main" draggable="true" ondragstart="startDragging(${indexTask})" onclick="openTaskBoard('${indexTask}','${background}')">
      <div class="board-task-header-cnt">
        <div class="category-board" style="background-color:var(${background})">${task.category}</div>
        <button id="move_to_btn_${indexTask}" class="move-to-btn" onclick="openMoveToOverlay('${indexTask}', '${task.status}'); overlayProtection(event); startDragging(${indexTask})">
          <svg width="24" height="26" viewBox="0 0 24 26" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="0.75" y="25.25" width="24.5" height="22.5" rx="5.25" transform="rotate(-90 0.75 25.25)" stroke="#2A3647" stroke-width="1.5"/>
            <mask id="mask0_294678_9869" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="2" y="3" width="20" height="20">
              <rect x="2" y="23" width="20" height="20" transform="rotate(-90 2 23)" fill="#D9D9D9"/>
            </mask>
            <g mask="url(#mask0_294678_9869)">
              <path d="M15.3333 18.1457L16.8958 16.5832C17.0486 16.4304 17.2396 16.354 17.4688 16.354C17.6979 16.354 17.8958 16.4304 18.0625 16.5832C18.2292 16.7498 18.3125 16.9478 18.3125 17.1769C18.3125 17.4061 18.2292 17.604 18.0625 17.7707L15.0833 20.7498C15 20.8332 14.9097 20.8922 14.8125 20.9269C14.7153 20.9616 14.6111 20.979 14.5 20.979C14.3889 20.979 14.2847 20.9616 14.1875 20.9269C14.0903 20.8922 14 20.8332 13.9167 20.7498L10.9167 17.7498C10.75 17.5832 10.6701 17.3887 10.6771 17.1665C10.684 16.9443 10.7708 16.7498 10.9375 16.5832C11.1042 16.4304 11.2986 16.3505 11.5208 16.3436C11.7431 16.3366 11.9375 16.4165 12.1042 16.5832L13.6667 18.1457V12.9998C13.6667 12.7637 13.7465 12.5658 13.9062 12.4061C14.066 12.2464 14.2639 12.1665 14.5 12.1665C14.7361 12.1665 14.934 12.2464 15.0938 12.4061C15.2535 12.5658 15.3333 12.7637 15.3333 12.9998V18.1457ZM10.3333 7.854V12.9998C10.3333 13.2359 10.2535 13.4339 10.0938 13.5936C9.93403 13.7533 9.73611 13.8332 9.5 13.8332C9.26389 13.8332 9.06597 13.7533 8.90625 13.5936C8.74653 13.4339 8.66667 13.2359 8.66667 12.9998V7.854L7.10417 9.4165C6.95139 9.56928 6.76042 9.64567 6.53125 9.64567C6.30208 9.64567 6.10417 9.56928 5.9375 9.4165C5.77083 9.24984 5.6875 9.05192 5.6875 8.82275C5.6875 8.59359 5.77083 8.39567 5.9375 8.229L8.91667 5.24984C9 5.1665 9.09028 5.10748 9.1875 5.07275C9.28472 5.03803 9.38889 5.02067 9.5 5.02067C9.61111 5.02067 9.71528 5.03803 9.8125 5.07275C9.90972 5.10748 10 5.1665 10.0833 5.24984L13.0833 8.24984C13.25 8.4165 13.3299 8.61095 13.3229 8.83317C13.316 9.05539 13.2292 9.24984 13.0625 9.4165C12.8958 9.56928 12.7014 9.64914 12.4792 9.65609C12.2569 9.66303 12.0625 9.58317 11.8958 9.4165L10.3333 7.854Z" fill="#2A3647"/>
            </g>
          </svg>
        </button>
      </div>
      <div class="title-description-board">
        <h3 class="title-board">${task.title}</h3>
        <h4 class="description-board">${task.description}</h4>
      </div>
      <div id="progress_subtask_${indexTask}"></div>      
      <div class="initials-priority_board">
        <div class="initials-board" id="initials_${indexTask}"></div>
        <img class="priority-board" src="./assets/svg/prio_${task.priority}.svg" alt="${task.priority}_icon">
      </div>
    </div>
  `;
}

function getRenderInitials(initial, color) {
  return `
    <div class="initials-single-board" style="background-color:${color}"><h3>${initial}</h3></div>
  `;
}

function getRenderProgressbar(widthProgress, subTasks, subtaskDone) {
  return `
    <div class="subtasks-board">
      <svg width="128" height="8" viewBox="0 0 128 8" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="128" height="8" rx="4" fill="#F4F4F4"/>
        <rect width="${widthProgress}" height="8" rx="4" fill="#4589FF"/>
      </svg>
      <h4>${subtaskDone}/${subTasks} Subtasks</h4>
    </div>
  `;
}

function getRenderEmpty(emptyColumn) {
  return `
    <div class="empty-task"><h3>No tasks ${emptyColumn}</h3></div>
  `;
}

function getOpenTaskBoard(task, color, indexTask) {
  return `
    <div class="open-task-header">
      <div class="category-board" style="background-color:var(${color})">${task.category}</div>
      <button class="close-button-open-task-board" onclick="closeOverlayButtonBoard('open_task_board', 'open_overlay_task_board')">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <mask id="mask0_71720_5535" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="4" y="4" width="24" height="24">
          <rect x="4" y="4" width="24" height="24" fill="#D9D9D9"/>
          </mask>
          <g mask="url(#mask0_71720_5535)">
          <path d="M16 17.4L11.1 22.3C10.9167 22.4834 10.6833 22.575 10.4 22.575C10.1167 22.575 9.88333 22.4834 9.7 22.3C9.51667 22.1167 9.425 21.8834 9.425 21.6C9.425 21.3167 9.51667 21.0834 9.7 20.9L14.6 16L9.7 11.1C9.51667 10.9167 9.425 10.6834 9.425 10.4C9.425 10.1167 9.51667 9.88338 9.7 9.70005C9.88333 9.51672 10.1167 9.42505 10.4 9.42505C10.6833 9.42505 10.9167 9.51672 11.1 9.70005L16 14.6L20.9 9.70005C21.0833 9.51672 21.3167 9.42505 21.6 9.42505C21.8833 9.42505 22.1167 9.51672 22.3 9.70005C22.4833 9.88338 22.575 10.1167 22.575 10.4C22.575 10.6834 22.4833 10.9167 22.3 11.1L17.4 16L22.3 20.9C22.4833 21.0834 22.575 21.3167 22.575 21.6C22.575 21.8834 22.4833 22.1167 22.3 22.3C22.1167 22.4834 21.8833 22.575 21.6 22.575C21.3167 22.575 21.0833 22.4834 20.9 22.3L16 17.4Z" fill="#2A3647"/>
          </g>
        </svg>
      </button>
    </div>
    <h1 class="open-task-title">${task.title}</h1>
    <h3 class="open-task-description">${task.description}</h3>
    <div class="open-task-date-div">
      <h3 class="open-task-text">Due date:</h3>
      <input type="date" class="open-task-date"value="${task.dueDate}"/>
    </div>
    <div class="open-task-priority-div">
      <h3 class="open-task-text">Priority:</h3>
      <h3 class="open-task-priority">${task.priority} <img class="priority-board" src="./assets/svg/prio_${task.priority}.svg" alt="${task.priority}_icon"></h3>
    </div>
    <div class="open-task-assigned-div">
      <h3 class="open-task-text">Assigned To:</h3>
      <div id="open-task-assigned" class=""></div>
    </div>
    <div class="open-task-subtasks-div">
      <h3 class="open-task-text">Subtasks</h3>
      <div id="open_task_subtasks" class="open-task-subtasks"></div>
    </div>
    <div class="open-task-buttons">
      <button class="open-task-button" onclick="deleteTask('${indexTask}')">
        <svg width="81" height="24" viewBox="0 0 81 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <mask id="mask0_71348_10326" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
          <rect width="24" height="24" fill="currentcolor"/>
          </mask>
          <g mask="url(#mask0_71348_10326)">
          <path d="M7 21C6.45 21 5.97917 20.8042 5.5875 20.4125C5.19583 20.0208 5 19.55 5 19V6C4.71667 6 4.47917 5.90417 4.2875 5.7125C4.09583 5.52083 4 5.28333 4 5C4 4.71667 4.09583 4.47917 4.2875 4.2875C4.47917 4.09583 4.71667 4 5 4H9C9 3.71667 9.09583 3.47917 9.2875 3.2875C9.47917 3.09583 9.71667 3 10 3H14C14.2833 3 14.5208 3.09583 14.7125 3.2875C14.9042 3.47917 15 3.71667 15 4H19C19.2833 4 19.5208 4.09583 19.7125 4.2875C19.9042 4.47917 20 4.71667 20 5C20 5.28333 19.9042 5.52083 19.7125 5.7125C19.5208 5.90417 19.2833 6 19 6V19C19 19.55 18.8042 20.0208 18.4125 20.4125C18.0208 20.8042 17.55 21 17 21H7ZM7 6V19H17V6H7ZM9 16C9 16.2833 9.09583 16.5208 9.2875 16.7125C9.47917 16.9042 9.71667 17 10 17C10.2833 17 10.5208 16.9042 10.7125 16.7125C10.9042 16.5208 11 16.2833 11 16V9C11 8.71667 10.9042 8.47917 10.7125 8.2875C10.5208 8.09583 10.2833 8 10 8C9.71667 8 9.47917 8.09583 9.2875 8.2875C9.09583 8.47917 9 8.71667 9 9V16ZM13 16C13 16.2833 13.0958 16.5208 13.2875 16.7125C13.4792 16.9042 13.7167 17 14 17C14.2833 17 14.5208 16.9042 14.7125 16.7125C14.9042 16.5208 15 16.2833 15 16V9C15 8.71667 14.9042 8.47917 14.7125 8.2875C14.5208 8.09583 14.2833 8 14 8C13.7167 8 13.4792 8.09583 13.2875 8.2875C13.0958 8.47917 13 8.71667 13 9V16Z" fill="currentcolor"/>
          </g>
          <path d="M37 17.5H33.4091V5.86364H37.1591C38.2879 5.86364 39.2538 6.09659 40.0568 6.5625C40.8598 7.02462 41.4754 7.68939 41.9034 8.55682C42.3314 9.42045 42.5455 10.4545 42.5455 11.6591C42.5455 12.8712 42.3295 13.9148 41.8977 14.7898C41.4659 15.661 40.8371 16.3314 40.0114 16.8011C39.1856 17.267 38.1818 17.5 37 17.5ZM34.8182 16.25H36.9091C37.8712 16.25 38.6686 16.0644 39.3011 15.6932C39.9337 15.322 40.4053 14.7936 40.7159 14.108C41.0265 13.4223 41.1818 12.6061 41.1818 11.6591C41.1818 10.7197 41.0284 9.91098 40.7216 9.23295C40.4148 8.55114 39.9564 8.02841 39.3466 7.66477C38.7367 7.29735 37.9773 7.11364 37.0682 7.11364H34.8182V16.25ZM48.3864 17.6818C47.5455 17.6818 46.8201 17.4962 46.2102 17.125C45.6042 16.75 45.1364 16.2273 44.8068 15.5568C44.4811 14.8826 44.3182 14.0985 44.3182 13.2045C44.3182 12.3106 44.4811 11.5227 44.8068 10.8409C45.1364 10.1553 45.5947 9.62121 46.1818 9.23864C46.7727 8.85227 47.4621 8.65909 48.25 8.65909C48.7045 8.65909 49.1534 8.73485 49.5966 8.88636C50.0398 9.03788 50.4432 9.28409 50.8068 9.625C51.1705 9.96212 51.4602 10.4091 51.6761 10.9659C51.892 11.5227 52 12.2083 52 13.0227V13.5909H45.2727V12.4318H50.6364C50.6364 11.9394 50.5379 11.5 50.3409 11.1136C50.1477 10.7273 49.8712 10.4223 49.5114 10.1989C49.1553 9.97538 48.7348 9.86364 48.25 9.86364C47.7159 9.86364 47.2538 9.99621 46.8636 10.2614C46.4773 10.5227 46.1799 10.8636 45.9716 11.2841C45.7633 11.7045 45.6591 12.1553 45.6591 12.6364V13.4091C45.6591 14.0682 45.7727 14.6269 46 15.0852C46.2311 15.5398 46.5511 15.8864 46.9602 16.125C47.3693 16.3598 47.8447 16.4773 48.3864 16.4773C48.7386 16.4773 49.0568 16.428 49.3409 16.3295C49.6288 16.2273 49.8769 16.0758 50.0852 15.875C50.2936 15.6705 50.4545 15.4167 50.5682 15.1136L51.8636 15.4773C51.7273 15.9167 51.4981 16.303 51.1761 16.6364C50.8542 16.9659 50.4564 17.2235 49.983 17.4091C49.5095 17.5909 48.9773 17.6818 48.3864 17.6818ZM55.3807 5.86364V17.5H54.0398V5.86364H55.3807ZM61.4957 17.6818C60.6548 17.6818 59.9295 17.4962 59.3196 17.125C58.7135 16.75 58.2457 16.2273 57.9162 15.5568C57.5904 14.8826 57.4276 14.0985 57.4276 13.2045C57.4276 12.3106 57.5904 11.5227 57.9162 10.8409C58.2457 10.1553 58.7041 9.62121 59.2912 9.23864C59.8821 8.85227 60.5715 8.65909 61.3594 8.65909C61.8139 8.65909 62.2628 8.73485 62.706 8.88636C63.1491 9.03788 63.5526 9.28409 63.9162 9.625C64.2798 9.96212 64.5696 10.4091 64.7855 10.9659C65.0014 11.5227 65.1094 12.2083 65.1094 13.0227V13.5909H58.3821V12.4318H63.7457C63.7457 11.9394 63.6473 11.5 63.4503 11.1136C63.2571 10.7273 62.9806 10.4223 62.6207 10.1989C62.2647 9.97538 61.8442 9.86364 61.3594 9.86364C60.8253 9.86364 60.3632 9.99621 59.973 10.2614C59.5866 10.5227 59.2893 10.8636 59.081 11.2841C58.8726 11.7045 58.7685 12.1553 58.7685 12.6364V13.4091C58.7685 14.0682 58.8821 14.6269 59.1094 15.0852C59.3404 15.5398 59.6605 15.8864 60.0696 16.125C60.4787 16.3598 60.9541 16.4773 61.4957 16.4773C61.848 16.4773 62.1662 16.428 62.4503 16.3295C62.7382 16.2273 62.9863 16.0758 63.1946 15.875C63.4029 15.6705 63.5639 15.4167 63.6776 15.1136L64.973 15.4773C64.8366 15.9167 64.6075 16.303 64.2855 16.6364C63.9635 16.9659 63.5658 17.2235 63.0923 17.4091C62.6188 17.5909 62.0866 17.6818 61.4957 17.6818ZM70.9446 8.77273V9.90909H66.4219V8.77273H70.9446ZM67.7401 6.68182H69.081V15C69.081 15.3788 69.1359 15.6629 69.2457 15.8523C69.3594 16.0379 69.5033 16.1629 69.6776 16.2273C69.8556 16.2879 70.0431 16.3182 70.2401 16.3182C70.3878 16.3182 70.509 16.3106 70.6037 16.2955C70.6984 16.2765 70.7741 16.2614 70.831 16.25L71.1037 17.4545C71.0128 17.4886 70.8859 17.5227 70.723 17.5568C70.5601 17.5947 70.3537 17.6136 70.1037 17.6136C69.7249 17.6136 69.3537 17.5322 68.9901 17.3693C68.6302 17.2064 68.331 16.9583 68.0923 16.625C67.8575 16.2917 67.7401 15.8712 67.7401 15.3636V6.68182ZM76.527 17.6818C75.6861 17.6818 74.9607 17.4962 74.3509 17.125C73.7448 16.75 73.277 16.2273 72.9474 15.5568C72.6217 14.8826 72.4588 14.0985 72.4588 13.2045C72.4588 12.3106 72.6217 11.5227 72.9474 10.8409C73.277 10.1553 73.7353 9.62121 74.3224 9.23864C74.9134 8.85227 75.6027 8.65909 76.3906 8.65909C76.8452 8.65909 77.294 8.73485 77.7372 8.88636C78.1804 9.03788 78.5838 9.28409 78.9474 9.625C79.3111 9.96212 79.6009 10.4091 79.8168 10.9659C80.0327 11.5227 80.1406 12.2083 80.1406 13.0227V13.5909H73.4134V12.4318H78.777C78.777 11.9394 78.6785 11.5 78.4815 11.1136C78.2884 10.7273 78.0118 10.4223 77.652 10.1989C77.2959 9.97538 76.8755 9.86364 76.3906 9.86364C75.8565 9.86364 75.3944 9.99621 75.0043 10.2614C74.6179 10.5227 74.3205 10.8636 74.1122 11.2841C73.9039 11.7045 73.7997 12.1553 73.7997 12.6364V13.4091C73.7997 14.0682 73.9134 14.6269 74.1406 15.0852C74.3717 15.5398 74.6918 15.8864 75.1009 16.125C75.5099 16.3598 75.9853 16.4773 76.527 16.4773C76.8793 16.4773 77.1974 16.428 77.4815 16.3295C77.7694 16.2273 78.0175 16.0758 78.2259 15.875C78.4342 15.6705 78.5952 15.4167 78.7088 15.1136L80.0043 15.4773C79.8679 15.9167 79.6387 16.303 79.3168 16.6364C78.9948 16.9659 78.5971 17.2235 78.1236 17.4091C77.6501 17.5909 77.1179 17.6818 76.527 17.6818Z" fill="currentcolor"/>
        </svg>
      </button>
      <div class="open-task-separetor"></div>
      <button class="open-task-button" onclick="editTasskBoard('${indexTask}','${color}'); loadTask('${indexTask}')">
        <svg width="62" height="24" viewBox="0 0 62 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <mask id="mask0_71348_10328" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
          <rect width="24" height="24" fill="currentcolor"/>
          </mask>
          <g mask="url(#mask0_71348_10328)">
          <path d="M5 19H6.4L15.025 10.375L13.625 8.975L5 17.6V19ZM19.3 8.925L15.05 4.725L16.45 3.325C16.8333 2.94167 17.3042 2.75 17.8625 2.75C18.4208 2.75 18.8917 2.94167 19.275 3.325L20.675 4.725C21.0583 5.10833 21.2583 5.57083 21.275 6.1125C21.2917 6.65417 21.1083 7.11667 20.725 7.5L19.3 8.925ZM17.85 10.4L7.25 21H3V16.75L13.6 6.15L17.85 10.4Z" fill="currentcolor"/>
          </g>
          <path d="M33.4091 17.5V5.86364H40.4318V7.11364H34.8182V11.0455H40.0682V12.2955H34.8182V16.25H40.5227V17.5H33.4091ZM46.0852 17.6818C45.358 17.6818 44.7159 17.4981 44.1591 17.1307C43.6023 16.7595 43.1667 16.2367 42.8523 15.5625C42.5379 14.8845 42.3807 14.0833 42.3807 13.1591C42.3807 12.2424 42.5379 11.447 42.8523 10.7727C43.1667 10.0985 43.6042 9.57765 44.1648 9.21023C44.7254 8.8428 45.3731 8.65909 46.108 8.65909C46.6761 8.65909 47.125 8.75379 47.4545 8.94318C47.7879 9.12879 48.0417 9.34091 48.2159 9.57955C48.3939 9.81439 48.5322 10.0076 48.6307 10.1591H48.7443V5.86364H50.0852V17.5H48.7898V16.1591H48.6307C48.5322 16.3182 48.392 16.5189 48.2102 16.7614C48.0284 17 47.7689 17.214 47.4318 17.4034C47.0947 17.589 46.6458 17.6818 46.0852 17.6818ZM46.267 16.4773C46.8049 16.4773 47.2595 16.3371 47.6307 16.0568C48.0019 15.7727 48.2841 15.3807 48.4773 14.8807C48.6705 14.3769 48.767 13.7955 48.767 13.1364C48.767 12.4848 48.6723 11.9148 48.483 11.4261C48.2936 10.9337 48.0133 10.5511 47.642 10.2784C47.2708 10.0019 46.8125 9.86364 46.267 9.86364C45.6989 9.86364 45.2254 10.0095 44.8466 10.3011C44.4716 10.589 44.1894 10.9811 44 11.4773C43.8144 11.9697 43.7216 12.5227 43.7216 13.1364C43.7216 13.7576 43.8163 14.322 44.0057 14.8295C44.1989 15.3333 44.483 15.7348 44.858 16.0341C45.2367 16.3295 45.7064 16.4773 46.267 16.4773ZM52.7273 17.5V8.77273H54.0682V17.5H52.7273ZM53.4091 7.31818C53.1477 7.31818 52.9223 7.22917 52.733 7.05114C52.5473 6.87311 52.4545 6.65909 52.4545 6.40909C52.4545 6.15909 52.5473 5.94508 52.733 5.76705C52.9223 5.58902 53.1477 5.5 53.4091 5.5C53.6705 5.5 53.8939 5.58902 54.0795 5.76705C54.2689 5.94508 54.3636 6.15909 54.3636 6.40909C54.3636 6.65909 54.2689 6.87311 54.0795 7.05114C53.8939 7.22917 53.6705 7.31818 53.4091 7.31818ZM60.3196 8.77273V9.90909H55.7969V8.77273H60.3196ZM57.1151 6.68182H58.456V15C58.456 15.3788 58.5109 15.6629 58.6207 15.8523C58.7344 16.0379 58.8783 16.1629 59.0526 16.2273C59.2306 16.2879 59.4181 16.3182 59.6151 16.3182C59.7628 16.3182 59.884 16.3106 59.9787 16.2955C60.0734 16.2765 60.1491 16.2614 60.206 16.25L60.4787 17.4545C60.3878 17.4886 60.2609 17.5227 60.098 17.5568C59.9351 17.5947 59.7287 17.6136 59.4787 17.6136C59.0999 17.6136 58.7287 17.5322 58.3651 17.3693C58.0052 17.2064 57.706 16.9583 57.4673 16.625C57.2325 16.2917 57.1151 15.8712 57.1151 15.3636V6.68182Z" fill="currentcolor"/>
        </svg>
      </button>
    </div>
  `;
}

function getRenderAssignedContacts(initial, name, color) {
  return `
    <div class="assigned-contact-open-task">
      <div class="initials-single-board" style="background-color:${color}"><h3>${initial}</h3></div>
      <h3>${name}</h3>
    </div>
  `;
}

function getrenderSubtasksFalseBoard(subtask, indexTask, subtaskIndex) {
  return `
    <button onclick="setSubtaskTrue('${indexTask}','${subtaskIndex}')" class="subtask-button-board">
      <div class="subtask-icon-board">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="4" y="4" width="16" height="16" rx="3" stroke="currentColor" stroke-width="2"/>
        </svg>
      </div>
      <h3>${subtask.text}</h3>
    </button>
  `;
}

function getrenderSubtasksTrueBoard(subtask, indexTask, subtaskIndex) {
  return `
    <button onclick="setSubtaskFalse('${indexTask}','${subtaskIndex}')" class="subtask-button-board">
    <div class="subtask-icon-board">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 11V17C20 18.6569 18.6569 20 17 20H7C5.34315 20 4 18.6569 4 17V7C4 5.34315 5.34315 4 7 4H15" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        <path d="M8 12L12 16L20 4.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </div>
    <h3>${subtask.text}</h3>
    </button>
  `;
}

function getRenderEditBoard(task, indexTask, color) {
  return `
    <div class="edit-task-header">
      <button class="close-button-open-task-board" onclick="closeOverlayButtonBoard('open_task_board', 'open_overlay_task_board')">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <mask id="mask0_71720_5535" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="4" y="4" width="24" height="24">
          <rect x="4" y="4" width="24" height="24" fill="#D9D9D9"/>
          </mask>
          <g mask="url(#mask0_71720_5535)">
          <path d="M16 17.4L11.1 22.3C10.9167 22.4834 10.6833 22.575 10.4 22.575C10.1167 22.575 9.88333 22.4834 9.7 22.3C9.51667 22.1167 9.425 21.8834 9.425 21.6C9.425 21.3167 9.51667 21.0834 9.7 20.9L14.6 16L9.7 11.1C9.51667 10.9167 9.425 10.6834 9.425 10.4C9.425 10.1167 9.51667 9.88338 9.7 9.70005C9.88333 9.51672 10.1167 9.42505 10.4 9.42505C10.6833 9.42505 10.9167 9.51672 11.1 9.70005L16 14.6L20.9 9.70005C21.0833 9.51672 21.3167 9.42505 21.6 9.42505C21.8833 9.42505 22.1167 9.51672 22.3 9.70005C22.4833 9.88338 22.575 10.1167 22.575 10.4C22.575 10.6834 22.4833 10.9167 22.3 11.1L17.4 16L22.3 20.9C22.4833 21.0834 22.575 21.3167 22.575 21.6C22.575 21.8834 22.4833 22.1167 22.3 22.3C22.1167 22.4834 21.8833 22.575 21.6 22.575C21.3167 22.575 21.0833 22.4834 20.9 22.3L16 17.4Z" fill="#2A3647"/>
          </g>
        </svg>
      </button>
    </div>
    <div class="edit-scroll-column">
      <div class="form-group">
        <label for="title">Title<span class="required">*</span></label>
        <input type="text" id="title" class="input-default" name="title" placeholder="Enter a title"
          oninput="validateInputTitel(); checkFormValidity()" onblur="validateInputTitel()" value="${task.title}"/>
        <span id="error-msg-title" class="error-msg d-none">This field is required</span>
      </div>
      <div class="form-group">
        <label for="description">Description</label>
        <textarea id="description" class="textarea-default" name="description" rows="4"
          placeholder="Enter a description">${task.description}</textarea>
      </div>
      <div class="form-group">
        <label for="due-date">Due Date<span class="required">*</span></label>
        <div class="input-container">
          <input type="date" id="due-date" class="input-default due-date" name="due-date" required
            oninput="validateInputDate(); checkFormValidity()" onblur="validateInputDate()" value="${task.dueDate}"/>
          <span id="error-msg-duedate" class="error-msg d-none">This field is required</span>
        </div>
      </div>
      <div class="form-group">
        <label>Priority</label>
        <div class="priority-options">
          <button onclick="selectPriority(this)" type="button" class="prio-btn" data-prio="urgent">
            Urgent <span class="prio-icon"><img src="./assets/svg/prio_urgent.svg"
                    alt="Prio High"></span>
          </button>
          <button onclick="selectPriority(this)" type="button" class="prio-btn"
            data-prio="medium">
            Medium <span class="prio-icon"><img src="./assets/svg/prio_medium.svg"
                    alt="Prio Medium"></span>
          </button>
          <button onclick="selectPriority(this)" type="button" class="prio-btn" data-prio="low">
            Low <span class="prio-icon"><img src="./assets/svg/prio_low.svg" alt="Prio Low"></span>
          </button>
        </div>
      </div>
      <div class="form-group">
        <label for="assigned-input">Assigned to</label>
        <div class="multiselect-container">
          <div class="multiselect" id="multiselect-assign"
            onclick="event.stopPropagation(); toggleAssignDropdown()" tabindex="0">
            <input type="text" placeholder="Select contacts to assign" id="multiselect-input-assign"
              class="multiselect-input" oninput="filterContacts()" autocomplete="off"/>
            <img class="multiselect-icon" id="multiselect-icon-assign"
              src="./assets/svg/arrow_dropdown_down.svg" alt="Toggle options">
          </div>
          <div class="multiselect-options assigned d-none" id="multiselect-assign-options"
            onclick="event.stopPropagation()">
            <!-- Javascript insert Contacts from Firebase -->
          </div>
          <div class="assigned-contacts" id="assigned-contacts">
            <!-- Javascript insert from Function -->
          </div>
        </div>
      </div>
      <div class="form-group">
        <label for="category-box">Category<span class="required">*</span></label>
        <div class="multiselect-container">
          <div class="multiselect" id="multiselect-category"
            onclick="event.stopPropagation(); toggleCategoryDropdown()"
            onfocusout="validateCategory()" tabindex="0">
            <span class="label-text" id="category-selected">${task.category}</span>
            <img class="multiselect-icon" id="multiselect-icon-category"
                  src="./assets/svg/arrow_dropdown_down.svg" alt="Toggle options">
          </div>
          <div class="multiselect-options d-none" id="multiselect-category-options">
            <div class="multiselect-option"
              onclick="event.stopPropagation(); selectCategoryOption('Technical Task')">Technical
              Task</div>
            <div class="multiselect-option"
              onclick="event.stopPropagation(); selectCategoryOption('User Story')">User Story
            </div>
          </div>
        </div>
        <span id="error-msg-category" class="error-msg d-none">This field is required</span>
      </div>
      <div class="form-group">
        <label>Subtasks</label>
        <div class="input-container">
          <input id="subtask-input" class="input-custom-subtask" type="text" name="subtasks"
            placeholder="Add new subtask" oninput="subtaskInput()" onclick="subtaskInput()">
          <div class="buttons-box">
            <img id="add-subtask-icon" class="input-default-icon" src="./assets/svg/subtask_add.svg"
              alt="Add subtask" onclick="subtaskInputIcon()">
            <img id="delete-subtask-icon" class="input-default-icon d-none"
              src="./assets/svg/subtask_close.svg" alt="Delete subtask" onclick="subtaskDelete()">
            <div class="verticalline-subtask d-none"></div>
            <img id="save-subtask-icon" class="input-default-icon d-none"
              src="./assets/svg/subtask_check.svg" alt="Save subtask" onclick="subtaskSave()">
          </div>
        </div>
        <div id="subtask_edit_board" class="subtask-list">
            <!-- Javascript insert from Function -->
        </div>
        <div class="input-container edit">
          <input id="subtask-edit" class=" subtask-edit d-none" type="text" name="subtask-edit"
            placeholder="Edit subtask">
          <div class=" buttons-box">
            <img id="edit-delete-icon" class="input-default-icon d-none"
              src="assets/svg/subtask_delete.svg" alt="Delete" onclick="cancelEditSubtask()">
            <div class="verticalline-subtask"></div>
            <img id="edit-save-icon" class="input-default-icon d-none"
              src="assets/svg/subtask_check.svg" alt="Save" onclick="saveEditedSubtask()">
          </div>
        </div>
      </div>
    </div>
    <div id="form-actions-add-task" class="form-actions-add-task">
      <div class="form-action-buttons">
        <button type="button" class="button-create-task" id="create-task-button" onclick="updateCurrentTask('${indexTask}','${color}')">
          Ok
          <img src="assets/svg/add_task_check_white.svg" alt="Check">
        </button>
      </div>
    </div>
  `;
}

function getRenderEditSubtasks(subtask) {
  return `
    <div class="subtask-item">
      <span class="subtask-text">• ${subtask}</span>
      <div class="subtask-actions d-none">
        <img src="./assets/svg/subtask_edit.svg" alt="Edit" class="subtask-action-icon" onclick="editSubtask(this)">
        <img src="./assets/svg/subtask_delete.svg" alt="Delete" class="subtask-action-icon" onclick="deleteSubtask(this)">
      </div>
    </div>
  `;
}

// added from Alex
function getMoveTaskOverlayTemplate() {
  return `
    <div id="move_task_overlay" class="move-task-overlay" onclick="overlayProtection(event)">
      <h3>Move to</h3>
      <button id="move_to_to_do" class="move-task-btn" onclick="moveTo('todo')">
        <img src="../assets/svg/move_to_arrow_upward.svg" alt="move_to_arrow_upward">
        <span class="move-task-span">To Do</span>
      </button>
      <button id="move_to_progress" class="move-task-btn" onclick="moveTo('progress')">
        <img src="../assets/svg/move_to_arrow_upward.svg" alt="move_to_arrow_upward">
        <span class="move-task-span">In Progress</span>
      </button>
      <button id="move_to_feedback" class="move-task-btn" onclick="moveTo('feedback')">
        <img src="../assets/svg/move_to_arrow_upward.svg" alt="move_to_arrow_upward">
        <span class="move-task-span">Feedback</span>
      </button>
      <button id="move_to_done" class="move-task-btn" onclick="moveTo('done')">
        <img src="../assets/svg/move_to_arrow_downward.svg" alt="move_to_arrow_downward">
        <span class="move-task-span">Done</span>
      </button>
    </div>
  `;
}
