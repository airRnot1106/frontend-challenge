import { HttpResponse } from 'msw';
import { describe, expect, it } from 'vitest';

import { mocks } from '../../../../lib/api/mocks/handlers';
import { server } from '../../../../lib/api/mocks/node';
import { PageEditor } from './page-editor';
import { PageEditorContainer } from './page-editor.container';

const CREATED_AT = '2025-04-04T00:00:00.000Z';
const NOT_FOUND = 'NEXT_HTTP_ERROR_FALLBACK;404';

describe('ページの取得に成功したとき', () => {
  it('取得したページを編集画面に渡す', async () => {
    server.use(
      mocks.pick.contentControllerGetContent({
        body: {
          body: null,
          createdAt: CREATED_AT,
          id: 1,
          title: 'こころ',
          updatedAt: CREATED_AT,
        },
      }),
    );

    const { props, type } = await PageEditorContainer({ pageId: '1' });

    expect(type).toBe(PageEditor);
    expect(props.page).toStrictEqual({
      createdAt: new Date(CREATED_AT),
      kind: 'Unwritten',
      pageId: 1,
      title: 'こころ',
    });
  });
});

describe('ページが存在しないとき', () => {
  it('ページが見つからない画面を表示する', async () => {
    server.use(
      mocks.pick.contentControllerGetContent(
        () => new HttpResponse(null, { status: 200 }),
      ),
    );

    await expect(PageEditorContainer({ pageId: '999' })).rejects.toThrow(
      NOT_FOUND,
    );
  });
});

describe('URL のページ ID が数値でないとき', () => {
  it('ページを取得せずに、ページが見つからない画面を表示する', async () => {
    await expect(PageEditorContainer({ pageId: 'abc' })).rejects.toThrow(
      NOT_FOUND,
    );
  });
});
