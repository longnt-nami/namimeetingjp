/* @ts-check */
/** @see https://nextjs.org/docs/api-reference/next.config.js/introduction */
/** @type {import('next').NextConfig} */
const nextConfig = {
  headers: require("./headers.config"),
  webpack: require("./webpack.config"),
  reactStrictMode: false,
  swcMinify: true,
  pageExtensions: ["ts", "tsx"],
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
