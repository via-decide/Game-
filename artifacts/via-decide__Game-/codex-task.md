You are working in repository via-decide/Game- on branch main.

MISSION
Implement a deterministic replay and broadcasting system called via-replay-core to record, scrub, and share full match simulations with minimal file sizes. 1. Create a new directory src/core/replay/. 2. Implement ReplayRecorder.ts. This system must hook into the start of a match, capturing the initial PRNG (Pseudo-Random Number Generator) seed, the exact level/map hash, and then strictly logging the compressed InputBuffer stream from all connected players. 3. Create ReplayPlayback.ts. This module will act as a virtual network layer. Instead of reading inputs from a live WebSocket, it injects the recorded input streams directly into the StateEngine tick-by-tick, ensuring the ECS identically recreates the original match. 4. Implement an EcsSnapshotter.ts to capture full binary snapshots of the ECS world state at fixed intervals (e.g., every 600 ticks / 10 seconds). This allows the replay timeline to jump to specific moments without forcing the engine to fast-forward simulate from Tick 0. 5. Build a SpectatorCamera.ts system that completely decouples the viewport from a specific player entity, allowing a broadcaster to free-cam around the 3D space, attach to different entities, or view tactical top-down minimaps during live or recorded matches. 6. Define a custom binary file format (.viarep) that chunks the snapshot data and compressed input streams together, utilizing a fast compression algorithm (like LZ4) before saving it to IndexedDB or the server. 7. Expose a broadcasting UI (renderTimelineScrubber()) that provides playback controls (Play, Pause, Fast Forward, Rewind), player highlighting, and dynamic playback speed adjustments (e.g., 0.25x slow-motion).

CONSTRAINTS
Strictly forbid recording the frame-by-frame position or state of every entity. A pure deterministic replay relies ONLY on the initial state and the raw player inputs, keeping a 30-minute match replay well under 5MB. The playback engine must perfectly align with the via-state-replicator to ensure that rewinding a replay uses the exact same logic as network lag-compensation.

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