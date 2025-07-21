
export enum AITask {
  Summarize = 'Summarize Document',
  ChangeTone = 'Change Tone',
  GenerateToC = 'Generate Table of Contents',
  SuggestPageBreaks = 'Suggest Page Breaks',
  CreateGlossary = 'Create Glossary',
  ExplainSelection = 'Explain Selection',
  FixGrammar = 'Fix Grammar & Spelling',
  Elaborate = 'Elaborate on Selection',
}

export enum Tone {
  Formal = 'Formal Academic',
  Casual = 'Casual Blog Post',
  Corporate = 'Corporate Whitepaper',
  Technical = 'Technical Documentation',
  Creative = 'Creative & Engaging',
}

export type Theme = {
  name: string;
  classes: string;
};
