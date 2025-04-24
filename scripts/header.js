async function loadHeader(htmlFile) {
  const response = await fetch(htmlFile);
  const headerHTML = await response.text();
  document.getElementById("header").innerHTML = headerHTML;
}
