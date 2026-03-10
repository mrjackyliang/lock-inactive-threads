import { deepStrictEqual, strictEqual, throws } from 'node:assert/strict';
import { test } from 'node:test';

import { configuration } from '@/lib/schema.js';

/**
 * Configuration schema.
 *
 * @since 1.0.0
 */
test('configuration', async (context) => {
  await context.test('accepts valid full config', () => {
    const result = configuration.parse({
      githubToken: 'ghp_abc123',
      issueComment: 'Locking this issue.',
      issueInactiveDays: '60',
      issueLockReason: 'off-topic',
      prComment: 'Locking this pull request.',
      prInactiveDays: '90',
      prLockReason: 'spam',
      excludeLabels: 'bug,wontfix',
      logOutput: 'true',
      dryRun: 'false',
    });

    strictEqual(result.githubToken, 'ghp_abc123');
    strictEqual(result.issueComment, 'Locking this issue.');
    strictEqual(result.issueInactiveDays, 60);
    strictEqual(result.issueLockReason, 'off-topic');
    strictEqual(result.prComment, 'Locking this pull request.');
    strictEqual(result.prInactiveDays, 90);
    strictEqual(result.prLockReason, 'spam');
    deepStrictEqual(result.excludeLabels, ['bug', 'wontfix']);
    strictEqual(result.logOutput, true);
    strictEqual(result.dryRun, false);
  });

  await context.test('applies default issue comment when empty string', () => {
    const result = configuration.parse({
      githubToken: 'ghp_abc123',
      issueComment: '',
      issueInactiveDays: '30',
      issueLockReason: 'resolved',
      prComment: 'Custom PR comment.',
      prInactiveDays: '30',
      prLockReason: 'resolved',
      excludeLabels: '',
      logOutput: 'true',
      dryRun: 'false',
    });

    strictEqual(result.issueComment, 'Due to inactivity, this issue will be locked and marked as resolved. If you have any further questions or inquiries, please feel free to open a new issue.');
  });

  await context.test('applies default pr comment when empty string', () => {
    const result = configuration.parse({
      githubToken: 'ghp_abc123',
      issueComment: 'Custom issue comment.',
      issueInactiveDays: '30',
      issueLockReason: 'resolved',
      prComment: '',
      prInactiveDays: '30',
      prLockReason: 'resolved',
      excludeLabels: '',
      logOutput: 'true',
      dryRun: 'false',
    });

    strictEqual(result.prComment, 'Due to inactivity, this pull request will be locked and marked as resolved. If you have any further questions or inquiries, please feel free to open a new pull request.');
  });

  await context.test('coerces inactive days from string to number', () => {
    const result = configuration.parse({
      githubToken: 'ghp_abc123',
      issueComment: '',
      issueInactiveDays: '45',
      issueLockReason: 'resolved',
      prComment: '',
      prInactiveDays: '15',
      prLockReason: 'resolved',
      excludeLabels: '',
      logOutput: 'true',
      dryRun: 'false',
    });

    strictEqual(result.issueInactiveDays, 45);
    strictEqual(result.prInactiveDays, 15);
  });

  await context.test('accepts all valid lock reasons', () => {
    const lockReasons = ['off-topic', 'resolved', 'spam', 'too heated'] as const;

    for (const reason of lockReasons) {
      const result = configuration.parse({
        githubToken: 'ghp_abc123',
        issueComment: '',
        issueInactiveDays: '30',
        issueLockReason: reason,
        prComment: '',
        prInactiveDays: '30',
        prLockReason: reason,
        excludeLabels: '',
        logOutput: 'true',
        dryRun: 'false',
      });

      strictEqual(result.issueLockReason, reason);
      strictEqual(result.prLockReason, reason);
    }
  });

  await context.test('transforms exclude labels into trimmed array', () => {
    const result = configuration.parse({
      githubToken: 'ghp_abc123',
      issueComment: '',
      issueInactiveDays: '30',
      issueLockReason: 'resolved',
      prComment: '',
      prInactiveDays: '30',
      prLockReason: 'resolved',
      excludeLabels: ' bug , wontfix , enhancement ',
      logOutput: 'true',
      dryRun: 'false',
    });

    deepStrictEqual(result.excludeLabels, ['bug', 'wontfix', 'enhancement']);
  });

  await context.test('transforms empty exclude labels into empty array', () => {
    const result = configuration.parse({
      githubToken: 'ghp_abc123',
      issueComment: '',
      issueInactiveDays: '30',
      issueLockReason: 'resolved',
      prComment: '',
      prInactiveDays: '30',
      prLockReason: 'resolved',
      excludeLabels: '',
      logOutput: 'true',
      dryRun: 'false',
    });

    deepStrictEqual(result.excludeLabels, []);
  });

  await context.test('transforms log output true', () => {
    const result = configuration.parse({
      githubToken: 'ghp_abc123',
      issueComment: '',
      issueInactiveDays: '30',
      issueLockReason: 'resolved',
      prComment: '',
      prInactiveDays: '30',
      prLockReason: 'resolved',
      excludeLabels: '',
      logOutput: 'true',
      dryRun: 'false',
    });

    strictEqual(result.logOutput, true);
  });

  await context.test('transforms log output false', () => {
    const result = configuration.parse({
      githubToken: 'ghp_abc123',
      issueComment: '',
      issueInactiveDays: '30',
      issueLockReason: 'resolved',
      prComment: '',
      prInactiveDays: '30',
      prLockReason: 'resolved',
      excludeLabels: '',
      logOutput: 'false',
      dryRun: 'false',
    });

    strictEqual(result.logOutput, false);
  });

  await context.test('transforms dry run true', () => {
    const result = configuration.parse({
      githubToken: 'ghp_abc123',
      issueComment: '',
      issueInactiveDays: '30',
      issueLockReason: 'resolved',
      prComment: '',
      prInactiveDays: '30',
      prLockReason: 'resolved',
      excludeLabels: '',
      logOutput: 'true',
      dryRun: 'true',
    });

    strictEqual(result.dryRun, true);
  });

  await context.test('transforms dry run false', () => {
    const result = configuration.parse({
      githubToken: 'ghp_abc123',
      issueComment: '',
      issueInactiveDays: '30',
      issueLockReason: 'resolved',
      prComment: '',
      prInactiveDays: '30',
      prLockReason: 'resolved',
      excludeLabels: '',
      logOutput: 'true',
      dryRun: 'false',
    });

    strictEqual(result.dryRun, false);
  });

  await context.test('rejects empty github token', () => {
    throws(() => {
      configuration.parse({
        githubToken: '',
        issueComment: '',
        issueInactiveDays: '30',
        issueLockReason: 'resolved',
        prComment: '',
        prInactiveDays: '30',
        prLockReason: 'resolved',
        excludeLabels: '',
        logOutput: 'true',
        dryRun: 'false',
      });
    });
  });

  await context.test('rejects missing github token', () => {
    throws(() => {
      configuration.parse({
        issueComment: '',
        issueInactiveDays: '30',
        issueLockReason: 'resolved',
        prComment: '',
        prInactiveDays: '30',
        prLockReason: 'resolved',
        excludeLabels: '',
        logOutput: 'true',
        dryRun: 'false',
      });
    });
  });

  await context.test('rejects invalid issue lock reason', () => {
    throws(() => {
      configuration.parse({
        githubToken: 'ghp_abc123',
        issueComment: '',
        issueInactiveDays: '30',
        issueLockReason: 'invalid-reason',
        prComment: '',
        prInactiveDays: '30',
        prLockReason: 'resolved',
        excludeLabels: '',
        logOutput: 'true',
        dryRun: 'false',
      });
    });
  });

  await context.test('rejects invalid pr lock reason', () => {
    throws(() => {
      configuration.parse({
        githubToken: 'ghp_abc123',
        issueComment: '',
        issueInactiveDays: '30',
        issueLockReason: 'resolved',
        prComment: '',
        prInactiveDays: '30',
        prLockReason: 'invalid-reason',
        excludeLabels: '',
        logOutput: 'true',
        dryRun: 'false',
      });
    });
  });

  await context.test('rejects invalid log output value', () => {
    throws(() => {
      configuration.parse({
        githubToken: 'ghp_abc123',
        issueComment: '',
        issueInactiveDays: '30',
        issueLockReason: 'resolved',
        prComment: '',
        prInactiveDays: '30',
        prLockReason: 'resolved',
        excludeLabels: '',
        logOutput: 'yes',
        dryRun: 'false',
      });
    });
  });

  await context.test('rejects invalid dry run value', () => {
    throws(() => {
      configuration.parse({
        githubToken: 'ghp_abc123',
        issueComment: '',
        issueInactiveDays: '30',
        issueLockReason: 'resolved',
        prComment: '',
        prInactiveDays: '30',
        prLockReason: 'resolved',
        excludeLabels: '',
        logOutput: 'true',
        dryRun: 'yes',
      });
    });
  });

  await context.test('rejects null', () => {
    throws(() => {
      configuration.parse(null);
    });
  });

  await context.test('rejects non-object value', () => {
    throws(() => {
      configuration.parse('invalid');
    });
  });

  await context.test('handles single exclude label', () => {
    const result = configuration.parse({
      githubToken: 'ghp_abc123',
      issueComment: '',
      issueInactiveDays: '30',
      issueLockReason: 'resolved',
      prComment: '',
      prInactiveDays: '30',
      prLockReason: 'resolved',
      excludeLabels: 'do-not-lock',
      logOutput: 'true',
      dryRun: 'false',
    });

    deepStrictEqual(result.excludeLabels, ['do-not-lock']);
  });
});
