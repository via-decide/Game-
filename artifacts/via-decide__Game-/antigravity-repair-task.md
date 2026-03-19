Repair mode for repository via-decide/Game-.

TARGET
Validate and repair only the files touched by the previous implementation.

TASK
Implement a non-blocking, asynchronous asset streaming pipeline called via-asset-streamer to manage memory pools and background-load heavy textures, models, and audio. 1. Create a new directory src/core/assets/. 2. Implement an AssetManifest.ts system that reads a centralized assets.json configuration, organizing resources into distinct bundles (e.g., "boot", "level_1_core", "ui_textures"). 3. Create ResourceManager.ts as a global singleton. It must handle all fetch() requests and manage an internal state machine for each asset (Pending, Loading, Decoding, Ready, Failed). 4. Implement an LRU (Least Recently Used) Cache eviction policy. If the total memory footprint of loaded textures or audio buffers exceeds a predefined quota (e.g., 256MB), the manager must intelligently unload the oldest, unreferenced assets to prevent browser crashes. 5. Optimize texture decoding: Utilize the modern createImageBitmap() API instead of the legacy new Image() HTML tag. This forces the browser to decode image data asynchronously off the main thread, completely eliminating frame drops when new entities spawn. 6. Hook the ResourceManager into the RenderSystem and AudioEngine. If an ECS entity requests a texture that isn't loaded yet, the system must immediately return a low-resolution placeholder (or a flat color material) while the high-res asset streams in the background. 7. Expose an interactive debugging panel (renderMemoryDiagnostics()) detailing current VRAM/RAM estimates, cache hits vs. misses, active download queues, and visual indicators for recently evicted assets.

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