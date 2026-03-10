import * as core from '@actions/core';

import {
  addThreadComment,
  getInactiveThreads,
  lockThread,
} from '@/lib/utility.js';
import type {
  LockInactiveThreadsConfig,
  LockInactiveThreadsReturns,
} from '@/types/index.d.ts';

/**
 * Lock inactive threads.
 *
 * @param {LockInactiveThreadsConfig} config - Config.
 *
 * @returns {LockInactiveThreadsReturns}
 *
 * @since 1.0.0
 */
export async function lockInactiveThreads(config: LockInactiveThreadsConfig): LockInactiveThreadsReturns {
  const {
    issueComment,
    issueLockReason,
    prComment,
    prLockReason,
    logOutput,
    dryRun,
  } = config;

  // Get inactive issues.
  const inactiveIssues = await getInactiveThreads(config, 'issue');
  const inactivePrs = await getInactiveThreads(config, 'pull-request');

  if (logOutput) {
    core.info(`Found ${inactiveIssues.length} inactive issue(s) and ${inactivePrs.length} inactive pull request(s)`);
  }

  if (dryRun) {
    core.info('Dry run enabled. No changes will be made.');

    for (const issue of inactiveIssues) {
      core.info(`[DRY RUN] Would lock issue #${issue.number}: ${issue.title} (last updated: ${issue.updatedAt})`);
    }

    for (const pr of inactivePrs) {
      core.info(`[DRY RUN] Would lock pull request #${pr.number}: ${pr.title} (last updated: ${pr.updatedAt})`);
    }

    core.setOutput('result', true);

    return;
  }

  // Lock inactive issues.
  for (const issue of inactiveIssues) {
    if (logOutput) {
      core.info(`Locking issue #${issue.number}: ${issue.title}`);
    }

    await addThreadComment(issue.number, issueComment, config);
    await lockThread(issue.number, issueLockReason, config);
  }

  // Lock inactive pull requests.
  for (const pr of inactivePrs) {
    if (logOutput) {
      core.info(`Locking pull request #${pr.number}: ${pr.title}`);
    }

    await addThreadComment(pr.number, prComment, config);
    await lockThread(pr.number, prLockReason, config);
  }

  core.info(`Locked ${inactiveIssues.length} issue(s) and ${inactivePrs.length} pull request(s)`);
  core.setOutput('result', true);
}
