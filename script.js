//dark mode controls

const toggleDarkMode = document.querySelector("#toggle-dark-mode");

toggleDarkMode.addEventListener("click", function () {
    const sun = document.querySelector(".sun");
    const moon = document.querySelector(".moon");
    const body = document.querySelector("body");
    body.classList.toggle("light-mode");
    body.classList.toggle("dark-mode");
    moon.classList.toggle("moon-active");
    sun.classList.toggle("sun-inactive");
    for (let i = 0; i < sun.children.length; i++) {
        sun.children[i].classList.toggle("sun-ray-cover-active");
    }
})

