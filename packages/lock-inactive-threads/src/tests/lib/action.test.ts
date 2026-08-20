import * as core from '@actions/core';
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from 'vitest';

import { lockInactiveThreads } from '../../lib/action.js';
import {
  addThreadComment,
  getInactiveThreads,
  lockThread,
} from '../../lib/utility.js';

import type {
  Tests_Lib_Action_LockInactiveThreads_DryRunLogsPreviewsButSkipsMutations_Config,
  Tests_Lib_Action_LockInactiveThreads_DryRunLogsPreviewsButSkipsMutations_MockAddThreadComment,
  Tests_Lib_Action_LockInactiveThreads_DryRunLogsPreviewsButSkipsMutations_MockGetInactiveThreads,
  Tests_Lib_Action_LockInactiveThreads_DryRunLogsPreviewsButSkipsMutations_MockLockThread,
  Tests_Lib_Action_LockInactiveThreads_DryRunLogsPreviewsButSkipsMutations_MockSetOutput,
  Tests_Lib_Action_LockInactiveThreads_LogOutputFalseSuppressesInfoCallsButStillLocks_Config,
  Tests_Lib_Action_LockInactiveThreads_LogOutputFalseSuppressesInfoCallsButStillLocks_MockGetInactiveThreads,
  Tests_Lib_Action_LockInactiveThreads_LogOutputFalseSuppressesInfoCallsButStillLocks_MockInfo,
  Tests_Lib_Action_LockInactiveThreads_LogOutputFalseSuppressesInfoCallsButStillLocks_MockLockThread,
  Tests_Lib_Action_LockInactiveThreads_PartialFailureContinuesAndReportsFailedCount_Config,
  Tests_Lib_Action_LockInactiveThreads_PartialFailureContinuesAndReportsFailedCount_MockAddThreadComment,
  Tests_Lib_Action_LockInactiveThreads_PartialFailureContinuesAndReportsFailedCount_MockGetInactiveThreads,
  Tests_Lib_Action_LockInactiveThreads_PartialFailureContinuesAndReportsFailedCount_MockSetFailed,
  Tests_Lib_Action_LockInactiveThreads_PartialFailureContinuesAndReportsFailedCount_MockSetOutput,
  Tests_Lib_Action_LockInactiveThreads_PartialFailureContinuesAndReportsFailedCount_MockWarning,
  Tests_Lib_Action_LockInactiveThreads_RealModeCommentsAndLocksEachThread_Config,
  Tests_Lib_Action_LockInactiveThreads_RealModeCommentsAndLocksEachThread_MockAddThreadComment,
  Tests_Lib_Action_LockInactiveThreads_RealModeCommentsAndLocksEachThread_MockGetInactiveThreads,
  Tests_Lib_Action_LockInactiveThreads_RealModeCommentsAndLocksEachThread_MockLockThread,
  Tests_Lib_Action_LockInactiveThreads_ZeroInactiveThreadsSetsOutputWithoutLocking_Config,
  Tests_Lib_Action_LockInactiveThreads_ZeroInactiveThreadsSetsOutputWithoutLocking_MockAddThreadComment,
  Tests_Lib_Action_LockInactiveThreads_ZeroInactiveThreadsSetsOutputWithoutLocking_MockGetInactiveThreads,
  Tests_Lib_Action_LockInactiveThreads_ZeroInactiveThreadsSetsOutputWithoutLocking_MockLockThread,
  Tests_Lib_Action_LockInactiveThreads_ZeroInactiveThreadsSetsOutputWithoutLocking_MockSetOutput,
} from '../../types/tests/lib/action.test.d.ts';

vi.mock('@actions/core');
vi.mock('../../lib/utility.js');

/**
 * Tests - Lib - Action - Lock Inactive Threads.
 *
 * @since 1.0.0
 */
