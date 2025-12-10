import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/services",
        destination: "/our-partnership-model",
        permanent: true,
      },
      {
        source: "/services/:slug",
        destination: "/our-partnership-model/:slug",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
