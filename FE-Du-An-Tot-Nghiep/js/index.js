const menu = document.getElementById("menu");
const button_menu = document.getElementById("btn-menu");

button_menu.addEventListener("click", () => {
  menu.classList.toggle("hidden");
});
