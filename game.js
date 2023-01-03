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

  // Obtain level map and turn into a 2D array
  const map = maps[0];
  const mapRows = map.trim().split('\n');
  const mapRowsCols = mapRows.map((row) => row.trim().split(''));

  // Draw emojis in canvas for current map
  mapRowsCols.forEach((row, rowIndex) => {
    row.forEach((col, colIndex) => {
      const emoji = emojis[col];
      game.fillText(
        emoji,
        elementsSize * colIndex - elementsSize * 0.15,
        elementsSize * rowIndex + elementsSize
      );
    });
  });
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
