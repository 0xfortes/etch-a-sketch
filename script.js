const container = document.querySelector("#main-grid");
let gridSize = 16;
let gridLines = true;
let defaultColor = "black";


//We add a functionality to the following buttons. Basically we are giving each button an action for when we click on them they pick the respective colors
const colors = document.querySelectorAll("button");
colors.forEach((button) => {
    button.addEventListener("click", (e) => {
        e.stopPropagation;
        let userPick = e.target.id;
        if (userPick === "default-color") {
            defaultColor = "black";   
        } else if (userPick === "eraser") {
            defaultColor = "white";
        } else {
            defaultColor = userPick;
        }

     })

})

// We choose a color from the color picker and our program will use that color we picked
const colorPick = document.querySelector("#pick");
colorPick.addEventListener("input", () => {
    defaultColor = colorPick.value;
})

// Add a button action to clean the grid when we click on it
const cleanButton = document.querySelector("#cleaner");
cleanButton.addEventListener("click", () => {
    cleanGrid();
})

// We define a function to reset the grid by removing the old grid and creating a new one
function cleanGrid() {
    while(container.firstChild) {
        container.removeChild(container.firstChild);
    }
    createGrid();
}

// Adjusts the n*n size of our grid
const sizeGrid = document.querySelector("#grid-slider");
sizeGrid.addEventListener("input", () => {
    const slideText = document.querySelector("#slider-text");
    slideText.textContent = sizeGrid.value;
    gridSize = sizeGrid.value;
    cleanGrid();
})

// Function definition for the rainbow button color. Each square will have a random color assigned
function rainbowColor() {
    const red = Math.floor(Math.random()*256);
    const green = Math.floor(Math.random()*256);
    const blue = Math.floor(Math.random()*256);
    const rgbColor = `rgb(${red}, ${green}, ${blue})`;
    return rgbColor
}

// Function definition to create our grid. Adding an event listener that will draw the colors that the user has picked when we mouseover each square of the grid
function createGrid() {
    
    for (let i = 1; i <= gridSize**2; i++) {
        const newDiv = document.createElement('div');
        newDiv.classList.add("g-cell");
        container.append(newDiv);
    }

    container.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
    container.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;

    const cells = document.querySelectorAll(".g-cell");
    cells.forEach((cell) => {
        cell.addEventListener("mouseenter", (e) => {
            if (defaultColor === "rainbow-color") {
                e.target.style.backgroundColor = rainbowColor();
            } else {
                e.target.style.backgroundColor = defaultColor;
            }
        })
    })
}

createGrid();