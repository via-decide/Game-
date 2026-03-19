Branch: simba/implement-a-highly-scalable-player-identity-and-
Title: Implement a highly scalable player identity and social graph microser...

## Summary
- Repo orchestration task for via-decide/Game-
- Goal: Elevate the engine from a standalone simulation into a persistent, massively multiplayer ecosystem. By decoupling social graphs and heavy database transactions into dedicated microservices, the architecture guarantees that slow database queries will never cause a lag spike or dropped tick in the active game worlds.

## Testing Checklist
- [ ] Run unit/integration tests
- [ ] Validate command flow
- [ ] Validate generated artifact files

## Risks
- Prompt quality depends on repository metadata completeness.
- GitHub API limits/token scope can block deep inspection.

## Rollback
- Revert branch and remove generated artifact files if workflow output is invalid.