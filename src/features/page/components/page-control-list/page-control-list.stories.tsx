import { Result } from '@praha/byethrow';
import { expect } from 'storybook/test';

import preview from '../../../../../.storybook/preview';
import { Page } from '../../models/page';
import { PageId } from '../../models/page-id';
import { PageControlList } from './page-control-list';

const TITLES = [
  'こころ',
  '我輩は猫である',
  '坊ちゃん',
  '学問のすゝめ',
  '羅生門',
  '蜘蛛の糸',
  '走れメロス',
  '伊豆の踊子',
  '注文の多い料理店',
  '銀河鉄道の夜',
] as const;

const pages = TITLES.map((title, index) =>
  Result.unwrap(
    Page.parse({
      createdAt: '2025-04-04T00:00:00.000Z',
      kind: 'Unwritten',
      pageId: index + 1,
      title,
    }),
  ),
);

const meta = preview.meta({
  args: { pages },
  component: PageControlList,
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
    await expect(canvas.getAllByRole('listitem')).toHaveLength(TITLES.length);
    await expect(canvas.queryByRole('button')).not.toBeInTheDocument();
  },
});

export const WithCurrentPage = meta.story({
  args: {
    currentPageId: Result.unwrap(PageId.parse(TITLES.indexOf('坊ちゃん') + 1)),
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole('link', { name: '坊ちゃん' }),
    ).toHaveAttribute('aria-current', 'page');
    await expect(
      canvas.getByRole('link', { name: 'こころ' }),
    ).not.toHaveAttribute('aria-current');
  },
});

export const Deletable = meta.story({
  args: { deletable: true },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole('button', { name: '坊ちゃんを削除する' }),
    ).toBeVisible();
    await expect(canvas.getAllByRole('button')).toHaveLength(TITLES.length);
  },
});

export const Empty = meta.story({
  args: { pages: [] },
  play: async ({ canvas }) => {
    await expect(canvas.queryByRole('listitem')).not.toBeInTheDocument();
  },
});
