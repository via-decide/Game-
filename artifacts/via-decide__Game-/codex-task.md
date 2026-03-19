You are working in repository via-decide/Game- on branch main.

MISSION
Implement a strict, zero-trust server validation layer called via-server-auth to prevent client-side manipulation, speed hacking, and aimbots. 1. Create a new directory src/server/security/. 2. Implement ActionValidator.ts. The server must never blindly accept a client's reported position or health. Instead, it must take the client's InputBuffer payload, simulate it against the server's authoritative ECS state, and enforce strict physics bounds (e.g., clamping maximum velocity to prevent speed hacks/teleporting). 3. Create RaycastValidator.ts to verify combat interactions. If a client claims a hit, the server must rewind the hit entity's hitbox to the exact tick the client fired (Lag Compensation), perform a server-side Raycast/Line-of-Sight check, and confirm the shot was geometrically possible. 4. Build an AnomalyDetector.ts that runs asynchronously to evaluate statistical outliers in player behavior (e.g., mathematically impossible reaction times, snapping crosshairs, or impossible click rates). 5. Implement a secure handshake and session validation protocol using lightweight cryptographic tokens (JWT or similar) to completely block packet spoofing and session hijacking. 6. Hook the anomaly detector into the StateEngine. If a player exceeds the cheating threshold, silently flag their entity ID for review (shadow-ban) or immediately drop their WebSocket connection with a ban payload. 7. Expose a secure administrative endpoint (/api/v1/admin/integrity) that streams real-time security alerts, flagged entity replays, and validation fail rates to a server monitoring dashboard.

CONSTRAINTS
Strictly adhere to the rule: "Never trust the client." All logic must be heavily optimized to prevent the validation checks from dropping the server's tick rate. Lag compensation history buffers must be tightly constrained (e.g., storing only the last 1000ms of game state) to prevent massive memory bloat on the server instance.

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