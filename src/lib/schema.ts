import { z } from 'zod';

/**
 * Configuration.
 *
 * @since 1.0.0
 */
export const configuration = z.object({
  githubToken: z.string()
    .min(1),
  issueComment: z.string()
    .transform((value) => ((value === '') ? 'Due to inactivity, this issue will be locked and marked as resolved. If you have any further questions or inquiries, please feel free to open a new issue.' : value)),
  issueInactiveDays: z.number({
    coerce: true,
  }).default(30),
  issueLockReason: z.enum(['off-topic', 'resolved', 'spam', 'too heated'])
    .default('resolved'),
  prComment: z.string()
    .transform((value) => ((value === '') ? 'Due to inactivity, this pull request will be locked and marked as resolved. If you have any further questions or inquiries, please feel free to open a new pull request.' : value)),
  prInactiveDays: z.number({
    coerce: true,
  }).default(30),
  prLockReason: z.enum(['off-topic', 'resolved', 'spam', 'too heated'])
    .default('resolved'),
  excludeLabels: z.string()
    .transform((value) => ((value === '') ? [] : value.split(',').map((label) => label.trim()))),
  logOutput: z.enum(['true', 'false'])
    .transform((value) => value === 'true'),
  dryRun: z.enum(['true', 'false'])
    .transform((value) => value === 'true'),
});
