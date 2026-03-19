You are working in repository via-decide/Game- on branch main.

MISSION
Implement a highly optimized, GPU-driven lighting pipeline called via-lighting-pipeline utilizing Deferred Shading (or Forward+) to support hundreds of dynamic light sources. 1. Create a new directory src/client/renderer/lighting/. 2. Implement LightComponent.ts within the ECS. Differentiate between DirectionalLight (sun/moon), PointLight (torches/explosions), and SpotLight (flashlights). These components should only store pure data: color, intensity, radius, and cast-shadow flags. 3. Create a Geometry Buffer (G-Buffer) pass in DeferredRenderer.ts. Instead of calculating lighting immediately, the main render pass must output the scene's Albedo (color), Normals, Depth, and Material properties (Roughness/Metallic) into multiple WebGL/WebGPU texture targets simultaneously (MRT). 4. Implement a unified Lighting Pass. Read the G-Buffer textures and calculate the final pixel colors using a physically based rendering (PBR) BRDF model. This ensures that rendering 100 point lights doesn't require redrawing the scene geometry 100 times. 5. Build a Cascaded Shadow Map (CSM) system for the main DirectionalLight. Partition the camera's view frustum into multiple depth slices, rendering higher-resolution shadows close to the player and lower-resolution shadows further away to save GPU memory. 6. Add a lightweight Screen Space Ambient Occlusion (SSAO) post-processing shader to ground entities in the world by adding soft contact shadows in corners and crevices based on the G-Buffer's depth and normal data. 7. Expose a G-Buffer inspection tool (renderLightingDebug()) allowing developers to view the individual Albedo, Normal, Depth, and Shadow Map textures mapped to UI quads on the screen.

CONSTRAINTS
Strictly prohibit standard Forward Rendering loops where the complexity is $O(\text{geometry} \times \text{lights})$. You MUST use WebGL 2.0 Multiple Render Targets (MRT) or WebGPU to output to the G-Buffer in a single pass. Ensure shadow map framebuffers are pre-allocated and appropriately sized (e.g., 1024x1024 or 2048x2048) to avoid VRAM fragmentation and garbage collection spikes.

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