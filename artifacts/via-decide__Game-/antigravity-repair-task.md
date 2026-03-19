Repair mode for repository via-decide/Game-.

TARGET
Validate and repair only the files touched by the previous implementation.

TASK
Implement a multithreaded AI routing module called via-worker-nav to handle asynchronous pathfinding and crowd simulation (Flow Fields / A*) for massive entity counts. 1. Create a new directory src/core/ai/pathfinding/. 2. Implement NavGridGenerator.ts to parse static level geometry and bake a cohesive Navigation Mesh or cost-weighted grid at engine startup. 3. Create PathfindingWorker.ts. This must be an isolated script designed to run inside a native Web Worker (browser) or worker_threads (Node.js). It will house the core A* algorithm and Flow Field generation logic. 4. Implement an AISystem.ts within the ECS that manages the asynchronous request/response lifecycle. It should dispatch PathRequest payloads to the worker pool and apply the returning PathResult data to the entities' Velocity components. 5. Implement local collision avoidance (e.g., RVO - Reciprocal Velocity Obstacles or basic Boids steering behaviors) within the main thread's AISystem using the SpatialGrid from the physics module. This ensures agents don't clump together or get stuck on dynamic obstacles while following their macro-paths. 6. Design a message-passing protocol using pure binary buffers (ArrayBuffer) to transfer large arrays of waypoints between the worker and the main thread, avoiding JSON serialization overhead. 7. Expose a debug overlay (renderNavMesh()) to visualize pathfinding nodes, worker utilization metrics, and active Flow Field vector lines.

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