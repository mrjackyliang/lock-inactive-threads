import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import { defineConfig } from 'vitest/config';

/**
 * Vitest - Current File Path.
 *
 * Resolves this configuration file before deriving the docs root, so the @site
 * alias stays stable regardless of where Vitest is invoked in the repository.
 *
 * @since 0.15.0
 */
const currentFilePath = fileURLToPath(import.meta.url);
const rootDirectory = dirname(currentFilePath);

export default defineConfig({
  resolve: {
    alias: {
      '@site': rootDirectory,
    },
  },
  test: {
    setupFiles: ['./vitest.setup.ts'],
    include: ['src/tests/**/*.test.ts'],
    globals: false,
    testTimeout: 30000, // 30 seconds.
    sequence: {
      concurrent: false,
    },
  },
});
