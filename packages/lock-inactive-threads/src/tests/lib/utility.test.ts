import * as core from '@actions/core';
import * as github from '@actions/github';
import {
  afterEach,
  describe,
  expect,
  it,
  vi,
} from 'vitest';

import { getConfig, getInactiveThreads } from '../../lib/utility.js';

import type {
  Tests_Lib_Utility_GetConfig_AppliesDefaultCommentsWhenEmpty_Config,
  Tests_Lib_Utility_GetConfig_CoercesInactiveDaysToNumbers_Config,
  Tests_Lib_Utility_GetConfig_ParsesValidFullConfigFromEnvironment_Config,
  Tests_Lib_Utility_GetConfig_SplitsAndTrimsExcludeLabels_Config,
  Tests_Lib_Utility_GetConfig_TransformsBooleanStringValues_Config,
  Tests_Lib_Utility_GetInactiveThreads_AccumulatesItemsAcrossMultiplePages_Config,
  Tests_Lib_Utility_GetInactiveThreads_AccumulatesItemsAcrossMultiplePages_MockOctokit,
  Tests_Lib_Utility_GetInactiveThreads_AccumulatesItemsAcrossMultiplePages_MockSearchFn,
  Tests_Lib_Utility_GetInactiveThreads_AccumulatesItemsAcrossMultiplePages_Result,
  Tests_Lib_Utility_GetInactiveThreads_BuildsCorrectSearchQueryForIssues_Config,
  Tests_Lib_Utility_GetInactiveThreads_BuildsCorrectSearchQueryForIssues_MockOctokit,
  Tests_Lib_Utility_GetInactiveThreads_BuildsCorrectSearchQueryForIssues_MockSearchFn,
  Tests_Lib_Utility_GetInactiveThreads_BuildsCorrectSearchQueryForPullRequests_Config,
  Tests_Lib_Utility_GetInactiveThreads_BuildsCorrectSearchQueryForPullRequests_MockOctokit,
  Tests_Lib_Utility_GetInactiveThreads_BuildsCorrectSearchQueryForPullRequests_MockSearchFn,
  Tests_Lib_Utility_GetInactiveThreads_IncludesLabelExclusionsInSearchQuery_Config,
  Tests_Lib_Utility_GetInactiveThreads_IncludesLabelExclusionsInSearchQuery_MockOctokit,
  Tests_Lib_Utility_GetInactiveThreads_IncludesLabelExclusionsInSearchQuery_MockSearchFn,
  Tests_Lib_Utility_GetInactiveThreads_ReturnsMappedThreadObjects_Config,
  Tests_Lib_Utility_GetInactiveThreads_ReturnsMappedThreadObjects_MockOctokit,
  Tests_Lib_Utility_GetInactiveThreads_ReturnsMappedThreadObjects_MockSearchFn,
  Tests_Lib_Utility_GetInactiveThreads_ReturnsMappedThreadObjects_Result,
  Tests_Lib_Utility_GetInactiveThreads_SkipsIssuesReturnedByPullRequestSearch_Config,
  Tests_Lib_Utility_GetInactiveThreads_SkipsIssuesReturnedByPullRequestSearch_MockOctokit,
  Tests_Lib_Utility_GetInactiveThreads_SkipsIssuesReturnedByPullRequestSearch_MockSearchFn,
  Tests_Lib_Utility_GetInactiveThreads_SkipsIssuesReturnedByPullRequestSearch_Result,
  Tests_Lib_Utility_GetInactiveThreads_SkipsPullRequestsReturnedByIssueSearch_Config,
  Tests_Lib_Utility_GetInactiveThreads_SkipsPullRequestsReturnedByIssueSearch_MockOctokit,
  Tests_Lib_Utility_GetInactiveThreads_SkipsPullRequestsReturnedByIssueSearch_MockSearchFn,
  Tests_Lib_Utility_GetInactiveThreads_SkipsPullRequestsReturnedByIssueSearch_Result,
  Tests_Lib_Utility_GetInactiveThreads_StopsAtPage10Cap_Config,
  Tests_Lib_Utility_GetInactiveThreads_StopsAtPage10Cap_MockOctokit,
  Tests_Lib_Utility_GetInactiveThreads_StopsAtPage10Cap_MockSearchFn,
  Tests_Lib_Utility_GetInactiveThreads_StopsAtPage10Cap_Result,
  Tests_Lib_Utility_GetInactiveThreads_StopsPaginationWhenFewerThan100Items_Config,
  Tests_Lib_Utility_GetInactiveThreads_StopsPaginationWhenFewerThan100Items_MockOctokit,
  Tests_Lib_Utility_GetInactiveThreads_StopsPaginationWhenFewerThan100Items_MockSearchFn,
} from '../../types/tests/lib/utility.test.d.ts';

