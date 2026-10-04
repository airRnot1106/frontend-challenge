import { delay } from 'msw';
import { expect, fn, waitFor } from 'storybook/test';

import preview from '../../../../.storybook/preview';
import { EditIcon } from '../../icon/edit/edit-icon';
import { Button } from './button';

const ACTION_DURATION_MS = 300;

const meta = preview.meta({
  args: {
    children: (
      <>
        <EditIcon aria-hidden size={24} />
        Edit
      </>
    ),
  },
  component: Button,
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
    await expect(button).toHaveAttribute('aria-disabled', 'true');
  },
});

export const ActionPending = meta.story({
  args: {
    action: fn(async () => {
      await delay(ACTION_DURATION_MS);
    }),
  },
  play: async ({ args, canvas, userEvent }) => {
    const button = canvas.getByRole('button', { name: 'Edit' });
    await userEvent.click(button);
    await expect(args.action).toHaveBeenCalledOnce();
    await expect(button).toHaveAttribute('aria-busy', 'true');
    await expect(button).toHaveFocus();

    await userEvent.click(button);
    await expect(args.action).toHaveBeenCalledOnce();

    await waitFor(async () => {
      await expect(button).not.toHaveAttribute('aria-busy');
    });
  },
});
