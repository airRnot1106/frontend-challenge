import { Result } from '@praha/byethrow';
import { expect } from 'storybook/test';

import preview from '../../../../../.storybook/preview';
import { PageId } from '../../models/page-id';
import { PageControlListItem } from './page-control-list-item';

const meta = preview.meta({
  args: {
    deletable: true,
    href: '/pages/1',
    id: Result.unwrap(PageId.parse(1)),
    title: '坊ちゃん',
  },
  component: PageControlListItem,
  decorators: [
    (Story) => (
      <ul style={{ inlineSize: 'var(--size-sidebar-width)' }}>
        <Story />
      </ul>
    ),
  ],
});

export const Default = meta.story({
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('link', { name: '坊ちゃん' })).toBeVisible();
    await expect(
      canvas.getByRole('button', { name: '坊ちゃんを削除する' }),
    ).toBeVisible();
  },
});

export const Current = meta.story({
  args: { current: true },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole('link', { name: '坊ちゃん' }),
    ).toHaveAttribute('aria-current', 'page');
  },
});

export const NotDeletable = meta.story({
  args: { deletable: false },
  play: async ({ canvas }) => {
    await expect(canvas.queryByRole('button')).not.toBeInTheDocument();
  },
});

export const LongTitle = meta.story({
  args: {
    title:
      'とても長いタイトルのページはリストの幅に収まらないので末尾が省略される',
  },
});
