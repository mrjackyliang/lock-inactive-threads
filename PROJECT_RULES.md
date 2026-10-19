# PROJECT_RULES.md

## Project Identity

### Name and Description

- **Project name:** Lock Inactive Threads (`lock-inactive-threads`)
- **Description:** A GitHub Action designed to lock issues and pull requests that have been inactive for a configurable number of days.
- **Primary language:** TypeScript
- **Framework / runtime:** GitHub Actions using the runtime declared in `action.yml`; developed with the Node.js versions declared by the root manifest

### Repository URL

- **URL:** https://github.com/mrjackyliang/lock-inactive-threads

## Repository Layout

```
lock-inactive-threads/
|-- .github/             - Issue templates, funding metadata, and generated workflows
|-- apps/
|   `-- docs/            - Docusaurus documentation workspace
|-- conventions/         - Generator-managed coding convention files (do not edit locally)
|-- packages/
|   `-- lock-inactive-threads/
|       |-- build/       - Compiled action bundle (ncc output; the artifact action.yml executes)
|       `-- src/         - Action source, tests, and type declarations
|-- scripts/             - Root maintenance and Nova-linking scripts
|-- tests/               - Root project-contract tests
|-- .editorconfig        - Editor formatting rules
|-- .env.sample          - Template for local-run inputs (copy to .env)
|-- .gitignore           - Git ignore patterns
|-- action.yml           - GitHub Action metadata (inputs, outputs, branding, runtime)
|-- AGENTS.md            - Generator-managed agent entry point (do not edit locally)
|-- CHANGELOG.md         - Release history
|-- CLAUDE.md            - Generator-managed agent entry point (do not edit locally)
|-- eslint.config.mts    - Root ESLint flat config
|-- LICENSE              - MIT license
|-- nova.config.json     - Nova project configuration (identity, workspaces, agents)
|-- package.json         - Node.js manifest and scripts
|-- PROJECT_RULES.md     - This file
|-- README.md            - Usage, inputs, outputs
|-- tsconfig.*.json      - Root configuration, scripts, and test TypeScript projects
`-- VISION.md            - Purpose, marketing copy, and glossary
```

## Source Structure

```
packages/lock-inactive-threads/src/
|-- index.ts                  - Action entry point; calls runAction
|-- run.ts                    - Orchestrator: builds config and context, prints log groups, error boundary (core.setFailed)
|-- lib/
|   |-- action.ts             - lockInactiveThreads: dry-run branch, comment-then-lock loops, result output
|   |-- schema.ts             - Zod `configuration` schema (coercion, defaults, transforms, lock-reason enums)
|   `-- utility.ts            - getConfig, getContext, getInactiveThreads (search + pagination), addThreadComment, lockThread
|-- tests/
|   `-- lib/
|       |-- schema.test.ts    - Configuration schema parsing, defaults, and rejection tests
|       `-- utility.test.ts   - getConfig tests driven by INPUT_* environment variables
`-- types/
    |-- index.d.ts            - Per-function type aliases (params and Returns) for every exported src function
    `-- shared.d.ts           - Shared Thread domain types (imported only by other .d.ts files)
