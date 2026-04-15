export function updatePlayer(state, dt, controls, boundsWidth) {
  const player = state.player;
  const axis = (controls.right ? 1 : 0) - (controls.left ? 1 : 0);
  player.velocityX = axis * player.maxSpeed;
  player.x += player.velocityX * dt;

  if (player.x < 0) player.x = 0;
  const maxX = boundsWidth - player.width;
  if (player.x > maxX) player.x = maxX;
}

export function updateHazards(state, dt, canvasHeight) {
  state.hazards.forEach((hazard) => {
    hazard.y += hazard.speed * dt;
  });

  state.hazards = state.hazards.filter((hazard) => hazard.y < canvasHeight + 50);
}

export function intersects(a, b) {
  return (
    a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y
  );
}
