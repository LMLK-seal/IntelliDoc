
import React, { useState, useEffect, useRef, useCallback } from 'react';
import MarkdownEditor from './components/MarkdownEditor';
import Preview from './components/Preview';
import { INITIAL_MARKDOWN, LoadingSpinner, DownloadIcon, CoffeeIcon, FocusIcon, FileDownIcon } from './constants';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const App: React.FC = () => {
    const [markdown, setMarkdown] = useState<string>(() => {
        const savedMarkdown = localStorage.getItem('intellidoc_markdown');
        return savedMarkdown || INITIAL_MARKDOWN;
    });
    const [isPdfLoading, setIsPdfLoading] = useState<boolean>(false);
    const [isFocusMode, setIsFocusMode] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [isSaved, setIsSaved] = useState<boolean>(true);

    const editorRef = useRef<HTMLTextAreaElement>(null);
    const previewRef = useRef<HTMLDivElement>(null);
    const scrollTimeoutRef = useRef<number | null>(null);
    const isSyncingScroll = useRef<boolean>(false);

    // Debounced save to local storage
    useEffect(() => {
        setIsSaved(false);
        const handler = setTimeout(() => {
            localStorage.setItem('intellidoc_markdown', markdown);
            setIsSaved(true);
        }, 500); // 500ms debounce time

        return () => {
            clearTimeout(handler);
        };
    }, [markdown]);


    const handleScroll = (source: 'editor' | 'preview') => {
        if (isSyncingScroll.current) return;
        
        isSyncingScroll.current = true;
    
        const editor = editorRef.current;
        const preview = previewRef.current;
    
        if (editor && preview) {
            if (source === 'editor') {
                const scrollPercentage = editor.scrollTop / (editor.scrollHeight - editor.clientHeight);
                preview.scrollTop = scrollPercentage * (preview.scrollHeight - preview.clientHeight);
            } else {
                const scrollPercentage = preview.scrollTop / (preview.scrollHeight - preview.clientHeight);
                editor.scrollTop = scrollPercentage * (editor.scrollHeight - editor.clientHeight);
            }
        }
        
        // Use a timeout to reset the lock, preventing jittery feedback loops
        if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
        scrollTimeoutRef.current = window.setTimeout(() => {
            isSyncingScroll.current = false;
        }, 50); // A short delay to allow scroll to settle
    };

    const handleDownloadMd = () => {
        try {
            const blob = new Blob([markdown], { type: 'text/markdown;charset=utf-8' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'IntelliDoc-Document.md';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        } catch (e: any) {
            setError(e.message || 'Failed to download .md file.');
        }
    };

    const handleExportPdf = async () => {
        setIsPdfLoading(true);
        setError(null);
        
        const wasFocusMode = isFocusMode;
        if (wasFocusMode) {
            setIsFocusMode(false);
            await new Promise(resolve => setTimeout(resolve, 100));
        }

        const previewContainer = document.getElementById('preview-container');
        const previewContent = document.getElementById('preview-content');
        if (!previewContent || !previewContainer) {
            setError("Preview element not found for PDF export.");
            setIsPdfLoading(false);
            if(wasFocusMode) setIsFocusMode(true);
            return;
        }

        const originalHeight = previewContainer.style.height;
        const originalOverflow = previewContainer.style.overflowY;

        try {
            previewContainer.style.height = 'auto';
            previewContainer.style.overflowY = 'visible';

            const canvas = await html2canvas(previewContent, {
                scale: 2,
                useCORS: true,
                backgroundColor: '#1e293b', // bg-slate-800
                windowWidth: previewContent.scrollWidth,
                windowHeight: previewContent.scrollHeight,
            });
            
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'pt',
                format: 'a4',
            });
    
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
            const canvasWidth = canvas.width;
            const canvasHeight = canvas.height;
            const ratio = canvasWidth / pdfWidth;
            const imgHeight = canvasHeight / ratio;

            let heightLeft = imgHeight;
            let position = 0;
            
            pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeight);
            heightLeft -= pdfHeight;

            while (heightLeft > 0) {
                position -= pdfHeight;
                pdf.addPage();
                pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeight);
                heightLeft -= pdfHeight;
            }
    
            pdf.save('IntelliDoc-Document.pdf');
    
        } catch (e: any) {
            setError(e.message || 'Failed to export PDF.');
        } finally {
            previewContainer.style.height = originalHeight;
            previewContainer.style.overflowY = originalOverflow;
            if(wasFocusMode) setIsFocusMode(true);
            setIsPdfLoading(false);
        }
    };

    const toggleFocusMode = () => {
        setIsFocusMode(!isFocusMode);
    };

    return (
        <div className="min-h-screen bg-slate-900 text-white font-sans p-4 relative">
            <header className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
                <div className="text-center md:text-left">
                    <h1 className="text-4xl font-bold text-sky-400">IntelliDoc</h1>
                    <p className="text-slate-400">Your Markdown Studio</p>
                </div>
                <div className="flex items-center justify-center shrink-0 gap-2">
                     <button 
                        onClick={toggleFocusMode} 
                        title={isFocusMode ? "Exit Focus Mode" : "Enter Focus Mode"}
                        aria-label={isFocusMode ? "Exit Focus Mode" : "Enter Focus Mode"}
                        className={`flex items-center justify-center p-2 sm:px-4 font-semibold rounded-lg shadow-md transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-slate-900 ${isFocusMode ? 'bg-sky-600 text-white hover:bg-sky-500' : 'bg-slate-700 text-sky-300 hover:bg-slate-600'}`}>
                        <FocusIcon className="h-5 w-5 sm:mr-2" />
                        <span className="hidden sm:inline">Focus Mode</span>
                    </button>
                    <button 
                        onClick={handleDownloadMd} 
                        title="Download Markdown file"
                        aria-label="Download Markdown file"
                        className="flex items-center justify-center p-2 sm:px-4 bg-slate-700 text-sky-300 font-semibold rounded-lg shadow-md hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-slate-900 transition-colors">
                        <FileDownIcon className="h-5 w-5 sm:mr-2" />
                        <span className="hidden sm:inline">Download .md</span>
                    </button>
                    <button onClick={handleExportPdf} disabled={isPdfLoading} className="flex items-center justify-center p-2 sm:px-4 bg-slate-700 text-sky-300 font-semibold rounded-lg shadow-md hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-slate-900 transition-colors disabled:bg-slate-500 disabled:cursor-not-allowed">
                        {isPdfLoading ? <LoadingSpinner/> : <DownloadIcon className="h-5 w-5 sm:mr-2" />}
                        <span className="hidden sm:inline">Export to PDF</span>
                    </button>
                </div>
            </header>
            
            {error && (
                <div className="bg-red-500/30 border border-red-500 text-red-200 px-4 py-3 rounded-lg relative mb-4" role="alert">
                    <strong className="font-bold">Error: </strong>
                    <span className="block sm:inline">{error}</span>
                </div>
            )}

            <main className={`grid gap-4 h-[85vh] ${isFocusMode ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-2'}`}>
                <div className="relative">
                    <MarkdownEditor 
                        ref={editorRef}
                        value={markdown} 
                        onChange={setMarkdown} 
                        disabled={isPdfLoading} 
                        onScroll={() => handleScroll('editor')}
                        isSaved={isSaved}
                    />
                </div>
                
                <div className={`bg-slate-800 rounded-lg flex-col overflow-hidden relative border border-slate-700 ${isFocusMode ? 'hidden' : 'flex'}`}>
                    <div className="bg-slate-700 px-4 py-2 text-sm font-semibold text-white">Live Preview</div>
                    <Preview 
                        ref={previewRef}
                        content={markdown}
                        onScroll={() => handleScroll('preview')}
                    />
                </div>
            </main>
            
            <a
                href="https://buymeacoffee.com/yaniv1"
                target="_blank"
                rel="noopener noreferrer"
                title="Support the developer"
                className="fixed bottom-4 right-4 z-50 flex items-center px-4 py-2 bg-amber-500 text-slate-900 font-semibold rounded-lg shadow-lg hover:bg-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-slate-900 transition-transform transform hover:scale-105"
                aria-label="Buy me a coffee, support the developer"
            >
                <CoffeeIcon />
                Buy Me a Coffee
            </a>
        </div>
    );
};

export default App;
