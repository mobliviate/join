function highlightActiveSidebarLink() {
  const currentPath = window.location.pathname;
  const currentPage = currentPath.substring(currentPath.lastIndexOf("/") + 1);
  const sidebarLinks = document.querySelectorAll(".sidebar-link");

  for (let i = 0; i < sidebarLinks.length; i++) {
    const link = sidebarLinks[i];
    const pageName = link.getAttribute("data-page");

    if (pageName === currentPage) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  }
}
