import { expect } from 'storybook/test';

import preview from '../../../../.storybook/preview';
import { SaveButton } from './save-button';

const meta = preview.meta({
  args: { children: 'Save' },
  component: SaveButton,
});

export const Default = meta.story();

export const Disabled = meta.story({
  args: { disabled: true },
});

export const Pending = meta.story({
  args: { pending: true },
  play: async ({ canvas }) => {
    const button = canvas.getByRole('button', { name: 'Save' });
    await expect(button).toHaveAttribute('aria-busy', 'true');
  },
});
