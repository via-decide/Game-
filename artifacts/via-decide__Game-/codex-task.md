You are working in repository via-decide/Game- on branch main.

MISSION
Implement a highly scalable player identity and social graph microservice called via-social-hub to handle persistent profiles, inventories, and party matchmaking. 1. Create a new directory src/services/social-hub/. 2. Implement AuthenticationService.ts. Set up secure OAuth2 and JWT-based session management, allowing players to log in via Discord, Google, or native credentials without tying auth logic to the core game servers. 3. Create InventoryManager.ts to interface with a persistent database (e.g., PostgreSQL or MongoDB). It must securely handle atomic transactions for item drops, trading, and economy management, completely isolated from the volatile ECS simulation state. 4. Implement a real-time PresenceEngine.ts utilizing Redis Pub/Sub. This system tracks whether a player is "Online", "In-Game", or "In-Menu" and broadcasts these state changes to their friends list with sub-second latency. 5. Build a PartySystem.ts that allows players to group up. This must tightly integrate with the existing via-fleet-manager (Matchmaker) to ensure that when the party leader queues for a match, the entire group is routed to the exact same game server container and spawned into the same ECS world instance. 6. Implement a global chat and whisper system using lightweight WebSockets, ensuring chat history and social interactions are decoupled from the high-frequency binary game state replicator. 7. Expose an administrative /api/v1/economy/audit endpoint to track the flow of rare items, flag suspicious trading behavior, and manage player bans across the entire social ecosystem.

CONSTRAINTS
Under no circumstances should the main headless game server (running the ECS) directly query the persistent database for player inventories during a live match. The social-hub MUST act as a middleware broker: injecting the player's loadout into the game server upon connection, and receiving a final "match summary" payload when the match ends to securely update the database.

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