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

//enabling pencil markings
let curNum = ""
let pencilEnabled = false
const slider = document.querySelector(".pencil-markings");
const numbers = document.querySelectorAll(".number");

slider.addEventListener("click", function () {
    const sliderButton = document.querySelector(".slider");
    pencilEnabled = !pencilEnabled;
    sliderButton.classList.toggle("slider-enabled");
    slider.classList.toggle("slider-enabled-bg")
    for (let i = 0; i < numbers.length; i++) {
        numbers[i].classList.toggle("number-pencil-marking");
    };
})

//number selection

for (let i = 0; i < numbers.length; i++) {
    numbers[i].addEventListener("click", function () {
        for (let j = 0; j < numbers.length; j++) {
            if (numbers[j].classList.contains("number-selected") && j !== i) {
                numbers[j].classList.remove("number-selected")
            }
        }
        numbers[i].classList.toggle("number-selected");
        if (curNum !== numbers[i].innerText) {
            curNum = numbers[i].innerText;
        } else {
            curNum = ""
        }
    });
};

//placing numbers
const numGrid = document.querySelectorAll(".number-grid")
for (let i = 0; i < numGrid.length; i++) {
    numGrid[i].addEventListener("click", function () {
        if (!pencilEnabled) {
            if (curNum === numGrid[i].innerText) {
                numGrid[i].innerText = ""
            } else if (curNum !== "") {
                numGrid[i].innerText = curNum;
            }
        } else {
            let pencilMarks = numGrid[i].children[0].innerText
            if (pencilMarks.includes(curNum)) {

                let newList = pencilMarks.slice(0, pencilMarks.indexOf(curNum));
                newList = newList + pencilMarks.slice(pencilMarks.indexOf(curNum) + 1, pencilMarks.length);
                numGrid[i].children[0].innerText = newList;
            } else {
                numGrid[i].children[0].innerText += curNum;
            }

        }
    })
}
