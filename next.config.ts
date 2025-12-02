import type { NextConfig } from "next";

const svgLoader = {
  loader: "@svgr/webpack",
  options: {
    svgo: true,
    svgoConfig: {
      plugins: [{ name: "removeViewBox", active: false }],
    },
  },
};

const nextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: [svgLoader],
    });

    return config;
  },
  turbopack: {
    rules: {
      "*.svg": {
        loaders: [svgLoader],
        as: "*.js",
      },
    },
  },
} satisfies NextConfig;

export default nextConfig;
