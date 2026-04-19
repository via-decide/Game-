const CHASE_RADIUS = 200;
const CHASE_STRENGTH = 140;

export function enemyBehavior(enemy, player, dt) {
  if (!player) return;
  const distance = enemy.distance(player);
  if (distance < CHASE_RADIUS) {
    chase(enemy, player, dt);
  }
}

export function chase(enemy, player, dt) {
  const dx = (player.x + player.width / 2) - (enemy.x + enemy.width / 2);
  const magnitude = Math.sign(dx);
  enemy.velocityX += magnitude * CHASE_STRENGTH * dt;
  const cap = 220;
  if (enemy.velocityX > cap) enemy.velocityX = cap;
  if (enemy.velocityX < -cap) enemy.velocityX = -cap;
}
