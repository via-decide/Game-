Repair mode for repository via-decide/Game-.

TARGET
Validate and repair only the files touched by the previous implementation.

TASK
Implement a via-spatial-partitioning module utilizing a Dynamic Spatial Hash Grid (or Quadtree) to optimize broad-phase collision detection and spatial queries. 1. Create a new directory src/core/physics/spatial/. 2. Implement SpatialGrid.ts. This structure must dynamically divide the game world into a grid of cells (buckets) and map entity IDs to their occupying cells using fast bitwise hashing. 3. Create a CollisionSystem.ts that operates within the ECS. At the start of the tick, it should clear the grid and repopulate it with all entities possessing a Collider and Transform component. 4. Implement Broad-Phase Detection: Instead of checking every entity against every other entity (O(N^2)), the system must only test entities against others sharing the same or adjacent spatial cells, drastically reducing intersection calculations. 5. Implement Narrow-Phase Resolution: For entities that pass the broad-phase AABB (Axis-Aligned Bounding Box) check, calculate the exact penetration vectors and apply corrective displacement to their Transform components. 6. Add a RaycastEngine.ts that traverses the spatial grid using a fast voxel traversal algorithm (like DDA) to provide highly efficient Line-of-Sight (LoS) checks and projectile hit detection. 7. Expose visual debug rendering hooks (renderDebugGrid()) to draw grid cell boundaries and bounding boxes when the engine is running in development mode.

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