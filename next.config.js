/** @type {import('next').NextConfig} */
const nextTranslate = require('next-translate-plugin');

const nextConfig = nextTranslate({
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      'localhost',
      process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      'firebasestorage.googleapis.com',
      'storage.googleapis.com',
    ],
  },
});

module.exports = nextConfig;
