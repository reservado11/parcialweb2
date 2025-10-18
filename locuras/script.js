const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
const scoreDisplay = document.getElementById("score");
const restartBtn = document.getElementById("restart");
const gameOverDiv = document.getElementById("gameOver");

const tileSize = 30; 
const map = [
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,1],
  [1,0,1,1,0,1,0,1,1,1,0,1,0,1,1,1,0,1,0,1],
  [1,0,1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,1,0,1],
  [1,0,1,0,1,1,1,0,1,0,1,1,1,0,1,0,1,1,0,1],
  [1,0,0,0,0,0,1,0,0,0,0,1,0,0,1,0,0,0,0,1],
  [1,0,1,1,1,0,1,1,1,1,0,1,1,1,1,0,1,1,0,1],
  [1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
];

let pacman = { x: 1, y: 1, dirX: 0, dirY: 0, speed: 3 };
let ghost = { x: 18, y: 7, dirX: 0, dirY: 0, speed: 2.5 };
let score = 0;
let gameOver = false;

// 🟣 Dibuja el mapa
function drawMap() {
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x] === 1) {
        ctx.fillStyle = "black";
        ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
      } else {
        ctx.fillStyle = "blue";
        ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
        ctx.beginPath();
        ctx.arc(x * tileSize + 15, y * tileSize + 15, 3, 0, Math.PI * 2);
        ctx.fillStyle = "white";
        ctx.fill();
      }
    }
  }
}

// 💗 Dibuja Pac-Man rosado
function drawPacman() {
  ctx.beginPath();
  ctx.arc(
    pacman.x * tileSize + 15,
    pacman.y * tileSize + 15,
    12,
    0.2 * Math.PI,
    1.8 * Math.PI
  );
  ctx.lineTo(pacman.x * tileSize + 15, pacman.y * tileSize + 15);
  ctx.fillStyle = "pink";
  ctx.fill();

  // 👀 ojos
  ctx.beginPath();
  ctx.arc(pacman.x * tileSize + 8, pacman.y * tileSize + 8, 2, 0, Math.PI * 2);
  ctx.fillStyle = "black";
  ctx.fill();
}

// 👻 Dibuja fantasma lila
function drawGhost() {
  const gx = ghost.x * tileSize + 15;
  const gy = ghost.y * tileSize + 15;

  ctx.beginPath();
  ctx.arc(gx, gy, 12, Math.PI, 2 * Math.PI);
  ctx.rect(gx - 12, gy, 24, 12);
  ctx.fillStyle = "#c084fc";
  ctx.fill();

  // 👀 ojos del fantasma
  ctx.beginPath();
  ctx.arc(gx - 5, gy - 2, 3, 0, Math.PI * 2);
  ctx.arc(gx + 5, gy - 2, 3, 0, Math.PI * 2);
  ctx.fillStyle = "white";
  ctx.fill();
  ctx.beginPath();
  ctx.arc(gx - 5, gy - 2, 1, 0, Math.PI * 2);
  ctx.arc(gx + 5, gy - 2, 1, 0, Math.PI * 2);
  ctx.fillStyle = "black";
  ctx.fill();
}

// 👾 Movimiento del fantasma (a veces aleatorio)
function moveGhost() {
  if (Math.random() < 0.1) {
    const dirs = [
      { x: 1, y: 0 },
      { x: -1, y: 0 },
      { x: 0, y: 1 },
      { x: 0, y: -1 },
    ];
    const best = dirs.reduce((a, b) =>
      Math.hypot(pacman.x - (ghost.x + a.x), pacman.y - (ghost.y + a.y)) <
      Math.hypot(pacman.x - (ghost.x + b.x), pacman.y - (ghost.y + b.y))
        ? a
        : b
    );
    ghost.dirX = best.x;
    ghost.dirY = best.y;
  }
  const nx = ghost.x + ghost.dirX * 0.1;
  const ny = ghost.y + ghost.dirY * 0.1;
  if (map[Math.round(ny)][Math.round(nx)] !== 1) {
    ghost.x = nx;
    ghost.y = ny;
  }
}

// 💥 Colisión fantasma - Pacman
function checkCollision() {
  if (
    Math.hypot(
      pacman.x - ghost.x,
      pacman.y - ghost.y
    ) < 0.5
  ) {
    gameOver = true;
    gameOverDiv.style.display = "block";
  }
}

// ⏩ Actualización del juego
function update() {
  if (gameOver) return;
  const nx = pacman.x + pacman.dirX * 0.1;
  const ny = pacman.y + pacman.dirY * 0.1;
  if (map[Math.round(ny)]?.[Math.round(nx)] !== 1) {
    pacman.x = nx;
    pacman.y = ny;
  }
  moveGhost();
  checkCollision();
  scoreDisplay.textContent = "Puntos: " + score;
}

// 🎨 Dibujo total
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawMap();
  drawPacman();
  drawGhost();
}

function loop() {
  update();
  draw();
  if (!gameOver) requestAnimationFrame(loop);
}

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowUp") (pacman.dirX = 0), (pacman.dirY = -1);
  if (e.key === "ArrowDown") (pacman.dirX = 0), (pacman.dirY = 1);
  if (e.key === "ArrowLeft") (pacman.dirX = -1), (pacman.dirY = 0);
  if (e.key === "ArrowRight") (pacman.dirX = 1), (pacman.dirY = 0);
});

restartBtn.onclick = () => location.reload();

loop();
