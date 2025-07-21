
import React, { forwardRef } from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { PAGE_BREAK_TOKEN } from '../constants';

interface PreviewProps {
  content: string;
  onScroll?: (event: React.UIEvent<HTMLDivElement>) => void;
}

const PageBreak = () => (
    <div className="relative my-8 border-t-2 border-dashed border-sky-500">
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-slate-700 px-2 text-xs font-semibold text-sky-400">Page Break</span>
    </div>
);

const Preview = forwardRef<HTMLDivElement, PreviewProps>(({ content, onScroll }, ref) => {

  return (
    <div id="preview-container" ref={ref} onScroll={onScroll} className="h-full overflow-y-auto">
       <div id="preview-content" className="p-2 sm:p-4 md:p-8">
        <article className="prose prose-invert max-w-none">
            <ReactMarkdown
                rehypePlugins={[rehypeRaw]}
                remarkPlugins={[remarkGfm]}
                components={{
                    p({node, ...props}) { return <p {...props} dir="auto" /> },
                    div({node, ...props}) { return <div {...props} dir="auto" /> },
                    code({node, className, children, ...props}) {
                        const match = /language-(\w+)/.exec(className || '');
                        return match ? (
                            <SyntaxHighlighter
                                style={vscDarkPlus as any}
                                language={match[1]}
                                PreTag="div"
                            >
                                {String(children).replace(/\n$/, '')}
                            </SyntaxHighlighter>
                        ) : (
                            <code className={className} {...props}>
                                {children}
                            </code>
                        );
                    },
                }}
            >
                {content}
            </ReactMarkdown>
        </article>
       </div>
    </div>
  );
});

export default Preview;
