const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const gridSize = 20;
const tileCount = canvas.width / gridSize;

let snake = [{ x: 10, y: 10 }];
let dx = 0;
let dy = 0;
let foodX = 15;
let foodY = 15;
let score = 0;
let gameInterval;
let gameStarted = false;

document.addEventListener("keydown", changeDirection);

function gameLoop() {
  if (hasGameEnded()) {
    alert("Trò chơi kết thúc! Điểm của bạn: " + score);
    resetGame();
    return;
  }

  clearCanvas();
  drawFood();
  moveSnake();
  drawSnake();
}

function clearCanvas() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawSnake() {
  ctx.fillStyle = "#4CAF50";
  snake.forEach((part, index) => {
    if (index === 0) ctx.fillStyle = "#81C784"; // Đầu rắn màu sáng hơn
    else ctx.fillStyle = "#4CAF50";
    ctx.fillRect(part.x * gridSize, part.y * gridSize, gridSize - 2, gridSize - 2);
  });
}

function moveSnake() {
  const head = { x: snake[0].x + dx, y: snake[0].y + dy };
  snake.unshift(head);

  if (snake[0].x === foodX && snake[0].y === foodY) {
    score += 10;
    document.getElementById("score").innerText = score;
    generateFood();
  } else {
    snake.pop();
  }
}

function changeDirection(event) {
  const keyPressed = event.keyCode;
  const LEFT = 37, UP = 38, RIGHT = 39, DOWN = 40;

  if (!gameStarted && [LEFT, UP, RIGHT, DOWN].includes(keyPressed)) {
    gameStarted = true;
    gameInterval = setInterval(gameLoop, 100);
  }

  const goingUp = dy === -1;
  const goingDown = dy === 1;
  const goingRight = dx === 1;
  const goingLeft = dx === -1;

  if (keyPressed === LEFT && !goingRight) { dx = -1; dy = 0; }
  if (keyPressed === UP && !goingDown) { dx = 0; dy = -1; }
  if (keyPressed === RIGHT && !goingLeft) { dx = 1; dy = 0; }
  if (keyPressed === DOWN && !goingUp) { dx = 0; dy = 1; }
}

function generateFood() {
  foodX = Math.floor(Math.random() * tileCount);
  foodY = Math.floor(Math.random() * tileCount);
}

function drawFood() {
  ctx.fillStyle = "#FF5252";
  ctx.fillRect(foodX * gridSize, foodY * gridSize, gridSize - 2, gridSize - 2);
}

function hasGameEnded() {
  for (let i = 4; i < snake.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) return true;
  }

  const hitLeftWall = snake[0].x < 0;
  const hitRightWall = snake[0].x >= tileCount;
  const hitToptWall = snake[0].y < 0;
  const hitBottomWall = snake[0].y >= tileCount;

  return hitLeftWall || hitRightWall || hitToptWall || hitBottomWall;
}

function resetGame() {
  clearInterval(gameInterval);
  snake = [{ x: 10, y: 10 }];
  dx = 0;
  dy = 0;
  score = 0;
  gameStarted = false;
  document.getElementById("score").innerText = score;
  clearCanvas();
  drawSnake();
  drawFood();
}

// Khởi chạy ban đầu
clearCanvas();
drawSnake();
drawFood();