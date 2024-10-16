import { fileURLToPath } from 'url';
import path from 'node:path';

// ES 모듈 환경에서 __dirname을 수동으로 정의
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {

    reactStrictMode: true,
    images: {
        domains: [
            'lh3.googleusercontent.com',
            'gs://cellabor-ad333.appspot.com',
            'firebasestorage.googleapis.com',
            'scontent-ssn1-1.cdninstagram.com',
            'scontent.cdninstagram.com', // Instagram의 CDN 도메인을 일반화
        ],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**.cdninstagram.com',
            },

        ],
    },
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
            '@repo': path.resolve(__dirname, '../../packages'),

        };
        config.resolve.extensions = [
            ".web.js",
            ".web.jsx",
            ".web.ts",
            ".web.tsx",
            ...config.resolve.extensions,
        ];
        config.module.rules.forEach((rule) => {
            if (rule.resolve) {
                rule.resolve.fullySpecified = false; // node: 스킴 관련 문제 해결
            }
        });
        return config;
    }
}

export default nextConfig;
