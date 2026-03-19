Repair mode for repository via-decide/Game-.

TARGET
Validate and repair only the files touched by the previous implementation.

TASK
Implement a dynamic matchmaking and container orchestration layer called via-fleet-manager to handle horizontal scaling of headless game servers. 1. Create a new directory src/server/orchestration/. 2. Write a highly optimized, multi-stage Dockerfile that strips out dev-dependencies and packages the strictly headless server logic (Networking, ECS, Physics) into a minimal node:alpine image. 3. Implement Matchmaker.ts. This microservice must sit in front of the game servers, intercepting initial client connections, authenticating them, and routing them to the geographically closest or least-populated game instance. 4. Create a Redis-backed global state store (or an in-memory equivalent if avoiding external dependencies) to track active server instances, their current player counts, and container IP addresses. 5. Build an AutoScaler.ts daemon that monitors the fleet. If global CPU usage or player concurrency across all active instances hits 80%, it must programmatically spin up new Docker containers/Kubernetes pods to absorb the incoming traffic. 6. Implement Graceful Shutdown hooks (SIGTERM handling) within the StateEngine. If a server is flagged for scale-down or updating, it must stop accepting new connections, wait for the current match to finish (or safely migrate players), and dump the ECS state to the database before exiting. 7. Expose a standard /metrics endpoint (Prometheus format) on every instance, exporting real-time tick rate (TPS), memory saturation, and active entity counts for cluster-wide Grafana dashboarding.

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