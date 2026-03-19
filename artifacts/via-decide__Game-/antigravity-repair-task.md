Repair mode for repository via-decide/Game-.

TARGET
Validate and repair only the files touched by the previous implementation.

TASK
Implement a lightning-fast, multi-target build pipeline called via-build-core using esbuild and Tauri to compile the engine for Web, Desktop, and Cloud. 1. Create a new directory tools/build-pipeline/. 2. Implement build-client.js. Use esbuild to transpile and bundle the TypeScript client code. It must tree-shake unused modules, minify the output, and generate a single, highly optimized app.bundle.js for the browser. 3. Implement build-server.js to compile the headless server environment. It must strictly exclude all DOM-related or WebGL code, outputting a pure, lightweight Node.js (or Deno) compatible bundle. 4. Integrate Tauri (src-tauri/): Set up a Rust-based Tauri wrapper around the web client. This allows the game to be distributed as a native Desktop executable (.exe, .app, .deb) with direct OS-level API access, bypassing standard browser hardware limitations and memory caps. 5. Create an AssetProcessor.ts script that runs before compilation. It must automatically traverse the raw asset folders, compress textures into GPU-optimized formats (e.g., KTX2 / Basis Universal), and minify raw audio files to drastically reduce the final package size. 6. Generate a .github/workflows/ci-cd.yml file to automate this pipeline. On every commit to main, GitHub Actions must run unit tests, build the web/desktop clients, build the headless server Docker image, and push the artifacts to a registry. 7. Expose a unified CLI tool (e.g., npm run via:build --target=desktop) to allow developers to easily trigger specific build targets locally with hot-module replacement (HMR) for the web build.

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