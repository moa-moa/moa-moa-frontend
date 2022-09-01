/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  eslint: {
    dirs: ['./components', './pages', './__tests__']
  }
};

module.exports = nextConfig;
