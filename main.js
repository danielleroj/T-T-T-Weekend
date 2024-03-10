/* 1) Define required constants

2) Define required variables used to track the state of the game

3) Store elements on the page that will be accessed in code more than once in variables to make code more concise, readable and performant.

4) Upon loading the app should:
  4.1) Initialize the state variables
  4.2) Render those values to the page
  4.3) Wait for the user to click a square

5) Handle a player clicking a square

6) Handle a player clicking the replay button */

// constants
const COLOR_LOOKUP = {
    "null": white,
    "1": #FFD4E51,
    "-1": #BEE4E7
};

const WINNING_COMBOS = {
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    [0, 4, 8],
    [2, 4, 6]
};

// state variables
let board;
let winner;
let turn;

// cached elements
const messageEl = document.querySelector("h2")
const resetGameBtn = document.querySelector("button");
const squares = Array.from(document.querySelectorAll("#board > div"));

// event listeners
resetGameBtn.addEventListener("click", init);

// functions
init ();

function init() {
    board = [
        [null, null, null] //col 0
        [null, null, null] //col 1
        [null, null, null] //col 2
    ]
};

    winner = null;
    turn = 1;
    
    render();

function render() {
    renderBoard();
    renderMessage();
}

function renderMessage() {
    if (winner === "T") {
        // tie game
        messageEl.innerText = "No one wins - try again!";
    } else if(winner) {
        // winner
        messageEl.innerHTML = `<span style="color: ${COLOR_LOOKUP[winner]}">${COLOR_LOOKUP[winner]}</span> wins!`;
    } else {
        // turn
        messageEl.innerHTML = `<span style="color: ${COLOR_LOOKUP[turn]}">${COLOR_LOOKUP[turn]}'s turn`;
    }
}

function renderBoard() {
      board.forEach(function(colArray, colIdx)  {
        colArray.forEach(function(cellValue, rowIdx) {
        const cellId = `c${colIdx}r${rowIdx}`;
        const cellEl = document.getElementById(cellId);
        cellEl.style.backgroundColor = COLOR_LOOKUP[cellValue];
        });
      });
}
