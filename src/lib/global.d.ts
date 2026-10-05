// oxlint-disable-next-line unicorn/require-module-specifiers
export {};

declare global {
  // instrumentation で用意した、モックを通す fetch
  var mockedFetch: typeof fetch | undefined;
}
