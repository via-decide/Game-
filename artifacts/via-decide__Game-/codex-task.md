You are working in repository via-decide/Game- on branch main.

MISSION
Implement a highly scalable, GPU-driven particle engine called via-vfx-pipeline to handle massive visual effects (weather, explosions, magic) with zero CPU overhead. 1. Create a new directory src/client/vfx/. 2. Implement ParticleEmitter.ts within the ECS. Emitters should be pure data components defining spawn rates, lifetime curves, velocity vectors, and color gradients, strictly avoiding individual particle state tracking on the CPU. 3. Create a Compute Shader (WebGPU) or Transform Feedback (WebGL2) pipeline in ParticleSimulator.ts. This must offload the lifecycle, physics (gravity, drag, wind), and color interpolation of up to 100,000+ simultaneous particles entirely to the GPU. 4. Implement an instanced rendering buffer specifically for the VFX system, allowing the RenderSystem to draw massive swarms of particles in a single, batched draw call. 5. Build a deterministic noise texture generator to feed into the GPU shaders, allowing for cheap, realistic turbulence and fluid-like swarming behaviors without complex math on the main thread. 6. Integrate spatial culling. Emitters attached to entities that are outside the camera's frustum (via the SpatialGrid) must pause their GPU buffer updates to conserve memory bandwidth. 7. Expose a diagnostic tool (renderVFXStats()) that tracks the total active particle count across all emitters, GPU buffer saturation, and compute-shader execution latency.

CONSTRAINTS
Strictly forbid updating individual particle positions (x, y), velocities, or colors inside a JavaScript for loop on the CPU. The CPU's only job is to update the master uniform data (e.g., emitter position, time delta) and issue the draw call. You MUST use pre-allocated Float32Arrays for the initial particle seed data to prevent garbage collection spikes upon emitter creation.

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