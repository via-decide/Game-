You are working in repository via-decide/Game- on branch main.

MISSION
Implement a lightning-fast, multi-target build pipeline called via-build-core using esbuild and Tauri to compile the engine for Web, Desktop, and Cloud. 1. Create a new directory tools/build-pipeline/. 2. Implement build-client.js. Use esbuild to transpile and bundle the TypeScript client code. It must tree-shake unused modules, minify the output, and generate a single, highly optimized app.bundle.js for the browser. 3. Implement build-server.js to compile the headless server environment. It must strictly exclude all DOM-related or WebGL code, outputting a pure, lightweight Node.js (or Deno) compatible bundle. 4. Integrate Tauri (src-tauri/): Set up a Rust-based Tauri wrapper around the web client. This allows the game to be distributed as a native Desktop executable (.exe, .app, .deb) with direct OS-level API access, bypassing standard browser hardware limitations and memory caps. 5. Create an AssetProcessor.ts script that runs before compilation. It must automatically traverse the raw asset folders, compress textures into GPU-optimized formats (e.g., KTX2 / Basis Universal), and minify raw audio files to drastically reduce the final package size. 6. Generate a .github/workflows/ci-cd.yml file to automate this pipeline. On every commit to main, GitHub Actions must run unit tests, build the web/desktop clients, build the headless server Docker image, and push the artifacts to a registry. 7. Expose a unified CLI tool (e.g., npm run via:build --target=desktop) to allow developers to easily trigger specific build targets locally with hot-module replacement (HMR) for the web build.

CONSTRAINTS
Strictly avoid slow, bloated bundlers like Webpack. The local dev-server build must compile in under 500ms using esbuild or Vite to maintain a rapid iteration loop. You MUST enforce strict code-splitting between src/client, src/server, and src/shared (ECS, Math, Networking schemas) so server secrets or heavy Node modules never leak into the client bundle.

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