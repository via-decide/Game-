You are working in repository via-decide/Game- on branch main.

MISSION
Implement a data-driven skeletal animation and blending pipeline called via-animation-graph to handle complex character movements and state transitions smoothly. 1. Create a new directory src/core/animation/. 2. Implement an Animator component for the ECS. This component must store the current animation state, playback time, and a reference to the entity's skeletal rig (bone hierarchy). 3. Create an AnimationGraph.ts (State Machine). This system must evaluate ECS parameters (e.g., isGrounded, velocity.x, health) to trigger automated transitions between animation states (e.g., transitioning from "Idle" to "Sprint" or blending into a "Flinch" animation when taking damage). 4. Implement 1D and 2D Blend Spaces. The animator must be able to smoothly interpolate between multiple animation clips simultaneously (e.g., blending a "Walk Forward" and "Aim Right" animation based on mouse position and movement input). 5. Optimize matrix calculations: Implement SkeletonManager.ts to compute the hierarchical local-to-global bone transforms. Store the resulting matrices in a contiguous Float32Array so it can be uploaded directly to the GPU as a uniform buffer or texture for hardware skinning. 6. Offload calculation: If the entity count exceeds a certain threshold, dispatch the heavy matrix multiplication workload (animating hundreds of skeletons) to a Web Worker pool or a WebGPU Compute Shader. 7. Expose an interactive debug overlay (renderSkeletons()) to visualize bone hierarchies (wireframes), joint axes, and active animation weights in real-time.

CONSTRAINTS
Strictly forbid allocating new matrices (Float32Array) per bone per frame. You MUST pre-allocate a global buffer for all skeleton data and mutate it in place. The animation graph logic must be purely deterministic so it can be safely rewound or fast-forwarded alongside the via-input-buffer during network lag compensation.

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