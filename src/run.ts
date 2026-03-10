import * as core from '@actions/core';
import util from 'node:util';

import { lockInactiveThreads } from '@/lib/action.js';
import { getConfig, getContext } from '@/lib/utility.js';
import type { RunActionReturns } from '@/types/index.d.ts';

/**
 * Run action.
 *
 * @returns {RunActionReturns}
 *
 * @since 1.0.0
 */
export async function runAction(): RunActionReturns {
  try {
    const config = getConfig();
    const context = getContext();

    // Configuration logs.
    core.startGroup('Configuration');
    core.info(util.inspect(config, false, null, true));
    core.endGroup();

    // Context logs.
    core.startGroup('Context');
    core.info(util.inspect(context, false, null, true));
    core.endGroup();

    // Run the action.
    core.startGroup('Running');
    await lockInactiveThreads(config);
    core.endGroup();
  } catch (error) {
    if (error instanceof Error) {
      core.setFailed(error.message);
    }
  }
}
