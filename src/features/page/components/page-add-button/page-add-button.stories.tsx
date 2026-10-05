import { delay } from 'msw';
import { expect, waitFor } from 'storybook/test';

import preview from '../../../../../.storybook/preview';
import { addPage } from '../../actions/add-page';
import { PageAddButton } from './page-add-button';

const ACTION_DURATION_MS = 300;

const meta = preview.meta({
  args: { children: 'New page' },
  component: PageAddButton,
});

export const Default = meta.story();

export const Disabled = meta.story({
  args: { disabled: true },
});

export const Adding = meta.story({
  parameters: {
    serverFunctions: new Map([
      [
        addPage,
        async () => {
          await delay(ACTION_DURATION_MS);
        },
      ],
    ]),
  },
  play: async ({ canvas, userEvent }) => {
    const button = canvas.getByRole('button', { name: 'New page' });
    await userEvent.click(button);
    await expect(addPage).toHaveBeenCalledOnce();
    await expect(button).toHaveAttribute('aria-busy', 'true');

    await waitFor(async () => {
      await expect(button).not.toHaveAttribute('aria-busy');
    });
  },
});
