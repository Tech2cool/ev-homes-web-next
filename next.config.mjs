/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://api.evhomes.tech/:path*", // Proxy to Express API
      },
    ];
  },
};

export default nextConfig;
