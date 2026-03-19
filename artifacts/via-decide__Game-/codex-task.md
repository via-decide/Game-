You are working in repository via-decide/Game- on branch main.

MISSION
Implement a living documentation generator called via-docs-engine and draft the master ARCHITECTURE.md to map the engine's entire technical ecosystem. 1. Create a new directory docs/architecture/. 2. Draft the master ARCHITECTURE.md blueprint. This document must visually and textually map the data flow across the engine: Network (Buffer) -> ECS (Systems) -> Physics (Spatial Grid) -> Render (Batched WebGL). 3. Implement DocGenerator.ts in the tools/ directory. This script must use an Abstract Syntax Tree (AST) parser (like TypeDoc or a custom SWC wrapper) to scrape all exported TypeScript interfaces, JSDoc comments, and ECS Component signatures directly from the src/ directory. 4. Generate a static, searchable HTML microsite (using a lightweight SSG like VitePress or Astro) that serves as the internal developer portal for the engine. 5. Include a "Memory Budgets" section in the architecture document that strictly defines the maximum allowed memory footprint for each subsystem (e.g., 50MB for the ECS pools, 256MB for the VRAM texture cache, 10MB for the Input Ring Buffers). 6. Hook the DocGenerator into the previously built CI/CD pipeline. Every time code is merged into the main branch, the pipeline must automatically regenerate the API reference site and deploy it to GitHub Pages or a cloud bucket. 7. Enforce a lint:docs rule in the pre-commit hooks that fails the build if a developer adds a new ECS System or Component without providing the required memory pool annotations and JSDoc summaries.

CONSTRAINTS
Do NOT rely on manually updated API wikis, as they inevitably drift out of sync with the actual codebase. The internal workings of the engine are highly complex, so the documentation pipeline MUST automatically derive the source of truth directly from the TypeScript types and memory allocation definitions.

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