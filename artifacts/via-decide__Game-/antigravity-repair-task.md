Repair mode for repository via-decide/Game-.

TARGET
Validate and repair only the files touched by the previous implementation.

TASK
Implement a highly scalable player identity and social graph microservice called via-social-hub to handle persistent profiles, inventories, and party matchmaking. 1. Create a new directory src/services/social-hub/. 2. Implement AuthenticationService.ts. Set up secure OAuth2 and JWT-based session management, allowing players to log in via Discord, Google, or native credentials without tying auth logic to the core game servers. 3. Create InventoryManager.ts to interface with a persistent database (e.g., PostgreSQL or MongoDB). It must securely handle atomic transactions for item drops, trading, and economy management, completely isolated from the volatile ECS simulation state. 4. Implement a real-time PresenceEngine.ts utilizing Redis Pub/Sub. This system tracks whether a player is "Online", "In-Game", or "In-Menu" and broadcasts these state changes to their friends list with sub-second latency. 5. Build a PartySystem.ts that allows players to group up. This must tightly integrate with the existing via-fleet-manager (Matchmaker) to ensure that when the party leader queues for a match, the entire group is routed to the exact same game server container and spawned into the same ECS world instance. 6. Implement a global chat and whisper system using lightweight WebSockets, ensuring chat history and social interactions are decoupled from the high-frequency binary game state replicator. 7. Expose an administrative /api/v1/economy/audit endpoint to track the flow of rare items, flag suspicious trading behavior, and manage player bans across the entire social ecosystem.

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