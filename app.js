'use strict';

var
  value = 'zero',
  endTheGame = false,
  container = document.querySelector('.container'),
  initialHTML = container.innerHTML;

function game(event) {
  let target = event.target;
  let firstPlayer = '';
  let secondPlayer = '';

  if (target.tagName != 'DIV') return;

  if (target.firstElementChild.getAttribute('src') == 'img/dagger-opacity.png' || target.firstElementChild.getAttribute('src') == 'img/zero-opacity.png') {
    target.removeChild(target.firstElementChild);
  }

  if (target.firstElementChild) return;

  let img = document.createElement('img');

  if (value == 'zero') {
    img.setAttribute('src', 'img/dagger.png');
    value = 'dagger';
  } else {
    img.setAttribute('src', 'img/zero.png');
    value = 'zero';
  }
  img.setAttribute('data-busy', 'true')

  // img.style.width = '7.3vw';
  // img.style.height = 'auto';
  // img.style.marginTop = '1.2vw';
  // img.style.marginLeft = '1.2vw';
  // img.style.pointerEvents = 'none';
  img.classList.add('js-img-main');
  target.appendChild(img);

  let allDiv = document.querySelectorAll('.container-part');
  let valueOfSrc = [];
  for (let i = 0; i < allDiv.length; i++) {
    if (!allDiv[i].firstElementChild) {
      valueOfSrc.push('');
    } else {
      valueOfSrc.push(allDiv[i].firstElementChild.getAttribute('src'));
    }
  }

  let imgLine = document.createElement('img');
  imgLine.setAttribute('src', 'img/line.png');
  imgLine.style.position = 'absolute';

  let draw = !valueOfSrc.includes('');

  let commandWin = '';
  switch(true) {
    case (valueOfSrc[0] == valueOfSrc[1] && valueOfSrc[0] == valueOfSrc[2] && valueOfSrc[0] != '') :
      endTheGame = true;
      commandWin = valueOfSrc[0];
      allDiv[0].appendChild(imgLine);
      imgLine.classList.add('js-img-top-line');
        break;
    case (valueOfSrc[3] == valueOfSrc[4] && valueOfSrc[3] == valueOfSrc[5] && valueOfSrc[3] != '') :
      endTheGame = true;
      commandWin = valueOfSrc[3];
      allDiv[0].appendChild(imgLine);
      imgLine.classList.add('js-img-middle-line');
        break;
    case (valueOfSrc[6] == valueOfSrc[7] && valueOfSrc[6] == valueOfSrc[8] && valueOfSrc[6] != '') :
      endTheGame = true;
      commandWin = valueOfSrc[6];
      allDiv[0].appendChild(imgLine);
      imgLine.classList.add('js-img-bottom-line');
        break;
    case (valueOfSrc[0] == valueOfSrc[3] && valueOfSrc[0] == valueOfSrc[6] && valueOfSrc[0] != '') :
      endTheGame = true;
      commandWin = valueOfSrc[0];
      allDiv[0].appendChild(imgLine);
      imgLine.classList.add('js-img-left-line');
        break;
    case (valueOfSrc[1] == valueOfSrc[4] && valueOfSrc[1] == valueOfSrc[7] && valueOfSrc[1] != '') :
      endTheGame = true;
      commandWin = valueOfSrc[1];
      allDiv[0].appendChild(imgLine);
      imgLine.classList.add('js-img-center-line');
        break;
    case (valueOfSrc[2] == valueOfSrc[5] && valueOfSrc[2] == valueOfSrc[8] && valueOfSrc[2] != '') :
      endTheGame = true;
      commandWin = valueOfSrc[2];
      allDiv[0].appendChild(imgLine);
      imgLine.classList.add('js-img-right-line');
        break;
    case (valueOfSrc[0] == valueOfSrc[4] && valueOfSrc[0] == valueOfSrc[8] && valueOfSrc[0] != '') :
      endTheGame = true;
      commandWin = valueOfSrc[0];
      allDiv[0].appendChild(imgLine);
      imgLine.setAttribute('src', 'img/line-diagonal.png');
      imgLine.classList.add('js-img-left-diagonal-line');
        break;
    case (valueOfSrc[2] == valueOfSrc[4] && valueOfSrc[2] == valueOfSrc[6] && valueOfSrc[2] != '') :
      endTheGame = true;
      commandWin = valueOfSrc[2];
      allDiv[0].appendChild(imgLine);
      imgLine.setAttribute('src', 'img/line-diagonal.png');
      imgLine.classList.add('js-img-right-diagonal-line');
        break;
    case draw :
      endTheGame = true;
      commandWin = 'draw';
        break;
  }

  let scoreFirstPlayer = document.querySelector('.score-first-player');
  let scoreSecondPlayer = document.querySelector('.score-second-player');
  let winPlayer = '';
  if (endTheGame) {

    if (commandWin == 'img/dagger.png') {
      scoreFirstPlayer.innerHTML = +scoreFirstPlayer.innerHTML + 1;
      winPlayer = 'Игрок 1 победил!';
    } else if (commandWin == 'img/zero.png') {
      scoreSecondPlayer.innerHTML = +scoreSecondPlayer.innerHTML + 1;
      winPlayer = 'Игрок 2 победил!';
    } else {
      winPlayer = 'Ничья!';
    }

    container.insertAdjacentHTML('beforeBegin', `<h2 class='win-player'>${ winPlayer }</h2>`);

    container.style.cursor = 'pointer';

    container.removeEventListener('click', game);
    container.removeEventListener('mouseover', mouseOver);
    container.removeEventListener('mouseout', mouseOut);

    container.insertAdjacentHTML('afterEnd', '<h2 class="next-game">Продолжить игру!</h2>');

    container.addEventListener('click', nextGame);
    let h2Bottom = document.querySelector('.next-game');
    h2Bottom.style.cursor = 'pointer';
    h2Bottom.addEventListener('click', nextGame);
  }
}
container.addEventListener('click', game);

function mouseOver(event) {
  let target = event.target;

  if (target.tagName != 'DIV') return;
  if (target.firstElementChild) return;

  let img = document.createElement('img');

  if (value == 'zero') {
    img.setAttribute('src', 'img/dagger-opacity.png');
  } else {
    img.setAttribute('src', 'img/zero-opacity.png');
  }

  img.style.width = '7.3vw';
  img.style.height = 'auto';
  img.style.marginTop = '1.2vw';
  img.style.marginLeft = '1.2vw';
  img.style.opacity = '0.5';
  img.style.pointerEvents = 'none';

  target.appendChild(img);
}
container.addEventListener('mouseover', mouseOver);

function mouseOut(event) {
  let target = event.target;
  if (target.tagName != 'DIV') return;
  let img = target.firstElementChild;
  if (img.getAttribute('src') == 'img/dagger.png' || img.getAttribute('src') == 'img/zero.png') return;
  target.removeChild(img);
}

container.addEventListener('mouseout', mouseOut);

function nextGame(event) {
  container.innerHTML = initialHTML;
  endTheGame = false;
  let h2Top = document.querySelector('.win-player');
  document.body.removeChild(h2Top);
  let h2Bottom = document.querySelector('.next-game');
  document.body.removeChild(h2Bottom);
  container.removeEventListener('click', nextGame);
  container.addEventListener('click', game);
  container.addEventListener('mouseover', mouseOver);
  container.addEventListener('mouseout', mouseOut);
  container.style.cursor = 'default';
}