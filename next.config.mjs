/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Photography is served from /public as static assets. When real images
  // replace the placeholders, Next's <Image> optimizer will handle them.
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
