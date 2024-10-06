import React from 'react';
import ReactMarkdown from 'react-markdown';

interface InfoMdRenderPageProps {
    content: string;
    title: string;
}

const InfoMdRenderPage: React.FC<InfoMdRenderPageProps> = ({ content, title }) => {
    return (
        <div className="markdown-content" style={{padding:'0 20px'}}>
            <h1>{title}</h1>
            <ReactMarkdown className="markdown-content">{content}</ReactMarkdown>
        </div>
    );
};

export default InfoMdRenderPage;
