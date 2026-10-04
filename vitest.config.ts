import { defineConfig } from 'vitest/config';

export default defineConfig({
  optimizeDeps: {
    include: ['next/cache'],
  },
  test: {
    coverage: {
      provider: 'v8',
    },
    passWithNoTests: true,
    projects: [
      {
        extends: true,
        test: {
          environment: 'node',
          include: ['src/**/*.test.{ts,tsx}'],
          includeSource: ['src/**/*.{ts,tsx}'],
          name: 'node',
        },
      },
    ],
  },
});
