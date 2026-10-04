import { expect } from 'storybook/test';

import preview from '../../../../.storybook/preview';
import { CheckButton } from './check-button';

const meta = preview.meta({
  args: { children: 'Done' },
  component: CheckButton,
});

export const Default = meta.story();

export const Disabled = meta.story({
  args: { disabled: true },
});

export const Pending = meta.story({
  args: { pending: true },
  play: async ({ canvas }) => {
    const button = canvas.getByRole('button', { name: 'Done' });
    await expect(button).toHaveAttribute('aria-busy', 'true');
  },
});
