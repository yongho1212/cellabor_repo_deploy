import { fileURLToPath } from 'url';
import path from 'node:path';

// ES 모듈 환경에서 __dirname을 수동으로 정의
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    distDir: '.next',
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
