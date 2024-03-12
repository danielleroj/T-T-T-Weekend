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
    "null": "white",
    "1": "CadetBlue",
    "-1": "Plum"
};

const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// state variables
let board;
let winner;
let turn;

// cached elements
const messageEl = document.querySelector("h2")
const resetGameBtn = document.querySelector("button");
const squares = [...document.querySelectorAll(".ttt-square")];

// event listeners
resetGameBtn.addEventListener("click", init);
document.getElementById("board").addEventListener("click", handleSquareClick);

// functions
init ();

function init() {
    board = [null, null, null, null, null, null, null, null, null];
    winner = null;
    turn = 1;
    render();
};

function handleSquareClick(evt) {
    const idx = parseInt(evt.target.id.replace("s", ""));
    if (isNaN(idx) || board[idx] || winner)
    return;
    // for (let i = 0; i < squares.length; i++) {
    //     if (squares[i] === evt.target) {
    //         handlePlay(i);
    //         break;
    //     }
        // if (winner !== null) {
        //     return;
        // }
        board[idx] = turn;
        winner = checkWinner();
        turn *=-1; //toggle
    render();
}

function checkWinner() {
    // loop
    for (let combo of winningCombos) {
        if (Math.abs(board[combo[0]] + board[combo[1]] + board[combo[2]]) === 3) {
            return turn;
        }        
    // winningCombos.forEach(function(winningCombo) {
    //     let total = board[winningCombo[0]] + board[winningCombo[1]] + board[winningCombo[2]];        
    //     total = Math.abs(total);
    //     if (total === 3) {
    //         return turn;
     }
        if (board.includes(null)) return null;
        return  "T";
}

function render() {
    renderBoard();
    renderMessage();
}

function renderBoard() {
    // looping over board array
    board.forEach(function(square, idx) {
        // access the corresponding square
        const squareEl = document.getElementById(`s${idx}`);
        if (square === 1) {
            squareEl.innerText = "X";
        } else if (square === -1) {
            squareEl.innerText = "O";
        } else {
            squareEl.innerText = "";
        }
        squareEl.style.backgroundColor = COLOR_LOOKUP[square];
        squareEl.className = !square ? "avail" : "";
    });
}

function renderMessage() {
    if (winner === "T") {
        // tie game
        messageEl.innerText = "No one wins - try again!";
    } else if (winner) {
        // winner
        messageEl.innerHTML = `<span style="color: ${COLOR_LOOKUP[winner]}">${COLOR_LOOKUP[winner].toUpperCase()}</span> wins!`;
    } else {
        // turn
        messageEl.innerHTML = `<span style="color: ${COLOR_LOOKUP[turn]}">${COLOR_LOOKUP[turn].toUpperCase()}</span>'s turn`;
    }
}
