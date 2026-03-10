import * as core from '@actions/core';
import * as github from '@actions/github';

import { configuration } from '@/lib/schema.js';
import type {
  AddThreadCommentBody,
  AddThreadCommentConfig,
  AddThreadCommentIssueNumber,
  AddThreadCommentReturns,
  GetConfigReturns,
  GetContextReturns,
  GetInactiveThreadsConfig,
  GetInactiveThreadsReturns,
  GetInactiveThreadsType,
  LockThreadConfig,
  LockThreadIssueNumber,
  LockThreadLockReason,
  LockThreadReturns,
} from '@/types/index.d.ts';

/**
 * Add thread comment.
 *
 * @param {AddThreadCommentIssueNumber} issueNumber - Issue number.
 * @param {AddThreadCommentBody}        body        - Body.
 * @param {AddThreadCommentConfig}      config      - Config.
 *
 * @returns {AddThreadCommentReturns}
 *
 * @since 1.0.0
 */
export async function addThreadComment(issueNumber: AddThreadCommentIssueNumber, body: AddThreadCommentBody, config: AddThreadCommentConfig): AddThreadCommentReturns {
  const { githubToken } = config;
  const { owner, repo } = github.context.repo;
  const octokit = github.getOctokit(githubToken);

  await octokit.rest.issues.createComment({
    owner,
    repo,
    issue_number: issueNumber,
    body,
  });
}

/**
 * Get config.
 *
 * @returns {GetConfigReturns}
 *
 * @since 1.0.0
 */
export function getConfig(): GetConfigReturns {
  const githubToken = core.getInput('GITHUB_TOKEN');
  const issueComment = core.getInput('ISSUE_COMMENT');
  const issueInactiveDays = core.getInput('ISSUE_INACTIVE_DAYS');
  const issueLockReason = core.getInput('ISSUE_LOCK_REASON');
  const prComment = core.getInput('PR_COMMENT');
  const prInactiveDays = core.getInput('PR_INACTIVE_DAYS');
  const prLockReason = core.getInput('PR_LOCK_REASON');
  const excludeLabels = core.getInput('EXCLUDE_LABELS');
  const logOutput = core.getInput('LOG_OUTPUT');
  const dryRun = core.getInput('DRY_RUN');

  return configuration.parse({
    githubToken,
    issueComment,
    issueInactiveDays,
    issueLockReason,
    prComment,
    prInactiveDays,
    prLockReason,
    excludeLabels,
    logOutput,
    dryRun,
  });
}

/**
 * Get context.
 *
 * @returns {GetContextReturns}
 *
 * @since 1.0.0
 */
export function getContext(): GetContextReturns {
  return github.context;
}

/**
 * Get inactive threads.
 *
 * @param {GetInactiveThreadsConfig} config - Config.
 * @param {GetInactiveThreadsType}   type   - Type.
 *
 * @returns {GetInactiveThreadsReturns}
 *
 * @since 1.0.0
 */
export async function getInactiveThreads(config: GetInactiveThreadsConfig, type: GetInactiveThreadsType): GetInactiveThreadsReturns {
  const {
    githubToken,
    issueInactiveDays,
    prInactiveDays,
    excludeLabels,
  } = config;

  const { owner, repo } = github.context.repo;
  const octokit = github.getOctokit(githubToken);

  const inactiveDays = (type === 'issue') ? issueInactiveDays : prInactiveDays;
  const threshold = new Date();
  threshold.setDate(threshold.getDate() - inactiveDays);
  const dateStr = threshold.toISOString().split('T')[0];

  const typeFilter = (type === 'issue') ? 'is:issue' : 'is:pr';
  const labelExclusions = excludeLabels.map((label) => `-label:"${label}"`).join(' ');
  const searchQuery = `repo:${owner}/${repo} ${typeFilter} is:closed is:unlocked updated:<${dateStr} ${labelExclusions}`.trim();

  const threads = [];
  let page = 1;

  while (page <= 10) {
    const response = await octokit.rest.search.issuesAndPullRequests({
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
 * Lock thread.
 *
 * @param {LockThreadIssueNumber} issueNumber - Issue number.
 * @param {LockThreadLockReason}  lockReason  - Lock reason.
 * @param {LockThreadConfig}      config      - Config.
 *
 * @returns {LockThreadReturns}
 *
 * @since 1.0.0
 */
export async function lockThread(issueNumber: LockThreadIssueNumber, lockReason: LockThreadLockReason, config: LockThreadConfig): LockThreadReturns {
  const { githubToken } = config;
  const { owner, repo } = github.context.repo;
  const octokit = github.getOctokit(githubToken);

  await octokit.rest.issues.lock({
    owner,
    repo,
    issue_number: issueNumber,
    lock_reason: lockReason,
  });
}
