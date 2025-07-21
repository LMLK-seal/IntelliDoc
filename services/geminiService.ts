import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { AITask, Tone } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
const model = 'gemini-2.5-flash-preview-04-17';

const getPrompt = (task: AITask, content: string, options?: { tone?: Tone; selection?: string }): string => {
    const selection = options?.selection ? `\n\nHere is the specific selection to focus on:\n\`\`\`\n${options.selection}\n\`\`\`` : '';

    switch (task) {
        case AITask.Summarize:
            return `Generate a concise, one-paragraph executive summary for the following document. The summary should be formatted in Markdown.\n\nDocument:\n${content}`;
        case AITask.ChangeTone:
            return `Rewrite the following document to have a "${options?.tone || 'professional'}" tone. Retain the original Markdown formatting. Do not add any new headers or sections. Only return the rewritten document.\n\nDocument:\n${content}`;
        case AITask.GenerateToC:
            return `Generate a Markdown-formatted Table of Contents for the following document based on its headers. Do not include a "Table of Contents" heading, just the list itself.\n\nDocument:\n${content}`;
        case AITask.SuggestPageBreaks:
            return `Analyze the following Markdown document and insert the page break token '---page-break---' at logical points to improve readability for a PDF document. Insert the token on its own line with blank lines before and after. Do not change any other content. Do not add any explanation.\n\nDocument:\n${content}`;
        case AITask.CreateGlossary:
            return `Scan the following document for technical terms or acronyms. Generate a Markdown-formatted glossary with definitions for them. Format it with a "## Glossary" heading. If no terms are found, return an empty string.\n\nDocument:\n${content}`;
        case AITask.ExplainSelection:
            if (!selection) return "No text selected to explain.";
            return `Explain the following text or code snippet in simple, plain English. Format the explanation as a Markdown blockquote.${selection}`;
        case AITask.FixGrammar:
            return `Correct any grammar and spelling errors in the following text. Retain the original Markdown formatting. Only return the corrected text, without any additional explanations or pleasantries.\n\nText:\n\`\`\`\n${options?.selection || content}\n\`\`\``;
        case AITask.Elaborate:
            if (!options?.selection) return "No text selected to elaborate on.";
            return `Elaborate on the following selection, expanding it with more detail, examples, or deeper explanation. Return only the elaborated text, maintaining markdown formatting. Do not add any conversational filler or introductory phrases like "Here is the elaborated text:".\n\nSelection to elaborate on:\n\`\`\`\n${options.selection}\n\`\`\``;
        default:
            return content;
    }
};


export const runAiTask = async (task: AITask, content: string, options?: { tone?: Tone; selection?: string }): Promise<string> => {
    const prompt = getPrompt(task, content, options);

    try {
        const response: GenerateContentResponse = await ai.models.generateContent({
            model: model,
            contents: prompt,
        });
        return response.text;
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        throw new Error("Failed to get response from AI. Check console for details.");
    }
};

export const generateThemeClasses = async (description: string): Promise<string> => {
    const prompt = `
    Generate a string of Tailwind CSS utility classes to style a document preview container based on this description: "${description}".
    The classes should style background color, text color, and overall typography.
    Use Tailwind's Typography plugin (@tailwindcss/typography) 'prose' classes for beautiful article styling.
    For dark themes, use 'prose-invert'.
    Only provide the space-separated class names for the parent div and nothing else.
    Example response: "bg-slate-900 text-gray-300 prose prose-invert max-w-none prose-h1:text-blue-400"
    `;

    try {
        const response: GenerateContentResponse = await ai.models.generateContent({
            model: model,
            contents: prompt,
            config: {
                temperature: 0.5,
            }
        });
        // Clean up the response to ensure it's just class names
        return response.text.trim().replace(/`/g, "").replace(/["']/g, "");
    } catch (error) {
        console.error("Error calling Gemini API for theme generation:", error);
        throw new Error("Failed to generate theme from AI.");
    }
};