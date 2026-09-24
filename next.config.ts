import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  typescript: {
    // We maintain high TS standards; warnings during build won't fail deployment
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
