import type { Context } from '@actions/github/lib/context';
import type { z } from 'zod';

import type { configuration } from '@/lib/schema.js';
import type { Thread } from '@/types/shared.js';

/**
 * Add thread comment.
 *
 * @since 1.0.0
 */
export type AddThreadCommentIssueNumber = number;

export type AddThreadCommentBody = string;

export type AddThreadCommentConfig = z.infer<typeof configuration>;

export type AddThreadCommentReturns = Promise<void>;

/**
 * Get config.
 *
 * @since 1.0.0
 */
export type GetConfigReturns = z.infer<typeof configuration>;

/**
 * Get context.
 *
 * @since 1.0.0
 */
export type GetContextReturns = Context;

/**
 * Get inactive threads.
 *
 * @since 1.0.0
 */
export type GetInactiveThreadsConfig = z.infer<typeof configuration>;

export type GetInactiveThreadsType = Thread['type'];

export type GetInactiveThreadsReturns = Promise<Thread[]>;

/**
 * Lock inactive threads.
 *
 * @since 1.0.0
 */
export type LockInactiveThreadsConfig = z.infer<typeof configuration>;

export type LockInactiveThreadsReturns = Promise<void>;

/**
 * Lock thread.
 *
 * @since 1.0.0
 */
export type LockThreadIssueNumber = number;

export type LockThreadLockReason = 'off-topic' | 'resolved' | 'spam' | 'too heated';

export type LockThreadConfig = z.infer<typeof configuration>;

export type LockThreadReturns = Promise<void>;

/**
 * Run action.
 *
 * @since 1.0.0
 */
export type RunActionReturns = Promise<void>;
