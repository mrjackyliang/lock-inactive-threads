import {
  describe,
  expect,
  it,
} from 'vitest';

import { configuration } from '../../lib/schema.js';

import type {
  Tests_Lib_Schema_Configuration_AcceptsAllValidLockReasons_Result,
  Tests_Lib_Schema_Configuration_AcceptsValidFullConfig_Result,
  Tests_Lib_Schema_Configuration_AppliesDefaultIssueCommentWhenEmptyString_Result,
  Tests_Lib_Schema_Configuration_AppliesDefaultPrCommentWhenEmptyString_Result,
  Tests_Lib_Schema_Configuration_AppliesDefaultsWhenFieldsOmitted_Result,
  Tests_Lib_Schema_Configuration_CoercesInactiveDaysFromStringToNumber_Result,
  Tests_Lib_Schema_Configuration_FiltersEmptyLabelsFromConsecutiveCommas_Result,
  Tests_Lib_Schema_Configuration_HandlesSingleExcludeLabel_Result,
  Tests_Lib_Schema_Configuration_TransformsDryRunFalse_Result,
  Tests_Lib_Schema_Configuration_TransformsDryRunTrue_Result,
  Tests_Lib_Schema_Configuration_TransformsEmptyExcludeLabelsIntoEmptyArray_Result,
  Tests_Lib_Schema_Configuration_TransformsExcludeLabelsIntoTrimmedArray_Result,
  Tests_Lib_Schema_Configuration_TransformsLogOutputFalse_Result,
  Tests_Lib_Schema_Configuration_TransformsLogOutputTrue_Result,
} from '../../types/tests/lib/schema.test.d.ts';

/**
 * Tests - Lib - Schema - Configuration.
 *
 * @since 1.0.0
 */
