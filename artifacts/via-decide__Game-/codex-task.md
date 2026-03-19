You are working in repository via-decide/Game- on branch main.

MISSION
Implement a multithreaded AI routing module called via-worker-nav to handle asynchronous pathfinding and crowd simulation (Flow Fields / A*) for massive entity counts. 1. Create a new directory src/core/ai/pathfinding/. 2. Implement NavGridGenerator.ts to parse static level geometry and bake a cohesive Navigation Mesh or cost-weighted grid at engine startup. 3. Create PathfindingWorker.ts. This must be an isolated script designed to run inside a native Web Worker (browser) or worker_threads (Node.js). It will house the core A* algorithm and Flow Field generation logic. 4. Implement an AISystem.ts within the ECS that manages the asynchronous request/response lifecycle. It should dispatch PathRequest payloads to the worker pool and apply the returning PathResult data to the entities' Velocity components. 5. Implement local collision avoidance (e.g., RVO - Reciprocal Velocity Obstacles or basic Boids steering behaviors) within the main thread's AISystem using the SpatialGrid from the physics module. This ensures agents don't clump together or get stuck on dynamic obstacles while following their macro-paths. 6. Design a message-passing protocol using pure binary buffers (ArrayBuffer) to transfer large arrays of waypoints between the worker and the main thread, avoiding JSON serialization overhead. 7. Expose a debug overlay (renderNavMesh()) to visualize pathfinding nodes, worker utilization metrics, and active Flow Field vector lines.

CONSTRAINTS
The main game loop MUST NOT perform any synchronous macro-pathfinding. All A* or Flow Field calculations must be strictly offloaded to the worker pool. Communication between threads must utilize SharedArrayBuffer (if environment supports it) or zero-copy transferable objects to prevent garbage collection pauses and memory duplication.
Implement a via-spatial-partitioning module utilizing a Dynamic Spatial Hash Grid (or Quadtree) to optimize broad-phase collision detection and spatial queries. 1. Create a new directory src/core/physics/spatial/. 2. Implement SpatialGrid.ts. This structure must dynamically divide the game world into a grid of cells (buckets) and map entity IDs to their occupying cells using fast bitwise hashing. 3. Create a CollisionSystem.ts that operates within the ECS. At the start of the tick, it should clear the grid and repopulate it with all entities possessing a Collider and Transform component. 4. Implement Broad-Phase Detection: Instead of checking every entity against every other entity (O(N^2)), the system must only test entities against others sharing the same or adjacent spatial cells, drastically reducing intersection calculations. 5. Implement Narrow-Phase Resolution: For entities that pass the broad-phase AABB (Axis-Aligned Bounding Box) check, calculate the exact penetration vectors and apply corrective displacement to their Transform components. 6. Add a RaycastEngine.ts that traverses the spatial grid using a fast voxel traversal algorithm (like DDA) to provide highly efficient Line-of-Sight (LoS) checks and projectile hit detection. 7. Expose visual debug rendering hooks (renderDebugGrid()) to draw grid cell boundaries and bounding boxes when the engine is running in development mode.

CONSTRAINTS
Strictly prohibit memory allocation inside the physics update loop. Do NOT instantiate new Vector2 or collision pair objects every frame; use pre-allocated static objects or flat arrays to store collision manifolds and pair data. The spatial hashing function must rely on fast bitwise operators rather than expensive floating-point math or string concatenation.
Implement a strict, data-oriented Entity-Component-System (ECS) architecture called via-ecs-core to decouple game logic from state and maximize CPU cache coherency for high entity counts. 1. Create a new directory src/core/ecs/. 2. Implement EntityManager.ts. Entities must strictly be represented as unique integers (IDs) rather than heavy class instances. Implement an entity recycling pool to prevent memory fragmentation during rapid creation/destruction cycles. 3. Create ComponentRegistry.ts. Components must be pure data containers (e.g., Transform, Velocity, Health). Implement memory pooling using flat TypedArrays (like Float32Array) so contiguous data can be fed directly to the CPU cache. 4. Implement SystemManager.ts to handle logic execution. Systems (e.g., MovementSystem, CollisionSystem) should iterate over tight, contiguous arrays of components that match specific bitmask signatures or archetypes. 5. Refactor the existing main game loop in src/game.ts to transition from an Object-Oriented "update-every-object" model to a linear execution of registered ECS Systems. 6. Build an internal QueryBuilder that allows systems to dynamically request subsets of entities (e.g., "Give me all entities with [Transform] + [Collider] + [Damageable]"). 7. Expose an interactive debug hook (window.__VIA_ECS_DEBUG__) that outputs real-time metrics on total active entities, memory pool saturation, and per-system execution times.

CONSTRAINTS
Strictly forbid deep Object-Oriented inheritance trees for game objects (no class Player extends Character extends GameObject). The architecture MUST be purely data-oriented (DOD). Component data must be packed sequentially in memory. Avoid garbage collection (GC) spikes entirely during the main game loop by pre-allocating memory pools at engine startup and strictly reusing them.
Implement a core multiplayer networking module called via-state-replicator to handle low-latency, authoritative game state synchronization. 1. Create a new directory src/core/multiplayer/state-sync/. 2. Create sync-config.json defining server tick rates (e.g., 60Hz), interpolation buffer windows, and entity replication authority schemas (e.g., "server_auth", "client_predict"). 3. Implement StateEngine.ts (or .js). This class must act as the central authority for all game state mutations, intercepting incoming player inputs and resolving physics/game logic before broadcasting updates. 4. The engine must implement delta-compression for network payloads. It should compare the current frame's state against the previous broadcast and only transmit changed properties (e.g., position, velocity, health) to severely minimize bandwidth. 5. Integrate client-side prediction and server reconciliation logic. The client should preemptively simulate local inputs and smoothly interpolate to the authoritative server state when discrepancies (mispredictions) occur. 6. Hook this replicator into the main game loop (src/game.ts or src/engine.ts), ensuring the fixed time-step update and network broadcast phases are tightly synchronized. 7. Expose an internal metrics WebSocket endpoint (/api/v1/network/telemetry) to stream real-time debug data-such as jitter, packet drop rate, and tick execution latency-to external admin dashboards.

CONSTRAINTS
Do NOT rely on heavy, bloated serialization formats like standard JSON over the wire. You MUST implement binary serialization (using native ArrayBuffer and DataView, or a lightweight flatbuffer equivalent) for all network payloads to optimize throughput. The state calculation loop must be strictly deterministic and completely decoupled from any rendering code, ensuring the server can run entirely headless without a DOM or WebGL context.

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