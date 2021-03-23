const KEY_UP = 'up';
const KEY_DOWN = 'down';
const KEY_LEFT = 'left';
const KEY_RIGHT = 'right';

const canvas = document.getElementById('game');
const context = canvas.getContext('2d', { alpha: false });
const ratio = window.devicePixelRatio;

const gameSpeed = 70;
const boxSize = 10;
const bodyColor = '#07fd09';
const backgroundColor = '#000';
const bodyLength = 5;
const keymap = {
  38: KEY_UP,
  40: KEY_DOWN,
  37: KEY_LEFT,
  39: KEY_RIGHT,
  32: 'fire'
};
const opposites = {
  [KEY_UP]: KEY_DOWN,
  [KEY_DOWN]: KEY_UP,
  [KEY_RIGHT]: KEY_LEFT,
  [KEY_LEFT]: KEY_RIGHT
};

let direction = KEY_RIGHT;
let interval = null;

const positions = getInitialPositions();

function getInitialPositions() {
  let positions = [];
  for (let i = 0; i < bodyLength; i++) {
    positions.unshift({ x: boxSize * i, y: 0 });
  }
  return positions;
}

function drawCanvas() {
  canvas.setAttribute('height', '500');
  canvas.setAttribute('width', '500');

  context.beginPath();
  context.fillStyle = backgroundColor;
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.closePath();

  context.scale(ratio, ratio);
}

function drawSnake(positions) {
  for (let i = 0; i < positions.length; i++) {
    const position = positions[i];

    context.beginPath();
    context.fillStyle = bodyColor;
    context.fillRect(position.x, position.y, boxSize, boxSize);
    context.strokeRect(position.x, position.y, boxSize, boxSize);
    context.closePath();
  }
}

function game() {
  moveSnake();
}

function startGame() {
  interval = setInterval(game, gameSpeed);
}

function createBoard() {
  document.addEventListener('keydown', handleKeyboard);

  drawCanvas();
  drawSnake(positions);
}

function moveSnake(newDirection = direction) {
  const [{ x, y }] = positions;
  let position = {};

  switch (newDirection) {
    case KEY_UP: {
      position = { x, y: y - boxSize };
      break;
    }
    case KEY_DOWN: {
      position = { x: x, y: y + boxSize };
      break;
    }
    case KEY_RIGHT: {
      position = { x: x + boxSize, y };
      break;
    }
    case KEY_LEFT: {
      position = { x: x - boxSize, y };
      break;
    }
  }

  const tail = positions.pop();
  context.beginPath();
  context.fillStyle = backgroundColor;
  context.fillRect(tail.x, tail.y, boxSize, boxSize);
  positions.unshift(position);
  context.closePath();

  direction = newDirection;
  drawSnake(positions);
}

function handleKeyboard(evt) {
  const newDirection = keymap[evt.keyCode];

  if (!newDirection || newDirection === direction || opposites[direction] === newDirection) {
    return;
  }

  direction = newDirection;
  stopGame();
  moveSnake(newDirection);
  startGame();
}

function stopGame() {
  clearInterval(interval);
}

createBoard();
startGame();
