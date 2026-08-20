# VISION.md

## Purpose

### Problem Statement

Closed issues and pull requests on GitHub remain open to new comments unless they are locked. Over time, resolved threads keep collecting replies: comments on long-fixed bugs, "me too" posts, and new questions buried where maintainers no longer look, each one notifying everyone subscribed to the thread. Locking threads by hand does not scale past a handful of repositories, so stale conversations accumulate and pull attention away from new, actionable reports.

### Target Audience

- **Open source maintainers** - Owners of GitHub repositories who want closed issues and pull requests to lock themselves after a quiet period, so discussion stays on current threads instead of resurfacing on resolved ones.
- **Organizations standardizing repository hygiene** - Teams that run the same scheduled workflow across many repositories to enforce a consistent thread-locking policy without writing per-repo scripts.

### Value Proposition

Lock Inactive Threads is a GitHub Action that locks issues and pull requests after they have been inactive for a configurable number of days. Issues and pull requests are configured independently (closing comment, inactivity window, lock reason), labels can exempt threads from locking, and a dry-run mode previews every change before it happens. It drops into any repository as a single scheduled workflow step.

## Marketing Copy

### Tagline

Automatically lock inactive GitHub issues and pull requests on a schedule you control.

### Elevator Pitch

Lock Inactive Threads is a GitHub Action designed to lock issues and pull requests that have been inactive for a configurable number of days. Add it as a scheduled workflow step and it finds every closed, unlocked thread past its inactivity window, posts a closing comment, and locks it with the reason you choose. Issues and pull requests get independent settings, and labels can exempt threads that should stay open to discussion. A dry-run mode logs exactly what would be locked without changing anything, so you can trust the configuration before it goes live.

### Key Features

- **Independent issue and pull request policies** - Closing comment, inactivity window, and lock reason are configured separately for issues (`ISSUE_*` inputs) and pull requests (`PR_*` inputs).
- **Closing comment before locking** - Every thread receives a comment explaining the lock before it is locked. Built-in default comments are provided, and any custom text can be set per type.
- **Configurable lock reasons** - Threads are locked as `off-topic`, `resolved`, `spam`, or `too heated`, matching GitHub's native lock reasons (default `resolved`).
- **Label exclusions** - A comma-delimited `EXCLUDE_LABELS` list keeps labeled threads out of the sweep entirely.
- **Dry-run mode** - `DRY_RUN` logs every thread that would be locked, with its title and last-updated date, without making any changes.
- **Detailed logging** - `LOG_OUTPUT` toggles the found-count line and the per-thread logs on the live locking path; dry-run previews, the final summary count, and the parsed configuration and run context (in collapsible log groups) are always printed.
- **Search-based scanning with pagination** - Uses the GitHub search API to target only closed, unlocked threads past the inactivity window, paginating up to 1,000 threads per type per run.
- **Validated inputs** - Every input passes through a Zod schema that coerces numbers, applies defaults, and fails the run with a clear error on invalid values.

### Differentiators

| This project                                                    | Alternatives                                              |
|-----------------------------------------------------------------|-----------------------------------------------------------|
| One scheduled workflow step locks both issues and pull requests | Locking threads one by one from the GitHub UI             |
| Separate comment, window, and lock reason per thread type       | A single policy applied to issues and pull requests alike |
| Dry-run preview shows every thread before anything is locked    | Changes are discovered only after they have been made     |
| Zod-validated inputs that fail the run fast with a clear error  | Input typos silently producing unintended behavior        |

## Glossary

| Term              | Definition                                                                                                                                                                   |
|-------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Thread            | An issue or a pull request. The shared `Thread` type carries its type (`issue` or `pull-request`), number, title, and last-updated timestamp.                                |
| Inactive thread   | A closed, unlocked thread whose last update is older than the configured inactivity window. Matched via the GitHub search qualifiers `is:closed is:unlocked updated:<=date`. |
| Inactivity window | The number of days without updates before a thread counts as inactive. Set per type via `ISSUE_INACTIVE_DAYS` and `PR_INACTIVE_DAYS` (default 30).                           |
| Lock reason       | GitHub's native reason attached to a lock: `off-topic`, `resolved`, `spam`, or `too heated`. Default `resolved`.                                                             |
| Closing comment   | The comment posted to a thread immediately before it is locked (`ISSUE_COMMENT` / `PR_COMMENT`). Empty values fall back to the built-in default text.                        |
| Exclude labels    | Comma-delimited label names (`EXCLUDE_LABELS`) whose threads are removed from the search via `-label:` qualifiers.                                                           |
| Dry run           | Mode (`DRY_RUN`) that logs which threads would be locked without commenting on or locking anything.                                                                          |
| Action input      | A `with:` value from the consuming workflow, surfaced to the action as an `INPUT_*` environment variable and read via `core.getInput`.                                       |
| Configuration     | The Zod-parsed object produced from the raw inputs: coerced numbers, boolean flags, a trimmed label array, and defaulted comments.                                           |
| `result` output   | The action's single output, set to `true` when the run (or dry run) completes, or `false` when one or more threads fail to lock or an unexpected error occurs.               |
