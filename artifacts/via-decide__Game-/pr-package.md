Branch: simba/implement-a-multithreaded-ai-routing-module-call
Title: Implement a multithreaded AI routing module called via-worker-nav to ...

## Summary
- Repo orchestration task for via-decide/Game-
- Goal: Decouple complex AI routing from the main simulation thread. This allows the engine to autonomously navigate thousands of units across complex terrain simultaneously-ideal for RTS mechanics or dense NPC populations-without causing a single dropped frame or server tick delay.

## Testing Checklist
- [ ] Run unit/integration tests
- [ ] Validate command flow
- [ ] Validate generated artifact files

## Risks
- Prompt quality depends on repository metadata completeness.
- GitHub API limits/token scope can block deep inspection.

## Rollback
- Revert branch and remove generated artifact files if workflow output is invalid.