describe('configuration', () => {
  it('accepts valid full config', () => {
    const result: Tests_Lib_Schema_Configuration_AcceptsValidFullConfig_Result = configuration.parse({
      githubToken: 'ghp_abc123',
      issueComment: 'Locking this issue.',
      issueInactiveDays: '60',
      issueLockReason: 'off-topic',
      prComment: 'Locking this pull request.',
      prInactiveDays: '90',
      prLockReason: 'spam',
      excludeLabels: 'bug,wontfix',
      logOutput: 'true',
      dryRun: 'false',
    });

    expect(result).toStrictEqual({
      githubToken: 'ghp_abc123',
      issueComment: 'Locking this issue.',
      issueInactiveDays: 60,
      issueLockReason: 'off-topic',
      prComment: 'Locking this pull request.',
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

  it('applies default issue comment when empty string', () => {
    const result: Tests_Lib_Schema_Configuration_AppliesDefaultIssueCommentWhenEmptyString_Result = configuration.parse({
      githubToken: 'ghp_abc123',
      issueComment: '',
      issueInactiveDays: '30',
      issueLockReason: 'resolved',
      prComment: 'Custom PR comment.',
      prInactiveDays: '30',
      prLockReason: 'resolved',
      excludeLabels: '',
      logOutput: 'true',
      dryRun: 'false',
    });

    expect(result['issueComment']).toBe('Due to inactivity, this issue will be locked and marked as resolved. If you have any further questions or inquiries, please feel free to open a new issue.');

    return;
  });

  it('applies default pr comment when empty string', () => {
    const result: Tests_Lib_Schema_Configuration_AppliesDefaultPrCommentWhenEmptyString_Result = configuration.parse({
      githubToken: 'ghp_abc123',
      issueComment: 'Custom issue comment.',
      issueInactiveDays: '30',
      issueLockReason: 'resolved',
      prComment: '',
      prInactiveDays: '30',
      prLockReason: 'resolved',
      excludeLabels: '',
      logOutput: 'true',
      dryRun: 'false',
    });

    expect(result['prComment']).toBe('Due to inactivity, this pull request will be locked and marked as resolved. If you have any further questions or inquiries, please feel free to open a new pull request.');

    return;
  });

  it('coerces inactive days from string to number', () => {
    const result: Tests_Lib_Schema_Configuration_CoercesInactiveDaysFromStringToNumber_Result = configuration.parse({
      githubToken: 'ghp_abc123',
      issueComment: '',
      issueInactiveDays: '45',
      issueLockReason: 'resolved',
      prComment: '',
      prInactiveDays: '15',
      prLockReason: 'resolved',
      excludeLabels: '',
      logOutput: 'true',
      dryRun: 'false',
    });

    expect(result['issueInactiveDays']).toBe(45);

    expect(result['prInactiveDays']).toBe(15);

    return;
  });

  it('accepts all valid lock reasons', () => {
    for (const reason of [
      'off-topic',
      'resolved',
      'spam',
      'too heated',
    ]) {
      const result: Tests_Lib_Schema_Configuration_AcceptsAllValidLockReasons_Result = configuration.parse({
        githubToken: 'ghp_abc123',
        issueComment: '',
        issueInactiveDays: '30',
        issueLockReason: reason,
        prComment: '',
        prInactiveDays: '30',
        prLockReason: reason,
        excludeLabels: '',
        logOutput: 'true',
        dryRun: 'false',
      });

      expect(result['issueLockReason']).toBe(reason);

      expect(result['prLockReason']).toBe(reason);
    }

    return;
  });

  it('transforms exclude labels into trimmed array', () => {
    const result: Tests_Lib_Schema_Configuration_TransformsExcludeLabelsIntoTrimmedArray_Result = configuration.parse({
      githubToken: 'ghp_abc123',
      issueComment: '',
      issueInactiveDays: '30',
      issueLockReason: 'resolved',
      prComment: '',
      prInactiveDays: '30',
      prLockReason: 'resolved',
      excludeLabels: ' bug , wontfix , enhancement ',
      logOutput: 'true',
      dryRun: 'false',
    });

    expect(result['excludeLabels']).toStrictEqual([
      'bug',
      'wontfix',
      'enhancement',
    ]);

    return;
  });

  it('transforms empty exclude labels into empty array', () => {
    const result: Tests_Lib_Schema_Configuration_TransformsEmptyExcludeLabelsIntoEmptyArray_Result = configuration.parse({
      githubToken: 'ghp_abc123',
      issueComment: '',
      issueInactiveDays: '30',
      issueLockReason: 'resolved',
      prComment: '',
      prInactiveDays: '30',
      prLockReason: 'resolved',
      excludeLabels: '',
      logOutput: 'true',
      dryRun: 'false',
    });

    expect(result['excludeLabels']).toStrictEqual([]);

    return;
  });

  it('transforms log output true', () => {
    const result: Tests_Lib_Schema_Configuration_TransformsLogOutputTrue_Result = configuration.parse({
      githubToken: 'ghp_abc123',
      issueComment: '',
      issueInactiveDays: '30',
      issueLockReason: 'resolved',
      prComment: '',
      prInactiveDays: '30',
      prLockReason: 'resolved',
      excludeLabels: '',
      logOutput: 'true',
      dryRun: 'false',
    });

    expect(result['logOutput']).toBe(true);

    return;
  });

  it('transforms log output false', () => {
    const result: Tests_Lib_Schema_Configuration_TransformsLogOutputFalse_Result = configuration.parse({
      githubToken: 'ghp_abc123',
      issueComment: '',
      issueInactiveDays: '30',
      issueLockReason: 'resolved',
      prComment: '',
      prInactiveDays: '30',
      prLockReason: 'resolved',
      excludeLabels: '',
      logOutput: 'false',
      dryRun: 'false',
    });

    expect(result['logOutput']).toBe(false);

    return;
  });

  it('transforms dry run true', () => {
    const result: Tests_Lib_Schema_Configuration_TransformsDryRunTrue_Result = configuration.parse({
      githubToken: 'ghp_abc123',
      issueComment: '',
      issueInactiveDays: '30',
      issueLockReason: 'resolved',
      prComment: '',
      prInactiveDays: '30',
      prLockReason: 'resolved',
      excludeLabels: '',
      logOutput: 'true',
      dryRun: 'true',
    });

    expect(result['dryRun']).toBe(true);

    return;
  });

  it('transforms dry run false', () => {
    const result: Tests_Lib_Schema_Configuration_TransformsDryRunFalse_Result = configuration.parse({
      githubToken: 'ghp_abc123',
      issueComment: '',
      issueInactiveDays: '30',
      issueLockReason: 'resolved',
      prComment: '',
      prInactiveDays: '30',
      prLockReason: 'resolved',
      excludeLabels: '',
      logOutput: 'true',
      dryRun: 'false',
    });

    expect(result['dryRun']).toBe(false);

    return;
  });

  it('rejects empty github token', () => {
    expect(() => configuration.parse({
      githubToken: '',
      issueComment: '',
      issueInactiveDays: '30',
      issueLockReason: 'resolved',
      prComment: '',
      prInactiveDays: '30',
      prLockReason: 'resolved',
      excludeLabels: '',
      logOutput: 'true',
      dryRun: 'false',
    })).toThrow();

    return;
  });

  it('rejects missing github token', () => {
    expect(() => configuration.parse({
      issueComment: '',
      issueInactiveDays: '30',
      issueLockReason: 'resolved',
      prComment: '',
      prInactiveDays: '30',
      prLockReason: 'resolved',
      excludeLabels: '',
      logOutput: 'true',
      dryRun: 'false',
    })).toThrow();

    return;
  });

  it('rejects invalid issue lock reason', () => {
    expect(() => configuration.parse({
      githubToken: 'ghp_abc123',
      issueComment: '',
      issueInactiveDays: '30',
      issueLockReason: 'invalid-reason',
      prComment: '',
      prInactiveDays: '30',
      prLockReason: 'resolved',
      excludeLabels: '',
      logOutput: 'true',
      dryRun: 'false',
    })).toThrow();

    return;
  });

  it('rejects invalid pr lock reason', () => {
    expect(() => configuration.parse({
      githubToken: 'ghp_abc123',
      issueComment: '',
      issueInactiveDays: '30',
      issueLockReason: 'resolved',
      prComment: '',
      prInactiveDays: '30',
      prLockReason: 'invalid-reason',
      excludeLabels: '',
      logOutput: 'true',
      dryRun: 'false',
    })).toThrow();

    return;
  });

  it('rejects invalid log output value', () => {
    expect(() => configuration.parse({
      githubToken: 'ghp_abc123',
      issueComment: '',
      issueInactiveDays: '30',
      issueLockReason: 'resolved',
      prComment: '',
      prInactiveDays: '30',
      prLockReason: 'resolved',
      excludeLabels: '',
      logOutput: 'yes',
      dryRun: 'false',
    })).toThrow();

    return;
  });

  it('rejects invalid dry run value', () => {
    expect(() => configuration.parse({
      githubToken: 'ghp_abc123',
      issueComment: '',
      issueInactiveDays: '30',
      issueLockReason: 'resolved',
      prComment: '',
      prInactiveDays: '30',
      prLockReason: 'resolved',
      excludeLabels: '',
      logOutput: 'true',
      dryRun: 'yes',
    })).toThrow();

    return;
  });

  it('rejects null', () => {
    expect(() => configuration.parse(null)).toThrow();

    return;
  });

  it('rejects non-object value', () => {
    expect(() => configuration.parse('invalid')).toThrow();

    return;
  });

  it('rejects zero issue inactive days', () => {
    expect(() => configuration.parse({
      githubToken: 'ghp_abc123',
      issueComment: '',
      issueInactiveDays: '0',
      issueLockReason: 'resolved',
      prComment: '',
      prInactiveDays: '30',
      prLockReason: 'resolved',
      excludeLabels: '',
      logOutput: 'true',
      dryRun: 'false',
    })).toThrow();

    return;
  });

  it('rejects negative issue inactive days', () => {
    expect(() => configuration.parse({
      githubToken: 'ghp_abc123',
      issueComment: '',
      issueInactiveDays: '-5',
      issueLockReason: 'resolved',
      prComment: '',
      prInactiveDays: '30',
      prLockReason: 'resolved',
      excludeLabels: '',
      logOutput: 'true',
      dryRun: 'false',
    })).toThrow();

    return;
  });

  it('rejects zero pr inactive days', () => {
    expect(() => configuration.parse({
      githubToken: 'ghp_abc123',
      issueComment: '',
      issueInactiveDays: '30',
      issueLockReason: 'resolved',
      prComment: '',
      prInactiveDays: '0',
      prLockReason: 'resolved',
      excludeLabels: '',
      logOutput: 'true',
      dryRun: 'false',
    })).toThrow();

    return;
  });

  it('rejects negative pr inactive days', () => {
    expect(() => configuration.parse({
      githubToken: 'ghp_abc123',
      issueComment: '',
      issueInactiveDays: '30',
      issueLockReason: 'resolved',
      prComment: '',
      prInactiveDays: '-10',
      prLockReason: 'resolved',
      excludeLabels: '',
      logOutput: 'true',
      dryRun: 'false',
    })).toThrow();

    return;
  });

  it('handles single exclude label', () => {
    const result: Tests_Lib_Schema_Configuration_HandlesSingleExcludeLabel_Result = configuration.parse({
      githubToken: 'ghp_abc123',
      issueComment: '',
      issueInactiveDays: '30',
      issueLockReason: 'resolved',
      prComment: '',
      prInactiveDays: '30',
      prLockReason: 'resolved',
      excludeLabels: 'do-not-lock',
      logOutput: 'true',
      dryRun: 'false',
    });

    expect(result['excludeLabels']).toStrictEqual(['do-not-lock']);

    return;
  });

  it('applies defaults when fields omitted', () => {
    const result: Tests_Lib_Schema_Configuration_AppliesDefaultsWhenFieldsOmitted_Result = configuration.parse({
      githubToken: 'ghp_abc123',
      issueComment: '',
      prComment: '',
      excludeLabels: '',
      logOutput: 'true',
      dryRun: 'false',
    });

    expect(result['issueInactiveDays']).toBe(30);

    expect(result['prInactiveDays']).toBe(30);

    expect(result['issueLockReason']).toBe('resolved');

    expect(result['prLockReason']).toBe('resolved');

    return;
  });

  it('filters empty labels from consecutive commas', () => {
    const result: Tests_Lib_Schema_Configuration_FiltersEmptyLabelsFromConsecutiveCommas_Result = configuration.parse({
      githubToken: 'ghp_abc123',
      issueComment: '',
      issueInactiveDays: '30',
      issueLockReason: 'resolved',
      prComment: '',
      prInactiveDays: '30',
      prLockReason: 'resolved',
      excludeLabels: 'bug,,wontfix,',
      logOutput: 'true',
      dryRun: 'false',
    });

    expect(result['excludeLabels']).toStrictEqual([
      'bug',
      'wontfix',
    ]);

    return;
  });

  return;
});
