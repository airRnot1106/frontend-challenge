import { expect } from 'storybook/test';

import preview from '../../../../../.storybook/preview';
import { PageEditorSkeleton } from './page-editor-skeleton';

const meta = preview.meta({
  component: PageEditorSkeleton,
  decorators: [
    (Story) => (
      <div style={{ blockSize: '100dvh' }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
  },
});

export const Default = meta.story({
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole('article', { name: 'ページを読み込み中' }),
    ).toHaveAttribute('aria-busy', 'true');
    const [titleEdit, bodyEdit] = canvas.getAllByRole('button', {
      name: 'Edit',
    });
    await expect(titleEdit).toBeDisabled();
    await expect(bodyEdit).toBeDisabled();
  },
});
