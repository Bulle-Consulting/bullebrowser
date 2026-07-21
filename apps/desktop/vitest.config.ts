import { defineConfig } from 'vitest/config';

// Unit tests only — the Playwright e2e suite in e2e/ runs via `pnpm test:e2e`
// and must not be collected by vitest.
export default defineConfig({
  test: {
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
    passWithNoTests: true,
  },
});
