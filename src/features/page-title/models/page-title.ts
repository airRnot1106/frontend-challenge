import { Result } from '@praha/byethrow';
import { ErrorFactory } from '@praha/error-factory';
import { brand, maxGraphemes, minGraphemes, pipe, string, trim } from 'valibot';
import type { InferOutput } from 'valibot';

const PAGE_TITLE_MIN_LENGTH = 1;
const PAGE_TITLE_MAX_LENGTH = 50;

const pageTitleSymbol = Symbol('PageTitle');
const PageTitleSchema = pipe(
  string(),
  trim(),
  minGraphemes(PAGE_TITLE_MIN_LENGTH),
  maxGraphemes(PAGE_TITLE_MAX_LENGTH),
  brand(pageTitleSymbol),
);

export type PageTitle = InferOutput<typeof PageTitleSchema>;

export class InvalidPageTitleError extends ErrorFactory({
  fields: ErrorFactory.fields<{ value: string }>(),
  message: ({ value }) => `Invalid page title: ${value}`,
  name: 'InvalidPageTitleError',
}) {}

const parse = (
  value: string,
): Result.Result<PageTitle, InvalidPageTitleError> =>
  Result.pipe(
    Result.parse(PageTitleSchema, value),
    Result.mapError(
      (issues) => new InvalidPageTitleError({ cause: issues, value }),
    ),
  );

export const PageTitle = {
  parse,
  schema: PageTitleSchema,
} as const;

if (import.meta.vitest) {
  const { describe, expect, it } = import.meta.vitest;
  const { default: fc } = await import('fast-check');

  // 隣り合っても結合しない書記素だけを使い、配列の長さと文字数を一致させる
  const grapheme = fc.constantFrom('a', 'あ', '漢', 'が', '👍🏽', '👨‍👩‍👧');
  const titleOf = (length: { maxLength: number; minLength: number }) =>
    fc.array(grapheme, length).map((graphemes) => graphemes.join(''));

  describe('PageTitle.parse', () => {
    it('1 文字以上 50 文字以下の文字列は受け入れる', () => {
      fc.assert(
        fc.property(
          titleOf({
            maxLength: PAGE_TITLE_MAX_LENGTH,
            minLength: PAGE_TITLE_MIN_LENGTH,
          }),
          (value) => {
            const result = PageTitle.parse(value);
            expect(Result.isSuccess(result)).toBe(true);
            expect(Result.unwrap(result)).toBe(value);
          },
        ),
      );
    });

    it('空文字列を拒否する', () => {
      const result = PageTitle.parse('');
      expect(Result.unwrapError(result)).toBeInstanceOf(InvalidPageTitleError);
    });

    it('空白だけの文字列を拒否する', () => {
      fc.assert(
        fc.property(
          fc
            .array(fc.constantFrom(' ', '\u3000', '\t', '\n'), {
              minLength: 1,
            })
            .map((spaces) => spaces.join('')),
          (value) => {
            const result = PageTitle.parse(value);
            expect(Result.unwrapError(result)).toBeInstanceOf(
              InvalidPageTitleError,
            );
          },
        ),
      );
    });

    it('前後の空白を取り除く', () => {
      fc.assert(
        fc.property(
          titleOf({
            maxLength: PAGE_TITLE_MAX_LENGTH,
            minLength: PAGE_TITLE_MIN_LENGTH,
          }),
          (value) => {
            const result = PageTitle.parse(` \u3000${value}\u3000 `);
            expect(Result.unwrap(result)).toBe(value);
          },
        ),
      );
    });

    it('51 文字以上の文字列を拒否する', () => {
      fc.assert(
        fc.property(
          titleOf({
            maxLength: PAGE_TITLE_MAX_LENGTH * 2,
            minLength: PAGE_TITLE_MAX_LENGTH + 1,
          }),
          (value) => {
            const result = PageTitle.parse(value);
            expect(Result.unwrapError(result)).toBeInstanceOf(
              InvalidPageTitleError,
            );
          },
        ),
      );
    });
  });
}
