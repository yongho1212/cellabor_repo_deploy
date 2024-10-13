import React from 'react';
import { promises as fs } from 'fs';
import path from 'path';
import InfoMdRenderPage from '../components/InfoMdRenderPage';

export async function generateStaticParams() {
    return [{}];
}

async function getPrivacyPolicyContent() {
    const filePath = path.join(process.cwd(), 'public', 'md', 'service-policy.md');
    const content = await fs.readFile(filePath, 'utf8');
    return content;
}

export default async function PrivacyPolicyPage() {
    const content = await getPrivacyPolicyContent();
    return <InfoMdRenderPage content={content} title="서비스 이용약관" />;
}
