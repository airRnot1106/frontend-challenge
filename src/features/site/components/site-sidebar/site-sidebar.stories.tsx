import { Result } from '@praha/byethrow';
import { expect } from 'storybook/test';

import preview from '../../../../../.storybook/preview';
import { Page } from '../../../page/models/page';
import { SiteSidebar } from './site-sidebar';

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

const pagesOf = (titles: readonly string[]) =>
  titles.map((title, index) =>
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
  args: {
    pagesPromise: Promise.resolve(pagesOf(TITLES)),
  },
  component: SiteSidebar,
  decorators: [
    (Story) => (
      <div
        style={{
          blockSize: '100dvh',
          borderInlineEnd:
            'var(--border-width-thin) solid var(--color-border-divider)',
          inlineSize: 'var(--size-sidebar-width)',
          overflow: 'clip',
          paddingBlockStart: 'var(--space-md)',
          paddingInline: 'var(--space-lg) var(--space-xs)',
        }}
      >
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      appDirectory: true,
    },
  },
});

export const Default = meta.story({
  play: async ({ canvas }) => {
    await expect(canvas.getByText('ServiceName')).toBeVisible();
    const navigation = canvas.getByRole('navigation', { name: 'ページ' });
    await expect(navigation).toContainElement(
      await canvas.findByRole('link', { name: '坊ちゃん' }),
    );
    await expect(canvas.getByRole('button', { name: 'Edit' })).toBeEnabled();
  },
});

export const Selected = meta.story({
  parameters: {
    nextjs: {
      navigation: {
        pathname: '/pages/3',
        segments: [['pageId', '3']],
      },
    },
  },
  play: async ({ canvas }) => {
    await expect(
      await canvas.findByRole('link', { name: '坊ちゃん' }),
    ).toHaveAttribute('aria-current', 'page');
    await expect(
      canvas.getByRole('link', { name: 'こころ' }),
    ).not.toHaveAttribute('aria-current');
  },
});

export const Loading = meta.story({
  args: {
    // 解決しない Promise を渡し、読み込み中の表示のまま止める
    pagesPromise: Promise.withResolvers<readonly Page[]>().promise,
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole('status', { name: 'ページを読み込み中' }),
    ).toBeVisible();
    await expect(canvas.getByRole('button', { name: 'Edit' })).toBeDisabled();
  },
});

export const Editing = meta.story({
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(await canvas.findByRole('button', { name: 'Edit' }));
    await expect(
      canvas.getByRole('button', { name: '坊ちゃんを削除する' }),
    ).toBeVisible();

    await userEvent.click(canvas.getByRole('button', { name: 'Done' }));
    await expect(
      canvas.queryByRole('button', { name: '坊ちゃんを削除する' }),
    ).not.toBeInTheDocument();
  },
});

export const ManyPages = meta.story({
  args: {
    pagesPromise: Promise.resolve(pagesOf([...TITLES, ...TITLES, ...TITLES])),
  },
});
