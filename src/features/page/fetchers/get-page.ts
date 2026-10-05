import { Result } from '@praha/byethrow';
import { cacheTag } from 'next/cache';

import { Api } from '../../../lib/api/generated/sdk.gen';
import type { Content } from '../../../lib/api/generated/types.gen';
import { PAGE_CACHE_TAG } from '../cache-tags';
import type { Page } from '../models/page';
import type { PageId } from '../models/page-id';
import { parseContent } from './parse-content';

import 'server-only';

// ページが存在しないときは undefined を返す
export const getPage = async (pageId: PageId): Promise<Page | undefined> => {
  'use cache';
  cacheTag(PAGE_CACHE_TAG);
  const { data } = await Api.content.getContent({
    path: { id: pageId },
    throwOnError: true,
  });
  // 存在しない ID を指定すると、API は 200 で空の応答を返す。応答の形式によって、空の応答は null か空のオブジェクトになる
  const content: Partial<Content> | null | undefined = data;
  if (content === null || content === undefined || content.id === undefined) {
    return undefined;
  }
  return Result.unwrap(parseContent(data));
};
