import { expect } from 'storybook/test';

import preview from '../../../../../.storybook/preview';
import { EmptyPageEditor } from './empty-page-editor';

const meta = preview.meta({
  args: { children: 'ページを選択してください' },
  component: EmptyPageEditor,
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
    await expect(canvas.getByText('ページを選択してください')).toBeVisible();
  },
});

export const NotFound = meta.story({
  args: { children: 'ページが見つかりませんでした' },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByText('ページが見つかりませんでした'),
    ).toBeVisible();
  },
});
