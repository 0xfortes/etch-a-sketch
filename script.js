const container = document.querySelector("#main-grid");
let gridSize = 16;
let gridLines = true;
let defaultColor = "black";

createGrid();

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


function rainbowColor() {
    const red = Math.floor(Math.random()*256);
    const green = Math.floor(Math.random()*256);
    const blue = Math.floor(Math.random()*256);
    const rgbColor = `rgb(${red}, ${green}, ${blue})`;
    return rgbColor
}

const colorPick = document.querySelector("#pick");
colorPick.addEventListener("input", () => {
    defaultColor = colorPick.value;
})

const cleanButton = document.querySelector("#cleaner");
cleanButton.addEventListener("click", () => {
    cleanGrid();
})

function cleanGrid() {
    while(container.firstChild) {
        container.removeChild(container.firstChild);
    }
    createGrid();
}

const sizeGrid = document.querySelector("#grid-slider");
sizeGrid.addEventListener("input", () => {
    const slideText = document.querySelector("#slider-text");
    slideText.textContent = sizeGrid.value;
    gridSize = sizeGrid.value;
    cleanGrid();
})



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
