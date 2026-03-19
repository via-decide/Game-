Repair mode for repository via-decide/Game-.

TARGET
Validate and repair only the files touched by the previous implementation.

TASK
Implement a highly scalable, GPU-driven particle engine called via-vfx-pipeline to handle massive visual effects (weather, explosions, magic) with zero CPU overhead. 1. Create a new directory src/client/vfx/. 2. Implement ParticleEmitter.ts within the ECS. Emitters should be pure data components defining spawn rates, lifetime curves, velocity vectors, and color gradients, strictly avoiding individual particle state tracking on the CPU. 3. Create a Compute Shader (WebGPU) or Transform Feedback (WebGL2) pipeline in ParticleSimulator.ts. This must offload the lifecycle, physics (gravity, drag, wind), and color interpolation of up to 100,000+ simultaneous particles entirely to the GPU. 4. Implement an instanced rendering buffer specifically for the VFX system, allowing the RenderSystem to draw massive swarms of particles in a single, batched draw call. 5. Build a deterministic noise texture generator to feed into the GPU shaders, allowing for cheap, realistic turbulence and fluid-like swarming behaviors without complex math on the main thread. 6. Integrate spatial culling. Emitters attached to entities that are outside the camera's frustum (via the SpatialGrid) must pause their GPU buffer updates to conserve memory bandwidth. 7. Expose a diagnostic tool (renderVFXStats()) that tracks the total active particle count across all emitters, GPU buffer saturation, and compute-shader execution latency.

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