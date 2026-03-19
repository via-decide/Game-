Branch: simba/implement-a-living-documentation-generator-calle
Title: Implement a living documentation generator called via-docs-engine and...

## Summary
- Repo orchestration task for via-decide/Game-
- Goal: Solidify the engine's long-term maintainability. By generating a definitive, auto-updating architecture map and strict memory budgets, onboarding new developers becomes frictionless, and the strict zero-allocation performance rules are mathematically enforced across the entire team.

## Testing Checklist
- [ ] Run unit/integration tests
- [ ] Validate command flow
- [ ] Validate generated artifact files

## Risks
- Prompt quality depends on repository metadata completeness.
- GitHub API limits/token scope can block deep inspection.

## Rollback
- Revert branch and remove generated artifact files if workflow output is invalid.