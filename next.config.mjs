/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Local before/after screenshots live in /public, served as optimized AVIF/WebP.
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
