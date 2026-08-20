import type { z } from 'zod';

import type { configuration } from '../../../lib/schema.js';

/**
 * Tests - Lib - Schema - Configuration - Accepts All Valid Lock Reasons.
 *
 * @since 1.0.0
 */
export type Tests_Lib_Schema_Configuration_AcceptsAllValidLockReasons_Result = z.infer<typeof configuration>;

/**
 * Tests - Lib - Schema - Configuration - Accepts Valid Full Config.
 *
 * @since 1.0.0
 */
export type Tests_Lib_Schema_Configuration_AcceptsValidFullConfig_Result = z.infer<typeof configuration>;

/**
 * Tests - Lib - Schema - Configuration - Applies Default Issue Comment When Empty String.
 *
 * @since 1.0.0
 */
export type Tests_Lib_Schema_Configuration_AppliesDefaultIssueCommentWhenEmptyString_Result = z.infer<typeof configuration>;

/**
 * Tests - Lib - Schema - Configuration - Applies Default Pr Comment When Empty String.
 *
 * @since 1.0.0
 */
export type Tests_Lib_Schema_Configuration_AppliesDefaultPrCommentWhenEmptyString_Result = z.infer<typeof configuration>;

/**
 * Tests - Lib - Schema - Configuration - Applies Defaults When Fields Omitted.
 *
 * @since 1.0.1
 */
export type Tests_Lib_Schema_Configuration_AppliesDefaultsWhenFieldsOmitted_Result = z.infer<typeof configuration>;

/**
 * Tests - Lib - Schema - Configuration - Coerces Inactive Days From String To Number.
 *
 * @since 1.0.0
 */
export type Tests_Lib_Schema_Configuration_CoercesInactiveDaysFromStringToNumber_Result = z.infer<typeof configuration>;

/**
 * Tests - Lib - Schema - Configuration - Filters Empty Labels From Consecutive Commas.
 *
 * @since 1.0.1
 */
export type Tests_Lib_Schema_Configuration_FiltersEmptyLabelsFromConsecutiveCommas_Result = z.infer<typeof configuration>;

/**
 * Tests - Lib - Schema - Configuration - Handles Single Exclude Label.
 *
 * @since 1.0.0
 */
export type Tests_Lib_Schema_Configuration_HandlesSingleExcludeLabel_Result = z.infer<typeof configuration>;

/**
 * Tests - Lib - Schema - Configuration - Rejects Empty Github Token.
 *
 * @since 1.0.0
 */
export type Tests_Lib_Schema_Configuration_RejectsEmptyGithubToken_Input = Record<string, unknown>;

/**
 * Tests - Lib - Schema - Configuration - Rejects Invalid Dry Run Value.
 *
 * @since 1.0.0
 */
export type Tests_Lib_Schema_Configuration_RejectsInvalidDryRunValue_Input = Record<string, unknown>;

/**
 * Tests - Lib - Schema - Configuration - Rejects Invalid Issue Lock Reason.
 *
 * @since 1.0.0
 */
export type Tests_Lib_Schema_Configuration_RejectsInvalidIssueLockReason_Input = Record<string, unknown>;

/**
 * Tests - Lib - Schema - Configuration - Rejects Invalid Log Output Value.
 *
 * @since 1.0.0
 */
export type Tests_Lib_Schema_Configuration_RejectsInvalidLogOutputValue_Input = Record<string, unknown>;

/**
 * Tests - Lib - Schema - Configuration - Rejects Invalid Pr Lock Reason.
 *
 * @since 1.0.0
 */
export type Tests_Lib_Schema_Configuration_RejectsInvalidPrLockReason_Input = Record<string, unknown>;

/**
 * Tests - Lib - Schema - Configuration - Rejects Missing Github Token.
 *
 * @since 1.0.0
 */
export type Tests_Lib_Schema_Configuration_RejectsMissingGithubToken_Input = Record<string, unknown>;

/**
 * Tests - Lib - Schema - Configuration - Rejects Negative Issue Inactive Days.
 *
 * @since 1.0.0
 */
export type Tests_Lib_Schema_Configuration_RejectsNegativeIssueInactiveDays_Input = Record<string, unknown>;

/**
 * Tests - Lib - Schema - Configuration - Rejects Negative Pr Inactive Days.
 *
 * @since 1.0.0
 */
export type Tests_Lib_Schema_Configuration_RejectsNegativePrInactiveDays_Input = Record<string, unknown>;

/**
 * Tests - Lib - Schema - Configuration - Rejects Non Object Value.
 *
 * @since 1.0.0
 */
export type Tests_Lib_Schema_Configuration_RejectsNonObjectValue_Input = string;

/**
 * Tests - Lib - Schema - Configuration - Rejects Null.
 *
 * @since 1.0.0
 */
export type Tests_Lib_Schema_Configuration_RejectsNull_Input = null;

/**
 * Tests - Lib - Schema - Configuration - Rejects Zero Issue Inactive Days.
 *
 * @since 1.0.0
 */
export type Tests_Lib_Schema_Configuration_RejectsZeroIssueInactiveDays_Input = Record<string, unknown>;

/**
 * Tests - Lib - Schema - Configuration - Rejects Zero Pr Inactive Days.
 *
 * @since 1.0.0
 */
export type Tests_Lib_Schema_Configuration_RejectsZeroPrInactiveDays_Input = Record<string, unknown>;

/**
 * Tests - Lib - Schema - Configuration - Transforms Dry Run False.
 *
 * @since 1.0.0
 */
export type Tests_Lib_Schema_Configuration_TransformsDryRunFalse_Result = z.infer<typeof configuration>;

/**
 * Tests - Lib - Schema - Configuration - Transforms Dry Run True.
 *
 * @since 1.0.0
 */
export type Tests_Lib_Schema_Configuration_TransformsDryRunTrue_Result = z.infer<typeof configuration>;

/**
 * Tests - Lib - Schema - Configuration - Transforms Empty Exclude Labels Into Empty Array.
 *
 * @since 1.0.0
 */
export type Tests_Lib_Schema_Configuration_TransformsEmptyExcludeLabelsIntoEmptyArray_Result = z.infer<typeof configuration>;

/**
 * Tests - Lib - Schema - Configuration - Transforms Exclude Labels Into Trimmed Array.
 *
 * @since 1.0.0
 */
export type Tests_Lib_Schema_Configuration_TransformsExcludeLabelsIntoTrimmedArray_Result = z.infer<typeof configuration>;

/**
 * Tests - Lib - Schema - Configuration - Transforms Log Output False.
 *
 * @since 1.0.0
 */
export type Tests_Lib_Schema_Configuration_TransformsLogOutputFalse_Result = z.infer<typeof configuration>;

/**
 * Tests - Lib - Schema - Configuration - Transforms Log Output True.
 *
 * @since 1.0.0
 */
export type Tests_Lib_Schema_Configuration_TransformsLogOutputTrue_Result = z.infer<typeof configuration>;
