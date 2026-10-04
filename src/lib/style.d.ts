// oxlint-disable-next-line unicorn/require-module-specifiers
export {};

declare module 'react' {
  interface CSSProperties {
    [key: `--${string}--${string}`]: string | number | undefined;
  }
}
