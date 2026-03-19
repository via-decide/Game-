Repair mode for repository via-decide/Game-.

TARGET
Validate and repair only the files touched by the previous implementation.

TASK
Implement a custom, low-level rendering pipeline called via-render-batcher to drastically reduce GPU draw calls using WebGL or WebGPU instancing/batching. 1. Create a new directory src/client/renderer/. 2. Implement BatchRenderer.ts. This class must aggregate renderable entities from the ECS into massive, pre-allocated vertex buffers (Float32Array) rather than drawing them individually. 3. Create ShaderManager.ts to compile and manage custom vertex and fragment shaders optimized for batched rendering (e.g., passing texture atlases, UV coordinates, and tint colors as vertex attributes). 4. Implement an RenderSystem.ts within the ECS. Every frame, this system extracts Transform and Sprite/Mesh component data, calculates the final model matrices, and pushes the raw float data into the batcher's interleaved buffer. 5. Integrate Frustum Culling by querying the previously built SpatialGrid. Ensure that entities completely outside the player's camera view are strictly ignored and never uploaded to the GPU. 6. Optimize state changes: Sort the render queue by texture/material ID to ensure the pipeline binds a texture atlas only once per massive draw call (gl.drawElements or gl.drawArraysInstanced). 7. Expose a diagnostic UI (renderGPUStats()) that tracks frames per second (FPS), total draw calls per frame, discarded (culled) entities, and total vertex payload size.

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