/**
 * Tests - Lib - Utility - Get Config.
 *
 * @since 1.0.0
 */
describe('getConfig', () => {
  afterEach(() => {
    vi.unstubAllEnvs();

    return;
  });

  it('parses valid full config from environment', () => {
    vi.stubEnv('INPUT_GITHUB_TOKEN', 'ghp_abc123');
    vi.stubEnv('INPUT_ISSUE_COMMENT', 'Locking this issue.');
    vi.stubEnv('INPUT_ISSUE_INACTIVE_DAYS', '60');
    vi.stubEnv('INPUT_ISSUE_LOCK_REASON', 'off-topic');
    vi.stubEnv('INPUT_PR_COMMENT', 'Locking this PR.');
    vi.stubEnv('INPUT_PR_INACTIVE_DAYS', '90');
    vi.stubEnv('INPUT_PR_LOCK_REASON', 'spam');
    vi.stubEnv('INPUT_EXCLUDE_LABELS', 'bug,wontfix');
    vi.stubEnv('INPUT_LOG_OUTPUT', 'true');
    vi.stubEnv('INPUT_DRY_RUN', 'false');

    const config: Tests_Lib_Utility_GetConfig_ParsesValidFullConfigFromEnvironment_Config = getConfig();

    expect(config).toStrictEqual({
      githubToken: 'ghp_abc123',
      issueComment: 'Locking this issue.',
      issueInactiveDays: 60,
      issueLockReason: 'off-topic',
      prComment: 'Locking this PR.',
      prInactiveDays: 90,
      prLockReason: 'spam',
      excludeLabels: [
        'bug',
        'wontfix',
      ],
      logOutput: true,
      dryRun: false,
    });

    return;
  });

  it('applies default comments when empty', () => {
    vi.stubEnv('INPUT_GITHUB_TOKEN', 'ghp_abc123');
    vi.stubEnv('INPUT_ISSUE_COMMENT', '');
    vi.stubEnv('INPUT_ISSUE_INACTIVE_DAYS', '30');
    vi.stubEnv('INPUT_ISSUE_LOCK_REASON', 'resolved');
    vi.stubEnv('INPUT_PR_COMMENT', '');
    vi.stubEnv('INPUT_PR_INACTIVE_DAYS', '30');
    vi.stubEnv('INPUT_PR_LOCK_REASON', 'resolved');
    vi.stubEnv('INPUT_EXCLUDE_LABELS', '');
    vi.stubEnv('INPUT_LOG_OUTPUT', 'true');
    vi.stubEnv('INPUT_DRY_RUN', 'false');

    const config: Tests_Lib_Utility_GetConfig_AppliesDefaultCommentsWhenEmpty_Config = getConfig();

    expect(config['issueComment']).toBe('Due to inactivity, this issue will be locked and marked as resolved. If you have any further questions or inquiries, please feel free to open a new issue.');

    expect(config['prComment']).toBe('Due to inactivity, this pull request will be locked and marked as resolved. If you have any further questions or inquiries, please feel free to open a new pull request.');

    return;
  });

  it('coerces inactive days to numbers', () => {
    vi.stubEnv('INPUT_GITHUB_TOKEN', 'ghp_abc123');
    vi.stubEnv('INPUT_ISSUE_COMMENT', '');
    vi.stubEnv('INPUT_ISSUE_INACTIVE_DAYS', '45');
    vi.stubEnv('INPUT_ISSUE_LOCK_REASON', 'resolved');
    vi.stubEnv('INPUT_PR_COMMENT', '');
    vi.stubEnv('INPUT_PR_INACTIVE_DAYS', '15');
    vi.stubEnv('INPUT_PR_LOCK_REASON', 'resolved');
    vi.stubEnv('INPUT_EXCLUDE_LABELS', '');
    vi.stubEnv('INPUT_LOG_OUTPUT', 'true');
    vi.stubEnv('INPUT_DRY_RUN', 'false');

    const config: Tests_Lib_Utility_GetConfig_CoercesInactiveDaysToNumbers_Config = getConfig();

    expect(config['issueInactiveDays']).toBe(45);

    expect(config['prInactiveDays']).toBe(15);

    return;
  });

  it('splits and trims exclude labels', () => {
    vi.stubEnv('INPUT_GITHUB_TOKEN', 'ghp_abc123');
    vi.stubEnv('INPUT_ISSUE_COMMENT', '');
    vi.stubEnv('INPUT_ISSUE_INACTIVE_DAYS', '30');
    vi.stubEnv('INPUT_ISSUE_LOCK_REASON', 'resolved');
    vi.stubEnv('INPUT_PR_COMMENT', '');
    vi.stubEnv('INPUT_PR_INACTIVE_DAYS', '30');
    vi.stubEnv('INPUT_PR_LOCK_REASON', 'resolved');
    vi.stubEnv('INPUT_EXCLUDE_LABELS', ' bug , wontfix , enhancement ');
    vi.stubEnv('INPUT_LOG_OUTPUT', 'true');
    vi.stubEnv('INPUT_DRY_RUN', 'false');

    const config: Tests_Lib_Utility_GetConfig_SplitsAndTrimsExcludeLabels_Config = getConfig();

    expect(config['excludeLabels']).toStrictEqual([
      'bug',
      'wontfix',
      'enhancement',
    ]);

    return;
  });

  it('transforms boolean string values', () => {
    vi.stubEnv('INPUT_GITHUB_TOKEN', 'ghp_abc123');
    vi.stubEnv('INPUT_ISSUE_COMMENT', '');
    vi.stubEnv('INPUT_ISSUE_INACTIVE_DAYS', '30');
    vi.stubEnv('INPUT_ISSUE_LOCK_REASON', 'resolved');
    vi.stubEnv('INPUT_PR_COMMENT', '');
    vi.stubEnv('INPUT_PR_INACTIVE_DAYS', '30');
    vi.stubEnv('INPUT_PR_LOCK_REASON', 'resolved');
    vi.stubEnv('INPUT_EXCLUDE_LABELS', '');
    vi.stubEnv('INPUT_LOG_OUTPUT', 'false');
    vi.stubEnv('INPUT_DRY_RUN', 'true');

    const config: Tests_Lib_Utility_GetConfig_TransformsBooleanStringValues_Config = getConfig();

    expect(config['logOutput']).toBe(false);

    expect(config['dryRun']).toBe(true);

    return;
  });

  it('throws when github token is missing', () => {
    vi.stubEnv('INPUT_GITHUB_TOKEN', '');
    vi.stubEnv('INPUT_ISSUE_COMMENT', '');
    vi.stubEnv('INPUT_ISSUE_INACTIVE_DAYS', '30');
    vi.stubEnv('INPUT_ISSUE_LOCK_REASON', 'resolved');
    vi.stubEnv('INPUT_PR_COMMENT', '');
    vi.stubEnv('INPUT_PR_INACTIVE_DAYS', '30');
    vi.stubEnv('INPUT_PR_LOCK_REASON', 'resolved');
    vi.stubEnv('INPUT_EXCLUDE_LABELS', '');
    vi.stubEnv('INPUT_LOG_OUTPUT', 'true');
    vi.stubEnv('INPUT_DRY_RUN', 'false');

    expect(() => getConfig()).toThrow();

    return;
  });

  it('throws when lock reason is invalid', () => {
    vi.stubEnv('INPUT_GITHUB_TOKEN', 'ghp_abc123');
    vi.stubEnv('INPUT_ISSUE_COMMENT', '');
    vi.stubEnv('INPUT_ISSUE_INACTIVE_DAYS', '30');
    vi.stubEnv('INPUT_ISSUE_LOCK_REASON', 'invalid');
    vi.stubEnv('INPUT_PR_COMMENT', '');
    vi.stubEnv('INPUT_PR_INACTIVE_DAYS', '30');
    vi.stubEnv('INPUT_PR_LOCK_REASON', 'resolved');
    vi.stubEnv('INPUT_EXCLUDE_LABELS', '');
    vi.stubEnv('INPUT_LOG_OUTPUT', 'true');
    vi.stubEnv('INPUT_DRY_RUN', 'false');

    expect(() => getConfig()).toThrow();

    return;
  });

  return;
});

