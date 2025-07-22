const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

const grid = 20;
let count = 0;
let snake = [{ x: 160, y: 160 }];
let dx = grid;
let dy = 0;
let food = { x: 320, y: 320 };
let score = 0;

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function resetFood() {
  food.x = getRandomInt(0, canvas.width / grid) * grid;
  food.y = getRandomInt(0, canvas.height / grid) * grid;
}

function gameLoop() {
  requestAnimationFrame(gameLoop);

  if (++count < 4) return;
  count = 0;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Snake 이동
  let head = { x: snake[0].x + dx, y: snake[0].y + dy };
  snake.unshift(head);

  // 먹이 먹었는지 체크
  if (head.x === food.x && head.y === food.y) {
    score++;
    resetFood();
  } else {
    snake.pop();
  }

  // 벽 충돌 체크
  if (
    head.x < 0 || head.x >= canvas.width ||
    head.y < 0 || head.y >= canvas.height
  ) {
    alert('Game Over! 점수: ' + score);
    document.location.reload();
  }

  // 자기 몸 충돌 체크
  for (let i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      alert('Game Over! 점수: ' + score);
      document.location.reload();
    }
  }

  // Snake 그리기
  ctx.fillStyle = 'lime';
  snake.forEach(part => ctx.fillRect(part.x, part.y, grid-2, grid-2));

  // Food 그리기
  ctx.fillStyle = 'red';
  ctx.fillRect(food.x, food.y, grid-2, grid-2);

  // 점수 표시
  ctx.fillStyle = '#fff';
  ctx.font = '16px Arial';
  ctx.fillText('Score: ' + score, 10, 20);
}

// 방향키 이벤트
document.addEventListener('keydown', e => {
  if (e.key === 'ArrowLeft' && dx === 0) {
    dx = -grid; dy = 0;
  } else if (e.key === 'ArrowUp' && dy === 0) {
    dx = 0; dy = -grid;
  } else if (e.key === 'ArrowRight' && dx === 0) {
    dx = grid; dy = 0;
  } else if (e.key === 'ArrowDown' && dy === 0) {
    dx = 0; dy = grid;
  }
});

requestAnimationFrame(gameLoop);
