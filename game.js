const canvas = document.getElementById('game');
const game = canvas.getContext('2d');
const btnUp = document.getElementById('up');
const btnLeft = document.getElementById('left');
const btnRight = document.getElementById('right');
const btnDown = document.getElementById('down');

window.addEventListener('load', setCanvasSize);
window.addEventListener('resize', setCanvasSize);

window.addEventListener('keydown', moveByKeys);
btnUp.addEventListener('click', moveUp);
btnLeft.addEventListener('click', moveLeft);
btnRight.addEventListener('click', moveRight);
btnDown.addEventListener('click', moveDown);

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

function moveUp() {
  console.log('Up');
}
function moveLeft() {
  console.log('Left');
}
function moveRight() {
  console.log('Right');
}
function moveDown() {
  console.log('Down');
}
function moveByKeys(e) {
  if (e.key === 'ArrowUp') moveUp();
  else if (e.key === 'ArrowLeft') moveLeft();
  else if (e.key === 'ArrowRight') moveRight();
  else if (e.key === 'ArrowDown') moveDown();
}
