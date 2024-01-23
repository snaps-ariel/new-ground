/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'front-cdn.snaps.com',
      },
    ],
  },
};

module.exports = nextConfig;
