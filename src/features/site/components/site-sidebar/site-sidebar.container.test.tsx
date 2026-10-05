import { describe, expect, it } from 'vitest';

import { mocks } from '../../../../lib/api/mocks/handlers';
import { server } from '../../../../lib/api/mocks/node';
import { SiteSidebar } from './site-sidebar';
import { SiteSidebarContainer } from './site-sidebar.container';

const CREATED_AT = '2025-04-04T00:00:00.000Z';

describe('ページ一覧の取得に成功したとき', () => {
  it('取得したページをサイドバーに渡す', async () => {
    server.use(
      mocks.pick.contentControllerGetAllContentList({
        body: [
          {
            body: null,
            createdAt: CREATED_AT,
            id: 1,
            title: 'こころ',
            updatedAt: CREATED_AT,
          },
          {
            body: '親譲りの無鉄砲で小供の時から損ばかりしている。',
            createdAt: CREATED_AT,
            id: 2,
            title: '坊ちゃん',
            updatedAt: CREATED_AT,
          },
        ],
      }),
    );

    const { props, type } = SiteSidebarContainer({});

    expect(type).toBe(SiteSidebar);
    await expect(props.pagesPromise).resolves.toStrictEqual([
      {
        createdAt: new Date(CREATED_AT),
        kind: 'Unwritten',
        pageId: 1,
        title: 'こころ',
      },
      {
        body: '親譲りの無鉄砲で小供の時から損ばかりしている。',
        createdAt: new Date(CREATED_AT),
        kind: 'Written',
        pageId: 2,
        title: '坊ちゃん',
      },
    ]);
  });
});

describe('タイトルのないページが含まれるとき', () => {
  it('ページ一覧の取得を失敗として扱う', async () => {
    server.use(
      mocks.pick.contentControllerGetAllContentList({
        body: [
          {
            body: null,
            createdAt: CREATED_AT,
            id: 1,
            title: null,
            updatedAt: CREATED_AT,
          },
        ],
      }),
    );

    const { props } = SiteSidebarContainer({});

    await expect(props.pagesPromise).rejects.toThrow('Invalid page');
  });
});
