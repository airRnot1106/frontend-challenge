import { defineConfig } from 'oxlint';
import antiSlop from 'ultracite/oxlint/anti-slop';
import core from 'ultracite/oxlint/core';
import { jsPluginSettings, selectJsPlugins } from 'ultracite/oxlint/js-plugins';
import next from 'ultracite/oxlint/next';
import nextJsPlugins from 'ultracite/oxlint/next/js-plugins';
import react from 'ultracite/oxlint/react';
import vitest from 'ultracite/oxlint/vitest';

const jsPlugins = selectJsPlugins(['react-doctor']);

const reactJs = defineConfig({
  jsPlugins: [{ name: 'react-js', specifier: 'eslint-plugin-react' }],
  rules: {
    'react-js/jsx-sort-props': [
      'warn',
      {
        callbacksLast: true,
        ignoreCase: true,
        reservedFirst: true,
      },
    ],
  },
});

const storybook = defineConfig({
  jsPlugins: [{ name: 'storybook', specifier: 'eslint-plugin-storybook' }],
  overrides: [
    {
      files: [
        '**/*.stories.{ts,tsx,js,jsx,mjs,cjs}',
        '**/*.story.{ts,tsx,js,jsx,mjs,cjs}',
      ],
      rules: {
        'storybook/await-interactions': 'error',
        'storybook/context-in-play-function': 'error',
        'storybook/default-exports': 'error',
        'storybook/hierarchy-separator': 'warn',
        'storybook/no-redundant-story-name': 'warn',
        'storybook/no-renderer-packages': 'error',
        'storybook/prefer-pascal-case': 'warn',
        'storybook/story-exports': 'error',
        'storybook/use-storybook-expect': 'error',
        'storybook/use-storybook-testing-library': 'error',
      },
    },
  ],
});

export default defineConfig({
  extends: [
    core,
    react,
    next,
    vitest,
    nextJsPlugins,
    antiSlop,
    jsPlugins,
    reactJs,
    storybook,
  ],
  ignorePatterns: [
    ...(core.ignorePatterns ?? []),
    'public/mockServiceWorker.js',
  ],
  jsPlugins: jsPlugins.jsPlugins ?? null,
  options: {
    typeAware: true,
    typeCheck: true,
  },
  overrides: [
    {
      // page.ts を Next.js のルートファイルと判定しないよう、app ディレクトリの外では無効にする
      files: ['src/components/**', 'src/features/**', 'src/lib/**'],
      rules: {
        'react-doctor/nextjs-missing-metadata': 'off',
      },
    },
  ],
  rules: {
    'eslint/no-redeclare': 'off',
    'react-doctor/server-auth-actions': 'off',
    'react/function-component-definition': 'off',
  },
  settings: jsPluginSettings,
});
