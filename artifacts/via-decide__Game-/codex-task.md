You are working in repository via-decide/Game- on branch main.

MISSION
Implement a via-spatial-partitioning module utilizing a Dynamic Spatial Hash Grid (or Quadtree) to optimize broad-phase collision detection and spatial queries. 1. Create a new directory src/core/physics/spatial/. 2. Implement SpatialGrid.ts. This structure must dynamically divide the game world into a grid of cells (buckets) and map entity IDs to their occupying cells using fast bitwise hashing. 3. Create a CollisionSystem.ts that operates within the ECS. At the start of the tick, it should clear the grid and repopulate it with all entities possessing a Collider and Transform component. 4. Implement Broad-Phase Detection: Instead of checking every entity against every other entity (O(N^2)), the system must only test entities against others sharing the same or adjacent spatial cells, drastically reducing intersection calculations. 5. Implement Narrow-Phase Resolution: For entities that pass the broad-phase AABB (Axis-Aligned Bounding Box) check, calculate the exact penetration vectors and apply corrective displacement to their Transform components. 6. Add a RaycastEngine.ts that traverses the spatial grid using a fast voxel traversal algorithm (like DDA) to provide highly efficient Line-of-Sight (LoS) checks and projectile hit detection. 7. Expose visual debug rendering hooks (renderDebugGrid()) to draw grid cell boundaries and bounding boxes when the engine is running in development mode.

CONSTRAINTS
Strictly prohibit memory allocation inside the physics update loop. Do NOT instantiate new Vector2 or collision pair objects every frame; use pre-allocated static objects or flat arrays to store collision manifolds and pair data. The spatial hashing function must rely on fast bitwise operators rather than expensive floating-point math or string concatenation.

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