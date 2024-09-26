import path from 'node:path';

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    experimental: {
        turbo: {
            resolveAlias: {
                "react-native": "react-native-web",
            },
            resolveExtensions: [
                ".web.js",
                ".web.jsx",
                ".web.ts",
                ".web.tsx",
                ".mdx",
                ".tsx",
                ".ts",
                ".jsx",
                ".js",
                ".mjs",
                ".json",
            ],
        },
    },
    webpack: (config) => {
        config.resolve.alias = {
            ...(config.resolve.alias || {}),
            // Transform all direct `react-native` imports to `react-native-web`
            "react-native$": "react-native-web",
            '@repo/ui': path.resolve(__dirname, '../../packages/ui'),

        };
        config.resolve.extensions = [
            ".web.js",
            ".web.jsx",
            ".web.ts",
            ".web.tsx",
            ...config.resolve.extensions,
        ];
        return config;
    }
}

export default nextConfig;
