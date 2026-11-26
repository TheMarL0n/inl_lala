/** @type {import('next').NextConfig} */
const isDev = process.env.NODE_ENV !== "production";

const strapiOrigins = [
  "https://inl-production.up.railway.app",
  ...(isDev ? ["http://localhost:1337"] : []),
].join(" ");

// Empieza en modo Report-Only para detectar recursos externos sin bloquear nada
const cspReportOnly = [
  "default-src 'self'",
  `img-src 'self' data: blob: ${strapiOrigins}`,
  `connect-src 'self' ${strapiOrigins}`,
  `script-src 'self' 'unsafe-inline' ${isDev ? "'unsafe-eval'" : ""}`.trim(),
  "style-src 'self' 'unsafe-inline'",
  "font-src 'self' data:",
  "frame-ancestors 'self'",
].join("; ");

const nextConfig = {
  images: {
    remotePatterns: [
      ...(isDev
        ? [
            {
              protocol: "http",
              hostname: "localhost",
              port: "1337",
              pathname: "/uploads/**",
            },
          ]
        : []),
      {
        protocol: "https",
        hostname: "inl-production.up.railway.app",
        pathname: "/uploads/**",
      },
    ],
    dangerouslyAllowLocalIP: isDev,
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy-Report-Only",
            value: cspReportOnly,
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains; preload",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
        ],
      },
    ];
  },
};

export default nextConfig;