import { updatePlayer, updateHazards, intersects } from './physics.js';

export function updateGameState(state, controls, dt, dimensions) {
  if (!state.running || state.paused || state.gameOver) return;

  state.score += dt * 10;
  state.speed = Math.min(state.speed + dt * 2, 500);
  state.spawnTimer += dt * 1000;

  if (state.spawnTimer >= state.spawnEveryMs) {
    state.spawnTimer = 0;
    state.hazards.push({
      x: Math.random() * (dimensions.width - 30),
      y: -40,
      width: 30,
      height: 30,
      speed: state.speed,
    });
  }

  updatePlayer(state, dt, controls, dimensions.width);
  updateHazards(state, dt, dimensions.height);

  const collided = state.hazards.some((hazard) => intersects(state.player, hazard));
  if (collided) {
    state.gameOver = true;
    state.running = false;
  }
}

export function renderGame(ctx, state, dimensions, spriteImage) {
  ctx.clearRect(0, 0, dimensions.width, dimensions.height);

  ctx.fillStyle = '#6ec6ff';
  ctx.fillRect(state.player.x, state.player.y, state.player.width, state.player.height);

  if (spriteImage?.complete) {
    state.hazards.forEach((hazard) => {
      ctx.drawImage(spriteImage, hazard.x, hazard.y, hazard.width, hazard.height);
    });
  } else {
    ctx.fillStyle = '#ff5f7a';
    state.hazards.forEach((hazard) => {
      ctx.fillRect(hazard.x, hazard.y, hazard.width, hazard.height);
    });
  }
}
