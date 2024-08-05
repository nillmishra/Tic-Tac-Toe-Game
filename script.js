const boxes = document.querySelectorAll(".box")
const gameInfo = document.querySelector(".game-info")
const newGameBtn = document.querySelector(".btn")

const winnerPosition = [
    [0, 1, 2], // Top row
    [3, 4, 5], // Middle row
    [6, 7, 8], // Bottom row
    [0, 3, 6], // Left column
    [1, 4, 7], // Middle column
    [2, 5, 8], // Right column
    [0, 4, 8], // Diagonal from top-left to bottom-right
    [2, 4, 6]  // Diagonal from top-right to bottom-left
];

let currentPlayer;
let gameGrid;

function initGame(){
    currentPlayer = "X"
    gameGrid = ["", "", "", "", "", "","", "", ""]
    //UI
    boxes.forEach((box, index) => {
        box.innerText ="";
        boxes[index].style.pointerEvents = "all"
        box.classList = `box box${index+1}`
    }) 

    newGameBtn.classList.remove("active")
    gameInfo.innerText = `Current Player - ${currentPlayer}`
}
initGame()

function swapTurn(){
    if(currentPlayer === "X"){
        currentPlayer ="0"
    }
    else{
        currentPlayer ="X"
    }
    gameInfo.innerText = `Current Player - ${currentPlayer}`
}

function checkGameOver(){
    let answer =""
    winnerPosition.forEach((position) =>{
        if((gameGrid[position[0]] != "" || gameGrid[position[1]] != "" || gameGrid[position[2]] != "") && (gameGrid[position[0]] === gameGrid[position[1]] && gameGrid[position[1]] === gameGrid[position[2]])){
            if(gameGrid[position[0]] === "X"){
                answer = "X"
            }
            else{
                answer = "0"
            }
            boxes.forEach((box) => {
                box.style.pointerEvents = "none"
            })
            boxes[position[0]].classList.add("win")
            boxes[position[1]].classList.add("win")
            boxes[position[2]].classList.add("win")
        }
    })
    if(answer != ""){
        gameInfo.innerText =`Winner Player - ${answer}`
        newGameBtn.classList.add("active")
    }
    else if (!gameGrid.includes("")) {
        gameInfo.innerText = "Game Tied!";
        newGameBtn.classList.add("active");
    }
}

function handleCheck(index){
    if(gameGrid[index] === ""){
        boxes[index].innerHTML = currentPlayer;
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none"

        swapTurn()

        checkGameOver()
    }
}

boxes.forEach((box, index) =>{
    box.addEventListener('click', () =>{
        handleCheck(index);
    })
})

newGameBtn.addEventListener('click', initGame)