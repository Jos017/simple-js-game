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
let elementsSize;

const playerPosition = {
  x: 0,
  y: 0,
};

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

function startGame() {
  // Define cell size from canvas;
  elementsSize = canvasSize / 10;

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
      const posX = elementsSize * colIndex - elementsSize * 0.15;
      const posY = elementsSize * rowIndex + elementsSize;
      // Asign initial player position
      if (col === 'O') {
        playerPosition.x = posX;
        playerPosition.y = posY;
      }
      game.fillText(emoji, posX, posY);
    });

    game.fillText(emojis['PLAYER'], playerPosition.x, playerPosition.y);
  });
}

function drawPlayer() {
  game.fillText(emojis['PLAYER'], playerPosition.x, playerPosition.y);
}

function moveUp() {
  console.log('Up');
  playerPosition.y -= elementsSize;
  drawPlayer();
}
function moveLeft() {
  console.log('Left');
  playerPosition.x -= elementsSize;
  drawPlayer();
}
function moveRight() {
  console.log('Right');
  playerPosition.x += elementsSize;
  drawPlayer();
}
function moveDown() {
  console.log('Down');
  playerPosition.y += elementsSize;
  drawPlayer();
}
function moveByKeys(e) {
  if (e.key === 'ArrowUp') moveUp();
  else if (e.key === 'ArrowLeft') moveLeft();
  else if (e.key === 'ArrowRight') moveRight();
  else if (e.key === 'ArrowDown') moveDown();
}
