import type {
  info,
  setFailed,
  setOutput,
  warning,
} from '@actions/core';
import type { MockedFunction } from 'vitest';
import type { z } from 'zod';

import type { configuration } from '../../../lib/schema.js';
import type { addThreadComment, getInactiveThreads, lockThread } from '../../../lib/utility.js';

/**
 * Tests - Lib - Action - Lock Inactive Threads - Dry Run Logs Previews But Skips Mutations.
 *
 * @since 1.0.0
 */
export type Tests_Lib_Action_LockInactiveThreads_DryRunLogsPreviewsButSkipsMutations_Config = z.infer<typeof configuration>;

/**
 * Tests - Lib - Action - Lock Inactive Threads - Dry Run Logs Previews But Skips Mutations.
 *
 * @since 1.0.0
 */
export type Tests_Lib_Action_LockInactiveThreads_DryRunLogsPreviewsButSkipsMutations_MockGetInactiveThreads = MockedFunction<typeof getInactiveThreads>;

/**
 * Tests - Lib - Action - Lock Inactive Threads - Dry Run Logs Previews But Skips Mutations.
 *
 * @since 1.0.0
 */
export type Tests_Lib_Action_LockInactiveThreads_DryRunLogsPreviewsButSkipsMutations_MockAddThreadComment = MockedFunction<typeof addThreadComment>;

/**
 * Tests - Lib - Action - Lock Inactive Threads - Dry Run Logs Previews But Skips Mutations.
 *
 * @since 1.0.0
 */
export type Tests_Lib_Action_LockInactiveThreads_DryRunLogsPreviewsButSkipsMutations_MockLockThread = MockedFunction<typeof lockThread>;

/**
 * Tests - Lib - Action - Lock Inactive Threads - Dry Run Logs Previews But Skips Mutations.
 *
 * @since 1.0.0
 */
export type Tests_Lib_Action_LockInactiveThreads_DryRunLogsPreviewsButSkipsMutations_MockSetOutput = MockedFunction<typeof setOutput>;

/**
 * Tests - Lib - Action - Lock Inactive Threads - Log Output False Suppresses Info Calls But Still Locks.
 *
 * @since 1.0.0
 */
export type Tests_Lib_Action_LockInactiveThreads_LogOutputFalseSuppressesInfoCallsButStillLocks_Config = z.infer<typeof configuration>;

/**
 * Tests - Lib - Action - Lock Inactive Threads - Log Output False Suppresses Info Calls But Still Locks.
 *
 * @since 1.0.0
 */
export type Tests_Lib_Action_LockInactiveThreads_LogOutputFalseSuppressesInfoCallsButStillLocks_MockGetInactiveThreads = MockedFunction<typeof getInactiveThreads>;

/**
 * Tests - Lib - Action - Lock Inactive Threads - Log Output False Suppresses Info Calls But Still Locks.
 *
 * @since 1.0.0
 */
export type Tests_Lib_Action_LockInactiveThreads_LogOutputFalseSuppressesInfoCallsButStillLocks_MockInfo = MockedFunction<typeof info>;

/**
 * Tests - Lib - Action - Lock Inactive Threads - Log Output False Suppresses Info Calls But Still Locks.
 *
 * @since 1.0.0
 */
export type Tests_Lib_Action_LockInactiveThreads_LogOutputFalseSuppressesInfoCallsButStillLocks_MockLockThread = MockedFunction<typeof lockThread>;

/**
 * Tests - Lib - Action - Lock Inactive Threads - Partial Failure Continues And Reports Failed Count.
 *
 * @since 1.0.0
 */
export type Tests_Lib_Action_LockInactiveThreads_PartialFailureContinuesAndReportsFailedCount_Config = z.infer<typeof configuration>;

/**
 * Tests - Lib - Action - Lock Inactive Threads - Partial Failure Continues And Reports Failed Count.
 *
 * @since 1.0.0
 */
export type Tests_Lib_Action_LockInactiveThreads_PartialFailureContinuesAndReportsFailedCount_MockGetInactiveThreads = MockedFunction<typeof getInactiveThreads>;

/**
 * Tests - Lib - Action - Lock Inactive Threads - Partial Failure Continues And Reports Failed Count.
 *
 * @since 1.0.0
 */
export type Tests_Lib_Action_LockInactiveThreads_PartialFailureContinuesAndReportsFailedCount_MockAddThreadComment = MockedFunction<typeof addThreadComment>;

/**
 * Tests - Lib - Action - Lock Inactive Threads - Partial Failure Continues And Reports Failed Count.
 *
 * @since 1.0.0
 */
export type Tests_Lib_Action_LockInactiveThreads_PartialFailureContinuesAndReportsFailedCount_MockWarning = MockedFunction<typeof warning>;

/**
 * Tests - Lib - Action - Lock Inactive Threads - Partial Failure Continues And Reports Failed Count.
 *
 * @since 1.0.0
 */
export type Tests_Lib_Action_LockInactiveThreads_PartialFailureContinuesAndReportsFailedCount_MockSetFailed = MockedFunction<typeof setFailed>;

