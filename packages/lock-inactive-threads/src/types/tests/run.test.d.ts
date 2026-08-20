import type { z } from 'zod';

import type { configuration } from '../../lib/schema.js';

/**
 * Tests - Run - Run Action - Calls Set Failed With Error Message.
 *
 * @since 1.0.0
 */
export type Tests_Run_RunAction_CallsSetFailedWithErrorMessage_Config = z.infer<typeof configuration>;

export type Tests_Run_RunAction_CallsSetFailedWithErrorMessage_Context = Record<string, unknown>;

/**
 * Tests - Run - Run Action - Calls Set Failed With Stringified Non Error Throw.
 *
 * @since 1.0.0
 */
export type Tests_Run_RunAction_CallsSetFailedWithStringifiedNonErrorThrow_Config = z.infer<typeof configuration>;

export type Tests_Run_RunAction_CallsSetFailedWithStringifiedNonErrorThrow_Context = Record<string, unknown>;

/**
 * Tests - Run - Run Action - Successful Run Does Not Report Failure.
 *
 * @since 1.0.0
 */
export type Tests_Run_RunAction_SuccessfulRunDoesNotReportFailure_Config = z.infer<typeof configuration>;

export type Tests_Run_RunAction_SuccessfulRunDoesNotReportFailure_Context = Record<string, unknown>;
