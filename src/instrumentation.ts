export const register = async () => {
  const isMockingEnabled =
    process.env.NEXT_RUNTIME === 'nodejs' &&
    process.env.NEXT_PUBLIC_API_MOCKING === 'enabled';
  if (!isMockingEnabled) {
    return;
  }
  const { server } = await import('./lib/api/mocks/node');
  server.listen({ onUnhandledRequest: 'bypass' });
  // 開発サーバーは読み込み直しのたびに globalThis.fetch を起動時のものに戻すため、モックを通す fetch を別に保持する
  globalThis.mockedFetch = globalThis.fetch;
};
