<!-- SPECTRA:START v1.0.2 -->

# Spectra Instructions

This project uses Spectra for Spec-Driven Development(SDD). Specs live in `openspec/specs/`, change proposals in `openspec/changes/`.

## Use `/spectra-*` skills when:

- A discussion needs structure before coding → `/spectra-discuss`
- User wants to plan, propose, or design a change → `/spectra-propose`
- Tasks are ready to implement → `/spectra-apply`
- There's an in-progress change to continue → `/spectra-ingest`
- User asks about specs or how something works → `/spectra-ask`
- Implementation is done → `/spectra-archive`
- Commit only files related to a specific change → `/spectra-commit`

## Workflow

discuss? → propose → apply ⇄ ingest → archive

- `discuss` is optional — skip if requirements are clear
- Requirements change mid-work? Plan mode → `ingest` → resume `apply`

## Parked Changes

Changes can be parked（暫存）— temporarily moved out of `openspec/changes/`. Parked changes won't appear in `spectra list` but can be found with `spectra list --parked`. To restore: `spectra unpark <name>`. The `/spectra-apply` and `/spectra-ingest` skills handle parked changes automatically.

<!-- SPECTRA:END -->

# project CLAUDE.md — Project Blueprint

Per-project brief. Companion to `.claude/CLAUDE.md` (universal rules).
For governance, Definition of Done, Release Readiness, and detailed hook / skill / agent / rule registries, see `project_governance.md`.

> **Template usage:** Replace every `[BRACKETED]` placeholder. Delete sections that do not apply. Keep this file under 120 lines. Deletion test on every line: "Would removing this cause a specific mistake? If no → delete."

## Project
[One line: what this project does and who uses it.]

## Stack
[Framework · Language · Database · Deployment]

## Commands
```
Dev:        [npm run dev]
Build:      [npm run build]
Test file:  [npm test -- path/to/file]
Test all:   [npm test]
Lint:       [npm run lint:fix]
Types:      [npx tsc --noEmit]
```

## Architecture
- [src/lib/services/    — business logic]
- [src/components/      — stateless UI only]
- [src/lib/store/       — global state]
- [src/app/api/         — API routes, no business logic]
- [Cross-boundary rule: e.g., DB access only through Server Actions or API routes]

## Rules (≤15, one line each)
1. [NEVER commit .env files or secrets]
2. [All async calls must use try/catch]
3. [Functional components only — no class components]
4. [Commit prefixes: feat:, fix:, docs:, refactor:]
5. [PRs must pass `npm run test`]
6. [Run type check after every code change]
7. [Make minimal changes — do not refactor unrelated code]
8. [When unsure between approaches, explain both and let the user choose]
9. [Static export only — no SSR]   ← example deployment constraint
10. [Add project-specific rule]
11. [Add project-specific rule]
12. [Add project-specific rule]
13. [Add project-specific rule]
14. [Add project-specific rule]
15. [Add project-specific rule]

## Workflow
- Plan first: write checkable items to `tasks/todo.md`, confirm before implementing.
- Minimal diffs per commit. Separate commits per logical change.
- Run [`npm run lint`] and [`npm test`] before marking a task done.
- Update `LESSONS_LEARNED.md` after corrections.

## Out of Scope
- [Files manually maintained — do not touch]
- [Integrations Claude should not modify]
- [Vendored / generated code paths]

## Folder Map (`.claude/`)
```text
project-root/
├── CLAUDE.md                  → this file (per-project brief)
├── CLAUDE.local.md            → personal overrides, gitignored
├── mcp.json                   → MCP servers (project root only)
├── .gitignore
└── .claude/
    ├── hooks/                 → deterministic, fire every time
    │   ├── SessionStart.sh
    │   ├── PostToolUse.sh
    │   └── PreCompact.sh
    ├── commands/              → slash-command flows (e.g., ship.md)
    ├── skills/                → model-invokable, on-demand modules
    ├── agents/                → subagents w/ isolated context windows
    │   ├── code-reviewer.md
    │   ├── researcher.md
    │   └── log-analyzer.md
    ├── output-styles/         → response formatting (e.g., terse.md)
    ├── plugins/               → bundled commands / agents / MCP
    ├── rules/                 → path-scoped rules (loaded on glob match)
    ├── statusline             → bottom-bar display
    ├── settings.json          → permissions, model, hook registry
    └── settings.local.json    → personal settings, gitignored
```

## Principles
- This file is **advisory** (~70% followed). Use `.claude/hooks/` for absolute enforcement.
- Load skills on demand. Do not always-include them in context.
- Use path-scoped rules in `.claude/rules/` for directory-specific behavior.
- Reference files instead of duplicating them (e.g., point to `package.json`, do not copy it).
- Update monthly. This is a living document — every past mistake becomes a one-line rule.

## References
- Universal agent rules → `.claude/CLAUDE.md`
- Governance, DoD, Release Readiness, registries → `cc_project_governance.md`
- Personal overrides → `CLAUDE.local.md` (gitignored)
- Folder-scope override (optional) → `./src/CLAUDE.md`
