import * as core from '@actions/core';
import * as github from '@actions/github';

import { configuration } from './schema.js';

import type {
  Lib_Utility_AddThreadComment_Body,
  Lib_Utility_AddThreadComment_Config,
  Lib_Utility_AddThreadComment_IssueNumber,
  Lib_Utility_AddThreadComment_Octokit,
  Lib_Utility_AddThreadComment_Returns,
  Lib_Utility_GetConfig_Returns,
  Lib_Utility_GetContext_Returns,
  Lib_Utility_GetInactiveThreads_Config,
  Lib_Utility_GetInactiveThreads_DateStr,
  Lib_Utility_GetInactiveThreads_InactiveDays,
  Lib_Utility_GetInactiveThreads_LabelExclusions,
  Lib_Utility_GetInactiveThreads_Octokit,
  Lib_Utility_GetInactiveThreads_Page,
  Lib_Utility_GetInactiveThreads_Response,
  Lib_Utility_GetInactiveThreads_Returns,
  Lib_Utility_GetInactiveThreads_SearchQuery,
  Lib_Utility_GetInactiveThreads_Threads,
  Lib_Utility_GetInactiveThreads_Threshold,
  Lib_Utility_GetInactiveThreads_Type,
  Lib_Utility_GetInactiveThreads_TypeFilter,
  Lib_Utility_LockThread_Config,
  Lib_Utility_LockThread_IssueNumber,
  Lib_Utility_LockThread_LockReason,
  Lib_Utility_LockThread_Octokit,
  Lib_Utility_LockThread_Returns,
} from '../types/lib/utility.d.ts';

/**
 * Lib - Utility - Add Thread Comment.
 *
 * Posts a comment on the given issue or pull request using the
 * configured token before the thread is locked, so contributors
 * see why the thread was closed.
 *
 * @param {Lib_Utility_AddThreadComment_IssueNumber} issueNumber - Issue number.
 * @param {Lib_Utility_AddThreadComment_Body}        body        - Body.
 * @param {Lib_Utility_AddThreadComment_Config}      config      - Config.
 *
 * @returns {Lib_Utility_AddThreadComment_Returns}
 *
 * @since 1.0.0
 */
export async function addThreadComment(issueNumber: Lib_Utility_AddThreadComment_IssueNumber, body: Lib_Utility_AddThreadComment_Body, config: Lib_Utility_AddThreadComment_Config): Lib_Utility_AddThreadComment_Returns {
  const octokit: Lib_Utility_AddThreadComment_Octokit = github.getOctokit(config['githubToken']);

  await octokit.rest.issues.createComment({
    owner: github.context.repo.owner,
    repo: github.context.repo.repo,
    issue_number: issueNumber,
    body,
  });

  return;
}

/**
 * Lib - Utility - Get Config.
 *
 * Reads every action input and validates it through the
 * configuration schema, returning a fully normalized and
 * type-safe configuration object.
 *
 * @returns {Lib_Utility_GetConfig_Returns}
 *
 * @since 1.0.0
 */
export function getConfig(): Lib_Utility_GetConfig_Returns {
  return configuration.parse({
    githubToken: core.getInput('GITHUB_TOKEN'),
    issueComment: core.getInput('ISSUE_COMMENT'),
    issueInactiveDays: core.getInput('ISSUE_INACTIVE_DAYS'),
    issueLockReason: core.getInput('ISSUE_LOCK_REASON'),
    prComment: core.getInput('PR_COMMENT'),
    prInactiveDays: core.getInput('PR_INACTIVE_DAYS'),
    prLockReason: core.getInput('PR_LOCK_REASON'),
    excludeLabels: core.getInput('EXCLUDE_LABELS'),
    logOutput: core.getInput('LOG_OUTPUT'),
    dryRun: core.getInput('DRY_RUN'),
  });
}

