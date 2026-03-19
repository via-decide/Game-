You are working in repository via-decide/Game- on branch main.

MISSION
Implement a highly optimized, binary-based serialization engine called via-state-serializer to handle game saving, loading, and database persistence of the ECS world state. 1. Create a new directory src/core/serialization/. 2. Implement StateSerializer.ts. This module must iterate through the ECS EntityManager and ComponentRegistry, packing all relevant entity data (e.g., Transforms, Inventories, Health) into a dense, contiguous ArrayBuffer. 3. Create SaveManager.ts to interface with the browser's asynchronous IndexedDB API for local saves, completely avoiding the synchronous and size-limited localStorage API. 4. Implement an internal Snapshot system. The serializer must capture the current simulation Tick ID and the internal state of the engine's Pseudo-Random Number Generator (PRNG) seed to guarantee absolute deterministic restoration upon loading. 5. Build a Hydration pipeline (StateDeserializer.ts). When a save file is loaded, this system must gracefully purge the current ECS world, re-allocate the necessary entity IDs, and inject the binary component data back into memory pools. 6. Implement a schema versioning system. As the game updates and components change, the serializer must tag save files with a version ID and run migration scripts to upgrade older binary save files to the current component layout without data loss. 7. Expose a diagnostic tool (renderSaveStats()) that displays the exact byte-size of the current world snapshot, serialization latency (in milliseconds), and recent IndexedDB read/write times.

CONSTRAINTS
Strictly forbid using JSON.stringify() or JSON.parse() for full world states, as the resulting garbage collection spikes and string allocation overhead will freeze the browser on large saves. The serialization process must ideally be chunked across multiple frames (time-slicing) or offloaded to a Web Worker if the entity count exceeds 10,000.

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