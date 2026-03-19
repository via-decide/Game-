Repair mode for repository via-decide/Game-.

TARGET
Validate and repair only the files touched by the previous implementation.

TASK
Implement a strict, data-oriented Entity-Component-System (ECS) architecture called via-ecs-core to decouple game logic from state and maximize CPU cache coherency for high entity counts. 1. Create a new directory src/core/ecs/. 2. Implement EntityManager.ts. Entities must strictly be represented as unique integers (IDs) rather than heavy class instances. Implement an entity recycling pool to prevent memory fragmentation during rapid creation/destruction cycles. 3. Create ComponentRegistry.ts. Components must be pure data containers (e.g., Transform, Velocity, Health). Implement memory pooling using flat TypedArrays (like Float32Array) so contiguous data can be fed directly to the CPU cache. 4. Implement SystemManager.ts to handle logic execution. Systems (e.g., MovementSystem, CollisionSystem) should iterate over tight, contiguous arrays of components that match specific bitmask signatures or archetypes. 5. Refactor the existing main game loop in src/game.ts to transition from an Object-Oriented "update-every-object" model to a linear execution of registered ECS Systems. 6. Build an internal QueryBuilder that allows systems to dynamically request subsets of entities (e.g., "Give me all entities with [Transform] + [Collider] + [Damageable]"). 7. Expose an interactive debug hook (window.__VIA_ECS_DEBUG__) that outputs real-time metrics on total active entities, memory pool saturation, and per-system execution times.
Implement a core multiplayer networking module called via-state-replicator to handle low-latency, authoritative game state synchronization. 1. Create a new directory src/core/multiplayer/state-sync/. 2. Create sync-config.json defining server tick rates (e.g., 60Hz), interpolation buffer windows, and entity replication authority schemas (e.g., "server_auth", "client_predict"). 3. Implement StateEngine.ts (or .js). This class must act as the central authority for all game state mutations, intercepting incoming player inputs and resolving physics/game logic before broadcasting updates. 4. The engine must implement delta-compression for network payloads. It should compare the current frame's state against the previous broadcast and only transmit changed properties (e.g., position, velocity, health) to severely minimize bandwidth. 5. Integrate client-side prediction and server reconciliation logic. The client should preemptively simulate local inputs and smoothly interpolate to the authoritative server state when discrepancies (mispredictions) occur. 6. Hook this replicator into the main game loop (src/game.ts or src/engine.ts), ensuring the fixed time-step update and network broadcast phases are tightly synchronized. 7. Expose an internal metrics WebSocket endpoint (/api/v1/network/telemetry) to stream real-time debug data-such as jitter, packet drop rate, and tick execution latency-to external admin dashboards.

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