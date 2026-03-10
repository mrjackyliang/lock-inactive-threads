import { deepStrictEqual, strictEqual, throws } from 'node:assert/strict';
import { test } from 'node:test';

import { getConfig } from '@/lib/utility.js';

/**
 * Get config.
 *
 * @since 1.0.0
 */
test('getConfig', async (context) => {
  const envSnapshot: Record<string, string | undefined> = {};

  const inputKeys = [
    'INPUT_GITHUB_TOKEN',
    'INPUT_ISSUE_COMMENT',
    'INPUT_ISSUE_INACTIVE_DAYS',
    'INPUT_ISSUE_LOCK_REASON',
    'INPUT_PR_COMMENT',
    'INPUT_PR_INACTIVE_DAYS',
    'INPUT_PR_LOCK_REASON',
    'INPUT_EXCLUDE_LABELS',
    'INPUT_LOG_OUTPUT',
    'INPUT_DRY_RUN',
  ];

  context.beforeEach(() => {
    for (const key of inputKeys) {
      envSnapshot[key] = process.env[key];
    }
  });

  context.afterEach(() => {
    for (const key of inputKeys) {
      if (envSnapshot[key] === undefined) {
        delete process.env[key];
      } else {
        process.env[key] = envSnapshot[key];
      }
    }
  });

  await context.test('parses valid full config from environment', () => {
    process.env['INPUT_GITHUB_TOKEN'] = 'ghp_abc123';
    process.env['INPUT_ISSUE_COMMENT'] = 'Locking this issue.';
    process.env['INPUT_ISSUE_INACTIVE_DAYS'] = '60';
    process.env['INPUT_ISSUE_LOCK_REASON'] = 'off-topic';
    process.env['INPUT_PR_COMMENT'] = 'Locking this PR.';
    process.env['INPUT_PR_INACTIVE_DAYS'] = '90';
    process.env['INPUT_PR_LOCK_REASON'] = 'spam';
    process.env['INPUT_EXCLUDE_LABELS'] = 'bug,wontfix';
    process.env['INPUT_LOG_OUTPUT'] = 'true';
    process.env['INPUT_DRY_RUN'] = 'false';

    const config = getConfig();

    strictEqual(config.githubToken, 'ghp_abc123');
    strictEqual(config.issueComment, 'Locking this issue.');
    strictEqual(config.issueInactiveDays, 60);
    strictEqual(config.issueLockReason, 'off-topic');
    strictEqual(config.prComment, 'Locking this PR.');
    strictEqual(config.prInactiveDays, 90);
    strictEqual(config.prLockReason, 'spam');
    deepStrictEqual(config.excludeLabels, ['bug', 'wontfix']);
    strictEqual(config.logOutput, true);
    strictEqual(config.dryRun, false);
  });

  await context.test('applies default comments when empty', () => {
    process.env['INPUT_GITHUB_TOKEN'] = 'ghp_abc123';
    process.env['INPUT_ISSUE_COMMENT'] = '';
    process.env['INPUT_ISSUE_INACTIVE_DAYS'] = '30';
    process.env['INPUT_ISSUE_LOCK_REASON'] = 'resolved';
    process.env['INPUT_PR_COMMENT'] = '';
    process.env['INPUT_PR_INACTIVE_DAYS'] = '30';
    process.env['INPUT_PR_LOCK_REASON'] = 'resolved';
    process.env['INPUT_EXCLUDE_LABELS'] = '';
    process.env['INPUT_LOG_OUTPUT'] = 'true';
    process.env['INPUT_DRY_RUN'] = 'false';

    const config = getConfig();

    strictEqual(config.issueComment, 'Due to inactivity, this issue will be locked and marked as resolved. If you have any further questions or inquiries, please feel free to open a new issue.');
    strictEqual(config.prComment, 'Due to inactivity, this pull request will be locked and marked as resolved. If you have any further questions or inquiries, please feel free to open a new pull request.');
  });

  await context.test('coerces inactive days to numbers', () => {
    process.env['INPUT_GITHUB_TOKEN'] = 'ghp_abc123';
    process.env['INPUT_ISSUE_COMMENT'] = '';
    process.env['INPUT_ISSUE_INACTIVE_DAYS'] = '45';
    process.env['INPUT_ISSUE_LOCK_REASON'] = 'resolved';
    process.env['INPUT_PR_COMMENT'] = '';
    process.env['INPUT_PR_INACTIVE_DAYS'] = '15';
    process.env['INPUT_PR_LOCK_REASON'] = 'resolved';
    process.env['INPUT_EXCLUDE_LABELS'] = '';
    process.env['INPUT_LOG_OUTPUT'] = 'true';
    process.env['INPUT_DRY_RUN'] = 'false';

    const config = getConfig();

    strictEqual(config.issueInactiveDays, 45);
    strictEqual(config.prInactiveDays, 15);
  });

  await context.test('splits and trims exclude labels', () => {
    process.env['INPUT_GITHUB_TOKEN'] = 'ghp_abc123';
    process.env['INPUT_ISSUE_COMMENT'] = '';
    process.env['INPUT_ISSUE_INACTIVE_DAYS'] = '30';
    process.env['INPUT_ISSUE_LOCK_REASON'] = 'resolved';
    process.env['INPUT_PR_COMMENT'] = '';
    process.env['INPUT_PR_INACTIVE_DAYS'] = '30';
    process.env['INPUT_PR_LOCK_REASON'] = 'resolved';
    process.env['INPUT_EXCLUDE_LABELS'] = ' bug , wontfix , enhancement ';
    process.env['INPUT_LOG_OUTPUT'] = 'true';
    process.env['INPUT_DRY_RUN'] = 'false';

    const config = getConfig();

    deepStrictEqual(config.excludeLabels, ['bug', 'wontfix', 'enhancement']);
  });

  await context.test('transforms boolean string values', () => {
    process.env['INPUT_GITHUB_TOKEN'] = 'ghp_abc123';
    process.env['INPUT_ISSUE_COMMENT'] = '';
    process.env['INPUT_ISSUE_INACTIVE_DAYS'] = '30';
    process.env['INPUT_ISSUE_LOCK_REASON'] = 'resolved';
    process.env['INPUT_PR_COMMENT'] = '';
    process.env['INPUT_PR_INACTIVE_DAYS'] = '30';
    process.env['INPUT_PR_LOCK_REASON'] = 'resolved';
    process.env['INPUT_EXCLUDE_LABELS'] = '';
    process.env['INPUT_LOG_OUTPUT'] = 'false';
    process.env['INPUT_DRY_RUN'] = 'true';

    const config = getConfig();

    strictEqual(config.logOutput, false);
    strictEqual(config.dryRun, true);
  });

  await context.test('throws when github token is missing', () => {
    process.env['INPUT_GITHUB_TOKEN'] = '';
    process.env['INPUT_ISSUE_COMMENT'] = '';
    process.env['INPUT_ISSUE_INACTIVE_DAYS'] = '30';
    process.env['INPUT_ISSUE_LOCK_REASON'] = 'resolved';
    process.env['INPUT_PR_COMMENT'] = '';
    process.env['INPUT_PR_INACTIVE_DAYS'] = '30';
    process.env['INPUT_PR_LOCK_REASON'] = 'resolved';
    process.env['INPUT_EXCLUDE_LABELS'] = '';
    process.env['INPUT_LOG_OUTPUT'] = 'true';
    process.env['INPUT_DRY_RUN'] = 'false';

    throws(() => {
      getConfig();
    });
  });

  await context.test('throws when lock reason is invalid', () => {
    process.env['INPUT_GITHUB_TOKEN'] = 'ghp_abc123';
    process.env['INPUT_ISSUE_COMMENT'] = '';
    process.env['INPUT_ISSUE_INACTIVE_DAYS'] = '30';
    process.env['INPUT_ISSUE_LOCK_REASON'] = 'invalid';
    process.env['INPUT_PR_COMMENT'] = '';
    process.env['INPUT_PR_INACTIVE_DAYS'] = '30';
    process.env['INPUT_PR_LOCK_REASON'] = 'resolved';
    process.env['INPUT_EXCLUDE_LABELS'] = '';
    process.env['INPUT_LOG_OUTPUT'] = 'true';
    process.env['INPUT_DRY_RUN'] = 'false';

    throws(() => {
      getConfig();
    });
  });
});
