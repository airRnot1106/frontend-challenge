import { delay } from 'msw';
import { expect, waitFor } from 'storybook/test';

import preview from '../../../../../.storybook/preview';
import { deletePage } from '../../actions/delete-page';
import { PageDeleteButton } from './page-delete-button';

const PAGE_ID = 1;
const ACTION_DURATION_MS = 300;

const meta = preview.meta({
  args: { 'aria-label': 'Delete page', pageId: PAGE_ID },
  component: PageDeleteButton,
});

export const Default = meta.story();

export const Disabled = meta.story({
  args: { disabled: true },
});

export const Pending = meta.story({
  args: { pending: true },
  play: async ({ canvas }) => {
    const button = canvas.getByRole('button', { name: 'Delete page' });
    await expect(button).toHaveAttribute('aria-busy', 'true');
  },
});

export const Deleting = meta.story({
  parameters: {
    serverFunctions: new Map([
      [
        deletePage,
        async () => {
          await delay(ACTION_DURATION_MS);
        },
      ],
    ]),
  },
  play: async ({ canvas, userEvent }) => {
    const button = canvas.getByRole('button', { name: 'Delete page' });
    await userEvent.click(button);
    await expect(deletePage).toHaveBeenCalledOnce();
    await expect(deletePage).toHaveBeenCalledWith(PAGE_ID, {
      isCurrentPage: false,
    });
    await expect(button).toHaveAttribute('aria-busy', 'true');

    await waitFor(async () => {
      await expect(button).not.toHaveAttribute('aria-busy');
    });
  },
});
