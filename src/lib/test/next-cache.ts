// node 環境のテストでは "use cache" の実行環境がないため、next/cache の関数を何もしない関数に差し替える
export const cacheTag = (..._tags: readonly string[]): void => undefined;
export const updateTag = (_tag: string): void => undefined;
