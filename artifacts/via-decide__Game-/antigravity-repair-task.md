Repair mode for repository via-decide/Game-.

TARGET
Validate and repair only the files touched by the previous implementation.

TASK
Implement a deterministic constraints solver called via-physics-constraints to handle joints, springs, and ragdoll physics within the ECS framework. 1. Create a new directory src/core/physics/dynamics/. 2. Implement ConstraintSolver.ts. This solver must run immediately after the narrow-phase collision resolution but before the final positional integration. It needs to resolve distance, hinge, and spring constraints using a deterministic iterative solver (e.g., Sequential Impulse or Gauss-Seidel). 3. Create JointComponent.ts to link two ECS entities together. The component must store the local anchor points for both entities, the type of joint (e.g., Revolute, Distance, Weld), and the maximum breaking force. 4. Implement an IKSystem.ts (Inverse Kinematics). Allow the physics engine to dynamically position the end-effectors of a skeletal mesh (e.g., placing feet perfectly on uneven procedurally generated terrain or pointing a weapon at a precise target coordinate). 5. Build a RagdollSystem.ts that listens for an entity's EVENT_DEATH. Upon death, it must instantly disable the entity's standard capsule collider, spawn a series of interconnected rigidbodies matching the skeletal hierarchy, and apply the entity's current velocity to the new ragdoll parts. 6. Optimize the solver for the spatial grid. Ensure that constraints spanning multiple grid cells are resolved in a stable, predictable order across the server and all connected clients. 7. Expose an interactive debug overlay (renderPhysicsJoints()) to draw lines representing active constraints, visualize IK target nodes, and highlight joints that are approaching their breaking thresholds.

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