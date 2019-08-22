"use strict";

window.addEventListener('load', start); //To load the content of the webpage

let board = ['', '', '', '', '', '', '', '', '']; //At the beginning, the board is empty
let turn = 0; // Know if it's the turn of the player who chose X or if it's the turn of the player who choose O
let winner = false;

//function that will enable to enter the two player's name
const player = function (playerName) {
  playerName  = playerName;
  return {playerName};
}

 let firstPlayer = player("");
 let secondPlayer = player("");

 // Function to start the game
function start () {
  
  let inputField = document.querySelector('.input-section').focus(); //Input field is focused so we know that it is important to enter names

  const addNames = document.querySelector('#player-form'); //Add player's names in the form section
  addNames.addEventListener('submit', addPlayers);

  let replayBtn = document.querySelector('.replay-btn'); //Reset the game once we have a winner
  replayBtn.addEventListener('click', resetGrid);
}

// Function to add players. If there are no names entered, an alert will pop up and the game cannot start
function addPlayers(event) {
  event.preventDefault();

  if (this.playerOne.value === '' || this.playerTwo.value === '') {
    alert('⚠️ You Must Enter a Name for Each Field! ⚠️');
    return;
  }

  const playerForm = document.querySelector('.enter-names');
  const gameBoard = document.querySelector('.main-grid');
  playerForm.classList.add('hide-container');
  gameBoard.classList.remove('hide-container');

  firstPlayer.name = this.playerOne.value; //The name of the first player will be the one entered in the form section
  secondPlayer.name = this.playerTwo.value; //The name of the second player will be the one entered in the form section
  buildBoard();
}

// Function that enable to return the current player
function currentPlayer() {
  return turn % 2 === 0 ? 'X' : 'O';
}

// Function that will enable to make the grid responsive according to the webpage size 
window.addEventListener("resize", resizeGrid);
function resizeGrid() {
  let allSquares = document.querySelectorAll('.board-square');
  let squareHeight = allSquares[0].offsetWidth;
  
  allSquares.forEach(function (square) {
    square.style.height = `${squareHeight}px`;
  });
}

// Function to build the board game: initialize the board game, enable players to click on square to put X or O and change current player's name
function buildBoard() {
  let resetContainer = document.querySelector('.reset');
  resetContainer.classList.remove('reset-hidden');

  resizeGrid();
  addClickListener();
  changeNameOfCurrentPlayer();
}

// Fucntion that enable players to parse the grid: if the square is not empty and a player try to pass somthing in it, an alert will pop up otherwise, the symbol will be added to the sqaure
function parseGrid(event) {
  console.log(turn);
  
  let currentSquare = parseInt(event.currentTarget.firstElementChild.dataset.id);
  let addSymbolToSquare = document.querySelector(`[data-id='${currentSquare}']`); //we select the current square to see if we can put a symbol in it
  
  if (addSymbolToSquare.innerHTML !== '') {
    alert('🚨 This square is not empty, choose another one. 🚨');
    return;
  } else {
    if (currentPlayer() === 'X') {
      addSymbolToSquare.textContent = currentPlayer();
      board[currentSquare] = 'X';
    } else {
      addSymbolToSquare.textContent = currentPlayer();
      board[currentSquare] = 'O';
    }
  }
    
  isWinner(); // Call the function isWinner to see if we have a winner or not
    
  turn++; // Update turn count so next player can choose
  
  changeNameOfCurrentPlayer(); // Change the name of the current player according to the turn
}

// Function that will check if the game end with a tie
function isTied() {
  if (turn > 7) {
   const mySound = new Audio("../music/huee.mp3");
   mySound.play()
  alert(' 👎🏼 Too sad, both of you have lost the game 👎🏼')
  //console.log("lost")

  
  }
}

/*Function to see which player is a winner.
First we stock in a vaiable the winning possibilities.
*/
function isWinner() {
  const winningPossibilities = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];


