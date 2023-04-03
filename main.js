"use strick";

const elMainBtn = document.querySelector(".main-btn-two");
const elHome = document.querySelector(".home");
const elGame = document.querySelector(".game");
const elRestart = document.querySelector(".restart");
const elbackgroundEffect = document.querySelector(".backgroundEffect");
const elbackgroundEffectTwo = document.querySelector(".backgroundEffectTwo");
const turnSvg = document.querySelector("#turnSvg");
const winnerSvg = document.querySelector("#winnerSvg");
const elCansel = document.querySelector(".cansel");
const elQuit = document.querySelector(".quit");
const elNextRound = document.querySelector(".nextRaound");
const elElement = document.querySelectorAll(".element");
const elBox = document.querySelector(".box");
const drawText = document.querySelector("[data-draw-text]");
const dataWinningPlayer = document.querySelector("[data-winning-player]");
const xScore = document.querySelector("[data-xScore]");
const tieScore = document.querySelector("[data-tieScore]");
const oScore = document.querySelector("[data-oScore]");
const elres = document.querySelector("[data-restart]");


// page
elMainBtn.addEventListener("click", () => {
  elHome.style.display = "none";
  elGame.style.display = "block";
});

// x o classes
const PLAYER_X_CLASS = "x";
const PLAYER_O_CLASS = "circle";
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

//
let xTurn = true;

// place mark
function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
}

const changeTurns = () => {
  xTurn = !xTurn;
};

// x dan kegn o bolshi
function setHoverClass() {
  if (xTurn) {
    elBox.classList.remove(PLAYER_O_CLASS);
    elBox.classList.add(PLAYER_X_CLASS);
    turnSvg.src = "./img/x.svg";
  } else {
    elBox.classList.remove(PLAYER_X_CLASS);
    elBox.classList.add(PLAYER_O_CLASS);
    turnSvg.src = "./img/o.svg";
  }
}
setHoverClass();

//chek win
const checkForWin = (currentClass) => {
  return WINNING_COMBINATIONS.some((combination) => {
    return combination.every((index) => {
      return elElement[index].classList.contains(currentClass);
    });
  });
};

//draw win
const drawWinner = (currentClass) => {
  WINNING_COMBINATIONS.forEach((combination) => {
    if (
      combination.every((index) =>
        elElement[index].classList.contains(currentClass)
      )
    ) {
      combination.forEach((index) =>
        elElement[index].classList.add("winningCellBg")
      );
      if (currentClass === PLAYER_X_CLASS) {
        dataWinningPlayer.textContent = "Player 1 wins!";
        winnerSvg.src = "./img/x.svg";
      } else {
        dataWinningPlayer.textContent = "Player 2 wins!";
        winnerSvg.src = "./img/o.svg";
      }
      elbackgroundEffectTwo.classList.replace("hide", "show");
    }
  });
  if (
    [...elElement].every((cell) => {
      return (
        cell.classList.contains(PLAYER_X_CLASS) ||
        cell.classList.contains(PLAYER_O_CLASS)
      );
    })
  ) {
    drawText.classList.add("show");
    elbackgroundEffectTwo.classList.replace("hide", "show");
  }
};

elElement.forEach((el) => {
  el.addEventListener("click", (e) => {
    const cell = e.target;
    const currentClass = xTurn ? PLAYER_X_CLASS : PLAYER_O_CLASS;
    placeMark(cell, currentClass);
    changeTurns();
    setHoverClass();
    const isDraw = [...elElement].every((cell) => {
      return (
        cell.classList.contains(PLAYER_X_CLASS) ||  
        cell.classList.contains(PLAYER_O_CLASS)
      );
    });
    if (checkForWin(currentClass)) {
      elbackgroundEffectTwo.classList.replace("hide", "show");
      xScore.textContent = +xScore.textContent+1
      drawWinner(currentClass);
    } else if (isDraw) {
      elbackgroundEffectTwo.classList.replace("hide", "show");
      tieScore = +xScore.textContent+1
      drawWinner("draw");
    }
  },{once: true});
});


//  modal
elRestart.addEventListener("click", () => {
  elbackgroundEffect.classList.replace("hide", "show");
});

elCansel.addEventListener("click", () => {
  elbackgroundEffect.classList.replace("show", "hide");
});

elQuit.addEventListener("click", () => {
  window.location.reload();
});

elNextRound.addEventListener("click", () => {
  elElement.forEach((el) => {
    if(el.classList.contains('circle') || el.classList.contains('x')){
      el.classList.value = el.classList.value.slice(0,7);
      el.addEventListener('click', e => {
        const cell = e.target;
        const currentClass = xTurn ? PLAYER_X_CLASS : PLAYER_O_CLASS;
        placeMark(cell, currentClass);
        changeTurns();
        setHoverClass();
        const isDraw = [...elElement].every((cell) => {
          return (
            cell.classList.contains(PLAYER_X_CLASS) ||  
            cell.classList.contains(PLAYER_O_CLASS)
          );
        });
        if (checkForWin(currentClass)) {
          elbackgroundEffectTwo.classList.replace("hide", "show");
          xScore.textContent = +xScore.textContent+1
          drawWinner(currentClass);
        } else if (isDraw) {
          elbackgroundEffectTwo.classList.replace("hide", "show");
          tieScore = +xScore.textContent+1
          drawWinner("draw");
        }
      }, {once: true})
    }
  });


  elbackgroundEffectTwo.classList.replace("show", "hide");
  xTurn = true;
  elBox.classList.replace(PLAYER_O_CLASS, PLAYER_X_CLASS);
  setHoverClass()
});

elres.addEventListener("click", () => {
  elbackgroundEffectTwo.classList.replace("hide", "hide");
  window.location.reload();
});


