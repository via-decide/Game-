export function initControls() {
  const controls = { left: false, right: false };

  window.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft' || event.key.toLowerCase() === 'a') controls.left = true;
    if (event.key === 'ArrowRight' || event.key.toLowerCase() === 'd') controls.right = true;
  });

  window.addEventListener('keyup', (event) => {
    if (event.key === 'ArrowLeft' || event.key.toLowerCase() === 'a') controls.left = false;
    if (event.key === 'ArrowRight' || event.key.toLowerCase() === 'd') controls.right = false;
  });

  return controls;
}