//Function which check if the current player managed to put 3 X or 3 O
  winningPossibilities.forEach(function(winningCombos) {
    let squareOne = winningCombos[0];
    let squareTwo = winningCombos[1];
    let squareThree = winningCombos[2];
    if (
     board[squareOne] === currentPlayer() &&
     board[squareTwo] === currentPlayer() &&
     board[squareThree] === currentPlayer()
    ) {

      const cells = document.querySelectorAll('.board-square');
      let symbolId1 = document.querySelector(`[data-id='${squareOne}']`);
      let symbolId2 = document.querySelector(`[data-id='${squareTwo}']`);
      let symbolId3 = document.querySelector(`[data-id='${squareThree}']`);
      
      cells.forEach(function(square) {
        let squareId = square.firstElementChild.dataset.id;	

        if (squareId == squareOne || squareId == squareTwo || squareId == squareThree ) {
          square.classList.add('winning-board');
        }
      });

      let currentPlayerText = document.querySelector('.player-turn');
      if (currentPlayer() === 'X') {
        currentPlayerText.innerHTML = `
          <div class="congratulations">Congrats champs!!!! 🏆🥇</div>
          <div class="u-r-winner onclick="playSound4();"">you killed it ${firstPlayer.name}!🔥</div>
          <audio id="audio-4" src="./music/applause.mp3" autoplay="false" ></audio>

        `;
        winner = true;
        removeClickListener();
        return true;
      } else {
        currentPlayerText.innerHTML = `
          <div class="congratulations">Congrats champs!!!! 🏆🥇</div>
          <div class="u-r-winner"  onclick="playSound4();">you killed it ${secondPlayer.name}!🔥</div>
          <audio id="audio-4" src="./music/applause.mp3" autoplay="false" ></audio>
        `;
        winner = true;
        removeClickListener();
        return true;
      }
    }
  });

  if (!winner) {
    isTied(); //if there is no winner, the isTied function will be executed.
  }
  return false;
}

//Function that will change the current player's name and will display a message next to the player's name
function changeNameOfCurrentPlayer() {
  if (!winner) {
    let currentPlayerText = document.querySelector('.player-turn');
    if (currentPlayer() === 'X') {
      currentPlayerText.innerHTML = `
        <span class="name--style">${firstPlayer.name}</span>, it's your turn! 😊
        <div class="u-r-winner"></div>  `
    }  else {
      currentPlayerText.innerHTML = `
        <span class="name--style">${secondPlayer.name}</span>, it's your turn!😀
        <div class="u-r-winner"></div>
      `
    }
  }
}


//Function that will reset the grid, the turn count and reset the winner status to false
function resetGrid() {
  console.log('the grid has been reset');
  
 board = ['', '', '', '', '', '', '', '', '']; 
  
  let addSymbolToSquare = document.querySelectorAll('.symbol');
  addSymbolToSquare.forEach(function(square) {
    square.textContent = '';
    square.parentElement.classList.remove('winning-board');
  });

  turn = 0;
  winner = false;

  let currentPlayerText = document.querySelector('.player-turn');
  currentPlayerText.innerHTML = `
    <span class="name--style">${firstPlayer.name}</span>, it's your turn!
    <div class="u-r-winner"></div>


  `
  addClickListener();
}



function addClickListener() {
  const squares = document.querySelectorAll('.board-square');
  squares.forEach(function (square)  {
    square.addEventListener('click', parseGrid);
  });
}

function removeClickListener() {
  let allSquares = document.querySelectorAll('.board-square');
  allSquares.forEach(function (square) {
    square.removeEventListener('click', parseGrid);
  });
}

//Will play a song when we click on press play
function playSound() {
      let sound = document.getElementById("audio");
      sound.play();
  }

  function playSound2() {
    let sound = document.getElementById("audio-2");
    sound.play();
}

function playSound3() {
  let sound = document.getElementById("audio-3");
  sound.play();
}

function playSound4() {
  let sound = document.getElementById("audio-4");
  sound.play();
}

/*
function generateRandomColor() {
  return '#'+Math.floor(Math.random()*16777215).toString(16);
}

function changeColor() {
  var discoBoxes = document.getElementsByClassName("board-square");
  for (let i=0; i<discoBoxes.length; i++) {
    discoBoxes[i].style.backgroundColor = generateRandomColor();
  }
}

setInterval(changeColor, 500) */

function generateRandomColor() {
  var bgSquareColor = ['#fbbe9d', '#FFF0F5'];
  let randomIndex = Math.floor(Math.random()* bgSquareColor.length)
  let randomColor = bgSquareColor[randomIndex]
  return randomColor;

}

function changeColor() {
  var bgSquareColor = document.getElementsByClassName("board-square");
  for (let i=0; i<bgSquareColor.length; i++) {
    bgSquareColor[i].style.backgroundColor = generateRandomColor();
  }
}

setInterval(changeColor, 500) 


