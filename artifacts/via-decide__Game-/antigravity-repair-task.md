Repair mode for repository via-decide/Game-.

TARGET
Validate and repair only the files touched by the previous implementation.

TASK
Implement a deterministic input abstraction layer called via-input-buffer to handle cross-platform hardware polling, action mapping, and history buffering for network reconciliation. 1. Create a new directory src/core/input/. 2. Implement InputPoller.ts to capture raw hardware states (Keyboard, Mouse, Gamepad API, and Touch) without relying on asynchronous DOM events during the main game loop. 3. Create an ActionMapper.ts that reads from a bindings.json configuration file, translating raw hardware keys (e.g., "KeyW", "GamepadButton0") into semantic, engine-agnostic commands (e.g., "MOVE_UP", "FIRE_WEAPON"). 4. Implement an InputBuffer.ts utilizing a fixed-size cyclic array (Ring Buffer) to store the exact input state and timestamp/tick-ID of the last 60-120 frames. 5. Integrate this buffer directly with the previously built via-state-replicator (Networking module) to support Server Reconciliation. If the server corrects the client's position, the client must instantly rewind to the corrected tick and fast-forward (re-simulate) all inputs stored in the InputBuffer up to the present frame. 6. Implement normalized input vectors (e.g., ensuring diagonal movement isn't faster than orthogonal movement) and configurable deadzones for analog sticks to guarantee fair, consistent movement speeds. 7. Expose an interactive debugging panel (renderInputDiagnostics()) that displays real-time controller states, active action mappings, and the current depth/health of the prediction buffer.

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