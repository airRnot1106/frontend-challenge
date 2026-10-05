import { Result } from '@praha/byethrow';
import { useParams } from 'next/navigation';
import { pipe, string, transform } from 'valibot';

import { PageId } from '../models/page-id';

// /pages/[pageId] の pageId は文字列で渡される
const PageIdParamSchema = pipe(string(), transform(Number), PageId.schema);

// ページを表示していない画面では undefined を返す
export const useCurrentPageId = (): PageId | undefined => {
  const params = useParams();
  const result = Result.parse(PageIdParamSchema, params['pageId']);
  return Result.isSuccess(result) ? result.value : undefined;
};
