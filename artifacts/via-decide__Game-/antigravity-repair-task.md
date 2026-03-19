Repair mode for repository via-decide/Game-.

TARGET
Validate and repair only the files touched by the previous implementation.

TASK
Implement a deterministic replay and broadcasting system called via-replay-core to record, scrub, and share full match simulations with minimal file sizes. 1. Create a new directory src/core/replay/. 2. Implement ReplayRecorder.ts. This system must hook into the start of a match, capturing the initial PRNG (Pseudo-Random Number Generator) seed, the exact level/map hash, and then strictly logging the compressed InputBuffer stream from all connected players. 3. Create ReplayPlayback.ts. This module will act as a virtual network layer. Instead of reading inputs from a live WebSocket, it injects the recorded input streams directly into the StateEngine tick-by-tick, ensuring the ECS identically recreates the original match. 4. Implement an EcsSnapshotter.ts to capture full binary snapshots of the ECS world state at fixed intervals (e.g., every 600 ticks / 10 seconds). This allows the replay timeline to jump to specific moments without forcing the engine to fast-forward simulate from Tick 0. 5. Build a SpectatorCamera.ts system that completely decouples the viewport from a specific player entity, allowing a broadcaster to free-cam around the 3D space, attach to different entities, or view tactical top-down minimaps during live or recorded matches. 6. Define a custom binary file format (.viarep) that chunks the snapshot data and compressed input streams together, utilizing a fast compression algorithm (like LZ4) before saving it to IndexedDB or the server. 7. Expose a broadcasting UI (renderTimelineScrubber()) that provides playback controls (Play, Pause, Fast Forward, Rewind), player highlighting, and dynamic playback speed adjustments (e.g., 0.25x slow-motion).

RULES
1. Audit touched files first and identify regressions.
2. Preserve architecture and naming conventions.
3. Make minimal repairs only; do not expand scope.
4. Re-run checks and provide concise root-cause notes.
5. Return complete contents for changed files only.

SOP: REPAIR PROTOCOL (MANDATORY)
1. Strict Fix Only: Do not use repair mode to expand scope or add features.
2. Regression Check: Audit why previous attempt failed before proposing a fix.
3. Minimal Footprint: Only return contents for the actual repaired files.

REPO CONTEXT
- README snippet:
<div align="center"> <img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" /> </div> # Run and deploy your AI Studio app This contains everything you need to run your app locally. View your app in AI Studio: https://ai.
- AGENTS snippet:
not found
- package.json snippet:
{ "name": "react-example", "private": true, "version": "0.0.0", "type": "module", "scripts": { "dev": "vite --port=3000 --host=0.0.0.0", "build": "vite build", "preview": "vite preview", "clean": "rm -rf dist", "lint": "tsc --noEmit" }, "dependencies": { "@googl