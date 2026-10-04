import { Result } from '@praha/byethrow';
import { ErrorFactory } from '@praha/error-factory';
import { brand, maxGraphemes, minGraphemes, pipe, string, trim } from 'valibot';
import type { InferOutput } from 'valibot';

const PAGE_BODY_MIN_LENGTH = 10;
const PAGE_BODY_MAX_LENGTH = 2000;

const pageBodySymbol = Symbol('PageBody');
const PageBodySchema = pipe(
  string(),
  trim(),
  minGraphemes(PAGE_BODY_MIN_LENGTH),
  maxGraphemes(PAGE_BODY_MAX_LENGTH),
  brand(pageBodySymbol),
);

export type PageBody = InferOutput<typeof PageBodySchema>;

export class InvalidPageBodyError extends ErrorFactory({
  fields: ErrorFactory.fields<{ value: string }>(),
  message: ({ value }) => `Invalid page body: ${value}`,
  name: 'InvalidPageBodyError',
}) {}

const parse = (value: string): Result.Result<PageBody, InvalidPageBodyError> =>
  Result.pipe(
    Result.parse(PageBodySchema, value),
    Result.mapError(
      (issues) => new InvalidPageBodyError({ cause: issues, value }),
    ),
  );

export const PageBody = {
  parse,
  schema: PageBodySchema,
} as const;

if (import.meta.vitest) {
  const { describe, expect, it } = import.meta.vitest;
  const { default: fc } = await import('fast-check');

  // 隣り合っても結合しない書記素だけを使い、配列の長さと文字数を一致させる
  const grapheme = fc.constantFrom('a', 'あ', '漢', 'が', '👍🏽', '👨‍👩‍👧');
  const bodyOf = (length: { maxLength: number; minLength: number }) =>
    fc.array(grapheme, length).map((graphemes) => graphemes.join(''));

  describe('PageBody.parse', () => {
    it('10 文字以上 2000 文字以下の文字列は受け入れる', () => {
      fc.assert(
        fc.property(
          bodyOf({
            maxLength: PAGE_BODY_MAX_LENGTH,
            minLength: PAGE_BODY_MIN_LENGTH,
          }),
          (value) => {
            const result = PageBody.parse(value);
            expect(Result.isSuccess(result)).toBe(true);
            expect(Result.unwrap(result)).toBe(value);
          },
        ),
      );
    });

    it('9 文字以下の文字列を拒否する', () => {
      fc.assert(
        fc.property(
          bodyOf({
            maxLength: PAGE_BODY_MIN_LENGTH - 1,
            minLength: 0,
          }),
          (value) => {
            const result = PageBody.parse(value);
            expect(Result.unwrapError(result)).toBeInstanceOf(
              InvalidPageBodyError,
            );
          },
        ),
      );
    });

    it('2001 文字以上の文字列を拒否する', () => {
      fc.assert(
        fc.property(
          bodyOf({
            maxLength: PAGE_BODY_MAX_LENGTH * 2,
            minLength: PAGE_BODY_MAX_LENGTH + 1,
          }),
          (value) => {
            const result = PageBody.parse(value);
            expect(Result.unwrapError(result)).toBeInstanceOf(
              InvalidPageBodyError,
            );
          },
        ),
      );
    });

    it('前後の空白を取り除く', () => {
      fc.assert(
        fc.property(
          bodyOf({
            maxLength: PAGE_BODY_MAX_LENGTH,
            minLength: PAGE_BODY_MIN_LENGTH,
          }),
          (value) => {
            const result = PageBody.parse(` 　\n${value}\n　 `);
            expect(Result.unwrap(result)).toBe(value);
          },
        ),
      );
    });

    it('前後の空白は文字数に数えない', () => {
      fc.assert(
        fc.property(
          bodyOf({
            maxLength: PAGE_BODY_MIN_LENGTH - 1,
            minLength: 0,
          }),
          (value) => {
            const result = PageBody.parse(`${value}${' '.repeat(10)}`);
            expect(Result.unwrapError(result)).toBeInstanceOf(
              InvalidPageBodyError,
            );
          },
        ),
      );
    });
  });
}
