# conversations/

Raw transcripts of every Claude Code session in this project, one markdown file
per session (`<date>_<session-id>.md`). Written automatically by the `Stop` and
`SessionEnd` hooks in `.claude/settings.json`, which run
`.claude/scripts/save-conversation.py`. The file is regenerated on every turn, so
it always holds the complete conversation so far.

**What's captured:** user and Claude messages verbatim; tool calls and their
results (truncated); internal "thinking" is omitted.

**Feed one back** to continue where you left off — e.g. paste the file, or:

> Here's our previous conversation for context: @conversations/2026-07-02_<id>.md

**⚠️ These files are gitignored on purpose.** Raw transcripts can contain
secrets (API keys, tokens) exactly as they appeared in the session. This folder
is excluded from git (only this README is tracked). Don't commit or share the
`.md` transcripts without scrubbing them first.
