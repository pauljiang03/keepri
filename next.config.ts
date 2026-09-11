import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  // Product visuals also render in the browser; keep the Pages prefix identical.
  env: { PAGES_BASE_PATH: process.env.PAGES_BASE_PATH || '' },
  assetPrefix: process.env.PAGES_BASE_PATH || '',
  trailingSlash: true,
};

export default nextConfig;
