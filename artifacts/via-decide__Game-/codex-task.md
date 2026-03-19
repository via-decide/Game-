You are working in repository via-decide/Game- on branch main.

MISSION
Implement a lightweight, asynchronous analytics system called via-telemetry-pipeline to capture engine performance, crash dumps, and player spatial data. 1. Create a new directory src/core/telemetry/. 2. Implement TelemetryAgent.ts. This system must passively observe the ECS and global event bus, recording significant events (e.g., player deaths, item drops, frame drops below 30 FPS, network reconnects). 3. Create a BatchProcessor.ts that aggregates these events into memory. To prevent network spam, it must chunk the data and flush it to the server only at specific intervals (e.g., every 60 seconds) or during non-critical moments (e.g., match end, loading screens). 4. Implement a spatial heatmap tracker. Periodically sample the Transform components of all active players and compress this positional data to generate server-side heatmaps of high-traffic areas and combat choke points. 5. Build CrashReporter.ts to capture global unhandled exceptions (window.onerror or Node.js uncaughtException). Upon a crash, it must immediately serialize the last 5 seconds of the InputBuffer and the current ECS Tick ID, shipping it as a deterministic replay payload for developers. 6. Optimize the network payload: Offload the JSON stringification and compression (e.g., using a lightweight LZ4 or Gzip Web Worker) to a background thread before dispatching the fetch() request to the backend ingestion endpoint. 7. Expose a diagnostic UI (renderTelemetryStats()) that shows the current size of the telemetry batch buffer, successful upload pings, and active tracking hooks.

CONSTRAINTS
The telemetry system MUST be entirely non-blocking and fail-safe. If the analytics ingestion server goes down, the client must drop the telemetry packets rather than retrying infinitely and causing a memory leak. Never track Personally Identifiable Information (PII) to ensure GDPR/CCPA compliance. Do not trigger synchronous HTTP requests under any circumstances.

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