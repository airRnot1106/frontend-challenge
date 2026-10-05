import type { CreateClientConfig } from './generated/client.gen';

const DEFAULT_API_BASE_URL = 'http://localhost:3000';

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? DEFAULT_API_BASE_URL;

export const createClientConfig: CreateClientConfig = (config) => ({
  ...config,
  baseUrl: API_BASE_URL,
  fetch: async (input, init) =>
    await (globalThis.mockedFetch ?? globalThis.fetch)(input, init),
});
