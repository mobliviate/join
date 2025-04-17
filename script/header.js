async function loadHeader() {
  const response = await fetch("header.html");
  const headerHTML = await response.text();
  document.getElementById("header").innerHTML = headerHTML;
}
