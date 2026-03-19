You are working in repository via-decide/Game- on branch main.

MISSION
Implement a deterministic constraints solver called via-physics-constraints to handle joints, springs, and ragdoll physics within the ECS framework. 1. Create a new directory src/core/physics/dynamics/. 2. Implement ConstraintSolver.ts. This solver must run immediately after the narrow-phase collision resolution but before the final positional integration. It needs to resolve distance, hinge, and spring constraints using a deterministic iterative solver (e.g., Sequential Impulse or Gauss-Seidel). 3. Create JointComponent.ts to link two ECS entities together. The component must store the local anchor points for both entities, the type of joint (e.g., Revolute, Distance, Weld), and the maximum breaking force. 4. Implement an IKSystem.ts (Inverse Kinematics). Allow the physics engine to dynamically position the end-effectors of a skeletal mesh (e.g., placing feet perfectly on uneven procedurally generated terrain or pointing a weapon at a precise target coordinate). 5. Build a RagdollSystem.ts that listens for an entity's EVENT_DEATH. Upon death, it must instantly disable the entity's standard capsule collider, spawn a series of interconnected rigidbodies matching the skeletal hierarchy, and apply the entity's current velocity to the new ragdoll parts. 6. Optimize the solver for the spatial grid. Ensure that constraints spanning multiple grid cells are resolved in a stable, predictable order across the server and all connected clients. 7. Expose an interactive debug overlay (renderPhysicsJoints()) to draw lines representing active constraints, visualize IK target nodes, and highlight joints that are approaching their breaking thresholds.

CONSTRAINTS
Strictly maintain determinism. Floating-point math across different hardware architectures can lead to physics desyncs; you MUST use a fixed-point math library or rigorously round constraint impulses if this engine relies on lockstep or rollback networking. Avoid deeply nested object references for joints; store constraint pairs in a flat Uint32Array or Float32Array to maintain CPU cache coherency during the iterative solving phase.

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