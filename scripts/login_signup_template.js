'use strict';

function getButtonTemplate(inputId, iconId) {
    return `
        <button onclick="changePasswordIcon('${inputId}', '${iconId}')" class="input-icon-btn" type="button">
                <img id=${iconId} src="assets/png/visibility_off.png">
        </button>
         `;
}

function getIconTemplate(iconId) {
    return `
        <img id=${iconId} src="assets/png/lock.png">
    `;
}