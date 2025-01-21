import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    ...(process.env.VITE_ENV !== 'dev' && { base: "https://node03.cs.colman.ac.il/public/client" }),
    plugins: [react()],
    define: {
      "__REACT_APP_OPENAI_API_KEY__": `"${process.env.VITE_REACT_APP_OPENAI_API_KEY}"`,
      "__REACT_APP_API_URL__": `"${process.env.VITE_REACT_APP_API_URL}"`,
      "__REACT_APP_GOOGLE_CLIENT_ID__": `"${process.env.VITE_REACT_APP_GOOGLE_CLIENT_ID}"`
    }
  })
}