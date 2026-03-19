You are working in repository via-decide/Game- on branch main.

MISSION
Implement a Virtual File System (VFS) called via-vfs-core to aggregate, compress, and mount encrypted asset packages (.pak) for high-speed I/O. 1. Create a new directory src/core/io/vfs/. 2. Implement VfsManager.ts. This acts as an abstraction layer; the rest of the engine (Renderer, Audio, etc.) should request files via a virtual path (e.g., vfs://textures/hero_diffuse.ktx2) rather than direct URLs. 3. Create a PakLoader.ts that can read a custom binary .pak format. This format must include a header with a file lookup table (offsets and sizes) and a compressed data payload using a fast algorithm like Zstd or LZ4 via WebAssembly. 4. Implement an EncryptedStreamReader.ts. For sensitive game data (like logic scripts or high-value assets), implement a lightweight XOR or AES-CTR decryption stream that processes data in-place as it is read from the buffer to prevent memory doubling. 5. Build a MountPoint system. This allows the engine to "mount" different sources-such as a local IndexedDB folder for user mods, a remote CDN for base assets, and a temporary memory cache-into a single unified file tree. 6. Integrate with the via-asset-streamer: When the streamer requests a resource, the VFS should first check the high-priority memory mount, then the local .pak files, and finally fall back to a network fetch if the file is missing (supporting on-demand "lazy" downloading). 7. Expose a VFS Explorer tool (renderVfsMonitor()) that displays the mounted file tree, compression ratios for loaded packages, and real-time read/write latency metrics.

CONSTRAINTS
Strictly avoid synchronous file system operations (if running in a native environment like Tauri/Node). You MUST use ReadableStream or SharedArrayBuffer for data transfer to ensure the main thread never hitches during heavy asset decompression. The VFS must support "Partial Reads," allowing the engine to pull specific byte ranges from a 2GB .pak file without loading the entire file into RAM.

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