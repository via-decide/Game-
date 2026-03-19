Repair mode for repository via-decide/Game-.

TARGET
Validate and repair only the files touched by the previous implementation.

TASK
Implement a responsive UI layout and localization module called via-global-ui to handle cross-device scaling, dynamic language switching, and accessibility. 1. Create a new directory src/client/ui/globalization/. 2. Implement LocaleManager.ts. This system must asynchronously load translation packs (.json or a custom binary format) and swap out localized strings in the UIStateManager without requiring a game restart or page reload. 3. Create an advanced Text Renderer using Multi-Channel Signed Distance Fields (MSDF). This allows the custom rendering pipeline to draw crisp, infinitely scalable text for complex scripts (CJK characters) without massive texture memory overhead. 4. Implement support for Right-to-Left (RTL) text rendering and complex typographic shaping (e.g., Arabic ligatures) if utilizing a native text shaping library via WebAssembly (like HarfBuzz). 5. Build a LayoutEngine.ts utilizing an anchor-based or flex-like constraint system. The UI must automatically adapt to ultrawide desktop monitors, standard 16:9 displays, and mobile screens (accounting for safe areas and notches) by recalculating bounds only on window.resize events. 6. Integrate Accessibility (a11y) hooks. Expose shader-level colorblind filters (Protanopia, Deuteranopia, Tritanopia) that recalculate the final frame buffer colors, and add a high-contrast mode for UI elements. 7. Expose an internal "Pseudo-Localization" debug toggle (renderI18nDebug()). When enabled, this tool must automatically expand all text strings by 30-40% and replace characters with accented variants to instantly highlight UI clipping issues and hardcoded strings.

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