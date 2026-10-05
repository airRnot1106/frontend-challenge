import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  compiler: {
    define: {
      'import.meta.vitest': false,
    },
  },
  experimental: {
    optimizePackageImports: [],
  },
  images: {
    remotePatterns: [],
  },
  logging: {
    browserToTerminal: true,
    fetches: {
      fullUrl: true,
    },
  },
  poweredByHeader: false,
  reactCompiler: true,
  redirects() {
    return [
      {
        destination: '/pages',
        permanent: false,
        source: '/',
      },
    ];
  },
  typedRoutes: false,
};

export default nextConfig;