/**
 * Tests - Lib - Action - Lock Inactive Threads - Partial Failure Continues And Reports Failed Count.
 *
 * @since 1.0.0
 */
export type Tests_Lib_Action_LockInactiveThreads_PartialFailureContinuesAndReportsFailedCount_MockSetOutput = MockedFunction<typeof setOutput>;

/**
 * Tests - Lib - Action - Lock Inactive Threads - Real Mode Comments And Locks Each Thread.
 *
 * @since 1.0.0
 */
export type Tests_Lib_Action_LockInactiveThreads_RealModeCommentsAndLocksEachThread_Config = z.infer<typeof configuration>;

/**
 * Tests - Lib - Action - Lock Inactive Threads - Real Mode Comments And Locks Each Thread.
 *
 * @since 1.0.0
 */
export type Tests_Lib_Action_LockInactiveThreads_RealModeCommentsAndLocksEachThread_MockGetInactiveThreads = MockedFunction<typeof getInactiveThreads>;

/**
 * Tests - Lib - Action - Lock Inactive Threads - Real Mode Comments And Locks Each Thread.
 *
 * @since 1.0.0
 */
export type Tests_Lib_Action_LockInactiveThreads_RealModeCommentsAndLocksEachThread_MockAddThreadComment = MockedFunction<typeof addThreadComment>;

/**
 * Tests - Lib - Action - Lock Inactive Threads - Real Mode Comments And Locks Each Thread.
 *
 * @since 1.0.0
 */
export type Tests_Lib_Action_LockInactiveThreads_RealModeCommentsAndLocksEachThread_MockLockThread = MockedFunction<typeof lockThread>;

/**
 * Tests - Lib - Action - Lock Inactive Threads - Skips Duplicate Thread Numbers Across Searches.
 *
 * @since 1.0.8
 */
export type Tests_Lib_Action_LockInactiveThreads_SkipsDuplicateThreadNumbersAcrossSearches_Config = z.infer<typeof configuration>;

/**
 * Tests - Lib - Action - Lock Inactive Threads - Skips Duplicate Thread Numbers Across Searches.
 *
 * @since 1.0.8
 */
export type Tests_Lib_Action_LockInactiveThreads_SkipsDuplicateThreadNumbersAcrossSearches_MockGetInactiveThreads = MockedFunction<typeof getInactiveThreads>;

/**
 * Tests - Lib - Action - Lock Inactive Threads - Skips Duplicate Thread Numbers Across Searches.
 *
 * @since 1.0.8
 */
export type Tests_Lib_Action_LockInactiveThreads_SkipsDuplicateThreadNumbersAcrossSearches_MockAddThreadComment = MockedFunction<typeof addThreadComment>;

/**
 * Tests - Lib - Action - Lock Inactive Threads - Skips Duplicate Thread Numbers Across Searches.
 *
 * @since 1.0.8
 */
export type Tests_Lib_Action_LockInactiveThreads_SkipsDuplicateThreadNumbersAcrossSearches_MockLockThread = MockedFunction<typeof lockThread>;

/**
 * Tests - Lib - Action - Lock Inactive Threads - Skips Duplicate Thread Numbers Across Searches.
 *
 * @since 1.0.8
 */
export type Tests_Lib_Action_LockInactiveThreads_SkipsDuplicateThreadNumbersAcrossSearches_MockWarning = MockedFunction<typeof warning>;

/**
 * Tests - Lib - Action - Lock Inactive Threads - Zero Inactive Threads Sets Output Without Locking.
 *
 * @since 1.0.0
 */
export type Tests_Lib_Action_LockInactiveThreads_ZeroInactiveThreadsSetsOutputWithoutLocking_Config = z.infer<typeof configuration>;

/**
 * Tests - Lib - Action - Lock Inactive Threads - Zero Inactive Threads Sets Output Without Locking.
 *
 * @since 1.0.0
 */
export type Tests_Lib_Action_LockInactiveThreads_ZeroInactiveThreadsSetsOutputWithoutLocking_MockGetInactiveThreads = MockedFunction<typeof getInactiveThreads>;

/**
 * Tests - Lib - Action - Lock Inactive Threads - Zero Inactive Threads Sets Output Without Locking.
 *
 * @since 1.0.0
 */
export type Tests_Lib_Action_LockInactiveThreads_ZeroInactiveThreadsSetsOutputWithoutLocking_MockAddThreadComment = MockedFunction<typeof addThreadComment>;

/**
 * Tests - Lib - Action - Lock Inactive Threads - Zero Inactive Threads Sets Output Without Locking.
 *
 * @since 1.0.0
 */
export type Tests_Lib_Action_LockInactiveThreads_ZeroInactiveThreadsSetsOutputWithoutLocking_MockLockThread = MockedFunction<typeof lockThread>;

/**
 * Tests - Lib - Action - Lock Inactive Threads - Zero Inactive Threads Sets Output Without Locking.
 *
 * @since 1.0.0
 */
export type Tests_Lib_Action_LockInactiveThreads_ZeroInactiveThreadsSetsOutputWithoutLocking_MockSetOutput = MockedFunction<typeof setOutput>;
