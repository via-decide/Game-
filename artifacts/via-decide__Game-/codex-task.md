You are working in repository via-decide/Game- on branch main.

MISSION
Implement a deterministic, chunk-based procedural generation engine called via-procgen-engine to dynamically create infinite terrain, biomes, and dungeon layouts. 1. Create a new directory src/core/world/procgen/. 2. Implement NoiseGenerator.ts using a fast, seed-based noise algorithm (like Simplex Noise or FastNoiseLite) to guarantee that the same random seed produces the exact same terrain mathematically on both the server and the client. 3. Create a ChunkManager.ts that divides the infinite world into fixed-size 2D or 3D grids (e.g., 32x32 tiles or voxels). As the player's Transform approaches the edge of a loaded chunk, the manager must queue adjacent chunks for generation. 4. Offload the heavy mathematical generation: The actual noise sampling, biome evaluation, and mesh generation MUST run inside a Web Worker (ChunkWorker.ts) to ensure the main ECS simulation never drops frames when the player is exploring rapidly. 5. Implement BiomeMapper.ts to combine multiple noise maps (e.g., Elevation, Moisture, Temperature) to assign specific biomes (Desert, Forest, Snow) and spawn appropriate environmental entities via the ECS (e.g., injecting Tree or Rock entities into the EntityManager). 6. Integrate with the SpatialGrid and RenderSystem: Once a chunk is generated, it must pass its static collision data to the physics engine and its batched vertex data (Float32Array) directly to the rendering pipeline. 7. Expose an interactive debug tool (renderProcGenStats()) to visualize chunk boundaries, active worker thread saturation, noise map previews, and chunk memory eviction rates.

CONSTRAINTS
Do NOT send generated terrain data over the network from the server to the client. Because the algorithm is strictly deterministic, you only need to sync the 32-bit world seed during the initial connection handshake; the client will generate the exact same geometry locally. Stale chunks that are far behind the player must be aggressively unloaded, and their memory pools recycled, to prevent out-of-memory (OOM) crashes in infinite worlds.

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