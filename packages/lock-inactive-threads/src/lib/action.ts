import * as core from '@actions/core';

import {
  addThreadComment,
  getInactiveThreads,
  lockThread,
} from './utility.js';

import type {
  Lib_Action_LockInactiveThreads_Config,
  Lib_Action_LockInactiveThreads_FailureCount,
  Lib_Action_LockInactiveThreads_FilterUniqueThread,
  Lib_Action_LockInactiveThreads_InactiveIssues,
  Lib_Action_LockInactiveThreads_InactivePrs,
  Lib_Action_LockInactiveThreads_Returns,
  Lib_Action_LockInactiveThreads_SeenThreadNumbers,
  Lib_Action_LockInactiveThreads_SuccessCount,
  Lib_Action_LockInactiveThreads_TotalCount,
} from '../types/lib/action.d.ts';

/**
 * Lib - Action - Lock Inactive Threads.
 *
 * Collects every inactive issue and pull request for the given
 * configuration, then either previews them in dry-run mode or
 * comments on and locks each thread one at a time.
 *
 * @param {Lib_Action_LockInactiveThreads_Config} config - Config.
 *
 * @returns {Lib_Action_LockInactiveThreads_Returns}
 *
 * @since 1.0.0
 */
export async function lockInactiveThreads(config: Lib_Action_LockInactiveThreads_Config): Lib_Action_LockInactiveThreads_Returns {
  const seenThreadNumbers: Lib_Action_LockInactiveThreads_SeenThreadNumbers = new Set();

  /**
   * Lib - Action - Lock Inactive Threads - Filter Unique Thread.
   *
   * Keeps the first occurrence of each GitHub thread number and warns when
   * either search returns a thread that has already been collected.
   *
   * @param {Lib_Action_LockInactiveThreads_FilterUniqueThread_Thread} thread - Thread.
   *
   * @private
   *
   * @returns {Lib_Action_LockInactiveThreads_FilterUniqueThread_Returns}
   *
   * @since 1.0.8
   */
  const filterUniqueThread: Lib_Action_LockInactiveThreads_FilterUniqueThread = (thread) => {
    if (seenThreadNumbers.has(thread['number']) === true) {
      core.warning(`Skipping duplicate ${thread['type']} #${thread['number']} returned by inactive-thread searches.`);

      return false;
    }

    seenThreadNumbers.add(thread['number']);

    return true;
  };
  const inactiveIssues: Lib_Action_LockInactiveThreads_InactiveIssues = (await getInactiveThreads(config, 'issue')).filter(filterUniqueThread);
  const inactivePrs: Lib_Action_LockInactiveThreads_InactivePrs = (await getInactiveThreads(config, 'pull-request')).filter(filterUniqueThread);

  if (config['logOutput'] === true) {
    core.info(`Found ${inactiveIssues.length} inactive issue(s) and ${inactivePrs.length} inactive pull request(s)`);
  }

  if (config['dryRun'] === true) {
    core.info('Dry run enabled. No changes will be made.');

    for (const issue of inactiveIssues) {
      core.info(`[DRY RUN] Would lock issue #${issue['number']}: ${issue['title']} (last updated: ${issue['updatedAt']})`);
    }

    for (const pr of inactivePrs) {
      core.info(`[DRY RUN] Would lock pull request #${pr['number']}: ${pr['title']} (last updated: ${pr['updatedAt']})`);
    }

    core.setOutput('result', true);

    return;
  }

  let failureCount: Lib_Action_LockInactiveThreads_FailureCount = 0;

  // Lock inactive issues.
  for (const issue of inactiveIssues) {
    try {
      if (config['logOutput'] === true) {
        core.info(`Locking issue #${issue['number']}: ${issue['title']}`);
      }

      await addThreadComment(issue['number'], config['issueComment'], config);
      await lockThread(issue['number'], config['issueLockReason'], config);
    } catch (error) {
      failureCount += 1;

      if (error instanceof Error) {
        core.warning(`Failed to lock issue #${issue['number']}: ${error.message}`);
      } else {
        core.warning(`Failed to lock issue #${issue['number']}: ${String(error)}`);
      }
    }
  }

  // Lock inactive pull requests.
  for (const pr of inactivePrs) {
    try {
      if (config['logOutput'] === true) {
        core.info(`Locking pull request #${pr['number']}: ${pr['title']}`);
      }

      await addThreadComment(pr['number'], config['prComment'], config);
      await lockThread(pr['number'], config['prLockReason'], config);
    } catch (error) {
      failureCount += 1;

      if (error instanceof Error) {
        core.warning(`Failed to lock pull request #${pr['number']}: ${error.message}`);
      } else {
        core.warning(`Failed to lock pull request #${pr['number']}: ${String(error)}`);
      }
    }
  }

  const totalCount: Lib_Action_LockInactiveThreads_TotalCount = inactiveIssues.length + inactivePrs.length;
  const successCount: Lib_Action_LockInactiveThreads_SuccessCount = totalCount - failureCount;

  if (failureCount > 0) {
    core.info(`Locked ${successCount} of ${totalCount} thread(s) (${failureCount} failed)`);

    core.setFailed(`Failed to lock ${failureCount} of ${totalCount} thread(s)`);
  } else {
    core.info(`Locked ${successCount} of ${totalCount} thread(s)`);
  }

  core.setOutput('result', failureCount === 0);

  return;
}
