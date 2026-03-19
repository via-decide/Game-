Repair mode for repository via-decide/Game-.

TARGET
Validate and repair only the files touched by the previous implementation.

TASK
Implement a distributed world-state synchronizer called via-cell-broker to manage seamless player handovers and persistent entity states across multiple regional server nodes. 1. Create a new directory src/server/cluster/cell-broker/. 2. Implement CellAuthority.ts. Divide the global procedural coordinates into "Authority Cells." Each cell is owned by a specific headless server instance; when a player's Transform crosses a cell boundary, the broker must execute a zero-latency "Handover" of the WebSocket connection and ECS entity data. 3. Create a GhostEntitySystem.ts. For entities near cell boundaries, the broker must replicate "Ghost" versions (read-only proxies) to neighboring servers so players can see and interact across server boundaries without visual pops. 4. Implement GlobalPersistenceLayer.ts. Any structural changes to the procedurally generated world (e.g., a player building a base or destroying terrain) must be serialized and pushed to a high-speed distributed cache (like Redis or NATS JetStream). 5. Build an InterestManagement.ts filter. To save bandwidth, the broker must only stream entity updates to players that are within their "Area of Interest" (AoI), dynamically resizing this radius based on local entity density to prevent network saturation. 6. Implement ConflictResolver.ts. In cases where two players interact with the same world-object across different server nodes simultaneously, use Vector Clocks or CRDTs (Conflict-free Replicated Data Types) to ensure the final state is eventually consistent and deterministic. 7. Expose a cluster-wide visualization tool (renderClusterTopology()) showing the health, player load, and spatial boundaries of every active server node in the global fleet.

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