import { expect } from 'storybook/test';

import preview from '../../../../../.storybook/preview';
import { PageControlListSkeleton } from './page-control-list-skeleton';

const meta = preview.meta({
  component: PageControlListSkeleton,
  decorators: [
    (Story) => (
      <div style={{ inlineSize: 'var(--size-sidebar-width)' }}>
        <Story />
      </div>
    ),
  ],
});

export const Default = meta.story({
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole('status', { name: 'ページを読み込み中' }),
    ).toHaveAttribute('aria-busy', 'true');
  },
});
