/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_REACT_APP_OPENAI_API_KEY: string;
    readonly VITE_REACT_APP_API_URL: string;
    readonly VITE_REACT_APP_GOOGLE_CLIENT_ID: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}