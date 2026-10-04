import { defineConfig } from 'oxfmt';
import ultracite from 'ultracite/oxfmt';

export default defineConfig({
  ...ultracite,
  ignorePatterns: [
    ...(ultracite.ignorePatterns ?? []),
    'generated/**',
    'src/lib/api/generated/**',
    'public/mockServiceWorker.js',
  ],
  singleQuote: true,
  sortImports: {
    groups: [
      ['type-builtin', 'value-builtin'],
      ['type-external', 'type-internal', 'value-external', 'value-internal'],
      [
        'type-index',
        'type-parent',
        'type-sibling',
        'value-index',
        'value-parent',
        'value-sibling',
        'style',
      ],
      ['side_effect_style', 'side_effect'],
      ['unknown'],
    ],
    newlinesBetween: true,
    order: 'asc',
  },
  trailingComma: 'all',
});
