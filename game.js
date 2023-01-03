const canvas = document.getElementById('game');
const game = canvas.getContext('2d');
const btnUp = document.getElementById('up');
const btnLeft = document.getElementById('left');
const btnRight = document.getElementById('right');
const btnDown = document.getElementById('down');
const spanLives = document.getElementById('lives');
const spanLevel = document.getElementById('level');
const spanTime = document.getElementById('time');

window.addEventListener('load', setCanvasSize);
window.addEventListener('resize', setCanvasSize);

window.addEventListener('keydown', moveByKeys);
btnUp.addEventListener('click', moveUp);
btnLeft.addEventListener('click', moveLeft);
btnRight.addEventListener('click', moveRight);
btnDown.addEventListener('click', moveDown);

let canvasSize;
let elementsSize;
let level = 0;
let lives = 3;

let timeStart;
let timePlayer;
let timeInterval;

const playerPosition = {
  x: null,
  y: null,
};

const giftPosition = {
  x: null,
  y: null,
};

let enemiesPosition = [];

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
  const map = maps[level];

  if (!map) {
    gameWin();
    return;
  }

  if (!timeStart) {
    timeStart = Date.now();
    timeInterval = setInterval(showTime, 100);
  }

  showLevel();
  showLives();

  const mapRows = map.trim().split('\n');
  const mapRowsCols = mapRows.map((row) => row.trim().split(''));
  enemiesPosition = [];
  game.clearRect(0, 0, canvasSize, canvasSize);

  // Draw emojis in canvas for current map
  mapRowsCols.forEach((row, rowIndex) => {
    row.forEach((col, colIndex) => {
      const emoji = emojis[col];
      const posX = elementsSize * colIndex - elementsSize * 0.15;
      const posY = elementsSize * rowIndex + elementsSize;
      // Asign initial player position
      if (
        col === 'O' &&
        playerPosition.x === null &&
        playerPosition.y === null
      ) {
        playerPosition.x = posX;
        playerPosition.y = posY;
      } else if (col === 'I') {
        giftPosition.x = posX;
        giftPosition.y = posY;
      } else if (col === 'X') {
        enemiesPosition.push({
          x: posX,
          y: posY,
        });
      }
      game.fillText(emoji, posX, posY);
    });
  });
  drawPlayer();
}

function drawPlayer() {
  const giftCollX = playerPosition.x.toFixed(3) == giftPosition.x.toFixed(3);
  const giftCollY = playerPosition.y.toFixed(3) == giftPosition.y.toFixed(3);
  const giftCollision = giftCollX && giftCollY;
  const enemiesCollision = enemiesPosition.find((enemy) => {
    const enemyCollX = enemy.x.toFixed(2) === playerPosition.x.toFixed(2);
    const enemyCollY = enemy.y.toFixed(2) === playerPosition.y.toFixed(2);
    return enemyCollX && enemyCollY;
  });

  if (giftCollision) {
    levelWin();
  }

  if (enemiesCollision) {
    levelFail();
  }

  game.fillText(emojis['PLAYER'], playerPosition.x, playerPosition.y);
}

function moveUp() {
  if (playerPosition.y > elementsSize) {
    playerPosition.y -= elementsSize;
    startGame();
  } else {
    alert('Out of bounds');
  }
}
function moveLeft() {
  if (playerPosition.x > 0) {
    playerPosition.x -= elementsSize;
    startGame();
  } else {
    alert('Out of bounds');
  }
}
function moveRight() {
  if (playerPosition.x < canvasSize - 2 * elementsSize) {
    playerPosition.x += elementsSize;
    startGame();
  } else {
    alert('Out of bounds');
  }
}
function moveDown() {
  if (playerPosition.y < canvasSize) {
    playerPosition.y += elementsSize;
    startGame();
  } else {
    alert('Out of bounds');
  }
}
function moveByKeys(e) {
  if (e.key === 'ArrowUp') moveUp();
  else if (e.key === 'ArrowLeft') moveLeft();
  else if (e.key === 'ArrowRight') moveRight();
  else if (e.key === 'ArrowDown') moveDown();
}

function levelWin() {
  console.log('level up');
  level += 1;
  startGame();
}

function levelFail() {
  lives -= 1;
  if (lives <= 0) {
    lives = 3;
    level = 0;
    timeStart = null;
  }
  console.log(lives);
  playerPosition.x = null;
  playerPosition.y = null;
  startGame();
}

function gameWin() {
  console.log('Game win');
}

function showLives() {
  spanLives.innerHTML = emojis['HEART'].repeat(lives);
}

function showLevel() {
  spanLevel.innerHTML = level + 1;
}

function showTime() {
  spanTime.innerHTML = Date.now() - timeStart;
}
