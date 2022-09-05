/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    return [
      {
        source: '/moamoa/:path*',
        destination: `${process.env.NEXT_PUBLIC_BASE_URL}/:path*`
      }
    ];
  },
  eslint: {
    dirs: ['./components', './pages', './__tests__']
  }
};

module.exports = nextConfig;
