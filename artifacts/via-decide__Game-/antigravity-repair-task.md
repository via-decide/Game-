Repair mode for repository via-decide/Game-.

TARGET
Validate and repair only the files touched by the previous implementation.

TASK
Implement a highly optimized, GPU-driven lighting pipeline called via-lighting-pipeline utilizing Deferred Shading (or Forward+) to support hundreds of dynamic light sources. 1. Create a new directory src/client/renderer/lighting/. 2. Implement LightComponent.ts within the ECS. Differentiate between DirectionalLight (sun/moon), PointLight (torches/explosions), and SpotLight (flashlights). These components should only store pure data: color, intensity, radius, and cast-shadow flags. 3. Create a Geometry Buffer (G-Buffer) pass in DeferredRenderer.ts. Instead of calculating lighting immediately, the main render pass must output the scene's Albedo (color), Normals, Depth, and Material properties (Roughness/Metallic) into multiple WebGL/WebGPU texture targets simultaneously (MRT). 4. Implement a unified Lighting Pass. Read the G-Buffer textures and calculate the final pixel colors using a physically based rendering (PBR) BRDF model. This ensures that rendering 100 point lights doesn't require redrawing the scene geometry 100 times. 5. Build a Cascaded Shadow Map (CSM) system for the main DirectionalLight. Partition the camera's view frustum into multiple depth slices, rendering higher-resolution shadows close to the player and lower-resolution shadows further away to save GPU memory. 6. Add a lightweight Screen Space Ambient Occlusion (SSAO) post-processing shader to ground entities in the world by adding soft contact shadows in corners and crevices based on the G-Buffer's depth and normal data. 7. Expose a G-Buffer inspection tool (renderLightingDebug()) allowing developers to view the individual Albedo, Normal, Depth, and Shadow Map textures mapped to UI quads on the screen.

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