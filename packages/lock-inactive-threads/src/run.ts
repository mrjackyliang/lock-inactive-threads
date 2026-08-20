import util from 'node:util';

import * as core from '@actions/core';

import { lockInactiveThreads } from './lib/action.js';
import {
  getConfig,
  getContext,
} from './lib/utility.js';

import type {
  Run_RunAction_Config,
  Run_RunAction_Context,
  Run_RunAction_Returns,
} from './types/run.d.ts';

/**
 * Run - Action.
 *
 * Reads the resolved configuration and repository context, logs
 * both for traceability, then locks every inactive issue and
 * pull request while surfacing any thrown error as a failure.
 *
 * @returns {Run_RunAction_Returns}
 *
 * @since 1.0.0
 */
export async function runAction(): Run_RunAction_Returns {
  try {
    const config: Run_RunAction_Config = getConfig();
    const context: Run_RunAction_Context = getContext();

    core.setSecret(config['githubToken']);

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
    core.endGroup();

    if (error instanceof Error) {
      core.setFailed(error.message);
    } else {
      core.setFailed(String(error));
    }

    core.setOutput('result', false);
  }

  return;
}
