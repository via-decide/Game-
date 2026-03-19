Repair mode for repository via-decide/Game-.

TARGET
Validate and repair only the files touched by the previous implementation.

TASK
Implement a secure, isolated scripting engine called via-modding-sandbox to allow players and developers to write custom game logic, ECS systems, and UI mods safely. 1. Create a new directory src/core/scripting/. 2. Implement SandboxManager.ts utilizing a lightweight WebAssembly (Wasm) runtime or an isolated JavaScript context (like isolated-vm in Node.js) to execute user-submitted code. 3. Define a strict API surface in EngineBridge.ts. The sandbox must only expose specific, whitelisted functions (e.g., via.spawnEntity(), via.onPlayerJoin(), via.applyDamage()). It must absolutely never have access to the host file system, network socket, or global window/process objects. 4. Implement an EventHookSystem.ts that allows mod scripts to listen to core engine lifecycle events (onTick, onCollision, onEntityDestroyed) and inject their own logic dynamically. 5. Enforce strict resource quotas: Set a hard memory limit (e.g., 32MB per mod) and an execution time limit per tick (e.g., 2ms). If a mod hits an infinite loop or allocates too much memory, the engine must gracefully kill the sandbox and log the error without crashing the main game server. 6. Implement a Hot-Reloading mechanism. If a developer edits a .js or .wasm mod file locally, the engine must instantly tear down the old sandbox instance, clear the registered event hooks, and boot the new script without requiring a server restart. 7. Expose a diagnostic tool (renderScriptingStats()) that monitors active sandboxes, per-script memory usage, and execution latency across all loaded mods.

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