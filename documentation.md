# 1. Had an issue with svgs. I configured webpack but in the new nextjs version, it ignores webpack and uses turbopack instead. I had to add the following to the next.config.js file:
```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
  experimental: {
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
  },
};

export default nextConfig;

```

# NOTES TO APPLY LATER
1. If a guest user tries to stream a movie without logging in, a dialog box should pop up instructing them to go to the log in page