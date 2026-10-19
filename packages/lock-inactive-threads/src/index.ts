import { runAction } from './run.js';

import type { Index_Initialize_Returns } from './types/index.d.ts';

/**
 * Index - Initialize.
 *
 * Entry point invoked when the bundled action starts. Kicks off
 * the run routine and intentionally ignores the resolved promise
 * since all failures are handled inside the run routine itself.
 *
 * @returns {Index_Initialize_Returns}
 *
 * @since 1.0.0
 */
function initialize(): Index_Initialize_Returns {
  runAction().then(() => {});

  return;
}

initialize();
