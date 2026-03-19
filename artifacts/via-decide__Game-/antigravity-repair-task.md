Repair mode for repository via-decide/Game-.

TARGET
Validate and repair only the files touched by the previous implementation.

TASK
Implement a deterministic, chunk-based procedural generation engine called via-procgen-engine to dynamically create infinite terrain, biomes, and dungeon layouts. 1. Create a new directory src/core/world/procgen/. 2. Implement NoiseGenerator.ts using a fast, seed-based noise algorithm (like Simplex Noise or FastNoiseLite) to guarantee that the same random seed produces the exact same terrain mathematically on both the server and the client. 3. Create a ChunkManager.ts that divides the infinite world into fixed-size 2D or 3D grids (e.g., 32x32 tiles or voxels). As the player's Transform approaches the edge of a loaded chunk, the manager must queue adjacent chunks for generation. 4. Offload the heavy mathematical generation: The actual noise sampling, biome evaluation, and mesh generation MUST run inside a Web Worker (ChunkWorker.ts) to ensure the main ECS simulation never drops frames when the player is exploring rapidly. 5. Implement BiomeMapper.ts to combine multiple noise maps (e.g., Elevation, Moisture, Temperature) to assign specific biomes (Desert, Forest, Snow) and spawn appropriate environmental entities via the ECS (e.g., injecting Tree or Rock entities into the EntityManager). 6. Integrate with the SpatialGrid and RenderSystem: Once a chunk is generated, it must pass its static collision data to the physics engine and its batched vertex data (Float32Array) directly to the rendering pipeline. 7. Expose an interactive debug tool (renderProcGenStats()) to visualize chunk boundaries, active worker thread saturation, noise map previews, and chunk memory eviction rates.

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