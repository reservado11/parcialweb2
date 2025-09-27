document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".tab");
  const currentPage = window.location.pathname.split("/").pop();

  tabs.forEach(tab => {
    const target = tab.dataset.target;
    let file = target + ".html";
    if (target === "muro") file = "index.html"; 

    
    if (file === currentPage || (currentPage === "" && file === "index.html")) {
      tab.classList.add("active");
    }

    
    tab.addEventListener("click", () => {
      window.location.href = file;
    });
  });
});