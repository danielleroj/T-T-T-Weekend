// constants
const COLOR_LOOKUP = {
  null: "white",
  1: "CadetBlue",
  "-1": "Plum",
};

const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// state variables
let board;
let winner;
let turn;

// cached elements
const messageEl = document.querySelector("h2");
const resetGameBtn = document.querySelector("button");
const squares = [...document.querySelectorAll(".ttt-square")];

// event listeners
resetGameBtn.addEventListener("click", init);
document.getElementById("board").addEventListener("click", handleSquareClick);

// functions
init();

function init() {
  board = [null, null, null, null, null, null, null, null, null];
  winner = null;
  turn = 1;
  render();
}

function handleSquareClick(evt) {
  const idx = parseInt(evt.target.id.replace("s", ""));
  if (isNaN(idx) || board[idx] || winner) return;
  // }
  board[idx] = turn;
  winner = checkWinner();
  turn *= -1; //toggle
  render();
}

function checkWinner() {
  // loop
  for (let combo of winningCombos) {
    if (Math.abs(board[combo[0]] + board[combo[1]] + board[combo[2]]) === 3) {
      return turn;
    }
  }
  if (board.includes(null)) return null;
  return "T";
}

function render() {
  renderBoard();
  renderMessage();
}

function renderBoard() {
  // looping over board array
  board.forEach(function (square, idx) {
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
    const winnerSymbol = winner === 1 ? "X" : "O";
    messageEl.innerHTML = `<span style="color: ${COLOR_LOOKUP[winner]}">${winnerSymbol}</span> wins!`;
  } else {
    // turn
    const turnSymbol = turn === 1 ? "X" : "O";
    messageEl.innerHTML = `<span style="color: ${COLOR_LOOKUP[turn]}">${turnSymbol}</span>'s turn`;
  }
}
