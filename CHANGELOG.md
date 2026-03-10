# lock-inactive-threads

## 1.0.0 - 2026-03-10

### ADDED
- GitHub Action to lock inactive issues and pull requests after configurable days of inactivity.
- Separate configuration for issues and pull requests (comment, inactive days, lock reason).
- Label exclusion support via comma de-limited `EXCLUDE_LABELS` input.
- Dry-run mode to preview what would be locked without making changes.
- Detailed logging with `LOG_OUTPUT` toggle.
- GitHub search API integration with pagination (up to 1,000 threads per type).
- Zod schema validation for all action inputs.
