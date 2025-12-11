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
}

module.exports = nextConfig

