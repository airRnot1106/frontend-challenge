import type { Config } from 'stylelint';

const unitRecommendationMap = {
  vb: 'svb, dvb, lvb',
  vh: 'svh, dvh, lvh',
  vi: 'svi, dvi, lvi',
  vmax: 'svmax, dvmax, lvmax',
  vmin: 'svmin, dvmin, lvmin',
  vw: 'svw, dvw, lvw',
} as const;

const config: Config = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-recess-order',
    '@css-modules-kit/stylelint-plugin/recommended',
  ],
  rules: {
    'custom-property-pattern':
      '^_?[a-z][a-z0-9]*(-[a-z0-9]+)*(--[a-z][a-z0-9]*(-[a-z0-9]+)*)?$',
    'keyframes-name-pattern':
      '^--[a-z][a-z0-9]*(-[a-z0-9]+)*(--[a-z][a-z0-9]*(-[a-z0-9]+)*)?$',
    'unit-disallowed-list': [
      ['vw', 'vh', 'vi', 'vb', 'vmin', 'vmax'],
      {
        message: (unit: keyof typeof unitRecommendationMap) =>
          `\`${unit}\`は使用しないでください。代わりに\`${unitRecommendationMap[unit]}\`を検討してください。`,
        severity: 'warning',
      },
    ],
  },
};

export default config;
