import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  eslint: {
    dirs: ['src'],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      use: ['@svgr/webpack'],
    });

    return config;
  },
  async redirects() {
    return [
      {
        source: '/:locale/dc-dashboard/live',
        destination: '/:locale',
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [{ hostname: 'jrvahgupsifnchwwzflu.supabase.co' }],
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
