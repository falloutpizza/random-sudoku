//dark mode controls

const toggleDarkMode = document.querySelector("#toggle-dark-mode");

toggleDarkMode.addEventListener("click", function () {
    const moon = document.querySelector("#moon");
    const sun = document.querySelector("#sun");
    const body = document.querySelector("body");
    body.classList.toggle("light-mode");
    body.classList.toggle("dark-mode");
    moon.classList.toggle("moon-cover-active");
    sun.classList.toggle("sun-cover-active")
})