/**
 * Tests - Lib - Utility - Get Inactive Threads.
 *
 * @since 1.0.0
 */
describe('getInactiveThreads', () => {
  afterEach(() => {
    vi.restoreAllMocks();

    return;
  });

  it('builds correct search query for issues', async () => {
    const mockSearchFn: Tests_Lib_Utility_GetInactiveThreads_BuildsCorrectSearchQueryForIssues_MockSearchFn = vi.fn().mockResolvedValue({ data: { items: [] } });
    const mockOctokit: Tests_Lib_Utility_GetInactiveThreads_BuildsCorrectSearchQueryForIssues_MockOctokit = { rest: { search: { issuesAndPullRequests: mockSearchFn } } };

    // @ts-expect-error Partial mock structure.
    vi.spyOn(github, 'getOctokit').mockReturnValue(mockOctokit);

    Object.defineProperty(github.context, 'repo', {
      value: {
        owner: 'test-owner',
        repo: 'test-repo',
      },
      configurable: true,
    });

    const config: Tests_Lib_Utility_GetInactiveThreads_BuildsCorrectSearchQueryForIssues_Config = {
      githubToken: 'ghp_test123',
      issueComment: 'Locking issue.',
      issueInactiveDays: 30,
      issueLockReason: 'resolved' as const,
      prComment: 'Locking PR.',
      prInactiveDays: 30,
      prLockReason: 'resolved' as const,
      excludeLabels: [],
      logOutput: true,
      dryRun: false,
    };

    await getInactiveThreads(config, 'issue');

    expect(mockSearchFn).toHaveBeenCalledWith(expect.objectContaining({
      q: expect.stringContaining('is:issue'),
    }));

    expect(mockSearchFn).toHaveBeenCalledWith(expect.objectContaining({
      q: expect.stringContaining('is:closed'),
    }));

    expect(mockSearchFn).toHaveBeenCalledWith(expect.objectContaining({
      q: expect.stringContaining('is:unlocked'),
    }));

    expect(mockSearchFn).toHaveBeenCalledWith(expect.objectContaining({
      q: expect.stringContaining('repo:test-owner/test-repo'),
    }));

    expect(mockSearchFn).toHaveBeenCalledWith(expect.objectContaining({
      q: expect.stringContaining('updated:<='),
    }));

    return;
  });

  it('builds correct search query for pull requests', async () => {
    const mockSearchFn: Tests_Lib_Utility_GetInactiveThreads_BuildsCorrectSearchQueryForPullRequests_MockSearchFn = vi.fn().mockResolvedValue({ data: { items: [] } });
    const mockOctokit: Tests_Lib_Utility_GetInactiveThreads_BuildsCorrectSearchQueryForPullRequests_MockOctokit = { rest: { search: { issuesAndPullRequests: mockSearchFn } } };

    // @ts-expect-error Partial mock structure.
    vi.spyOn(github, 'getOctokit').mockReturnValue(mockOctokit);

    Object.defineProperty(github.context, 'repo', {
      value: {
        owner: 'test-owner',
        repo: 'test-repo',
      },
      configurable: true,
    });

    const config: Tests_Lib_Utility_GetInactiveThreads_BuildsCorrectSearchQueryForPullRequests_Config = {
      githubToken: 'ghp_test123',
      issueComment: 'Locking issue.',
      issueInactiveDays: 30,
      issueLockReason: 'resolved' as const,
      prComment: 'Locking PR.',
      prInactiveDays: 30,
      prLockReason: 'resolved' as const,
      excludeLabels: [],
      logOutput: true,
      dryRun: false,
    };

    await getInactiveThreads(config, 'pull-request');

    expect(mockSearchFn).toHaveBeenCalledWith(expect.objectContaining({
      q: expect.stringContaining('is:pr'),
    }));

    expect(mockSearchFn).toHaveBeenCalledWith(expect.objectContaining({
      q: expect.stringContaining('is:closed'),
    }));

    expect(mockSearchFn).toHaveBeenCalledWith(expect.objectContaining({
      q: expect.stringContaining('is:unlocked'),
    }));

    expect(mockSearchFn).toHaveBeenCalledWith(expect.objectContaining({
      q: expect.stringContaining('repo:test-owner/test-repo'),
    }));

    return;
  });

  it('includes label exclusions in search query', async () => {
    const mockSearchFn: Tests_Lib_Utility_GetInactiveThreads_IncludesLabelExclusionsInSearchQuery_MockSearchFn = vi.fn().mockResolvedValue({ data: { items: [] } });
    const mockOctokit: Tests_Lib_Utility_GetInactiveThreads_IncludesLabelExclusionsInSearchQuery_MockOctokit = { rest: { search: { issuesAndPullRequests: mockSearchFn } } };

    // @ts-expect-error Partial mock structure.
    vi.spyOn(github, 'getOctokit').mockReturnValue(mockOctokit);

    Object.defineProperty(github.context, 'repo', {
      value: {
        owner: 'test-owner',
        repo: 'test-repo',
      },
      configurable: true,
    });

    const config: Tests_Lib_Utility_GetInactiveThreads_IncludesLabelExclusionsInSearchQuery_Config = {
      githubToken: 'ghp_test123',
      issueComment: 'Locking issue.',
      issueInactiveDays: 30,
      issueLockReason: 'resolved' as const,
      prComment: 'Locking PR.',
      prInactiveDays: 30,
      prLockReason: 'resolved' as const,
      excludeLabels: [
        'bug',
        'wontfix',
      ],
      logOutput: true,
      dryRun: false,
    };

    await getInactiveThreads(config, 'issue');

    expect(mockSearchFn).toHaveBeenCalledWith(expect.objectContaining({
      q: expect.stringContaining('-label:"bug"'),
    }));

    expect(mockSearchFn).toHaveBeenCalledWith(expect.objectContaining({
      q: expect.stringContaining('-label:"wontfix"'),
    }));

    return;
  });

  it('stops pagination when fewer than 100 items', async () => {
    const mockSearchFn: Tests_Lib_Utility_GetInactiveThreads_StopsPaginationWhenFewerThan100Items_MockSearchFn = vi.fn().mockResolvedValue({
      data: {
        items: Array.from({ length: 50 }, (_item, i) => ({
          number: i + 1,
          title: `Thread ${i + 1}`,
          updated_at: '2024-01-01T00:00:00Z',
        })),
      },
    });
    const mockOctokit: Tests_Lib_Utility_GetInactiveThreads_StopsPaginationWhenFewerThan100Items_MockOctokit = { rest: { search: { issuesAndPullRequests: mockSearchFn } } };

    // @ts-expect-error Partial mock structure.
    vi.spyOn(github, 'getOctokit').mockReturnValue(mockOctokit);

    Object.defineProperty(github.context, 'repo', {
      value: {
        owner: 'test-owner',
        repo: 'test-repo',
      },
      configurable: true,
    });

    const config: Tests_Lib_Utility_GetInactiveThreads_StopsPaginationWhenFewerThan100Items_Config = {
      githubToken: 'ghp_test123',
      issueComment: 'Locking issue.',
      issueInactiveDays: 30,
      issueLockReason: 'resolved' as const,
      prComment: 'Locking PR.',
      prInactiveDays: 30,
      prLockReason: 'resolved' as const,
      excludeLabels: [],
      logOutput: true,
      dryRun: false,
    };

    await getInactiveThreads(config, 'issue');

    expect(mockSearchFn).toHaveBeenCalledTimes(1);

    return;
  });

  it('returns mapped thread objects', async () => {
    const mockSearchFn: Tests_Lib_Utility_GetInactiveThreads_ReturnsMappedThreadObjects_MockSearchFn = vi.fn().mockResolvedValue({
      data: {
        items: [
          {
            number: 42,
            title: 'Test issue',
            updated_at: '2024-01-15T10:30:00Z',
          },
          {
            number: 99,
            title: 'Another issue',
            updated_at: '2024-02-20T14:00:00Z',
          },
        ],
      },
    });
    const mockOctokit: Tests_Lib_Utility_GetInactiveThreads_ReturnsMappedThreadObjects_MockOctokit = { rest: { search: { issuesAndPullRequests: mockSearchFn } } };

    // @ts-expect-error Partial mock structure.
    vi.spyOn(github, 'getOctokit').mockReturnValue(mockOctokit);

    Object.defineProperty(github.context, 'repo', {
      value: {
        owner: 'test-owner',
        repo: 'test-repo',
      },
      configurable: true,
    });

    const config: Tests_Lib_Utility_GetInactiveThreads_ReturnsMappedThreadObjects_Config = {
      githubToken: 'ghp_test123',
      issueComment: 'Locking issue.',
      issueInactiveDays: 30,
      issueLockReason: 'resolved' as const,
      prComment: 'Locking PR.',
      prInactiveDays: 30,
      prLockReason: 'resolved' as const,
      excludeLabels: [],
      logOutput: true,
      dryRun: false,
    };

    const result: Tests_Lib_Utility_GetInactiveThreads_ReturnsMappedThreadObjects_Result = await getInactiveThreads(config, 'issue');

    expect(result).toStrictEqual([
      {
        type: 'issue',
        number: 42,
        title: 'Test issue',
        updatedAt: '2024-01-15T10:30:00Z',
      },
      {
        type: 'issue',
        number: 99,
        title: 'Another issue',
        updatedAt: '2024-02-20T14:00:00Z',
      },
    ]);

    return;
  });

  it('skips issues returned by pull request search', async () => {
    const mockSearchFn: Tests_Lib_Utility_GetInactiveThreads_SkipsIssuesReturnedByPullRequestSearch_MockSearchFn = vi.fn().mockResolvedValue({
      data: {
        items: [
          {
            number: 153,
            title: 'Node 24 Support?',
            updated_at: '2026-08-01T00:00:00Z',
          },
          {
            number: 155,
            title: 'Update dependencies',
            updated_at: '2026-08-02T00:00:00Z',
            pull_request: {},
          },
        ],
      },
    });
    const mockOctokit: Tests_Lib_Utility_GetInactiveThreads_SkipsIssuesReturnedByPullRequestSearch_MockOctokit = { rest: { search: { issuesAndPullRequests: mockSearchFn } } };

    // @ts-expect-error Partial mock structure.
    vi.spyOn(github, 'getOctokit').mockReturnValue(mockOctokit);

    vi.spyOn(core, 'warning').mockImplementation(() => undefined);

    Object.defineProperty(github.context, 'repo', {
      value: {
        owner: 'test-owner',
        repo: 'test-repo',
      },
      configurable: true,
    });

    const config: Tests_Lib_Utility_GetInactiveThreads_SkipsIssuesReturnedByPullRequestSearch_Config = {
      githubToken: 'ghp_test123',
      issueComment: 'Locking issue.',
      issueInactiveDays: 30,
      issueLockReason: 'resolved' as const,
      prComment: 'Locking PR.',
      prInactiveDays: 30,
      prLockReason: 'resolved' as const,
      excludeLabels: [],
      logOutput: true,
      dryRun: false,
    };

    const result: Tests_Lib_Utility_GetInactiveThreads_SkipsIssuesReturnedByPullRequestSearch_Result = await getInactiveThreads(config, 'pull-request');

    expect(result).toStrictEqual([{
      type: 'pull-request',
      number: 155,
      title: 'Update dependencies',
      updatedAt: '2026-08-02T00:00:00Z',
    }]);

    expect(core.warning).toHaveBeenCalledWith('Skipping issue #153 returned by the pull-request search.');

    return;
  });

  it('skips pull requests returned by issue search', async () => {
    const mockSearchFn: Tests_Lib_Utility_GetInactiveThreads_SkipsPullRequestsReturnedByIssueSearch_MockSearchFn = vi.fn().mockResolvedValue({
      data: {
        items: [
          {
            number: 155,
            title: 'Update dependencies',
            updated_at: '2026-08-02T00:00:00Z',
            pull_request: {},
          },
          {
            number: 153,
            title: 'Node 24 Support?',
            updated_at: '2026-08-01T00:00:00Z',
          },
        ],
      },
    });
    const mockOctokit: Tests_Lib_Utility_GetInactiveThreads_SkipsPullRequestsReturnedByIssueSearch_MockOctokit = { rest: { search: { issuesAndPullRequests: mockSearchFn } } };

    // @ts-expect-error Partial mock structure.
    vi.spyOn(github, 'getOctokit').mockReturnValue(mockOctokit);

    vi.spyOn(core, 'warning').mockImplementation(() => undefined);

    Object.defineProperty(github.context, 'repo', {
      value: {
        owner: 'test-owner',
        repo: 'test-repo',
      },
      configurable: true,
    });

    const config: Tests_Lib_Utility_GetInactiveThreads_SkipsPullRequestsReturnedByIssueSearch_Config = {
      githubToken: 'ghp_test123',
      issueComment: 'Locking issue.',
      issueInactiveDays: 30,
      issueLockReason: 'resolved' as const,
      prComment: 'Locking PR.',
      prInactiveDays: 30,
      prLockReason: 'resolved' as const,
      excludeLabels: [],
      logOutput: true,
      dryRun: false,
    };

    const result: Tests_Lib_Utility_GetInactiveThreads_SkipsPullRequestsReturnedByIssueSearch_Result = await getInactiveThreads(config, 'issue');

    expect(result).toStrictEqual([{
      type: 'issue',
      number: 153,
      title: 'Node 24 Support?',
      updatedAt: '2026-08-01T00:00:00Z',
    }]);

    expect(core.warning).toHaveBeenCalledWith('Skipping pull-request #155 returned by the issue search.');

    return;
  });

  it('accumulates items across multiple pages', async () => {
    const mockSearchFn: Tests_Lib_Utility_GetInactiveThreads_AccumulatesItemsAcrossMultiplePages_MockSearchFn = vi.fn()
      .mockResolvedValueOnce({
        data: {
          items: Array.from({ length: 100 }, (_item, i) => ({
            number: i + 1,
            title: `Thread ${i + 1}`,
            updated_at: '2024-01-01T00:00:00Z',
          })),
        },
      })
      .mockResolvedValueOnce({
        data: {
          items: Array.from({ length: 25 }, (_item, i) => ({
            number: i + 101,
            title: `Thread ${i + 101}`,
            updated_at: '2024-01-01T00:00:00Z',
          })),
        },
      });
    const mockOctokit: Tests_Lib_Utility_GetInactiveThreads_AccumulatesItemsAcrossMultiplePages_MockOctokit = { rest: { search: { issuesAndPullRequests: mockSearchFn } } };

    // @ts-expect-error Partial mock structure.
    vi.spyOn(github, 'getOctokit').mockReturnValue(mockOctokit);

    Object.defineProperty(github.context, 'repo', {
      value: {
        owner: 'test-owner',
        repo: 'test-repo',
      },
      configurable: true,
    });

    const config: Tests_Lib_Utility_GetInactiveThreads_AccumulatesItemsAcrossMultiplePages_Config = {
      githubToken: 'ghp_test123',
      issueComment: 'Locking issue.',
      issueInactiveDays: 30,
      issueLockReason: 'resolved' as const,
      prComment: 'Locking PR.',
      prInactiveDays: 30,
      prLockReason: 'resolved' as const,
      excludeLabels: [],
      logOutput: true,
      dryRun: false,
    };

    const result: Tests_Lib_Utility_GetInactiveThreads_AccumulatesItemsAcrossMultiplePages_Result = await getInactiveThreads(config, 'issue');

    expect(mockSearchFn).toHaveBeenCalledTimes(2);

    expect(mockSearchFn).toHaveBeenCalledWith(expect.objectContaining({ page: 1 }));

    expect(mockSearchFn).toHaveBeenCalledWith(expect.objectContaining({ page: 2 }));

    expect(result).toHaveLength(125);

    expect(result[0]).toStrictEqual({
      type: 'issue',
      number: 1,
      title: 'Thread 1',
      updatedAt: '2024-01-01T00:00:00Z',
    });

    expect(result[124]).toStrictEqual({
      type: 'issue',
      number: 125,
      title: 'Thread 125',
      updatedAt: '2024-01-01T00:00:00Z',
    });

    return;
  });

  it('stops at page 10 cap', async () => {
    const mockSearchFn: Tests_Lib_Utility_GetInactiveThreads_StopsAtPage10Cap_MockSearchFn = vi.fn().mockResolvedValue({
      data: {
        items: Array.from({ length: 100 }, (_item, i) => ({
          number: i + 1,
          title: `Thread ${i + 1}`,
          updated_at: '2024-01-01T00:00:00Z',
        })),
      },
    });
    const mockOctokit: Tests_Lib_Utility_GetInactiveThreads_StopsAtPage10Cap_MockOctokit = { rest: { search: { issuesAndPullRequests: mockSearchFn } } };

    // @ts-expect-error Partial mock structure.
    vi.spyOn(github, 'getOctokit').mockReturnValue(mockOctokit);

    Object.defineProperty(github.context, 'repo', {
      value: {
        owner: 'test-owner',
        repo: 'test-repo',
      },
      configurable: true,
    });

    const config: Tests_Lib_Utility_GetInactiveThreads_StopsAtPage10Cap_Config = {
      githubToken: 'ghp_test123',
      issueComment: 'Locking issue.',
      issueInactiveDays: 30,
      issueLockReason: 'resolved' as const,
      prComment: 'Locking PR.',
      prInactiveDays: 30,
      prLockReason: 'resolved' as const,
      excludeLabels: [],
      logOutput: true,
      dryRun: false,
    };

    const result: Tests_Lib_Utility_GetInactiveThreads_StopsAtPage10Cap_Result = await getInactiveThreads(config, 'issue');

    expect(mockSearchFn).toHaveBeenCalledTimes(10);

    expect(result).toHaveLength(1000);

    return;
  });

  return;
});
