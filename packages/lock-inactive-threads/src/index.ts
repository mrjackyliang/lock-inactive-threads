import { runAction } from './run.js';

/**
 * Index - Initialize.
 *
 * Entry point invoked when the bundled action starts. Kicks off
 * the run routine and intentionally ignores the resolved promise
 * since all failures are handled inside the run routine itself.
 *
 * @since 1.0.0
 */
function initialize() {
  runAction().then(() => {});

  return;
}

initialize();
