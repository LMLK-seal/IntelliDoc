# IntelliDoc

![Language](https://img.shields.io/badge/Language-TypeScript-blue.svg)
![Framework](https://img.shields.io/badge/Framework-React-61DAFB.svg)
![Build Tool](https://img.shields.io/badge/Build%20Tool-Vite-purple.svg)
![License](https://img.shields.io/badge/License-MIT-green.svg)

## Description

IntelliDoc is an intelligent markdown editor designed to streamline your content creation workflow. It combines a robust markdown editing experience with the power of artificial intelligence, enabling AI-assisted content generation and enhancement directly within your editor. Beyond editing, IntelliDoc allows users to seamlessly preview their markdown and export it to various formats, such as PDF and images, making document sharing and publishing effortless.

## ✨ Features

*   **Real-time Markdown Editor**: Write and format your content with a live preview.
*   **GitHub Flavored Markdown (GFM) Support**: Enjoy extended markdown syntax for tables, task lists, and more.
*   **Syntax Highlighting**: Beautifully rendered code blocks with `react-syntax-highlighter`.
*   **Export Functionality**: Export your markdown content to PDF or image (PNG/JPEG) formats for easy sharing and distribution.
*   **Responsive Design**: A clean and intuitive user interface that adapts to various screen sizes.

## 📚 Tech Stack

*   **Frontend**:
    *   [React](https://react.dev/) - A JavaScript library for building user interfaces.
    *   [TypeScript](https://www.typescriptlang.org/) - A strongly typed superset of JavaScript.
    *   [Vite](https://vitejs.dev/) - A fast and opinionated build tool for modern web projects.
*   **AI Integration**:
    *   [`@google/genai`](https://github.com/google/generative-ai-js) - Official Google Generative AI SDK for JavaScript.
*   **Markdown Processing**:
    *   [`react-markdown`](https://github.com/remarkjs/react-markdown) - Renders markdown as React components.
    *   [`remark-gfm`](https://github.com/remarkjs/remark-gfm) - Plugin to support GitHub Flavored Markdown.
    *   [`rehype-raw`](https://github.com/rehypejs/rehype-raw) - Plugin to parse raw HTML in markdown.
    *   [`react-syntax-highlighter`](https://github.com/react-syntax-highlighter/react-syntax-highlighter) - Syntax highlighting for code blocks.
*   **Exporting**:
    *   [`html2canvas`](https://html2canvas.hertzen.com/) - Renders an HTML document to a canvas, useful for image export.
    *   [`jspdf`](https://raw.githack.com/MrRio/jsPDF/master/docs/index.html) - A client-side JavaScript PDF generation library.

## 🚀 Installation

To get IntelliDoc up and running on your local machine for development and testing, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/LMLK-seal/IntelliDoc.git
    cd IntelliDoc
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Start the development server:**
    ```bash
    npm run dev
    # or
    yarn dev
    ```
    The application will typically be accessible at `http://localhost:5173`.

## ▶️ Usage

Once the application is running:

1.  **Write Markdown**: Use the left pane to type or paste your markdown content. The right pane will display a live preview.
2.  **AI Assistance**: Look for features integrated with Gemini (e.g., a button to "Generate Content", "Summarize", "Rephrase").
3.  **Export**: Utilize the export options (e.g., "Export to PDF", "Export to Image") to save your document in desired formats.

## 🤝 Contributing

Contributions are welcome! If you have suggestions for improvements or new features, feel free to open an issue or submit a pull request.

1.  Fork the repository.
2.  Create your feature branch (`git checkout -b feature/AmazingFeature`).
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4.  Push to the branch (`git push origin feature/AmazingFeature`).
5.  Open a Pull Request.

Please ensure your code adheres to the existing coding style and includes relevant tests.

## 📝 License

Distributed under the MIT License. See `LICENSE` for more information.
