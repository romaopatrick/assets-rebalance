import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));


/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  webpack: (config, { isServer }) => {
    config.resolve.alias['@'] = path.join(__dirname, 'src');
    return config;
  },
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost', 'localhost:80', 'g15v88lr-80.brs.devtunnels.ms']
    },
  }
};

export default nextConfig;
