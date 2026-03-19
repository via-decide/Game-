Branch: simba/implement-a-custom-low-level-rendering-pipeline-
Title: Implement a custom, low-level rendering pipeline called via-render-ba...

## Summary
- Repo orchestration task for via-decide/Game-
- Goal: Eliminate client-side rendering bottlenecks by moving from a naive "painter's algorithm" to a modern, batched architecture. This allows the client to smoothly render the thousands of entities being processed by the ECS and Network modules at a locked 60 or 120 FPS, regardless of screen density.

## Testing Checklist
- [ ] Run unit/integration tests
- [ ] Validate command flow
- [ ] Validate generated artifact files

## Risks
- Prompt quality depends on repository metadata completeness.
- GitHub API limits/token scope can block deep inspection.

## Rollback
- Revert branch and remove generated artifact files if workflow output is invalid.