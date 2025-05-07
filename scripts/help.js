/**
 * Initializes the help page by setting up the HTML structure and content.
 * This function replaces the current body content with a template,
 * loads the help header, and populates the main section with help content.
 */
function initHelp() {
  loadBody();
  loadHeader();
  hideHelpLink();
  document.getElementById("main").innerHTML = getHelpContent();
}

/**
 * Generates the HTML markup for a single step in a help guide.
 *
 * @param {Object} step - An object containing the step details.
 * @param {string} step.title - The title of the step.
 * @param {string} step.text  - The descriptive text for the step.
 * @param {number} index - The zero-based index of the current step in the list.
 * @returns {string} A string of HTML representing one formatted step in the guide.
 */

/**
 * Combines all steps into a single HTML string for the help guide.
 *
 * This function iterates over a list of predefined steps, uses
 * `createStepHTML` to generate HTML for each step, and then concatenates
 * them into one HTML snippet.
 *
 * @returns {string} The combined HTML string for all steps in the help guide.
 */

function getSteps() {
  const steps = [
    {
      title: "Exploring the Board",
      text: 'Wenn du dich bei <span class="blue">Join</span> anmeldest, siehst du ein Board mit vier Listen: "To Do", "In Progress", "Await feedback" und "Done".',
    },
    {
      title: "Creating Contacts",
      text: 'Gehe zum Bereich "Contacts", klicke auf "New contact" und trage dort die Infos ein. Diese Kontakte kannst du dann Aufgaben zuweisen.',
    },
    {
      title: "Adding Cards",
      text: 'Klicke auf das "+" unter einer Liste, um eine neue Aufgabe zu erstellen. Gib Titel, Beschreibung, Fälligkeitsdatum usw. ein.',
    },
    {
      title: "Moving Cards",
      text: "Du kannst Aufgaben ganz einfach per Drag & Drop zwischen den Listen verschieben.",
    },
    {
      title: "Deleting Cards",
      text: 'Du kannst Aufgaben löschen oder in die Liste "Done" verschieben. Achtung: Gelöschte Aufgaben sind weg und können nicht wiederhergestellt werden!',
    },
  ];

  return steps.map(createStepHTML).join("");
}
