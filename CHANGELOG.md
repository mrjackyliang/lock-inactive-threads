# lock-inactive-threads

## 1.0.3 - 2026-08-20

### UPDATED
- Updated the project homepage URL to point to the documentation site and added a logo URL for README branding.

## 1.0.2 - 2026-08-20

### UPDATED
- Updated @cbnventures/nova to 0.25.2 and @cbnventures/docusaurus-preset-nova to 0.25.2.
- Regenerated CI workflows with the updated Nova GitHub Action publish template.
- Tightened the root webpack version override to >=5.95.0 <5.106.0 to prevent the Docusaurus 3.10 Progress Plugin incompatibility with webpack 5.106.0 and later.

### REMOVED
- Removed stale npm-run-all and rimraf dev dependencies that were replaced by Nova internal tooling during the monorepo migration.
- Removed stale root CHANGELOG.md leftover from the pre-monorepo layout and merged its v1.0.0 entry into the package-level changelog.

## 1.0.1 - 2026-08-20

### UPDATED
- Restructured the repository into a Turborepo and npm-workspaces monorepo governed by a new nova.config.json, moving the action into packages/lock-inactive-threads with its own package.json and TypeScript project references, migrating from .eslintrc.json to flat ESLint config, and regenerating the root README and LICENSE.
- Updated @cbnventures/nova to 0.25.1 and @cbnventures/docusaurus-preset-nova to 0.25.1.
- Added Vitest project config for the relocated package, registered Nova dotenv and type-declaration self-check test suites, and typed the existing schema and utility test results with named .d.ts aliases.
- Rewrote the action source and type declarations to follow Nova TypeScript conventions: bracket-notation property access, explicit variable types backed by per-symbol named .d.ts aliases, relative imports instead of @/ path aliases, explicit return statements, and hierarchy-based JSDoc headers. The locking pipeline now catches per-thread errors individually so a single failure no longer aborts the entire run; threads that fail to comment or lock are counted and reported via core.warning, and core.setFailed fires with the failure tally when any thread fails.
- Adopted the Nova GitHub generator for CI workflows (scheduled inactive-thread locking, sponsor-gated issue checks, and release publishing for both the action and docs site), issue templates, and funding configuration.
- Replaced placeholder branding with a full icon set for the documentation site: favicons, apple-touch-icon, web app manifest icons, the logo, and the social share thumbnail.

### FIXED
- The excludeLabels parser now filters empty strings that resulted from consecutive commas in the EXCLUDE_LABELS input, preventing blank label exclusions from being interpolated into the GitHub search query.
- Fixed a typo in the action.yml EXCLUDE_LABELS description: "comma de-limited" corrected to "comma-delimited".

### ADDED
- Added Nova AI agent convention scaffolding (AGENTS.md, CLAUDE.md, PROJECT_RULES.md, VISION.md) along with per-language coding convention references covering TypeScript, Python, Swift, Kotlin, Java, C#, PHP, Shell, Docker, CSS, and documentation.
- Added a new Docusaurus documentation site (apps/docs) with a landing page, overview, usage guide, inputs/outputs reference, and terminology glossary, plus content self-check tests for frontmatter, links, markdown tables, and terminology; the README now links to it as the primary documentation source.
- Adopted Nova must-haves generators for .env.sample (root and package-scoped), .editorconfig, and .gitignore, replacing hand-maintained versions with regeneratable equivalents.

## 1.0.0 - 2026-03-10

### ADDED
- GitHub Action to lock inactive issues and pull requests after configurable days of inactivity.
- Separate configuration for issues and pull requests (comment, inactive days, lock reason).
- Label exclusion support via comma-delimited `EXCLUDE_LABELS` input.
- Dry-run mode to preview what would be locked without making changes.
- Detailed logging with `LOG_OUTPUT` toggle.
- GitHub search API integration with pagination (up to 1,000 threads per type).
- Zod schema validation for all action inputs.
