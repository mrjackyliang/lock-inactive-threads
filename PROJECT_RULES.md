# PROJECT_RULES.md

## Project Identity

### Name and Description

- **Project name:** Lock Inactive Threads (`lock-inactive-threads`)
- **Description:** A GitHub Action designed to lock issues and pull requests that have been inactive for a configurable number of days.
- **Primary language:** TypeScript
- **Framework / runtime:** GitHub Actions (Node.js 20 runtime per `action.yml`); developed against Node.js 22/24

### Repository URL

- **URL:** https://github.com/mrjackyliang/lock-inactive-threads

## Repository Layout

```
lock-inactive-threads/
|-- build/               - Compiled action bundle (ncc output; the artifact action.yml executes)
|-- conventions/         - Generator-managed coding convention files (do not edit locally)
|-- src/                 - Application source code
|   |-- lib/             - Action logic, Zod schema, GitHub API utilities
|   |-- tests/           - Unit tests, mirrors src/ structure
|   `-- types/           - TypeScript type definitions (.d.ts)
|-- .editorconfig        - Editor formatting rules
|-- .env.sample          - Template for local-run inputs (copy to .env)
|-- .gitignore           - Git ignore patterns
|-- action.yml           - GitHub Action metadata (inputs, outputs, branding, runtime)
|-- AGENTS.md            - Generator-managed agent entry point (do not edit locally)
|-- CHANGELOG.md         - Release history
|-- CLAUDE.md            - Generator-managed agent entry point (do not edit locally)
|-- eslint.config.js     - ESLint flat config
|-- LICENSE              - MIT license
|-- nova.config.json     - Nova project configuration (identity, workspaces, agents)
|-- package.json         - Node.js manifest and scripts
|-- PROJECT_RULES.md     - This file
|-- README.md            - Usage, inputs, outputs
|-- tsconfig.json        - TypeScript compiler configuration
`-- VISION.md            - Purpose, marketing copy, and glossary
```

## Source Structure

```
src/
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

| File                   | Purpose                                    | When to modify                                                           |
|------------------------|--------------------------------------------|--------------------------------------------------------------------------|
| `action.yml`           | Action metadata (inputs, outputs, runtime) | Adding or changing inputs/outputs, branding, or the Node runtime version |
| `src/lib/action.ts`    | Core lock orchestration                    | Changing the lock flow, dry-run behavior, or logging                     |
| `src/lib/utility.ts`   | GitHub API helpers and input reading       | Changing the search query, pagination, or API calls                      |
| `src/lib/schema.ts`    | Zod input validation schema                | Changing input shapes, defaults, or allowed values                       |
| `src/types/index.d.ts` | Function type aliases                      | Any function signature change in `src/`                                  |
| `.env.sample`          | Local-run input template                   | Whenever an input is added, renamed, or its default changes              |
| `README.md`            | Usage and inputs/outputs reference         | Whenever an input, output, or default changes                            |
| `package.json`         | Manifest and build scripts                 | Adding dependencies, changing scripts, bumping version                   |
| `tsconfig.json`        | TS config (incl. `@/` path alias)          | Changing compiler options or path aliases                                |
| `CHANGELOG.md`         | Release notes                              | Every user-facing change                                                 |

## Build and Tooling

### Prerequisites

| Tool    | Version              | Purpose                                                 |
|---------|----------------------|---------------------------------------------------------|
| Node.js | 22.x or 24.x         | Local development runtime (`engines` in `package.json`) |
| npm     | Bundled with Node.js | Package manager, runs the build scripts                 |

On GitHub, the action executes on the `node20` runtime declared in `action.yml`; no consumer-side install is needed.

### Commands

| Command               | What it does                                                                          |
|-----------------------|---------------------------------------------------------------------------------------|
| `npm install`         | Install all dependencies (`postinstall` runs the full build)                          |
| `npm start`           | Run the action locally via `@github/local-action`, reading inputs from `.env`         |
| `npm run build`       | Full build: runs `build:reset`, `build:lint`, and `build:ncc` sequentially            |
| `npm run build:reset` | Delete the `build/` directory                                                         |
| `npm run build:lint`  | Run ESLint across `src/`                                                              |
| `npm run build:ncc`   | Bundle `src/index.ts` into `build/index.js` with `@vercel/ncc` (source map, licenses) |

There is no `npm test` script. Tests exist in `src/tests/` (written against `node:test` and `node:assert/strict`), but neither `node --test` nor `vitest` currently resolves the `@/` path alias, so a runner still needs to be wired up.

### Environment Variables

Environment variables are only used for local runs (`npm start`). Copy `.env.sample` to `.env` and fill it in; on GitHub, the workflow's `with:` inputs are mapped to these variables automatically.

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

Nova (`nova.config.json`) defines a single workspace at `./` with role `package` and policy `distributable`; the repository root is the deliverable.

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
GitHub Actions runner (node20) / local-action (npm start)
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

- **Framework:** None
- **Source:** `README.md` (usage example, inputs table, default comments, outputs)

### Site Structure

No documentation site. All user-facing documentation lives in `README.md`, with release history in `CHANGELOG.md`.

### Commands

No documentation site commands.

## Publishing and Deployment

### Release Process

The action is distributed as this repository itself; consumers reference it in workflows as `mrjackyliang/lock-inactive-threads@v1`. What ships is whatever `build/index.js` contains at the tag.

1. All changes committed, working tree clean.
2. `CHANGELOG.md` updated and the version bumped in `package.json`.
3. Run `npm run build` so `build/` matches `src/` (reset, lint, bundle), then commit the rebuilt `build/` output.
4. Tag the release (e.g. `v1.0.0`) and update the `v1` major tag that consumers track.
5. Push the commit and tags.

### CI/CD Workflows

None. The repository has no `.github/` directory; there are no workflows of its own. The action runs inside the consuming repositories' workflows.

### Environments

| Environment            | URL / Identifier                        | Purpose                                          |
|------------------------|-----------------------------------------|--------------------------------------------------|
| GitHub repository tags | `mrjackyliang/lock-inactive-threads@v1` | Distribution channel referenced in `uses:` steps |
