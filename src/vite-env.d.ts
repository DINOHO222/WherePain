/// <reference types="vite/client" />

interface ImportMetaEnv {
    // Add other frontend environment variables here if needed in the future
    // e.g., VITE_API_URL: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
