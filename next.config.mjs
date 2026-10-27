/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "inl-production.up.railway.app",
        pathname: "/uploads/**",
      },
    ],
    dangerouslyAllowLocalIP: true,
  },
};

export default nextConfig;
