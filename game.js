const canvas = document.getElementById('game');
const game = canvas.getContext('2d');

window.addEventListener('load', startGame);

function startGame() {
  let canvasSize;

  if (window.innerHeight > window.innerWidth) {
    canvasSize = window.innerWidth * 0.8;
  } else {
    canvasSize = window.innerHeight * 0.8;
  }

  canvas.setAttribute('width', canvasSize);
  canvas.setAttribute('height', canvasSize);

  const elementsSize = canvasSize / 10;

  game.font = elementsSize + 'px Verdana';
  game.textAlign = 'start';
  game.textBaseline = 'bottom';
  console.log(game);
  console.log(elementsSize);

  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      game.fillRect(elementsSize * i, elementsSize * j, elementsSize, elementsSize);
      game.fillText(
        emojis['X'],
        elementsSize * i - elementsSize * 0.15,
        elementsSize * j + elementsSize
      );
    }
  }
}