describe('lockInactiveThreads', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    return;
  });

  afterEach(() => {
    vi.restoreAllMocks();

    return;
  });

  it('dry run logs previews but skips mutations', async () => {
    const config: Tests_Lib_Action_LockInactiveThreads_DryRunLogsPreviewsButSkipsMutations_Config = {
      githubToken: 'ghp_test123',
      issueComment: 'Locking issue.',
      issueInactiveDays: 30,
      issueLockReason: 'resolved' as const,
      prComment: 'Locking PR.',
      prInactiveDays: 30,
      prLockReason: 'resolved' as const,
      excludeLabels: [],
      logOutput: true,
      dryRun: true,
    };
    const mockGetInactiveThreads: Tests_Lib_Action_LockInactiveThreads_DryRunLogsPreviewsButSkipsMutations_MockGetInactiveThreads = vi.mocked(getInactiveThreads);
    const mockAddThreadComment: Tests_Lib_Action_LockInactiveThreads_DryRunLogsPreviewsButSkipsMutations_MockAddThreadComment = vi.mocked(addThreadComment);
    const mockLockThread: Tests_Lib_Action_LockInactiveThreads_DryRunLogsPreviewsButSkipsMutations_MockLockThread = vi.mocked(lockThread);
    const mockSetOutput: Tests_Lib_Action_LockInactiveThreads_DryRunLogsPreviewsButSkipsMutations_MockSetOutput = vi.mocked(core.setOutput);

    mockGetInactiveThreads.mockResolvedValueOnce([{
      type: 'issue',
      number: 1,
      title: 'Bug report',
      updatedAt: '2024-01-01T00:00:00Z',
    }]).mockResolvedValueOnce([{
      type: 'pull-request',
      number: 2,
      title: 'Feature PR',
      updatedAt: '2024-01-01T00:00:00Z',
    }]);

    await lockInactiveThreads(config);

    expect(mockAddThreadComment).not.toHaveBeenCalled();

    expect(mockLockThread).not.toHaveBeenCalled();

    expect(mockSetOutput).toHaveBeenCalledWith('result', true);

    return;
  });

  it('real mode comments and locks each thread', async () => {
    const config: Tests_Lib_Action_LockInactiveThreads_RealModeCommentsAndLocksEachThread_Config = {
      githubToken: 'ghp_test123',
      issueComment: 'Locking issue.',
      issueInactiveDays: 30,
      issueLockReason: 'resolved' as const,
      prComment: 'Locking PR.',
      prInactiveDays: 30,
      prLockReason: 'off-topic' as const,
      excludeLabels: [],
      logOutput: true,
      dryRun: false,
    };
    const mockGetInactiveThreads: Tests_Lib_Action_LockInactiveThreads_RealModeCommentsAndLocksEachThread_MockGetInactiveThreads = vi.mocked(getInactiveThreads);
    const mockAddThreadComment: Tests_Lib_Action_LockInactiveThreads_RealModeCommentsAndLocksEachThread_MockAddThreadComment = vi.mocked(addThreadComment);
    const mockLockThread: Tests_Lib_Action_LockInactiveThreads_RealModeCommentsAndLocksEachThread_MockLockThread = vi.mocked(lockThread);

    mockGetInactiveThreads.mockResolvedValueOnce([
      {
        type: 'issue',
        number: 10,
        title: 'Old issue',
        updatedAt: '2024-01-01T00:00:00Z',
      },
      {
        type: 'issue',
        number: 20,
        title: 'Stale issue',
        updatedAt: '2024-02-01T00:00:00Z',
      },
    ]).mockResolvedValueOnce([{
      type: 'pull-request',
      number: 30,
      title: 'Old PR',
      updatedAt: '2024-01-15T00:00:00Z',
    }]);

    await lockInactiveThreads(config);

    expect(mockAddThreadComment).toHaveBeenCalledTimes(3);

    expect(mockAddThreadComment).toHaveBeenNthCalledWith(1, 10, 'Locking issue.', config);

    expect(mockAddThreadComment).toHaveBeenNthCalledWith(2, 20, 'Locking issue.', config);

    expect(mockAddThreadComment).toHaveBeenNthCalledWith(3, 30, 'Locking PR.', config);

    expect(mockLockThread).toHaveBeenCalledTimes(3);

    expect(mockLockThread).toHaveBeenNthCalledWith(1, 10, 'resolved', config);

    expect(mockLockThread).toHaveBeenNthCalledWith(2, 20, 'resolved', config);

    expect(mockLockThread).toHaveBeenNthCalledWith(3, 30, 'off-topic', config);

    return;
  });

  it('logOutput false suppresses info calls but still locks', async () => {
    const config: Tests_Lib_Action_LockInactiveThreads_LogOutputFalseSuppressesInfoCallsButStillLocks_Config = {
      githubToken: 'ghp_test123',
      issueComment: 'Locking issue.',
      issueInactiveDays: 30,
      issueLockReason: 'resolved' as const,
      prComment: 'Locking PR.',
      prInactiveDays: 30,
      prLockReason: 'resolved' as const,
      excludeLabels: [],
      logOutput: false,
      dryRun: false,
    };
    const mockGetInactiveThreads: Tests_Lib_Action_LockInactiveThreads_LogOutputFalseSuppressesInfoCallsButStillLocks_MockGetInactiveThreads = vi.mocked(getInactiveThreads);
    const mockInfo: Tests_Lib_Action_LockInactiveThreads_LogOutputFalseSuppressesInfoCallsButStillLocks_MockInfo = vi.mocked(core.info);
    const mockLockThread: Tests_Lib_Action_LockInactiveThreads_LogOutputFalseSuppressesInfoCallsButStillLocks_MockLockThread = vi.mocked(lockThread);

    mockGetInactiveThreads.mockResolvedValueOnce([{
      type: 'issue',
      number: 5,
      title: 'Silent issue',
      updatedAt: '2024-01-01T00:00:00Z',
    }]).mockResolvedValueOnce([]);

    await lockInactiveThreads(config);

    expect(mockInfo).not.toHaveBeenCalledWith(expect.stringContaining('Locking issue'));

    expect(mockLockThread).toHaveBeenCalled();

    expect(vi.mocked(addThreadComment)).toHaveBeenCalled();

    return;
  });

  it('zero inactive threads sets output without locking', async () => {
    const config: Tests_Lib_Action_LockInactiveThreads_ZeroInactiveThreadsSetsOutputWithoutLocking_Config = {
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
    const mockGetInactiveThreads: Tests_Lib_Action_LockInactiveThreads_ZeroInactiveThreadsSetsOutputWithoutLocking_MockGetInactiveThreads = vi.mocked(getInactiveThreads);
    const mockAddThreadComment: Tests_Lib_Action_LockInactiveThreads_ZeroInactiveThreadsSetsOutputWithoutLocking_MockAddThreadComment = vi.mocked(addThreadComment);
    const mockLockThread: Tests_Lib_Action_LockInactiveThreads_ZeroInactiveThreadsSetsOutputWithoutLocking_MockLockThread = vi.mocked(lockThread);
    const mockSetOutput: Tests_Lib_Action_LockInactiveThreads_ZeroInactiveThreadsSetsOutputWithoutLocking_MockSetOutput = vi.mocked(core.setOutput);

    mockGetInactiveThreads.mockResolvedValueOnce([]).mockResolvedValueOnce([]);

    await lockInactiveThreads(config);

    expect(mockAddThreadComment).not.toHaveBeenCalled();

    expect(mockLockThread).not.toHaveBeenCalled();

    expect(mockSetOutput).toHaveBeenCalledWith('result', true);

    return;
  });

  it('partial failure continues and reports failed count', async () => {
    const config: Tests_Lib_Action_LockInactiveThreads_PartialFailureContinuesAndReportsFailedCount_Config = {
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
    const mockGetInactiveThreads: Tests_Lib_Action_LockInactiveThreads_PartialFailureContinuesAndReportsFailedCount_MockGetInactiveThreads = vi.mocked(getInactiveThreads);
    const mockAddThreadComment: Tests_Lib_Action_LockInactiveThreads_PartialFailureContinuesAndReportsFailedCount_MockAddThreadComment = vi.mocked(addThreadComment);
    const mockWarning: Tests_Lib_Action_LockInactiveThreads_PartialFailureContinuesAndReportsFailedCount_MockWarning = vi.mocked(core.warning);
    const mockSetFailed: Tests_Lib_Action_LockInactiveThreads_PartialFailureContinuesAndReportsFailedCount_MockSetFailed = vi.mocked(core.setFailed);
    const mockSetOutput: Tests_Lib_Action_LockInactiveThreads_PartialFailureContinuesAndReportsFailedCount_MockSetOutput = vi.mocked(core.setOutput);

    mockGetInactiveThreads.mockResolvedValueOnce([
      {
        type: 'issue',
        number: 10,
        title: 'Succeeds',
        updatedAt: '2024-01-01T00:00:00Z',
      },
      {
        type: 'issue',
        number: 20,
        title: 'Fails',
        updatedAt: '2024-01-01T00:00:00Z',
      },
    ]).mockResolvedValueOnce([]);

    mockAddThreadComment.mockResolvedValueOnce(undefined).mockRejectedValueOnce(new Error('API rate limit'));

    await lockInactiveThreads(config);

    expect(mockWarning).toHaveBeenCalledWith('Failed to lock issue #20: API rate limit');

    expect(mockSetFailed).toHaveBeenCalledWith('Failed to lock 1 of 2 thread(s)');

    expect(mockSetOutput).toHaveBeenCalledWith('result', false);

    return;
  });

  return;
});
