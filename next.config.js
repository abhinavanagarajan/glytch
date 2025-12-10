/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Enable static export for easy deployment
  output: 'export',
  // Required for Three.js
  transpilePackages: ['three'],
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig

