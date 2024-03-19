/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");

/** @type {import("next").NextConfig} */
const config = {
  images: {
    remotePatterns: [
      {
        hostname: "localhost",
      },
      { hostname: "89.252.153.199", port: "8181", protocol: "http" },
    ],
  },
};

export default config;
