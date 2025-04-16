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
};

export default nextConfig;
