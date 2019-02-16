"use strict";

let
  gameBoard = document.querySelector('.container'),
  valueOfFigure = 'x',
  initialHTML = gameBoard.innerHTML;

function addDaggerOrZero(event) {
  let
    target = event.target,
    gameCells = [...document.querySelectorAll('.container-part')],
    cellsValue = new Array(9);
  
  if (valueOfFigure === 'x' && !target.classList.contains('js-zero')) {
    target.classList.add('js-dagger');
    valueOfFigure = 'o';
  } else if (valueOfFigure === 'o' && !target.classList.contains('js-dagger')) {
    target.classList.add('js-zero');
    valueOfFigure = 'x';
  };

  if (target.classList.contains('js-dagger-opacity')) target.classList.remove('js-dagger-opacity');
  else if (target.classList.contains('js-zero-opacity')) target.classList.remove('js-zero-opacity');

  for (let i = 0; i < gameCells.length; i++) {
    if (gameCells[i].classList.contains('js-dagger')) cellsValue[i] = 'x';
    else if (gameCells[i].classList.contains('js-zero')) cellsValue[i] = 'o';
  };

  let
    drawnGame = !cellsValue.includes(undefined),
    lineOfThreeCells = document.createElement('img'),
    [pointsOfFirstPlayer, pointsOfSecondPlayer] = document.querySelectorAll('.score-players'),
    nameOfWinninPlayer = '';

  lineOfThreeCells.setAttribute('src', 'img/line.png');
  lineOfThreeCells.style.position = 'absolute';

  switch(true) {
    case cellsValue[0] == cellsValue[1] && cellsValue[0] == cellsValue[2] && cellsValue[0] != undefined:
      endGame(cellsValue[0]);
      lineOfThreeCells.classList.add('js-img-top-line');
    break;
    case cellsValue[3] == cellsValue[4] && cellsValue[3] == cellsValue[5] && cellsValue[3] != undefined:
      endGame(cellsValue[3]);
      lineOfThreeCells.classList.add('js-img-middle-line');
    break;
    case cellsValue[6] == cellsValue[7] && cellsValue[6] == cellsValue[8] && cellsValue[6] != undefined:
      endGame(cellsValue[6]);
      lineOfThreeCells.classList.add('js-img-bottom-line');
    break;
    case cellsValue[0] == cellsValue[3] && cellsValue[0] == cellsValue[6] && cellsValue[0] != undefined:
      endGame(cellsValue[0]);
      lineOfThreeCells.classList.add('js-img-left-line');
    break;
    case cellsValue[1] == cellsValue[4] && cellsValue[1] == cellsValue[7] && cellsValue[1] != undefined:
      endGame(cellsValue[1]);
      lineOfThreeCells.classList.add('js-img-center-line');
    break;
    case cellsValue[2] == cellsValue[5] && cellsValue[2] == cellsValue[8] && cellsValue[2] != undefined:
      endGame(cellsValue[2]);
      lineOfThreeCells.classList.add('js-img-right-line');
    break;
    case cellsValue[0] == cellsValue[4] && cellsValue[0] == cellsValue[8] && cellsValue[0] != undefined:
      endGame(cellsValue[0]);
      lineOfThreeCells.setAttribute('src', 'img/line-diagonal.png');
      lineOfThreeCells.classList.add('js-img-left-diagonal-line');
    break;
    case cellsValue[2] == cellsValue[4] && cellsValue[2] == cellsValue[6] && cellsValue[2] != undefined:
      endGame(cellsValue[2]);
      lineOfThreeCells.setAttribute('src', 'img/line-diagonal.png');
      lineOfThreeCells.classList.add('js-img-right-diagonal-line');
    break;
    case drawnGame:
      endGame('ничья');
  };

  function endGame(value) {
    if (!drawnGame) gameCells[0].appendChild(lineOfThreeCells);
    if (value == 'x') {
      pointsOfFirstPlayer.innerHTML++;
      nameOfWinninPlayer = `Игрок 1 победил!`;
    } else if (value == 'o') {
      pointsOfSecondPlayer.innerHTML++;
      nameOfWinninPlayer = `Игрок 2 победил!`;
    } else {
      nameOfWinninPlayer = `Ничья`;
    };

    gameBoard.insertAdjacentHTML(`beforeBegin`, `<h2 class='win-player'>${ nameOfWinninPlayer }</h2>`);

    gameBoard.style.cursor = 'pointer';
    gameBoard.removeEventListener('click', addDaggerOrZero);
    gameBoard.removeEventListener('mouseover', mouseOverInGameCell);
    gameBoard.removeEventListener('mouseout', mouseOutFromGameCell);

    gameBoard.insertAdjacentHTML('afterEnd', '<h2 class="next-game">Продолжить игру!</h2>');
    gameBoard.addEventListener('click', nextGame);
    let textOfNextGame = document.querySelector('.next-game');
    textOfNextGame.style.cursor = 'pointer';
    textOfNextGame.addEventListener('click', nextGame);
  };

  function nextGame() {
    gameBoard.innerHTML = initialHTML;
    let
      textOfWinningPlayer = document.querySelector('.win-player'),
      textOfNextGame = document.querySelector('.next-game');

    document.body.removeChild(textOfWinningPlayer);
    document.body.removeChild(textOfNextGame);
    gameBoard.removeEventListener('click', nextGame);
    gameBoard.addEventListener('click', addDaggerOrZero);
    gameBoard.addEventListener('mouseover', mouseOverInGameCell);
    gameBoard.addEventListener('mouseout', mouseOutFromGameCell);
    gameBoard.style.cursor = 'default';
  };
};

function mouseOverInGameCell(event) {
  let target = event.target;

  if (target.classList.contains('js-dagger') || target.classList.contains('js-zero')) return;
  if (valueOfFigure === 'x') target.classList.add('js-dagger-opacity');
  else if (valueOfFigure === 'o')target.classList.add('js-zero-opacity');
};

function mouseOutFromGameCell(event) {
  let target = event.target;

  if (target.classList.contains('js-dagger') || target.classList.contains('js-zero')) return;
  if (valueOfFigure === 'x') target.classList.remove('js-dagger-opacity');
  else if (valueOfFigure === 'o')target.classList.remove('js-zero-opacity');
};

gameBoard.addEventListener('mouseover', mouseOverInGameCell);
gameBoard.addEventListener('mouseout', mouseOutFromGameCell);
gameBoard.addEventListener('click', addDaggerOrZero);