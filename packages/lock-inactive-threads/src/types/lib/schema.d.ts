import type { z } from 'zod';

import type { configuration } from '../../lib/schema.js';

/**
 * Lib - Schema - Configuration.
 *
 * @since 1.0.0
 */
export type Lib_Schema_Configuration = z.infer<typeof configuration>;
