const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

let currentPlayer;
let gameGrid;

const winningPosition = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

// let create a function to initialize the game
function initGame() {
    currentPlayer = "X";
    gameGrid = ["","","","","","","","",""];

    // UI per empty bhi karna padega boxes ko
    boxes.forEach((box,index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        // After winning also remove background green color
        // Initalise box with css properties
        box.classList = `box box${index+1}`;
    });


    
    newGameBtn.classList.remove("Active");
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

initGame();

function swapTurn() {
    if(currentPlayer === "X")
    {
        currentPlayer = "O";
    }
    else
    {
        currentPlayer = "X";
    }

    // UI Update
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
};

function checkGameOver() {
    let answer = "";

    winningPosition.forEach((position) => {
        // All 3 boxes are non-empty and exactly same in value
        if((gameGrid[position[0]] != "" || gameGrid[position[1]] != "" || gameGrid[position[2]] != "") && (gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[1]] === gameGrid[position[2]]))
        {
            // Check if winner is X
            if(gameGrid[position[0]] === "X")
            {
                answer = "X";
            }
            else
            {
                answer = "O";
            }

            // Disable pointer events
            boxes.forEach((box) => {
                box.style.pointerEvents = "none";
            })

            // Now er know either X or O is a winner
            //Make their indexs background green
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }
    });

    // it means we have a winner
    if(answer !== "")
    {
        gameInfo.innerText = `Winner player - ${answer}`;
        newGameBtn.classList.add("active");
        return;
    }

    // let's Check weather there is tie
    let fillCount = 0;
    gameGrid.forEach((box) => {
        if(box !== "")
        {
            fillCount++;
        }
    });

    // borde is filled , game is tied
    if(fillCount === 9)
    {
        gameInfo.innerText = "Game Tied !";
        newGameBtn.classList.add("active");
    }
};

function handleClick(index) {
    if(gameGrid[index] === "")
    {
        // Rendering in UI
        boxes[index].innerText = currentPlayer;

        // game Grid ka inner logic/Status
        gameGrid[index] = currentPlayer;

        boxes[index].style.pointerEvents = "none";

        // Swap turn
        swapTurn();

        // check karo koi jeet tho nahi gaya
        checkGameOver();
    }
};

// To add eventListeners to all the grids so taking forEach
// Index -> to know which box we have clicked
boxes.forEach((box,index) => {
    box.addEventListener("click" , () => {
        handleClick(index);
    })
});


newGameBtn.addEventListener( "click" , initGame);
