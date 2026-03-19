You are working in repository via-decide/Game- on branch main.

MISSION
Implement a secure, isolated scripting engine called via-modding-sandbox to allow players and developers to write custom game logic, ECS systems, and UI mods safely. 1. Create a new directory src/core/scripting/. 2. Implement SandboxManager.ts utilizing a lightweight WebAssembly (Wasm) runtime or an isolated JavaScript context (like isolated-vm in Node.js) to execute user-submitted code. 3. Define a strict API surface in EngineBridge.ts. The sandbox must only expose specific, whitelisted functions (e.g., via.spawnEntity(), via.onPlayerJoin(), via.applyDamage()). It must absolutely never have access to the host file system, network socket, or global window/process objects. 4. Implement an EventHookSystem.ts that allows mod scripts to listen to core engine lifecycle events (onTick, onCollision, onEntityDestroyed) and inject their own logic dynamically. 5. Enforce strict resource quotas: Set a hard memory limit (e.g., 32MB per mod) and an execution time limit per tick (e.g., 2ms). If a mod hits an infinite loop or allocates too much memory, the engine must gracefully kill the sandbox and log the error without crashing the main game server. 6. Implement a Hot-Reloading mechanism. If a developer edits a .js or .wasm mod file locally, the engine must instantly tear down the old sandbox instance, clear the registered event hooks, and boot the new script without requiring a server restart. 7. Expose a diagnostic tool (renderScriptingStats()) that monitors active sandboxes, per-script memory usage, and execution latency across all loaded mods.

CONSTRAINTS
Do NOT use the native eval(), new Function(), or standard Web Workers for the sandbox, as they do not provide sufficient security boundaries against malicious code in a multi-tenant server environment. The bridge between the host engine and the sandbox must serialize and pass data via flat memory buffers (ArrayBuffers) to minimize cross-context communication overhead.

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