You are working in repository via-decide/Game- on branch main.

MISSION
Implement a deterministic input abstraction layer called via-input-buffer to handle cross-platform hardware polling, action mapping, and history buffering for network reconciliation. 1. Create a new directory src/core/input/. 2. Implement InputPoller.ts to capture raw hardware states (Keyboard, Mouse, Gamepad API, and Touch) without relying on asynchronous DOM events during the main game loop. 3. Create an ActionMapper.ts that reads from a bindings.json configuration file, translating raw hardware keys (e.g., "KeyW", "GamepadButton0") into semantic, engine-agnostic commands (e.g., "MOVE_UP", "FIRE_WEAPON"). 4. Implement an InputBuffer.ts utilizing a fixed-size cyclic array (Ring Buffer) to store the exact input state and timestamp/tick-ID of the last 60-120 frames. 5. Integrate this buffer directly with the previously built via-state-replicator (Networking module) to support Server Reconciliation. If the server corrects the client's position, the client must instantly rewind to the corrected tick and fast-forward (re-simulate) all inputs stored in the InputBuffer up to the present frame. 6. Implement normalized input vectors (e.g., ensuring diagonal movement isn't faster than orthogonal movement) and configurable deadzones for analog sticks to guarantee fair, consistent movement speeds. 7. Expose an interactive debugging panel (renderInputDiagnostics()) that displays real-time controller states, active action mappings, and the current depth/health of the prediction buffer.

CONSTRAINTS
Do NOT rely purely on standard JavaScript event listeners (keydown, keyup) inside the ECS logic, as their asynchronous nature will completely break game loop determinism. Input state must be polled at the precise start of every simulation tick. The ring buffer must be pre-allocated to avoid memory fragmentation.

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