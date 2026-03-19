You are working in repository via-decide/Game- on branch main.

MISSION
Implement a non-blocking, asynchronous asset streaming pipeline called via-asset-streamer to manage memory pools and background-load heavy textures, models, and audio. 1. Create a new directory src/core/assets/. 2. Implement an AssetManifest.ts system that reads a centralized assets.json configuration, organizing resources into distinct bundles (e.g., "boot", "level_1_core", "ui_textures"). 3. Create ResourceManager.ts as a global singleton. It must handle all fetch() requests and manage an internal state machine for each asset (Pending, Loading, Decoding, Ready, Failed). 4. Implement an LRU (Least Recently Used) Cache eviction policy. If the total memory footprint of loaded textures or audio buffers exceeds a predefined quota (e.g., 256MB), the manager must intelligently unload the oldest, unreferenced assets to prevent browser crashes. 5. Optimize texture decoding: Utilize the modern createImageBitmap() API instead of the legacy new Image() HTML tag. This forces the browser to decode image data asynchronously off the main thread, completely eliminating frame drops when new entities spawn. 6. Hook the ResourceManager into the RenderSystem and AudioEngine. If an ECS entity requests a texture that isn't loaded yet, the system must immediately return a low-resolution placeholder (or a flat color material) while the high-res asset streams in the background. 7. Expose an interactive debugging panel (renderMemoryDiagnostics()) detailing current VRAM/RAM estimates, cache hits vs. misses, active download queues, and visual indicators for recently evicted assets.

CONSTRAINTS
Strictly avoid synchronous loading operations. The main game loop MUST never pause to wait for an asset to download or decode. You must properly call WebGLRenderingContext.deleteTexture() and AudioBuffer cleanup routines when evicting items from the LRU cache; simply removing the JavaScript reference is not enough and will cause massive GPU memory leaks.

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