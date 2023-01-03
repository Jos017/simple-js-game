const canvas = document.getElementById('game');
const game = canvas.getContext('2d');

window.addEventListener('load', setCanvasSize);
window.addEventListener('resize', setCanvasSize);

let canvasSize;

function startGame() {
  // Define cell size from canvas;
  const elementsSize = canvasSize / 10;

  // Configure size of elements in board
  game.font = elementsSize - 2 + 'px Verdana';
  game.textAlign = 'start';
  game.textBaseline = 'bottom';

  const map = maps[0];
  const mapRows = map.trim().split('\n');
  const mapRowsCols = mapRows.map((row) => row.trim().split(''));

  for (let row = 0; row < 10; row++) {
    for (let col = 0; col < 10; col++) {
      game.fillText(
        emojis[mapRowsCols[row][col]],
        elementsSize * col - elementsSize * 0.15,
        elementsSize * row + elementsSize
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
