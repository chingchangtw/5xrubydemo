#!/usr/bin/env bash
# Re-run taco-project-scaffolder: ensures all directories exist
set -e
mkdir -p \
  .ai/logs .ai/sessions .ai/plans .ai/tasks \
  .claude/commands .claude/agents .claude/plugins \
  src/frontend/app src/frontend/components src/frontend/services src/frontend/utils src/frontend/types \
  src/backend/app/routes src/backend/app/services src/backend/app/models src/backend/app/middleware \
  src/backend/tests/unit src/backend/tests/integration \
  tests/unit tests/integration tests/e2e \
  docs scripts
find src .ai tests docs scripts -type d -empty -exec touch {}/.gitkeep \;
echo "Layout verified."