```

## Key Files

| File                                                  | Purpose                                    | When to modify                                                     |
|-------------------------------------------------------|--------------------------------------------|--------------------------------------------------------------------|
| `action.yml`                                          | Action metadata (inputs, outputs, runtime) | Adding or changing inputs/outputs, branding, or the runner runtime |
| `packages/lock-inactive-threads/src/lib/action.ts`    | Core lock orchestration                    | Changing the lock flow, dry-run behavior, or logging               |
| `packages/lock-inactive-threads/src/lib/utility.ts`   | GitHub API helpers and input reading       | Changing the search query, pagination, or API calls                |
| `packages/lock-inactive-threads/src/lib/schema.ts`    | Zod input validation schema                | Changing input shapes, defaults, or allowed values                 |
| `packages/lock-inactive-threads/src/types/index.d.ts` | Function type aliases                      | Any exported function signature change                             |
| `packages/lock-inactive-threads/.env.sample`          | Local-run input template                   | Whenever an input is added, renamed, or its default changes        |
| `packages/lock-inactive-threads/README.md`            | Usage and inputs/outputs reference         | Whenever an input, output, or default changes                      |
| `packages/lock-inactive-threads/package.json`         | Deliverable manifest and build scripts     | Adding dependencies, changing scripts, or releasing                |
| `packages/lock-inactive-threads/CHANGELOG.md`         | Release history                            | Every user-facing change                                           |
| `apps/docs/docusaurus.config.ts`                      | Documentation site configuration           | Changing docs metadata, navigation, or deployment                  |

## Build and Tooling

### Prerequisites

| Tool           | Version source                  | Purpose                                            |
|----------------|---------------------------------|----------------------------------------------------|
| Node.js        | Root `package.json` `engines`   | Local development, builds, and local action runs   |
| npm            | Root `package.json` package pin | Workspace-aware package manager                    |
| Action runtime | Root `action.yml`               | Runtime used by consuming GitHub Actions workflows |

### Commands

| Command                                         | What it does                                                                                      |
|-------------------------------------------------|---------------------------------------------------------------------------------------------------|
| `npm install`                                   | Install every workspace; package postinstall builds the action bundle                             |
| `npm run dev`                                   | Run development scripts across workspaces through Nova                                            |
| `npm run check`                                 | Run workspace checks, then root lint, type checks, and Vitest suites                              |
| `npm run build`                                 | Build the action bundle and documentation site through Nova                                       |
| `npm run deploy`                                | Check and build the repository before generated publishing workflows run                          |
| `npm run clean`                                 | Remove workspace build output                                                                     |
| `npm run changelog`                             | Record, preview, or cut releases through Nova                                                     |
| `npm run recipes`                               | Apply the recipes configured in `nova.config.json`                                                |
| `npm run dev --workspace lock-inactive-threads` | Run the action's TypeScript source locally via `@github/local-action`, reading inputs from `.env` |

Tests run through Vitest as part of each package and root `check` pipeline.

### Environment Variables

Environment variables are only used for local action runs. Copy `packages/lock-inactive-threads/.env.sample` to `.env` in that workspace and fill it in; on GitHub, workflow `with:` inputs are mapped automatically.

| Variable                                               | Required | Purpose                                                        |
|--------------------------------------------------------|----------|----------------------------------------------------------------|
| `INPUT_GITHUB_TOKEN`                                   | Yes      | GitHub token used to search and lock issues and pull requests  |
| `INPUT_ISSUE_COMMENT` / `INPUT_PR_COMMENT`             | No       | Closing comments (empty string falls back to built-in default) |
| `INPUT_ISSUE_INACTIVE_DAYS` / `INPUT_PR_INACTIVE_DAYS` | No       | Inactivity windows in days (default `30`)                      |
| `INPUT_ISSUE_LOCK_REASON` / `INPUT_PR_LOCK_REASON`     | No       | Lock reasons (default `resolved`)                              |
| `INPUT_EXCLUDE_LABELS`                                 | No       | Comma de-limited labels to exclude from locking                |
| `INPUT_LOG_OUTPUT`                                     | No       | Detailed logging toggle (default `true`)                       |
| `INPUT_DRY_RUN`                                        | No       | Preview mode toggle (default `false`)                          |
| `ACTIONS_RUNNER_DEBUG` / `ACTIONS_STEP_DEBUG`          | No       | GitHub Actions debug logging during local runs                 |

## Workspace Rules

Nova defines a freezable root project, a freezable documentation workspace, and the distributable action package in `nova.config.json`.

### Naming Conventions

| Entity             | Convention                                                   | Example                                     |
|--------------------|--------------------------------------------------------------|---------------------------------------------|
| Action inputs      | SCREAMING_SNAKE_CASE                                         | `ISSUE_INACTIVE_DAYS`, `DRY_RUN`            |
| Config keys (Zod)  | camelCase                                                    | `issueInactiveDays`, `dryRun`               |
| Source files       | Lowercase, kebab-case when multi-word                        | `action.ts`, `schema.ts`, `utility.ts`      |
| Type aliases       | PascalCase `<FunctionName><Param>` / `<FunctionName>Returns` | `LockThreadIssueNumber`, `GetConfigReturns` |
| Test files         | Mirror source path + `.test`                                 | `src/tests/lib/schema.test.ts`              |
| Thread type values | kebab-case string literals                                   | `'issue'`, `'pull-request'`                 |
| Imports            | `@/` path alias to `src/`, explicit extensions               | `@/lib/schema.js`, `@/types/index.d.ts`     |

### Do / Don't

**Do:**
- Keep every input mirrored in all five places: `action.yml`, the README inputs table, `.env.sample`, `getConfig` in `src/lib/utility.ts`, and the Zod schema in `src/lib/schema.ts`. A missing mirror silently breaks defaults or local runs.
- Validate all raw inputs through `configuration.parse` before use. Nothing downstream should touch `core.getInput` values directly.
- Give every function's parameters and return type named aliases in `src/types/index.d.ts`; shared domain shapes live in `src/types/shared.d.ts` and are imported only by other `.d.ts` files.
- Respect `dryRun` in any new mutating code path. Dry run must log intent and change nothing.
- Log through `@actions/core` (`core.info`, `core.startGroup`) so output renders correctly in the Actions UI.
- Rebuild (`npm run build`) before tagging a release; `action.yml` executes `./build/index.js`, so a stale bundle ships stale behavior.

**Don't:**
- Don't edit `build/` by hand. It is generated by `@vercel/ncc` and overwritten on every build.
- Don't add runtime dependencies casually. Everything is bundled into `build/index.js`, so each dependency grows the committed artifact.
- Don't edit `CLAUDE.md`, `AGENTS.md`, or `conventions/*.md`; they are managed by Nova's agent-conventions generator and overwritten on its next run.
- Don't widen the search query beyond `is:closed is:unlocked` without a deliberate decision; the action is scoped to closed, unlocked threads by design.

## Project-Specific Patterns

### Architecture

Linear GitHub Action pipeline with a single entry point and a single error boundary:

```
GitHub Actions runner / local-action (`npm run dev --workspace lock-inactive-threads`)
  |
  v
src/index.ts        - initialize, calls runAction
  |
  v
src/run.ts          - runAction: read config + context, log groups, try/catch boundary
  |
  v
src/lib/action.ts   - lockInactiveThreads: dry run OR comment + lock per thread
  |
  v
src/lib/utility.ts  - Octokit calls: search, createComment, lock
```

### Data Flow

1. **Input** - `core.getInput` reads the ten action inputs (from `with:` on GitHub, or `.env` locally). Module: `src/lib/utility.ts` (`getConfig`).
2. **Validation** - `configuration.parse` coerces day counts to numbers, converts boolean strings, splits and trims labels, and applies default comments and lock reasons. Module: `src/lib/schema.ts`.
3. **Discovery** - A search query (`repo:<owner>/<repo> is:issue|is:pr is:closed is:unlocked updated:<date -label:"..."`) is built from the config and run through the GitHub search API, paginated up to 10 pages of 100 (1,000 threads per type). Module: `src/lib/utility.ts` (`getInactiveThreads`).
4. **Mutation** - For each inactive thread, post the closing comment then lock with the configured reason; in dry run, log `[DRY RUN]` lines instead. Modules: `src/lib/action.ts`, `src/lib/utility.ts`.
5. **Output** - `core.setOutput('result', true)` plus a summary count log. Module: `src/lib/action.ts`.

### Error Strategy

| Layer                  | Strategy                                                                                        |
|------------------------|-------------------------------------------------------------------------------------------------|
| Entry point (`run.ts`) | try/catch around the entire run; `core.setFailed(error.message)` on any thrown `Error`          |
| Input validation       | Zod `.parse` throws on invalid input; the throw reaches the entry-point catch and fails the run |
| GitHub API calls       | No local try/catch; Octokit errors propagate up to the entry-point catch                        |
| Dry run                | Mutating calls are skipped entirely; the `result` output is still set                           |

## Documentation Site

### Framework

- **Framework:** Docusaurus with the Nova preset
- **Source:** `apps/docs/`

### Site Structure

The documentation site lives in `apps/docs/`, while package usage remains summarized in `packages/lock-inactive-threads/README.md` and release history lives beside the package.

### Commands

Use the root `dev`, `check`, `build`, and `deploy` commands so Nova orchestrates the docs and action workspaces together.

## Publishing and Deployment

### Release Process

The action is distributed as this repository itself; consumers reference its maintained release tag, and `action.yml` executes the committed package bundle.

1. All changes committed, working tree clean.
2. Preview and cut the package release with `npm run changelog -- --release --dry-run`, then `npm run changelog -- --release`.
3. Run `npm run check` and `npm run build`; confirm the committed action bundle matches its source.
4. Commit the release result and tag it with the released package version.
5. Push the commit and tag, then publish the GitHub Release so the generated workflow validates and deploys the repository.

### CI/CD Workflows

Nova-generated workflows under `.github/workflows/` validate and publish the project and provide the repository's sponsor-gating and inactive-thread automation.

### Environments

| Environment            | URL / Identifier                                   | Purpose                                          |
|------------------------|----------------------------------------------------|--------------------------------------------------|
| GitHub repository tags | `mrjackyliang/lock-inactive-threads@<release-tag>` | Distribution channel referenced in `uses:` steps |
