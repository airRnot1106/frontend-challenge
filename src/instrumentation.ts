export const register = async () => {
  const isMockingEnabled =
    process.env.NEXT_RUNTIME === 'nodejs' &&
    process.env.NEXT_PUBLIC_API_MOCKING === 'enabled';
  if (!isMockingEnabled) {
    return;
  }
  const { server } = await import('./lib/api/mocks/node');
  server.listen({ onUnhandledRequest: 'bypass' });
};
