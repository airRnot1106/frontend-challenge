import { expect } from 'storybook/test';

import preview from '../../../../.storybook/preview';
import { PlusButton } from './plus-button';

const meta = preview.meta({
  args: { children: 'New page' },
  component: PlusButton,
});

export const Default = meta.story();

export const Disabled = meta.story({
  args: { disabled: true },
});

export const Pending = meta.story({
  args: { pending: true },
  play: async ({ canvas }) => {
    const button = canvas.getByRole('button', { name: 'New page' });
    await expect(button).toHaveAttribute('aria-busy', 'true');
  },
});
