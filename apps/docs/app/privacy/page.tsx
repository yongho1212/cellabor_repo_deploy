// /Users/yonghochoi/cellabor-repo/apps/docs/app/privacy/page.tsx
import React from 'react';
import { promises as fs } from 'fs';
import path from 'path';
import InfoMdRenderPage from '../components/InfoMdRenderPage';

export async function generateStaticParams() {
    return [{}]; // This page has no dynamic params
}

async function getPrivacyPolicyContent() {
    const filePath = path.join(process.cwd(), 'public', 'md', 'privacy-policy.md');
    const content = await fs.readFile(filePath, 'utf8');
    return content;
}

export default async function PrivacyPolicyPage() {
    const content = await getPrivacyPolicyContent();
    return <InfoMdRenderPage content={content} title="개인정보 처리방침" />;
}
