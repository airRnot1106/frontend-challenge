import { defineConfig, OperationStrategy } from '@hey-api/openapi-ts';

const CONTROLLER_PREFIX = /^\w+Controller_/u;

export default defineConfig({
  input: './openapi/openapi.json',
  output: {
    // @tsconfig/strictest の exactOptionalPropertyTypes に生成コードが準拠していないため型検査を外す
    header: (ctx) => ['// @ts-nocheck', ...ctx.defaultValue],
    indexFile: false,
    path: './src/lib/api/generated',
  },
  plugins: [
    {
      name: '@hey-api/client-next',
      runtimeConfigPath: './src/lib/api/hey-api',
    },
    {
      name: '@hey-api/sdk',
      operations: {
        // Api.content.getAllContentList() のようにタグ単位で呼び出す
        strategy: OperationStrategy.single({
          path: (operation) => {
            const tag = operation.tags?.[0] ?? 'default';
            const method =
              operation.operationId?.replace(CONTROLLER_PREFIX, '') ??
              operation.id;
            return [`${tag.charAt(0).toLowerCase()}${tag.slice(1)}`, method];
          },
          root: 'Api',
        }),
      },
    },
    '@faker-js/faker',
    'msw',
  ],
});
