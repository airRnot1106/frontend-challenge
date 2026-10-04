declare namespace NodeJS {
  interface ProcessEnv {
    readonly NEXT_PUBLIC_API_BASE_URL?: string;
    readonly NEXT_PUBLIC_API_MOCKING?: 'enabled' | 'disabled';
    readonly NEXT_RUNTIME?: 'nodejs' | 'edge';
  }
}
