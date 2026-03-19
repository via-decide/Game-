You are working in repository via-decide/Game- on branch main.

MISSION
Implement a dynamic matchmaking and container orchestration layer called via-fleet-manager to handle horizontal scaling of headless game servers. 1. Create a new directory src/server/orchestration/. 2. Write a highly optimized, multi-stage Dockerfile that strips out dev-dependencies and packages the strictly headless server logic (Networking, ECS, Physics) into a minimal node:alpine image. 3. Implement Matchmaker.ts. This microservice must sit in front of the game servers, intercepting initial client connections, authenticating them, and routing them to the geographically closest or least-populated game instance. 4. Create a Redis-backed global state store (or an in-memory equivalent if avoiding external dependencies) to track active server instances, their current player counts, and container IP addresses. 5. Build an AutoScaler.ts daemon that monitors the fleet. If global CPU usage or player concurrency across all active instances hits 80%, it must programmatically spin up new Docker containers/Kubernetes pods to absorb the incoming traffic. 6. Implement Graceful Shutdown hooks (SIGTERM handling) within the StateEngine. If a server is flagged for scale-down or updating, it must stop accepting new connections, wait for the current match to finish (or safely migrate players), and dump the ECS state to the database before exiting. 7. Expose a standard /metrics endpoint (Prometheus format) on every instance, exporting real-time tick rate (TPS), memory saturation, and active entity counts for cluster-wide Grafana dashboarding.

CONSTRAINTS
The Matchmaker itself MUST be completely stateless, allowing it to scale independently of the game servers. Do not rely on sticky sessions for the initial routing request. The Docker image must not exceed 100MB, ensuring new game instances can be pulled and booted within milliseconds during sudden traffic spikes.

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