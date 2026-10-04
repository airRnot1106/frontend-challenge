import { Result } from '@praha/byethrow';
import { ErrorFactory } from '@praha/error-factory';
import { brand, integer, minValue, number, pipe } from 'valibot';
import type { InferOutput } from 'valibot';

const pageIdSymbol = Symbol('PageId');
const PageIdSchema = pipe(
  number(),
  integer(),
  minValue(1),
  brand(pageIdSymbol),
);

export type PageId = InferOutput<typeof PageIdSchema>;

export class InvalidPageIdError extends ErrorFactory({
  fields: ErrorFactory.fields<{ value: number }>(),
  message: ({ value }) => `Invalid page id: ${String(value)}`,
  name: 'InvalidPageIdError',
}) {}

const parse = (value: number): Result.Result<PageId, InvalidPageIdError> =>
  Result.pipe(
    Result.parse(PageIdSchema, value),
    Result.mapError(
      (issues) => new InvalidPageIdError({ cause: issues, value }),
    ),
  );

export const PageId = {
  parse,
  schema: PageIdSchema,
} as const;

if (import.meta.vitest) {
  const { describe, expect, it } = import.meta.vitest;
  const { default: fc } = await import('fast-check');

  describe('PageId.parse', () => {
    it('1 以上の整数は受け入れる', () => {
      fc.assert(
        fc.property(fc.integer({ min: 1 }), (value) => {
          const result = PageId.parse(value);
          expect(Result.isSuccess(result)).toBe(true);
          expect(Result.unwrap(result)).toBe(value);
        }),
      );
    });

    it('0 以下の整数を拒否する', () => {
      fc.assert(
        fc.property(fc.integer({ max: 0 }), (value) => {
          const result = PageId.parse(value);
          expect(Result.unwrapError(result)).toBeInstanceOf(InvalidPageIdError);
        }),
      );
    });

    it('整数でない数値を拒否する', () => {
      fc.assert(
        fc.property(
          fc.double().filter((value) => !Number.isInteger(value)),
          (value) => {
            const result = PageId.parse(value);
            expect(Result.unwrapError(result)).toBeInstanceOf(
              InvalidPageIdError,
            );
          },
        ),
      );
    });
  });
}
