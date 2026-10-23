# Prospect to Website Demo skill

Skill identifier: `prospect-to-website-demo` (version 0.4.1).

The complete skill is committed in both repository discovery locations:

- Codex: `.agents/skills/prospect-to-website-demo/SKILL.md`
- Claude: `.claude/skills/prospect-to-website-demo/SKILL.md`

Both directories contain identical instruction, reference, schema, script and asset files. They are real directories, so discovery does not depend on symlink support. Generated Python bytecode and cache directories are excluded from the commit.

Cloud chats need a checkout containing this commit (pull the latest `master`, or start a task from the latest `master`). An older checkout does not gain the files by restarting its agent. In a compatible skill picker, select `prospect-to-website-demo`; otherwise instruct the agent to read the appropriate `SKILL.md` above.

This repository installation applies to chats that use this repository. It does not register an account-wide cloud skill for unrelated repositories. User-level copies in an individual cloud machine are not shared automatically with other machines.

When updating the skill, update both directories and verify that relative paths and file hashes remain identical. Do not commit `__pycache__` directories or `.pyc` files.