/**
 * Lib - Utility - Get Context.
 *
 * Returns the current GitHub Actions runtime context so callers
 * can read the repository owner, name, and event payload without
 * importing the GitHub toolkit directly.
 *
 * @returns {Lib_Utility_GetContext_Returns}
 *
 * @since 1.0.0
 */
export function getContext(): Lib_Utility_GetContext_Returns {
  return github.context;
}

/**
 * Lib - Utility - Get Inactive Threads.
 *
 * Searches the repository for closed, unlocked issues or pull
 * requests that have not been updated within the configured
 * window, paging through results while honoring label excludes.
 *
 * @param {Lib_Utility_GetInactiveThreads_Config} config - Config.
 * @param {Lib_Utility_GetInactiveThreads_Type}   type   - Type.
 *
 * @returns {Lib_Utility_GetInactiveThreads_Returns}
 *
 * @since 1.0.0
 */
export async function getInactiveThreads(config: Lib_Utility_GetInactiveThreads_Config, type: Lib_Utility_GetInactiveThreads_Type): Lib_Utility_GetInactiveThreads_Returns {
  const octokit: Lib_Utility_GetInactiveThreads_Octokit = github.getOctokit(config['githubToken']);
  const inactiveDays: Lib_Utility_GetInactiveThreads_InactiveDays = (type === 'issue') ? config['issueInactiveDays'] : config['prInactiveDays'];
  const threshold: Lib_Utility_GetInactiveThreads_Threshold = new Date();

  threshold.setDate(threshold.getDate() - inactiveDays);

  const dateStr: Lib_Utility_GetInactiveThreads_DateStr = threshold.toISOString().split('T')[0];
  const typeFilter: Lib_Utility_GetInactiveThreads_TypeFilter = (type === 'issue') ? 'is:issue' : 'is:pr';
  const labelExclusions: Lib_Utility_GetInactiveThreads_LabelExclusions = config['excludeLabels'].map((label) => `-label:"${label}"`).join(' ');
  const searchQuery: Lib_Utility_GetInactiveThreads_SearchQuery = `repo:${github.context.repo.owner}/${github.context.repo.repo} ${typeFilter} is:closed is:unlocked updated:<=${dateStr} ${labelExclusions}`.trim();
  const threads: Lib_Utility_GetInactiveThreads_Threads = [];

  let page: Lib_Utility_GetInactiveThreads_Page = 1;

  while (page <= 10) {
    const response: Lib_Utility_GetInactiveThreads_Response = await octokit.rest.search.issuesAndPullRequests({
      q: searchQuery,
      per_page: 100,
      sort: 'updated',
      order: 'asc',
      page,
    });

    for (const item of response.data.items) {
      threads.push({
        type,
        number: item.number,
        title: item.title,
        updatedAt: item.updated_at,
      });
    }

    if (response.data.items.length < 100) {
      break;
    }

    page += 1;
  }

  return threads;
}

/**
 * Lib - Utility - Lock Thread.
 *
 * Locks the given issue or pull request with the configured lock
 * reason using the provided token, preventing any further
 * comments on the closed thread.
 *
 * @param {Lib_Utility_LockThread_IssueNumber} issueNumber - Issue number.
 * @param {Lib_Utility_LockThread_LockReason}  lockReason  - Lock reason.
 * @param {Lib_Utility_LockThread_Config}      config      - Config.
 *
 * @returns {Lib_Utility_LockThread_Returns}
 *
 * @since 1.0.0
 */
export async function lockThread(issueNumber: Lib_Utility_LockThread_IssueNumber, lockReason: Lib_Utility_LockThread_LockReason, config: Lib_Utility_LockThread_Config): Lib_Utility_LockThread_Returns {
  const octokit: Lib_Utility_LockThread_Octokit = github.getOctokit(config['githubToken']);

  await octokit.rest.issues.lock({
    owner: github.context.repo.owner,
    repo: github.context.repo.repo,
    issue_number: issueNumber,
    lock_reason: lockReason,
  });

  return;
}
