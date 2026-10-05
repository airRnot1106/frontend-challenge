'use server';

import { updateTag } from 'next/cache';

import { Api } from '../../../lib/api/generated/sdk.gen';
import { PAGE_CACHE_TAG } from '../cache-tags';
import { Page } from '../models/page';

export const addPage = async (): Promise<void> => {
  const page = Page.create();
  await Api.content.addContent({
    body: { title: page.title },
    throwOnError: true,
  });
  updateTag(PAGE_CACHE_TAG);
};
