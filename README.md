# Lock Inactive Threads

A GitHub Action designed to lock issues and pull requests that have been inactive for a configurable number of days.

## Usage

```yaml
name: "Lock Inactive Issues"

on:
  schedule:
    - cron: "0 0 * * 0"
  workflow_dispatch:
    inputs:
      dry-run:
        description: "Run without making changes"
        required: false
        type: "boolean"
        default: true

permissions:
  issues: "write"

jobs:
  lock-inactive-issues:
    runs-on: "ubuntu-latest"
    timeout-minutes: 5
    steps:
      - uses: "mrjackyliang/lock-inactive-threads@v1"
        with:
          GITHUB_TOKEN: "${{ secrets.GITHUB_TOKEN }}"
          DRY_RUN: "${{ github.event_name == 'workflow_dispatch' && inputs.dry-run || 'false' }}"
```

## Inputs

| Name                   | Required | Default      | Description                                                      |
|------------------------|----------|--------------|------------------------------------------------------------------|
| `GITHUB_TOKEN`         | Yes      |              | GitHub token used to search and lock issues and pull requests    |
| `ISSUE_COMMENT`        | No       | _(see below)_| Comment to add before locking an inactive issue                  |
| `ISSUE_INACTIVE_DAYS`  | No       | `30`         | Number of days of inactivity before an issue is locked           |
| `ISSUE_LOCK_REASON`    | No       | `resolved`   | Lock reason (`off-topic`, `resolved`, `spam`, `too heated`)      |
| `PR_COMMENT`           | No       | _(see below)_| Comment to add before locking an inactive pull request           |
| `PR_INACTIVE_DAYS`     | No       | `30`         | Number of days of inactivity before a pull request is locked     |
| `PR_LOCK_REASON`       | No       | `resolved`   | Lock reason (`off-topic`, `resolved`, `spam`, `too heated`)      |
| `EXCLUDE_LABELS`       | No       |              | Labels to exclude from locking (comma de-limited list)           |
| `LOG_OUTPUT`           | No       | `true`       | Enable detailed logging of locked issues and pull requests       |
| `DRY_RUN`              | No       | `false`      | Run without making any changes (preview what would be locked)    |

### Default Comments

**Issue:** Due to inactivity, this issue will be locked and marked as resolved. If you have any further questions or inquiries, please feel free to open a new issue.

**Pull Request:** Due to inactivity, this pull request will be locked and marked as resolved. If you have any further questions or inquiries, please feel free to open a new pull request.

## Outputs

| Name     | Description                                                  |
|----------|--------------------------------------------------------------|
| `result` | The success or failure response after the action has completed |

## License

[MIT](LICENSE)
