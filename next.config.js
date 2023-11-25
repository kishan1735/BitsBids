/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "storage.googleapis.com",
        port: "",
        pathname: "/bricks-live-preview-assets/**",
      },
    ],
  },
  env: {
    URL: process.env.URL,
  },
};

module.exports = nextConfig;
