# Game (SkillHex Runner)

A deployable vanilla JavaScript web game built for local play and GitHub Pages hosting.

## Project Structure

```text
.
├── index.html
├── style.css
├── game.js
├── assets/
│   ├── icons/
│   ├── sounds/
│   └── sprites/
├── ui/
│   ├── controls.js
│   ├── menu.js
│   └── score.js
├── logic/
│   ├── engine.js
│   ├── physics.js
│   └── state.js
└── mars.json
```

## Run Locally

Because this is a pure HTML/CSS/JS project, no npm or build step is required.

1. Clone the repository.
2. Open `index.html` in your browser, **or** run a simple static server:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Deploy on GitHub Pages

1. Push this repository to GitHub.
2. In **Settings → Pages**, set source to the main branch root.
3. Ensure `index.html` remains in the repository root.
4. Access the deployed game at:
   `https://via-decide.github.io/Game-/`

## Game Loop Architecture

The game uses `requestAnimationFrame` with this flow:

1. `updateGameState(...)`
   - updates player motion
   - updates hazard physics
   - checks collisions and game-over conditions
2. `renderGame(...)`
   - redraws all visible entities
3. UI render (`scoreboard.render(...)`)
4. loop continues via `requestAnimationFrame(gameLoop)`

## SkillHex Integration

On game over, a score payload is emitted:

```js
{
  skill: 'logic',
  points: 120,
  timestamp: 1710000000000
}
```

Event name:

```js
window.dispatchEvent(new CustomEvent('skillhex-score', { detail: playerScore }));
```

This allows future SkillHex score tracking listeners.

## Mars Integration

`mars.json` provides optional launcher metadata:

```json
{
  "app": "Game",
  "version": "1.0",
  "type": "web-game",
  "entry": "index.html"
}
```

## Performance Notes

- Non-blocking render loop uses `requestAnimationFrame`.
- DOM updates are limited to score and overlay state.
- Hazard sprite is lazy-loaded on first game start.
