const canvas = document.getElementById('game');
const game = canvas.getContext('2d');

window.addEventListener('load', setCanvasSize);
window.addEventListener('resize', setCanvasSize);

let canvasSize;

function startGame() {
  // Define cell size from canvas;
  const elementsSize = canvasSize / 10;

  // Configure size of elements in board
  game.font = elementsSize + 'px Verdana';
  game.textAlign = 'start';
  game.textBaseline = 'bottom';

  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      game.fillText(
        emojis['X'],
        elementsSize * i - elementsSize * 0.15,
        elementsSize * j + elementsSize
      );
    }
  }
}

function setCanvasSize() {
  if (window.innerHeight > window.innerWidth) {
    canvasSize = window.innerWidth * 0.8;
  } else {
    canvasSize = window.innerHeight * 0.8;
  }

  canvas.setAttribute('width', canvasSize);
  canvas.setAttribute('height', canvasSize);

  startGame();
}
