import { Result } from '@praha/byethrow';
import { cacheTag } from 'next/cache';

import { Api } from '../../../lib/api/generated/sdk.gen';
import { PAGE_CACHE_TAG } from '../cache-tags';
import type { Page } from '../models/page';
import { parseContent } from './parse-content';

import 'server-only';

export const getPages = async (): Promise<readonly Page[]> => {
  'use cache';
  cacheTag(PAGE_CACHE_TAG);
  const { data } = await Api.content.getAllContentList({ throwOnError: true });
  return Result.unwrap(Result.sequence(data, parseContent));
};
