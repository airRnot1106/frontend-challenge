import { Result } from '@praha/byethrow';
import { cacheTag } from 'next/cache';

import { Api } from '../../../lib/api/generated/sdk.gen';
import type { Content } from '../../../lib/api/generated/types.gen';
import { PAGE_CACHE_TAG } from '../cache-tags';
import { Page } from '../models/page';
import type { PageInput } from '../models/page';

import 'server-only';

const toPageInput = (content: Content): PageInput => {
  // タイトルのないデータは PageTitle の検証で拒否する
  const base = {
    createdAt: content.createdAt,
    pageId: content.id,
    title: content.title ?? '',
  };
  if (content.body === null) {
    return { ...base, kind: 'Unwritten' };
  }
  return { ...base, body: content.body, kind: 'Written' };
};

export const getPages = async (): Promise<readonly Page[]> => {
  'use cache';
  cacheTag(PAGE_CACHE_TAG);
  const { data } = await Api.content.getAllContentList({ throwOnError: true });
  return Result.unwrap(
    Result.sequence(data, (content) => Page.parse(toPageInput(content))),
  );
};
