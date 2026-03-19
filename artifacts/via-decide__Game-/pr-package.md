Branch: simba/implement-a-virtual-file-system-vfs-called-via-v
Title: Implement a Virtual File System (VFS) called via-vfs-core to aggregat...

## Summary
- Repo orchestration task for via-decide/Game-
- Goal: Protect game assets from easy ripping while significantly improving load times. By batching thousands of tiny files into a few large, compressed, and encrypted .pak volumes, you minimize disk seek times and network overhead, creating a professional-grade distribution system.

## Testing Checklist
- [ ] Run unit/integration tests
- [ ] Validate command flow
- [ ] Validate generated artifact files

## Risks
- Prompt quality depends on repository metadata completeness.
- GitHub API limits/token scope can block deep inspection.

## Rollback
- Revert branch and remove generated artifact files if workflow output is invalid.