
import React, { useMemo, useRef, forwardRef } from 'react';
import { BoldIcon, ItalicIcon, StrikethroughIcon, LinkIcon, CodeIcon, QuoteIcon, UnorderedListIcon, OrderedListIcon } from '../constants';


const EditorStatusBar: React.FC<{ content: string; isSaved: boolean }> = ({ content, isSaved }) => {
  const { wordCount, charCount, readingTime } = useMemo(() => {
    const words = content.trim().split(/\s+/).filter(Boolean);
    const wordCount = words.length;
    const charCount = content.length;
    const readingTime = Math.ceil(wordCount / 200);
    return { wordCount, charCount, readingTime };
  }, [content]);

  return (
    <div className="bg-slate-700/50 px-4 py-1 text-xs text-slate-400 flex items-center justify-between border-t border-slate-600">
        <div>
           {isSaved && <span className="text-green-400">Saved</span>}
        </div>
        <div className="flex items-center justify-end gap-x-4">
            <span>{charCount} Characters</span>
            <span>{wordCount} Words</span>
            <span>~{readingTime} min read</span>
        </div>
    </div>
  );
};

const ToolbarButton: React.FC<{ onClick: () => void; title: string; children: React.ReactNode }> = ({ onClick, title, children }) => (
    <button
        type="button"
        onClick={onClick}
        title={title}
        className="p-2 rounded hover:bg-slate-600 text-slate-300 hover:text-white transition-colors"
    >
        {children}
    </button>
);


interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  onScroll?: (event: React.UIEvent<HTMLTextAreaElement>) => void;
  isSaved: boolean;
}

const MarkdownEditor = forwardRef<HTMLTextAreaElement, MarkdownEditorProps>(({ value, onChange, disabled, onScroll, isSaved }, ref) => {
    const internalRef = useRef<HTMLTextAreaElement>(null);
    const editorRef = ref || internalRef;

    const applyStyle = (syntax: { start: string, end?: string, placeholder?: string }) => {
        const textarea = (editorRef as React.RefObject<HTMLTextAreaElement>).current;
        if (!textarea) return;

        const { selectionStart, selectionEnd, value } = textarea;
        const selectedText = value.substring(selectionStart, selectionEnd);
        
        const placeholder = syntax.placeholder || "text";
        const endSyntax = syntax.end || syntax.start;

        let newText;
        if (selectedText) {
            newText = `${value.substring(0, selectionStart)}${syntax.start}${selectedText}${endSyntax}${value.substring(selectionEnd)}`;
            textarea.selectionStart = selectionStart + syntax.start.length;
            textarea.selectionEnd = selectionEnd + syntax.start.length;
        } else {
            newText = `${value.substring(0, selectionStart)}${syntax.start}${placeholder}${endSyntax}${value.substring(selectionEnd)}`;
            textarea.selectionStart = selectionStart + syntax.start.length;
            textarea.selectionEnd = selectionStart + syntax.start.length + placeholder.length;
        }
        onChange(newText);
        textarea.focus();
    };

    const applyList = (type: 'ul' | 'ol') => {
        const textarea = (editorRef as React.RefObject<HTMLTextAreaElement>).current;
        if (!textarea) return;

        const { selectionStart, value } = textarea;
        const currentLineStart = value.lastIndexOf('\n', selectionStart - 1) + 1;
        const prefix = type === 'ul' ? '- ' : '1. ';
        const newText = `${value.substring(0, currentLineStart)}${prefix}${value.substring(currentLineStart)}`;
        
        onChange(newText);
        textarea.focus();
        setTimeout(() => {
            textarea.selectionStart = textarea.selectionEnd = selectionStart + prefix.length;
        }, 0);
    };

    const applyLink = () => {
        const textarea = (editorRef as React.RefObject<HTMLTextAreaElement>).current;
        if (!textarea) return;
        const { selectionStart, selectionEnd, value } = textarea;
        const selectedText = value.substring(selectionStart, selectionEnd);
        const linkText = selectedText || "link text";
        const newText = `${value.substring(0, selectionStart)}[${linkText}](url)${value.substring(selectionEnd)}`;
        onChange(newText);
        textarea.focus();
        setTimeout(() => {
            if(selectedText){
                textarea.selectionStart = selectionStart + linkText.length + 3;
                textarea.selectionEnd = selectionStart + linkText.length + 6;
            } else {
                textarea.selectionStart = selectionStart + 1;
                textarea.selectionEnd = selectionStart + 1 + linkText.length;
            }
        }, 0);
    };

  return (
    <div className="h-full flex flex-col bg-slate-800 rounded-lg overflow-hidden border border-slate-700">
      <div className="bg-slate-700 px-2 py-1 text-sm font-semibold text-white border-b border-slate-600 flex items-center justify-between">
        <span>Markdown Editor</span>
        <div className="flex items-center">
            <ToolbarButton onClick={() => applyStyle({ start: '**' })} title="Bold (Ctrl+B)"><BoldIcon /></ToolbarButton>
            <ToolbarButton onClick={() => applyStyle({ start: '*' })} title="Italic (Ctrl+I)"><ItalicIcon /></ToolbarButton>
            <ToolbarButton onClick={() => applyStyle({ start: '~~' })} title="Strikethrough"><StrikethroughIcon /></ToolbarButton>
            <ToolbarButton onClick={applyLink} title="Insert Link (Ctrl+K)"><LinkIcon /></ToolbarButton>
            <ToolbarButton onClick={() => applyStyle({ start: '`' })} title="Code"><CodeIcon /></ToolbarButton>
            <ToolbarButton onClick={() => applyList('ul')} title="Bulleted List"><UnorderedListIcon /></ToolbarButton>
            <ToolbarButton onClick={() => applyList('ol')} title="Numbered List"><OrderedListIcon /></ToolbarButton>
            <ToolbarButton onClick={() => applyStyle({ start: '> ', end: '', placeholder: 'Quote' })} title="Blockquote"><QuoteIcon /></ToolbarButton>
        </div>
      </div>
      <textarea
        ref={editorRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onScroll={onScroll}
        disabled={disabled}
        className="flex-grow p-4 bg-slate-800 text-slate-200 font-mono text-sm resize-none focus:outline-none disabled:opacity-70"
        placeholder="Start writing your document here..."
      />
      <EditorStatusBar content={value} isSaved={isSaved}/>
    </div>
  );
});

export default MarkdownEditor;
