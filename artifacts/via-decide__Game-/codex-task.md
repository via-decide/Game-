You are working in repository via-decide/Game- on branch main.

MISSION
Implement a custom, low-level rendering pipeline called via-render-batcher to drastically reduce GPU draw calls using WebGL or WebGPU instancing/batching. 1. Create a new directory src/client/renderer/. 2. Implement BatchRenderer.ts. This class must aggregate renderable entities from the ECS into massive, pre-allocated vertex buffers (Float32Array) rather than drawing them individually. 3. Create ShaderManager.ts to compile and manage custom vertex and fragment shaders optimized for batched rendering (e.g., passing texture atlases, UV coordinates, and tint colors as vertex attributes). 4. Implement an RenderSystem.ts within the ECS. Every frame, this system extracts Transform and Sprite/Mesh component data, calculates the final model matrices, and pushes the raw float data into the batcher's interleaved buffer. 5. Integrate Frustum Culling by querying the previously built SpatialGrid. Ensure that entities completely outside the player's camera view are strictly ignored and never uploaded to the GPU. 6. Optimize state changes: Sort the render queue by texture/material ID to ensure the pipeline binds a texture atlas only once per massive draw call (gl.drawElements or gl.drawArraysInstanced). 7. Expose a diagnostic UI (renderGPUStats()) that tracks frames per second (FPS), total draw calls per frame, discarded (culled) entities, and total vertex payload size.

CONSTRAINTS
Do NOT rely on heavy third-party rendering abstractions (like Three.js or PixiJS) if the objective is a native, zero-dependency engine. You MUST minimize WebGL state changes (e.g., swapping textures or shader programs) as they are the primary cause of CPU-bound rendering bottlenecks. All matrix math (projection, view, model) should ideally utilize a fast, flat-array mathematics library (like glMatrix) rather than allocating new objects.

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