You are working in repository via-decide/Game- on branch main.

MISSION
Implement a responsive UI layout and localization module called via-global-ui to handle cross-device scaling, dynamic language switching, and accessibility. 1. Create a new directory src/client/ui/globalization/. 2. Implement LocaleManager.ts. This system must asynchronously load translation packs (.json or a custom binary format) and swap out localized strings in the UIStateManager without requiring a game restart or page reload. 3. Create an advanced Text Renderer using Multi-Channel Signed Distance Fields (MSDF). This allows the custom rendering pipeline to draw crisp, infinitely scalable text for complex scripts (CJK characters) without massive texture memory overhead. 4. Implement support for Right-to-Left (RTL) text rendering and complex typographic shaping (e.g., Arabic ligatures) if utilizing a native text shaping library via WebAssembly (like HarfBuzz). 5. Build a LayoutEngine.ts utilizing an anchor-based or flex-like constraint system. The UI must automatically adapt to ultrawide desktop monitors, standard 16:9 displays, and mobile screens (accounting for safe areas and notches) by recalculating bounds only on window.resize events. 6. Integrate Accessibility (a11y) hooks. Expose shader-level colorblind filters (Protanopia, Deuteranopia, Tritanopia) that recalculate the final frame buffer colors, and add a high-contrast mode for UI elements. 7. Expose an internal "Pseudo-Localization" debug toggle (renderI18nDebug()). When enabled, this tool must automatically expand all text strings by 30-40% and replace characters with accented variants to instantly highlight UI clipping issues and hardcoded strings.

CONSTRAINTS
Strictly forbid hardcoding user-facing strings anywhere in the src/ directory; all text must be referenced via translation keys (e.g., ui_menu_play). The layout recalculations MUST NOT occur within the main requestAnimationFrame loop. You must pre-generate MSDF font atlases during the build step using via-build-core rather than generating them at runtime, as runtime glyph generation will cause massive frame spikes.

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