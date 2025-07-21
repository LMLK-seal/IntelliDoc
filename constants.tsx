
import React from 'react';

export const INITIAL_MARKDOWN = `
# Welcome to IntelliDoc!

This is a Markdown editor with a live preview. You can write your content here and see it rendered instantly.

## Key Features

- **Live Preview:** See your rendered Markdown instantly.
- **Simple Interface:** A clean, distraction-free writing environment.
- **File Downloads:** Download your work as a Markdown (.md) file.
- **PDF/Markdown Export:** Generate a professional PDF/Markdown from your document.
- **Focus Mode:** Hide the preview to concentrate on writing.
- **Scroll Syncing:** The editor and preview panes scroll in sync.
- **Content Persistence:** Your work is automatically saved in your browser.

### Example Code Block

Here's a simple React component.

\`\`\`javascript
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
\`\`\`

### Example Table

| Feature            | Status      | Priority |
|--------------------|-------------|----------|
| Markdown Editing   | Complete    | High     |
| PDF Generation     | Complete    | Medium   |

> IntelliDoc helps you focus on writing and easily export your work.
`;

export const LoadingSpinner = () => (
  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
);

export const DownloadIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
    </svg>
);

export const FileDownIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
        <polyline points="14 2 14 8 20 8"/>
        <path d="M12 18v-6"/>
        <path d="m15 15-3 3-3-3"/>
    </svg>
);

export const FocusIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/>
    </svg>
);


export const PAGE_BREAK_TOKEN = '\n\n---page-break---\n\n';

export const CoffeeIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="mr-2"
    >
        <path d="M12.352 2.067c-1.33.022-2.633.29-3.87.784-.74.295-1.444.69-2.09 1.168-.647.477-1.223 1.03-1.69 1.642-.467.612-.824 1.285-1.053 1.99-.23.705-.33 1.433-.296 2.158.037.725.21 1.44.51 2.11.3.67.722 1.286 1.246 1.815.524.53 1.144.962 1.818 1.27.674.308 1.39.512 2.11.604.72.09 1.434.07 2.13-.06-.522 1.522-1.28 2.97-2.222 4.298-.943 1.328-2.062 2.52-3.32 3.528a.75.75 0 00.943 1.156c1.372-1.112 2.58-2.4 3.59-3.82.99-1.4 1.77-3.01 2.27-4.78.72-.092 1.434-.296 2.11-.604.674-.308 1.294-.74 1.818-1.27.524-.53.945-1.145 1.245-1.815.3-.67.472-1.385.51-2.11.036-.725-.067-1.453-.296-2.158-.23-.705-.587-1.378-1.054-1.99-.467-.612-1.043-1.165-1.69-1.642-.646-.478-1.35-.873-2.09-1.168-1.237-.494-2.54-.762-3.87-.784zm.015 1.503c1.07.015 2.11.23 3.08.64.577.247 1.12.573 1.61.96.49.387.92.836 1.26 1.32.34.484.58.995.72 1.51.14.515.19.104.16.155-.03.51-.15.101-.36.147-.21.046-.43.07-.65.07-.49 0-.98-.09-1.43-.27-.45-.18-.86-.43-1.21-.75-.35-.32-.64-.7-.84-1.11-.2-.41-.31-.85-.31-1.29 0-.25.02-.5.06-.75.04-.25.1-.49.18-.72zm-.45 4.38c.2.41.49.79.84 1.11.35.32.76.57 1.21.75.45.18.94.27 1.43.27.22 0 .44-.023.65-.07.21-.046.33-.097.36-.147.03-.05.02-.104-.16-.155-.14-.515-.38-.103-.72-.152-.34-.484-.77-.933-1.26-1.32-.49-.387-1.033-.713-1.61-.96-.97-.41-2.01-.625-3.08-.64-.04.23-.06.47-.06.72 0 .44.11.88.31 1.29z" />
    </svg>
);


// Toolbar Icons
export const BoldIcon = ({ className = "w-4 h-4" }) => <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.1 14.9c1.6-1.6 2.3-3.8 2.3-5.9 0-2.2-.9-4.3-2.3-5.8C12.6 1.7 10.5.8 8.3.8H4v16h5.3c2.1 0 4.1-1 5.4-2.5 1.3-1.5 1.4-3.5.4-5.1zM8 4.8h1.2c1.1 0 2.1.5 2.8 1.2.8.8 1.2 1.8 1.2 2.9s-.4 2.1-1.2 2.8c-.7.8-1.7 1.2-2.8 1.2H8V4.8z"/></svg>;
export const ItalicIcon = ({ className = "w-4 h-4" }) => <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="4" x2="10" y2="4"/><line x1="14" y1="20" x2="5" y2="20"/><line x1="15" y1="4" x2="9" y2="20"/></svg>;
export const StrikethroughIcon = ({ className = "w-4 h-4" }) => <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 4H9a3 3 0 0 0-2.83 2H4a1 1 0 0 0 0 2h2.17A3 3 0 0 0 9 10h6a1 1 0 0 0 0-2h-6a1 1 0 0 1-1-1 1 1 0 0 1 1-1h7a1 1 0 0 0 0-2Zm-2 14H7a3 3 0 0 1-2.83-2H2a1 1 0 0 1 0-2h2.17A3 3 0 0 1 7 14h5a1 1 0 0 1 0 2h-5a1 1 0 0 0-1 1 1 1 0 0 0 1 1h7a1 1 0 0 1 0 2Z"/><line x1="4" y1="12" x2="20" y2="12"/></svg>;
export const LinkIcon = ({ className = "w-4 h-4" }) => <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.72"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.72-1.72"/></svg>;
export const CodeIcon = ({ className = "w-4 h-4" }) => <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>;
export const QuoteIcon = ({ className = "w-4 h-4" }) => <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 2v6h3"/><path d="M14 21c3 0 7-1 7-8V5c0-1.25-.75-2.017-2-2h-4c-1.25 0-2 .75-2 2v6h3"/></svg>;
export const UnorderedListIcon = ({ className = "w-4 h-4" }) => <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" x2="21" y1="6" y2="6"/><line x1="8" x2="21" y1="12" y2="12"/><line x1="8" x2="21" y1="18" y2="18"/><line x1="3" x2="3.01" y1="6" y2="6"/><line x1="3" x2="3.01" y1="12" y2="12"/><line x1="3" x2="3.01" y1="18" y2="18"/></svg>;
export const OrderedListIcon = ({ className = "w-4 h-4" }) => <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="10" x2="21" y1="6" y2="6"/><line x1="10" x2="21" y1="12" y2="12"/><line x1="10" x2="21" y1="18" y2="18"/><path d="M4 6h1v4"/><path d="M4 10h2"/><path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1"/></svg>;
