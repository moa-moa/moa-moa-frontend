/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    return [
      {
        source: '/moamoa/:path*',
        destination: 'http://localhost:3000/:path*'
      }
    ];
  },
  eslint: {
    dirs: ['./components', './pages', './__tests__']
  }
};

module.exports = nextConfig;
