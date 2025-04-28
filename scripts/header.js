// async function loadHeader(htmlFile = "./header.html") {
//   const response = await fetch(htmlFile);
//   const headerHTML = await response.text();
//   document.getElementById("header").innerHTML = headerHTML;
// }

function loadHeader() {
  document.getElementById("header").innerHTML = getHeaderTemplate(loginState ? undefined : "");
}