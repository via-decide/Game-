You are working in repository via-decide/Game- on branch main.

MISSION
Implement a reactive UI bridge called via-ui-bridge to handle high-performance HUD updates (health bars, floating text, minimaps) without causing DOM layout thrashing. 1. Create a new directory src/client/ui/. 2. Implement UIStateManager.ts. This acts as a centralized, reactive data store that sits between the core ECS and the rendering layer, holding only the data relevant to the player's HUD. 3. Create DataBinder.ts using JavaScript Proxy objects or a dirty-flag system. It must observe specific ECS components (e.g., the local player's Health or Ammo component) and only trigger UI updates when the underlying values actually change. 4. Build an OverlayManager.ts that manages an absolute-positioned HTML/CSS layer (or a secondary 2D Canvas) placed directly on top of the main WebGL simulation canvas. 5. Implement object pooling for ephemeral UI elements, specifically Floating Damage Text. Instead of creating and destroying DOM nodes or Canvas objects constantly, recycle a fixed pool of elements. 6. Implement a screen-space projection utility that takes 3D/2D world coordinates from the ECS Transform components and projects them onto 2D screen coordinates for tracking UI elements (like nameplates floating above other players). 7. Expose a debug panel (renderUIStats()) that tracks DOM mutations per second, forced synchronous layouts (reflows), and the memory footprint of the UI element pool.

CONSTRAINTS
Strictly prohibit updating DOM nodes (e.g., element.innerHTML or element.style.width) inside the main requestAnimationFrame loop unless a dirty flag has been tripped. DOM manipulation is heavily CPU-bound and will instantly tank the frame rate. If building a zero-dependency engine, do NOT pull in heavy frameworks like React or Vue; rely on vanilla DOM API batching or a lightweight custom Virtual DOM approach.

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