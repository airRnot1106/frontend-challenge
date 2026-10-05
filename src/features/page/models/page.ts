import { Result } from '@praha/byethrow';
import { ErrorFactory } from '@praha/error-factory';
import type { Arbitrary } from 'fast-check';
import {
  isoTimestamp,
  literal,
  object,
  pipe,
  string,
  transform,
  variant,
} from 'valibot';
import type { InferInput, InferOutput } from 'valibot';

import { PageBody } from '../../page-body/models/page-body';
import { PageTitle } from '../../page-title/models/page-title';
import { PageId } from './page-id';

// API は作成日時を ISO 8601 形式の文字列で返す
const CreatedAtSchema = pipe(
  string(),
  isoTimestamp(),
  transform((value) => new Date(value)),
);

const UnwrittenPageSchema = object({
  createdAt: CreatedAtSchema,
  kind: literal('Unwritten'),
  pageId: PageId.schema,
  title: PageTitle.schema,
});

const WrittenPageSchema = object({
  body: PageBody.schema,
  createdAt: CreatedAtSchema,
  kind: literal('Written'),
  pageId: PageId.schema,
  title: PageTitle.schema,
});

const PageSchema = variant('kind', [UnwrittenPageSchema, WrittenPageSchema]);

export type UnwrittenPage = Readonly<InferOutput<typeof UnwrittenPageSchema>>;
export type WrittenPage = Readonly<InferOutput<typeof WrittenPageSchema>>;

export type Page = UnwrittenPage | WrittenPage;

export type PageInput = InferInput<typeof PageSchema>;

// バックエンドに保存する前のページ。ID と作成日時はバックエンドが決める
export type NewPage = Readonly<Omit<UnwrittenPage, 'createdAt' | 'pageId'>>;

export const DEFAULT_PAGE_TITLE: PageTitle = Result.unwrap(
  PageTitle.parse('無名のページ'),
);

export class InvalidPageError extends ErrorFactory({
  fields: ErrorFactory.fields<{ value: PageInput }>(),
  message: 'Invalid page',
  name: 'InvalidPageError',
}) {}

const parse = (value: PageInput): Result.Result<Page, InvalidPageError> =>
  Result.pipe(
    Result.parse(PageSchema, value),
    Result.mapError((issues) => new InvalidPageError({ cause: issues, value })),
  );

const create = (): NewPage => ({
  kind: 'Unwritten',
  title: DEFAULT_PAGE_TITLE,
});

const editTitle = <P extends Page>(page: P, title: PageTitle): P => ({
  ...page,
  title,
});

const editBody = (page: Page, body: PageBody): WrittenPage => ({
  body,
  createdAt: page.createdAt,
  kind: 'Written',
  pageId: page.pageId,
  title: page.title,
});

export const Page = {
  create,
  editBody,
  editTitle,
  parse,
  schema: PageSchema,
} as const;

if (import.meta.vitest) {
  const { describe, expect, it } = import.meta.vitest;
  const { default: fc } = await import('fast-check');

  const TITLE_MAX_LENGTH = 50;
  const BODY_MIN_LENGTH = 10;
  const BODY_MAX_LENGTH = 2000;

  // 隣り合っても結合しない書記素だけを使い、配列の長さと文字数を一致させる
  const grapheme = fc.constantFrom('a', 'あ', '漢', 'が', '👍🏽', '👨‍👩‍👧');
  const textOf = (length: { maxLength: number; minLength: number }) =>
    fc.array(grapheme, length).map((graphemes) => graphemes.join(''));

  const pageIdArb = fc
    .integer({ min: 1 })
    .map((value) => Result.unwrap(PageId.parse(value)));
  const titleArb = textOf({ maxLength: TITLE_MAX_LENGTH, minLength: 1 }).map(
    (value) => Result.unwrap(PageTitle.parse(value)),
  );
  const bodyArb = textOf({
    maxLength: BODY_MAX_LENGTH,
    minLength: BODY_MIN_LENGTH,
  }).map((value) => Result.unwrap(PageBody.parse(value)));

  // toISOString が 4 桁の年で表せる範囲に限る
  const createdAtArb = fc.date({
    max: new Date('9999-12-31T23:59:59.999Z'),
    min: new Date('0000-01-01T00:00:00.000Z'),
    noInvalidDate: true,
  });

  const pageArb: Arbitrary<Page> = fc.oneof(
    fc.record({
      createdAt: createdAtArb,
      kind: fc.constant('Unwritten'),
      pageId: pageIdArb,
      title: titleArb,
    }),
    fc.record({
      body: bodyArb,
      createdAt: createdAtArb,
      kind: fc.constant('Written'),
      pageId: pageIdArb,
      title: titleArb,
    }),
  );

  describe('Page.parse', () => {
    it('どの状態のページも復元できる', () => {
      fc.assert(
        fc.property(pageArb, (page) => {
          const input = { ...page, createdAt: page.createdAt.toISOString() };
          expect(Result.unwrap(Page.parse(input))).toEqual(page);
        }),
      );
    });

    it('タイトルが不正なページを拒否する', () => {
      fc.assert(
        fc.property(pageIdArb, createdAtArb, (pageId, createdAt) => {
          const error = Result.unwrapError(
            Page.parse({
              createdAt: createdAt.toISOString(),
              kind: 'Unwritten',
              pageId,
              title: '',
            }),
          );
          expect(error).toBeInstanceOf(InvalidPageError);
        }),
      );
    });
    it('日時として読めない作成日時を拒否する', () => {
      fc.assert(
        fc.property(
          pageIdArb,
          titleArb,
          fc.string().filter((value) => Number.isNaN(Date.parse(value))),
          (pageId, title, createdAt) => {
            const error = Result.unwrapError(
              Page.parse({ createdAt, kind: 'Unwritten', pageId, title }),
            );
            expect(error).toBeInstanceOf(InvalidPageError);
          },
        ),
      );
    });
  });

  describe('Page.create', () => {
    it('タイトルを「無名のページ」にし、本文は未入力にする', () => {
      expect(Page.create()).toEqual({
        kind: 'Unwritten',
        title: '無名のページ',
      });
    });
  });

  describe('Page.editTitle', () => {
    it('タイトルだけを差し替え、状態は変えない', () => {
      fc.assert(
        fc.property(pageArb, titleArb, (page, title) => {
          expect(Page.editTitle(page, title)).toEqual({ ...page, title });
        }),
      );
    });
  });

  describe('Page.editBody', () => {
    it('本文を差し替え、本文入力済みにする', () => {
      fc.assert(
        fc.property(pageArb, bodyArb, (page, body) => {
          expect(Page.editBody(page, body)).toEqual({
            body,
            createdAt: page.createdAt,
            kind: 'Written',
            pageId: page.pageId,
            title: page.title,
          });
        }),
      );
    });
  });
}
