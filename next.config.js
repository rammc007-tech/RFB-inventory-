/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    // Provide default values for NextAuth during build
    NEXTAUTH_URL: process.env.NEXTAUTH_URL || 'http://localhost:3002',
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET || 'temporary-secret-for-build',
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals = [...(config.externals || []), 'pdfkit']
    }
    return config
  },
  // Ensure service worker and manifest are accessible
  async headers() {
    return [
      {
        source: '/sw.js',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, must-revalidate',
          },
          {
            key: 'Service-Worker-Allowed',
            value: '/',
          },
        ],
      },
      {
        source: '/manifest.json',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig

