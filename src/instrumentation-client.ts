const enableMocking = async () => {
  if (process.env.NEXT_PUBLIC_API_MOCKING !== 'enabled') {
    return;
  }
  const { worker } = await import('./lib/api/mocks/browser');
  await worker.start({ onUnhandledRequest: 'bypass' });
};

// instrumentation-client は非同期処理を待たないため、hydration 直後のリクエストは worker の起動前に送られうる
void enableMocking();
