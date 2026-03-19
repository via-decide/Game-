Repair mode for repository via-decide/Game-.

TARGET
Validate and repair only the files touched by the previous implementation.

TASK
Implement a living documentation generator called via-docs-engine and draft the master ARCHITECTURE.md to map the engine's entire technical ecosystem. 1. Create a new directory docs/architecture/. 2. Draft the master ARCHITECTURE.md blueprint. This document must visually and textually map the data flow across the engine: Network (Buffer) -> ECS (Systems) -> Physics (Spatial Grid) -> Render (Batched WebGL). 3. Implement DocGenerator.ts in the tools/ directory. This script must use an Abstract Syntax Tree (AST) parser (like TypeDoc or a custom SWC wrapper) to scrape all exported TypeScript interfaces, JSDoc comments, and ECS Component signatures directly from the src/ directory. 4. Generate a static, searchable HTML microsite (using a lightweight SSG like VitePress or Astro) that serves as the internal developer portal for the engine. 5. Include a "Memory Budgets" section in the architecture document that strictly defines the maximum allowed memory footprint for each subsystem (e.g., 50MB for the ECS pools, 256MB for the VRAM texture cache, 10MB for the Input Ring Buffers). 6. Hook the DocGenerator into the previously built CI/CD pipeline. Every time code is merged into the main branch, the pipeline must automatically regenerate the API reference site and deploy it to GitHub Pages or a cloud bucket. 7. Enforce a lint:docs rule in the pre-commit hooks that fails the build if a developer adds a new ECS System or Component without providing the required memory pool annotations and JSDoc summaries.

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