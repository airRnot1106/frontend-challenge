import type { Result } from '@praha/byethrow';

import type { Content } from '../../../lib/api/generated/types.gen';
import { Page } from '../models/page';
import type { InvalidPageError, PageInput } from '../models/page';

const toPageInput = (content: Content): PageInput => {
  const base = {
    createdAt: content.createdAt,
    pageId: content.id,
    title: content.title,
  };
  if (content.body === null) {
    return { ...base, kind: 'Unwritten' };
  }
  return { ...base, body: content.body, kind: 'Written' };
};

export const parseContent = (
  content: Content,
): Result.Result<Page, InvalidPageError> => Page.parse(toPageInput(content));
