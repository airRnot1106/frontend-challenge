'use server';

import { Result } from '@praha/byethrow';
import { updateTag } from 'next/cache';
import { redirect } from 'next/navigation';

import { Api } from '../../../lib/api/generated/sdk.gen';
import { PAGE_CACHE_TAG } from '../cache-tags';
import { PageId } from '../models/page-id';

export interface DeletePageOptions {
  // 削除するページを表示しているか
  isCurrentPage: boolean;
}

export const deletePage = async (
  pageId: number,
  { isCurrentPage }: DeletePageOptions,
): Promise<void> => {
  const id = Result.unwrap(PageId.parse(pageId));
  await Api.content.deleteContent({ path: { id }, throwOnError: true });
  updateTag(PAGE_CACHE_TAG);
  // 削除したページを表示し続けないよう、何も選択していない画面に移る
  if (isCurrentPage) {
    redirect('/pages');
  }
};
