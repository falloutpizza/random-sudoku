//list of variables used in multiple places
let curNum = ""
let pencilEnabled = false
let numInputs = [0, 0]
const slider = document.querySelector(".pencil-markings");
const numbers = document.querySelectorAll(".number");
const toggleDarkMode = document.querySelector("#toggle-dark-mode");
const numGrid = document.querySelectorAll(".number-grid")

//initialising board
function intialiseBoard(boardArray, solutionArray) {
    //format of boardArray:
    //[ [x x x x x x x x x ] * 9]
    // each row will represent one sudoku row
    // 0 will represent an unfilled box
    let curRowElements
    let rows = [];
    for (let i = 1; i < 10; i++) {
        curRowElements = document.getElementsByClassName(`row-${i}`);
        rows.push(curRowElements);
    }

    for (let i = 0; i < 9; i++) { //for looping through rows
        for (let j = 0; j < 9; j++) { //for looping through columns
            if (boardArray[i][j] !== 0) {
                rows[i][j].innerText = boardArray[i][j].toString();
                rows[i][j].classList.add("occupied")
            } else {
                rows[i][j].classList.add(`col-${j + 1}-val-${solutionArray[i][j]}`)
                numInputs[1]++
            }
        }
    }
}

//number selection
function selectNumberThenGrid() {
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
}

//placing numbers
function placeNumNumbersFirst() {
    for (let i = 0; i < numGrid.length; i++) {
        numGrid[i].addEventListener("click", function () {
            if (this.classList.contains("occupied") === false) {
                const correct = checkNumPlacement(this.classList[1], this.classList[2]);
                if (!pencilEnabled && correct) {
                    numGrid[i].innerText = curNum;
                    numInputs[0]++;
                    numGrid[i].classList.add("occupied");
                    if (numInputs[0] === numInputs[1] && numInputs[0] !== 0) {
                        alert("congrats, puzzle solved!")
                    }
                } else if (!pencilEnabled && !correct) {
                    alert("oops! this doesn't belong here!");
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
            }
        })

    }
}

//checking if number is correctly placed
function checkNumPlacement(rowClass, colClass) {
    //format: "row-x", "col-x-val-y"
    const row = parseInt(rowClass[4]);
    const col = parseInt(colClass[4]);
    const val = parseInt(colClass[10]);
    return (curNum == val)
}


//dark mode controls
function darkMode() {
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
}

darkMode()

//enabling pencil markings
function pencilMarkings() {
    slider.addEventListener("click", function () {
        const sliderButton = document.querySelector(".slider");
        pencilEnabled = !pencilEnabled;
        sliderButton.classList.toggle("slider-enabled");
        slider.classList.toggle("slider-enabled-bg")
        for (let i = 0; i < numbers.length; i++) {
            numbers[i].classList.toggle("number-pencil-marking");
        };
    })
}
pencilMarkings()

//getting daily sudoku
async function getDailySudoku() {
    try {
        const sudokuData = await axios.get("https://sudoku-api.vercel.app/api/dosuku?difficulty=easy")
        console.log(sudokuData.data.newboard.grids[0].difficulty)
        let sudoku = sudokuData.data.newboard.grids[0];
        return sudoku;
    } catch {
        alert("sorry, some error occured :(")
    }
}

async function init() {
    let sudoku = await getDailySudoku();
    intialiseBoard(sudoku.value, sudoku.solution);

}

init();

//calling functions that are set
selectNumberThenGrid();
placeNumNumbersFirst();

