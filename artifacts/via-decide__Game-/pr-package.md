Branch: simba/implement-a-distributed-world-state-synchronizer
Title: Implement a distributed world-state synchronizer called via-cell-brok...

## Summary
- Repo orchestration task for via-decide/Game-
- Goal: Break the physical limit of single-server capacity. This architecture allows the engine to host a single, massive, persistent world where thousands of players can coexist and interact seamlessly, with the backend dynamically spinning up and down "Cell Authorities" to meet local demand.

## Testing Checklist
- [ ] Run unit/integration tests
- [ ] Validate command flow
- [ ] Validate generated artifact files

## Risks
- Prompt quality depends on repository metadata completeness.
- GitHub API limits/token scope can block deep inspection.

## Rollback
- Revert branch and remove generated artifact files if workflow output is invalid.