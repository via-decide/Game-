You are working in repository via-decide/Game- on branch main.

MISSION
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