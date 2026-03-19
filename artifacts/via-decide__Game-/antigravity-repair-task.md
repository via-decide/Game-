Repair mode for repository via-decide/Game-.

TARGET
Validate and repair only the files touched by the previous implementation.

TASK
Implement a reactive UI bridge called via-ui-bridge to handle high-performance HUD updates (health bars, floating text, minimaps) without causing DOM layout thrashing. 1. Create a new directory src/client/ui/. 2. Implement UIStateManager.ts. This acts as a centralized, reactive data store that sits between the core ECS and the rendering layer, holding only the data relevant to the player's HUD. 3. Create DataBinder.ts using JavaScript Proxy objects or a dirty-flag system. It must observe specific ECS components (e.g., the local player's Health or Ammo component) and only trigger UI updates when the underlying values actually change. 4. Build an OverlayManager.ts that manages an absolute-positioned HTML/CSS layer (or a secondary 2D Canvas) placed directly on top of the main WebGL simulation canvas. 5. Implement object pooling for ephemeral UI elements, specifically Floating Damage Text. Instead of creating and destroying DOM nodes or Canvas objects constantly, recycle a fixed pool of elements. 6. Implement a screen-space projection utility that takes 3D/2D world coordinates from the ECS Transform components and projects them onto 2D screen coordinates for tracking UI elements (like nameplates floating above other players). 7. Expose a debug panel (renderUIStats()) that tracks DOM mutations per second, forced synchronous layouts (reflows), and the memory footprint of the UI element pool.

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