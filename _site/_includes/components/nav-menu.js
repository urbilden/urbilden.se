// let navButton = document.getElementById('navigation').appendChild(HTMLButtonElement);

const nav = document.getElementById("navigation");
const navButton = document.createElement("button");
navButton.classList.add("nav-button")

nav.insertBefore(navButton, nav.children[0]);

navButton.textContent = "Meny";

const menu = navButton.nextElementSibling;
menu.hidden = "hidden";

navButton.addEventListener('click', function() {
  let expanded = this.getAttribute('aria-expanded') === 'true' || false;
  this.setAttribute('aria-expanded', !expanded);
  // let menu = this.nextElementSibling;
  menu.hidden = !menu.hidden;
})
