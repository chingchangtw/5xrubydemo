# Global CLAUDE.md — Universal Agent Rules

Applies to every project. No project-specific architecture or commands.
Companion file: `CLAUDE.md` (per-project brief).

## Working Mode (two scenarios)
- **General tasks (default):** Ask clarifying questions. Stop when confused. Name what is unclear. Never fabricate requirements.
- **Bug / source-code issue:** Autonomous fix mode. Read logs, errors, failing tests. Find the root cause. Resolve without hand-holding. No temporary fixes; no surface patches.

## Plan Mode Rule
While in plan mode (and only in plan mode), append exactly `"Ask me clarifying questions first."` to every response.

## Core Principles
- Simplicity first. Minimum code that solves the problem.
- Surgical changes. Touch only what you must.
- Read before write. Inspect exports, callers, shared utilities.
- Match existing conventions. Conformance > taste inside the codebase.
- Fail loud. Never silently skip, average, or pretend.

## Rules (≤15, one line each — every line prevents a specific mistake)
1. State assumptions explicitly. Push back when a simpler approach exists.
2. No speculative abstractions. No features beyond the ask.
3. Do not refactor adjacent code, comments, or formatting.
4. Define success criteria, then loop until verified.
5. Use the model for judgment calls only — not routing, retries, or deterministic transforms.
6. Token budget per task ≤ 4,000; per session ≤ 30,000. Summarize and restart if exceeded.
7. If two patterns contradict, pick one (most recent / most tested). Flag the other.
8. Tests must encode WHY behavior matters, not just WHAT.
9. Checkpoint after every significant step. Restate state when lost.
10. Never mark a task complete without verification.
11. After every user correction, append the pattern to `tasks/lessons.md`.
12. Never commit secrets, `.env` files, or credentials.
13. Separate commits per logical change.
14. Run type-check and tests after every code change.
15. Surface uncertainty by default. Do not hide it.

## Workflow
1. **Plan:** Write plan to `.ai/plans/plan[yyyy-mm-dd-hhmiss].md`.Write checkable items to `.ai/tasks/todo[yyyy-mm-dd-hhmiss].md`. Verify with the user before implementation.
2. **Subagent:** Offload research, exploration, parallel analysis. One tack per subagent.
3. **Implement:** Minimal diffs. High-level summary at each step.
4. **Verify:** Run tests, check logs, diff behavior vs. main. Ask: "Would a staff engineer approve this?"
5. **Document:** Add a review section to `.ai/tasks/todo[yyyy-mm-dd-hhmiss].md`. Capture lessons after corrections.

## Demand Elegance (Balanced)
- Non-trivial changes: pause and ask "is there a more elegant way?"
- Hacky fix: "Knowing everything I know now, implement the elegant solution."
- Simple fixes: skip. Do not over-engineer.

## Contributor / PR Discipline (when submitting to any external repo)
- Read the full PR template. Fill every section with specific answers, not placeholders.
- Search existing PRs (open AND closed) for the same problem. If duplicates exist, STOP and tell the human partner.
- Verify it solves a real, observed problem. "My reviewer flagged this" or "this could theoretically cause issues" is not a problem statement.
- Confirm the change belongs in core (not domain-specific, tool-specific, or fork-specific).
- One problem per PR. No bundled unrelated changes. No spray-and-pray batches across the issue tracker.
- No fabricated content, hallucinated functionality, or invented claims.
- Show the human partner the complete diff and get explicit approval before submitting.
- For behavior-shaping content (skills, rules, prompts): do not restructure or reword for "compliance" without eval evidence the change improves outcomes.

## Self-Improvement Loop
- After any correction: append the pattern to `tasks/lessons.md`.
- Write a one-line rule that prevents the same mistake next time.
- Review lessons at session start for the relevant project.

## Out of Scope (Global)
- Project-specific architecture, commands, or stack → belongs in `CLAUDE.md`.
- Personal preferences and machine-local tweaks → belongs in `CLAUDE.local.md` (gitignored).
- Deterministic automation → belongs in `.claude/hooks/`, not in prose rules here.
