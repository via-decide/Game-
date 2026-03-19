Branch: simba/implement-a-reactive-ui-bridge-called-via-ui-bri
Title: Implement a reactive UI bridge called via-ui-bridge to handle high-pe...

## Summary
- Repo orchestration task for via-decide/Game-
- Goal: Ensure the user interface remains crisp and instantly responsive without bleeding performance from the core game loop. By decoupling the UI state and batching DOM updates, the engine can display chaotic scenes with hundreds of floating numbers and complex HUD elements while maintaining a locked frame rate.

## Testing Checklist
- [ ] Run unit/integration tests
- [ ] Validate command flow
- [ ] Validate generated artifact files

## Risks
- Prompt quality depends on repository metadata completeness.
- GitHub API limits/token scope can block deep inspection.

## Rollback
- Revert branch and remove generated artifact files if workflow output is invalid.