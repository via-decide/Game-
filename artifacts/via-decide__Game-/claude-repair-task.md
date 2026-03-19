Repair mode for repository via-decide/Game-.

TARGET
Validate and repair only the files touched by the previous implementation.

TASK
> Implement a core multiplayer networking module called via-state-replicator to handle low-latency, authoritative game state synchronization. 1. Create a new directory src/core/multiplayer/state-sync/. 2. Create sync-config.json defining server tick rates (e.g., 60Hz), interpolation buffer windows, and entity replication authority schemas (e.g., "server_auth", "client_predict"). 3. Implement StateEngine.ts (or .js). This class must act as the central authority for all game state mutations, intercepting incoming player inputs and resolving physics/game logic before broadcasting updates. 4. The engine must implement delta-compression for network payloads. It should compare the current frame's state against the previous broadcast and only transmit changed properties (e.g., position, velocity, health) to severely minimize bandwidth. 5. Integrate client-side prediction and server reconciliation logic. The client should preemptively simulate local inputs and smoothly interpolate to the authoritative server state when discrepancies (mispredictions) occur. 6. Hook this replicator into the main game loop (src/game.ts or src/engine.ts), ensuring the fixed time-step update and network broadcast phases are tightly synchronized. 7. Expose an internal metrics WebSocket endpoint (/api/v1/network/telemetry) to stream real-time debug data-such as jitter, packet drop rate, and tick execution latency-to external admin dashboards.

RULES
1. Audit touched files first and identify regressions.
2. Preserve architecture and naming conventions.
3. Make minimal repairs only; do not expand scope.
4. Re-run checks and provide concise root-cause notes.
5. Return complete contents for changed files only.

REPO CONTEXT
- README snippet:
<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/85eb7505-69b3-4260-8622-48ed5e744348

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`
- AGENTS snippet:
not found
- package.json snippet:
{
  "name": "react-example",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite --port=3000 --host=0.0.0.0",
    "build": "vite build",
    "preview": "vite preview",
    "clean": "rm -rf dist",
    "lint": "tsc --noEmit"
  },
  "dependencies": {
    "@google/genai": "^1.29.0",
    "@tailwindcss/vite": "^4.1.14",
    "@types/three": "^0.183.1",
    "@vitejs/plugin-react": "^5.0.4",
    "dotenv": "^17.2.3",
    "express": "^4.21.2",
    "firebase": "^12.10.0",
    "lucide-react": "^0.546.0",
    "motion": "^12.23.24",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "three": "^0.183.2",
    "vite": "^6.2.0"
  },
  "devDependencies": {
    "@types/express": "^4.17.21",
    "@types/node": "^22.14.0",
    "@types/react": "^19.2.14",
    "@types/react-dom": "^19.2.3",
    "autoprefixer": "^10.4.21",
    "tailwindcss": "^4.1.14",
    "tsx": "^4.
- pyproject snippet:
not found