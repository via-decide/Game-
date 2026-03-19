You are working in repository via-decide/Game- on branch main.

MISSION
Implement a multithreaded AI routing module called via-worker-nav to handle asynchronous pathfinding and crowd simulation (Flow Fields / A*) for massive entity counts. 1. Create a new directory src/core/ai/pathfinding/. 2. Implement NavGridGenerator.ts to parse static level geometry and bake a cohesive Navigation Mesh or cost-weighted grid at engine startup. 3. Create PathfindingWorker.ts. This must be an isolated script designed to run inside a native Web Worker (browser) or worker_threads (Node.js). It will house the core A* algorithm and Flow Field generation logic. 4. Implement an AISystem.ts within the ECS that manages the asynchronous request/response lifecycle. It should dispatch PathRequest payloads to the worker pool and apply the returning PathResult data to the entities' Velocity components. 5. Implement local collision avoidance (e.g., RVO - Reciprocal Velocity Obstacles or basic Boids steering behaviors) within the main thread's AISystem using the SpatialGrid from the physics module. This ensures agents don't clump together or get stuck on dynamic obstacles while following their macro-paths. 6. Design a message-passing protocol using pure binary buffers (ArrayBuffer) to transfer large arrays of waypoints between the worker and the main thread, avoiding JSON serialization overhead. 7. Expose a debug overlay (renderNavMesh()) to visualize pathfinding nodes, worker utilization metrics, and active Flow Field vector lines.

CONSTRAINTS
The main game loop MUST NOT perform any synchronous macro-pathfinding. All A* or Flow Field calculations must be strictly offloaded to the worker pool. Communication between threads must utilize SharedArrayBuffer (if environment supports it) or zero-copy transferable objects to prevent garbage collection pauses and memory duplication.

PROCESS (MANDATORY)
1. Read README.md and AGENTS.md before editing.
2. Audit architecture before coding. Summarize current behavior.
3. Preserve unrelated working code. Prefer additive modular changes.
4. Implement the smallest safe change set for the stated goal.
5. Run validation commands and fix discovered issues.
6. Self-review for regressions, missing env wiring, and docs drift.
7. Return complete final file contents for every modified or created file.

REPO AUDIT CONTEXT
- Description: Game l9gic
- Primary language: TypeScript
- README snippet:
<div align="center"> <img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" /> </div> # Run and deploy your AI Studio app This contains everything you need to run your app locally. View your app in AI Studio: https://ai.

- AGENTS snippet:
not found


SOP: PRE-MODIFICATION PROTOCOL (MANDATORY)
1. Adherence to Instructions: No deviations without explicit user approval.
2. Mandatory Clarification: Immediately ask if instructions are ambiguous or incomplete.
3. Proposal First: Always propose optimizations or fixes before implementing them.
4. Scope Discipline: Do not add unrequested features or modify unrelated code.
5. Vulnerability Check: Immediately flag and explain security risks.

OUTPUT REQUIREMENTS
- Include: implementation summary, checks run, risks, rollback notes.
- Generate branch + PR package.
- Keep prompts deterministic and preservation-first.