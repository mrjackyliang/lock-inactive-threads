import type { context } from '@actions/github';
import type { z } from 'zod';

import type { configuration } from '../lib/schema.js';

/**
 * Run - Action.
 *
 * @since 1.0.0
 */
export type Run_RunAction_Returns = Promise<void>;

export type Run_RunAction_Config = z.infer<typeof configuration>;

export type Run_RunAction_Context = typeof context;
