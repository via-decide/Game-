Repair mode for repository via-decide/Game-.

TARGET
Validate and repair only the files touched by the previous implementation.

TASK
Implement a highly optimized, binary-based serialization engine called via-state-serializer to handle game saving, loading, and database persistence of the ECS world state. 1. Create a new directory src/core/serialization/. 2. Implement StateSerializer.ts. This module must iterate through the ECS EntityManager and ComponentRegistry, packing all relevant entity data (e.g., Transforms, Inventories, Health) into a dense, contiguous ArrayBuffer. 3. Create SaveManager.ts to interface with the browser's asynchronous IndexedDB API for local saves, completely avoiding the synchronous and size-limited localStorage API. 4. Implement an internal Snapshot system. The serializer must capture the current simulation Tick ID and the internal state of the engine's Pseudo-Random Number Generator (PRNG) seed to guarantee absolute deterministic restoration upon loading. 5. Build a Hydration pipeline (StateDeserializer.ts). When a save file is loaded, this system must gracefully purge the current ECS world, re-allocate the necessary entity IDs, and inject the binary component data back into memory pools. 6. Implement a schema versioning system. As the game updates and components change, the serializer must tag save files with a version ID and run migration scripts to upgrade older binary save files to the current component layout without data loss. 7. Expose a diagnostic tool (renderSaveStats()) that displays the exact byte-size of the current world snapshot, serialization latency (in milliseconds), and recent IndexedDB read/write times.

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