import { expect } from 'storybook/test';

import preview from '../../../../.storybook/preview';
import { EditButton } from './edit-button';

const meta = preview.meta({
  args: { children: 'Edit' },
  component: EditButton,
});

export const Default = meta.story();

export const Disabled = meta.story({
  args: { disabled: true },
});

export const Pending = meta.story({
  args: { pending: true },
  play: async ({ canvas }) => {
    const button = canvas.getByRole('button', { name: 'Edit' });
    await expect(button).toHaveAttribute('aria-busy', 'true');
  },
});
