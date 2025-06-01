'use strict';

/**
 * Generates a button template with an onclick event to toggle the password visibility icon.
 *
 * @param {string} inputId - The ID of the input field associated with the button.
 * @param {string} iconId - The ID of the icon element to be toggled.
 * @returns {string} The HTML string for the button element.
 */
function getButtonTemplate(inputId, iconId) {
    return `
        <button onclick="changePasswordIcon('${inputId}', '${iconId}')" class="input-icon-btn" type="button">
                <img id=${iconId} src="assets/png/visibility_off.png">
        </button>
    `;
}

/**
 * Generates an icon template with a specified ID.
 *
 * @param {string} iconId - The ID to be assigned to the icon element.
 * @returns {string} The HTML string for the icon element.
 */

function getIconTemplate(iconId) {
    return `
        <img id=${iconId} src="assets/png/lock.png">
    `;
}