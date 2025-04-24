/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:8082/:path*", // Proxy to Express API
        // destination: "https://api.evhomes.tech/:path*", // Proxy to Express API
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.evhomes.tech",
        pathname: "**", // allow all paths
      },
    ],
  },
};

export default nextConfig;
