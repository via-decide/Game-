Repair mode for repository via-decide/Game-.

TARGET
Validate and repair only the files touched by the previous implementation.

TASK
Implement a strict, zero-trust server validation layer called via-server-auth to prevent client-side manipulation, speed hacking, and aimbots. 1. Create a new directory src/server/security/. 2. Implement ActionValidator.ts. The server must never blindly accept a client's reported position or health. Instead, it must take the client's InputBuffer payload, simulate it against the server's authoritative ECS state, and enforce strict physics bounds (e.g., clamping maximum velocity to prevent speed hacks/teleporting). 3. Create RaycastValidator.ts to verify combat interactions. If a client claims a hit, the server must rewind the hit entity's hitbox to the exact tick the client fired (Lag Compensation), perform a server-side Raycast/Line-of-Sight check, and confirm the shot was geometrically possible. 4. Build an AnomalyDetector.ts that runs asynchronously to evaluate statistical outliers in player behavior (e.g., mathematically impossible reaction times, snapping crosshairs, or impossible click rates). 5. Implement a secure handshake and session validation protocol using lightweight cryptographic tokens (JWT or similar) to completely block packet spoofing and session hijacking. 6. Hook the anomaly detector into the StateEngine. If a player exceeds the cheating threshold, silently flag their entity ID for review (shadow-ban) or immediately drop their WebSocket connection with a ban payload. 7. Expose a secure administrative endpoint (/api/v1/admin/integrity) that streams real-time security alerts, flagged entity replays, and validation fail rates to a server monitoring dashboard.

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