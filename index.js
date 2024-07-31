const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

let currentPlayer ;
let gameGrid;

const winningPositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

//let's create a function to initialize the game

function initGame(){
    currentPlayer = "X";
    gameGrid =["","","","","","","","",""];
    //UI pr empty krooo
    boxes.forEach( (box,index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        box.classList = `box box${index +1}`;
            
    });
    newGameBtn.classList.remove("active");
      
    gameInfo.innerText = `CURRENT PLAYER - ${currentPlayer}`;
}
initGame();

function swapTurn(){
    if(currentPlayer === "X"){
        currentPlayer = "O";
    }else{
        currentPlayer = "X";
    }
    //UI update
    gameInfo.innerText = `CURRENT PLAYER - ${currentPlayer}`;
}

function checkGameOver(){
    let answer = "";
    // console.log("h1");
    winningPositions.forEach((position) => {
        if((gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "")
            &&(gameGrid[position[0]] === gameGrid[position[1]]) && ( gameGrid[position[1]] === gameGrid[position[2]] )) {
        
        //check if winner is X
        if(gameGrid[position[0]] === "X")
           answer = "X";
        else
            answer = "O";
    //disable pointer events
    boxes.forEach((box) => {
        box.style.pointerEvents = "none"
    })

        //now we know X/O is a winner
        // console.log("h2 ");
        boxes[position[0]].classList.add("win");
        boxes[position[1]].classList.add("win");
        boxes[position[2]].classList.add("win");

    }

    });
    if(answer !== ""){
    gameInfo.innerText = `WINNER PLAYER - ${answer}`;   
    newGameBtn.classList.add("active");
    return;
    }
 
    let fillCount = 0;
    gameGrid.forEach((box) => {
        if(box !== ""){
            fillCount++;
        }
    });
    //board is filled game is TIE
    if(fillCount === 9){
        gameInfo.innerText = "GAME TIED!!";
        newGameBtn.classList.add("active");
    }


}

function handleClick(index){
    if(gameGrid[index] === ""){
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none"

        //swap kro turn ko
        swapTurn();
        //check koi jeet to nhi gaya
        checkGameOver();
    }
    
}


boxes.forEach( (box,index) => {
    
    box.addEventListener("click", () => {
        handleClick(index); 
    })

});

newGameBtn.addEventListener("click" , initGame);