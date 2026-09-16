import { z } from 'zod';

/**
 * Lib - Schema - Configuration.
 *
 * Validates and normalizes the raw action inputs, coercing day
 * counts to numbers, applying default comments, splitting the
 * exclude labels, and casting the boolean flags.
 *
 * @since 1.0.0
 */
export const configuration = z.object({
  githubToken: z.string()
    .min(1),
  issueComment: z.string()
    .transform((value) => ((value === '') ? 'Due to inactivity, this issue will be locked and marked as resolved. If you have any further questions or inquiries, please feel free to open a new issue.' : value)),
  issueInactiveDays: z.coerce.number()
    .min(1).default(30),
  issueLockReason: z.enum([
    'off-topic',
    'resolved',
    'spam',
    'too heated',
  ]).default('resolved'),
  prComment: z.string()
    .transform((value) => ((value === '') ? 'Due to inactivity, this pull request will be locked and marked as resolved. If you have any further questions or inquiries, please feel free to open a new pull request.' : value)),
  prInactiveDays: z.coerce.number()
    .min(1).default(30),
  prLockReason: z.enum([
    'off-topic',
    'resolved',
    'spam',
    'too heated',
  ]).default('resolved'),
  excludeLabels: z.string()
    .transform((value) => {
      if (value === '') {
        return [];
      }

      return value.split(',').map((label) => label.trim()).filter((label) => label.length > 0);
    }),
  logOutput: z.enum([
    'true',
    'false',
  ]).transform((value) => value === 'true'),
  dryRun: z.enum([
    'true',
    'false',
  ]).transform((value) => value === 'true'),
});
