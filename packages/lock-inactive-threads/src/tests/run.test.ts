import * as core from '@actions/core';
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from 'vitest';

import { lockInactiveThreads } from '../lib/action.js';
import {
  getConfig,
  getContext,
} from '../lib/utility.js';
import { runAction } from '../run.js';

import type {
  Tests_Run_RunAction_CallsSetFailedWithErrorMessage_Config,
  Tests_Run_RunAction_CallsSetFailedWithErrorMessage_Context,
  Tests_Run_RunAction_CallsSetFailedWithStringifiedNonErrorThrow_Config,
  Tests_Run_RunAction_CallsSetFailedWithStringifiedNonErrorThrow_Context,
  Tests_Run_RunAction_SuccessfulRunDoesNotReportFailure_Config,
  Tests_Run_RunAction_SuccessfulRunDoesNotReportFailure_Context,
} from '../types/tests/run.test.d.ts';

vi.mock('@actions/core');
vi.mock('../lib/action.js');
vi.mock('../lib/utility.js');

/**
 * Tests - Run - Action.
 *
 * @since 1.0.0
 */
describe('runAction', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    vi.mocked(lockInactiveThreads).mockResolvedValue(undefined);

    return;
  });

  afterEach(() => {
    vi.restoreAllMocks();

    return;
  });

  it('calls setFailed with Error message', async () => {
    const config: Tests_Run_RunAction_CallsSetFailedWithErrorMessage_Config = {
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
    const context: Tests_Run_RunAction_CallsSetFailedWithErrorMessage_Context = {
      repo: {
        owner: 'test-owner',
        repo: 'test-repo',
      },
    };

    vi.mocked(getConfig).mockReturnValue(config);

    // @ts-expect-error Partial mock context.
    vi.mocked(getContext).mockReturnValue(context);

    vi.mocked(lockInactiveThreads).mockRejectedValue(new Error('API rate limit'));

    await runAction();

    expect(core.setFailed).toHaveBeenCalledWith('API rate limit');

    expect(core.setOutput).toHaveBeenCalledWith('result', false);

    return;
  });

  it('calls setFailed with stringified non-Error throw', async () => {
    const config: Tests_Run_RunAction_CallsSetFailedWithStringifiedNonErrorThrow_Config = {
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
    const context: Tests_Run_RunAction_CallsSetFailedWithStringifiedNonErrorThrow_Context = {
      repo: {
        owner: 'test-owner',
        repo: 'test-repo',
      },
    };

    vi.mocked(getConfig).mockReturnValue(config);

    // @ts-expect-error Partial mock context.
    vi.mocked(getContext).mockReturnValue(context);

    vi.mocked(lockInactiveThreads).mockRejectedValue('unexpected');

    await runAction();

    expect(core.setFailed).toHaveBeenCalledWith('unexpected');

    expect(core.setOutput).toHaveBeenCalledWith('result', false);

    return;
  });

  it('successful run does not report failure', async () => {
    const config: Tests_Run_RunAction_SuccessfulRunDoesNotReportFailure_Config = {
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
    const context: Tests_Run_RunAction_SuccessfulRunDoesNotReportFailure_Context = {
      repo: {
        owner: 'test-owner',
        repo: 'test-repo',
      },
    };

    vi.mocked(getConfig).mockReturnValue(config);

    // @ts-expect-error Partial mock context.
    vi.mocked(getContext).mockReturnValue(context);

    await runAction();

    expect(core.setFailed).not.toHaveBeenCalled();

    expect(core.setSecret).toHaveBeenCalledWith('ghp_test123');

    expect(vi.mocked(lockInactiveThreads)).toHaveBeenCalledWith(config);

    return;
  });

  return;
});
