Branch: simba/implement-a-deterministic-constraints-solver-cal
Title: Implement a deterministic constraints solver called via-physics-const...

## Summary
- Repo orchestration task for via-decide/Game-
- Goal: Introduce complex mechanical interactions and highly realistic death states without importing bloated third-party physics libraries. By implementing a custom, DOD-friendly constraint solver, the engine can simulate swinging ropes, destructible vehicles, and dynamic ragdolls seamlessly across a massive multiplayer network.

## Testing Checklist
- [ ] Run unit/integration tests
- [ ] Validate command flow
- [ ] Validate generated artifact files

## Risks
- Prompt quality depends on repository metadata completeness.
- GitHub API limits/token scope can block deep inspection.

## Rollback
- Revert branch and remove generated artifact files if workflow output is invalid.