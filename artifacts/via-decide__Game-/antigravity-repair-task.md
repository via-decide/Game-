Repair mode for repository via-decide/Game-.

TARGET
Validate and repair only the files touched by the previous implementation.

TASK
Implement a data-driven skeletal animation and blending pipeline called via-animation-graph to handle complex character movements and state transitions smoothly. 1. Create a new directory src/core/animation/. 2. Implement an Animator component for the ECS. This component must store the current animation state, playback time, and a reference to the entity's skeletal rig (bone hierarchy). 3. Create an AnimationGraph.ts (State Machine). This system must evaluate ECS parameters (e.g., isGrounded, velocity.x, health) to trigger automated transitions between animation states (e.g., transitioning from "Idle" to "Sprint" or blending into a "Flinch" animation when taking damage). 4. Implement 1D and 2D Blend Spaces. The animator must be able to smoothly interpolate between multiple animation clips simultaneously (e.g., blending a "Walk Forward" and "Aim Right" animation based on mouse position and movement input). 5. Optimize matrix calculations: Implement SkeletonManager.ts to compute the hierarchical local-to-global bone transforms. Store the resulting matrices in a contiguous Float32Array so it can be uploaded directly to the GPU as a uniform buffer or texture for hardware skinning. 6. Offload calculation: If the entity count exceeds a certain threshold, dispatch the heavy matrix multiplication workload (animating hundreds of skeletons) to a Web Worker pool or a WebGPU Compute Shader. 7. Expose an interactive debug overlay (renderSkeletons()) to visualize bone hierarchies (wireframes), joint axes, and active animation weights in real-time.

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