Repair mode for repository via-decide/Game-.

TARGET
Validate and repair only the files touched by the previous implementation.

TASK
Implement a Virtual File System (VFS) called via-vfs-core to aggregate, compress, and mount encrypted asset packages (.pak) for high-speed I/O. 1. Create a new directory src/core/io/vfs/. 2. Implement VfsManager.ts. This acts as an abstraction layer; the rest of the engine (Renderer, Audio, etc.) should request files via a virtual path (e.g., vfs://textures/hero_diffuse.ktx2) rather than direct URLs. 3. Create a PakLoader.ts that can read a custom binary .pak format. This format must include a header with a file lookup table (offsets and sizes) and a compressed data payload using a fast algorithm like Zstd or LZ4 via WebAssembly. 4. Implement an EncryptedStreamReader.ts. For sensitive game data (like logic scripts or high-value assets), implement a lightweight XOR or AES-CTR decryption stream that processes data in-place as it is read from the buffer to prevent memory doubling. 5. Build a MountPoint system. This allows the engine to "mount" different sources-such as a local IndexedDB folder for user mods, a remote CDN for base assets, and a temporary memory cache-into a single unified file tree. 6. Integrate with the via-asset-streamer: When the streamer requests a resource, the VFS should first check the high-priority memory mount, then the local .pak files, and finally fall back to a network fetch if the file is missing (supporting on-demand "lazy" downloading). 7. Expose a VFS Explorer tool (renderVfsMonitor()) that displays the mounted file tree, compression ratios for loaded packages, and real-time read/write latency metrics.

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