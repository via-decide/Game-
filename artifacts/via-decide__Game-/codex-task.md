You are working in repository via-decide/Game- on branch main.

MISSION
Implement a distributed world-state synchronizer called via-cell-broker to manage seamless player handovers and persistent entity states across multiple regional server nodes. 1. Create a new directory src/server/cluster/cell-broker/. 2. Implement CellAuthority.ts. Divide the global procedural coordinates into "Authority Cells." Each cell is owned by a specific headless server instance; when a player's Transform crosses a cell boundary, the broker must execute a zero-latency "Handover" of the WebSocket connection and ECS entity data. 3. Create a GhostEntitySystem.ts. For entities near cell boundaries, the broker must replicate "Ghost" versions (read-only proxies) to neighboring servers so players can see and interact across server boundaries without visual pops. 4. Implement GlobalPersistenceLayer.ts. Any structural changes to the procedurally generated world (e.g., a player building a base or destroying terrain) must be serialized and pushed to a high-speed distributed cache (like Redis or NATS JetStream). 5. Build an InterestManagement.ts filter. To save bandwidth, the broker must only stream entity updates to players that are within their "Area of Interest" (AoI), dynamically resizing this radius based on local entity density to prevent network saturation. 6. Implement ConflictResolver.ts. In cases where two players interact with the same world-object across different server nodes simultaneously, use Vector Clocks or CRDTs (Conflict-free Replicated Data Types) to ensure the final state is eventually consistent and deterministic. 7. Expose a cluster-wide visualization tool (renderClusterTopology()) showing the health, player load, and spatial boundaries of every active server node in the global fleet.

CONSTRAINTS
Strictly avoid "World Loading" screens during cell transitions. The handover must happen within a single server tick ( <16ms). You MUST use a binary pub/sub protocol for inter-server communication to minimize overhead. All persistent world changes must be delta-encoded so only the "diff" is saved to the global database, not the entire chunk.

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