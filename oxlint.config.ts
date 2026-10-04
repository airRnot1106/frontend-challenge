import { defineConfig } from 'oxlint';
import antiSlop from 'ultracite/oxlint/anti-slop';
import core from 'ultracite/oxlint/core';
import { jsPluginSettings, selectJsPlugins } from 'ultracite/oxlint/js-plugins';
import next from 'ultracite/oxlint/next';
import nextJsPlugins from 'ultracite/oxlint/next/js-plugins';
import react from 'ultracite/oxlint/react';
import vitest from 'ultracite/oxlint/vitest';

const jsPlugins = selectJsPlugins(['react-doctor']);

export default defineConfig({
  extends: [core, react, next, vitest, nextJsPlugins, antiSlop, jsPlugins],
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
