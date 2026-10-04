import { expect } from 'storybook/test';

import preview from '../../../../../.storybook/preview';
import { SiteFooter } from './site-footer';

const meta = preview.meta({
  component: SiteFooter,
  parameters: {
    layout: 'fullscreen',
  },
});

export const Default = meta.story({
  play: async ({ canvas }) => {
    const footer = canvas.getByRole('contentinfo');
    await expect(footer).toHaveTextContent('Copyright © 2026 Sample');
    await expect(footer).toHaveTextContent('運営会社');
  },
});

export const Mobile = meta.story({
  globals: {
    viewport: { value: 'xs' },
  },
});
