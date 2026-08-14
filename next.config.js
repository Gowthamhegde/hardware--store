/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com', 'placeholder.com', 'www.google.com', 'ui-avatars.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'www.google.com',
      },
      {
        protocol: 'https',
        hostname: 'ui-avatars.com',
      },
    ],
  },
};

module.exports = nextConfig;
