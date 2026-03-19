Repair mode for repository via-decide/Game-.

TARGET
Validate and repair only the files touched by the previous implementation.

TASK
Implement a lightweight, asynchronous analytics system called via-telemetry-pipeline to capture engine performance, crash dumps, and player spatial data. 1. Create a new directory src/core/telemetry/. 2. Implement TelemetryAgent.ts. This system must passively observe the ECS and global event bus, recording significant events (e.g., player deaths, item drops, frame drops below 30 FPS, network reconnects). 3. Create a BatchProcessor.ts that aggregates these events into memory. To prevent network spam, it must chunk the data and flush it to the server only at specific intervals (e.g., every 60 seconds) or during non-critical moments (e.g., match end, loading screens). 4. Implement a spatial heatmap tracker. Periodically sample the Transform components of all active players and compress this positional data to generate server-side heatmaps of high-traffic areas and combat choke points. 5. Build CrashReporter.ts to capture global unhandled exceptions (window.onerror or Node.js uncaughtException). Upon a crash, it must immediately serialize the last 5 seconds of the InputBuffer and the current ECS Tick ID, shipping it as a deterministic replay payload for developers. 6. Optimize the network payload: Offload the JSON stringification and compression (e.g., using a lightweight LZ4 or Gzip Web Worker) to a background thread before dispatching the fetch() request to the backend ingestion endpoint. 7. Expose a diagnostic UI (renderTelemetryStats()) that shows the current size of the telemetry batch buffer, successful upload pings, and active tracking hooks.

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