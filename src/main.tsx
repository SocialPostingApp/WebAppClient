import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AppProvider } from './context/appContext.tsx';

const queryClient = new QueryClient();

const googleClientId = import.meta.env.VITE_REACT_APP_GOOGLE_CLIENT_ID;

if (!googleClientId) {
  throw new Error('Google Client ID is not defined in environment variables');
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <GoogleOAuthProvider clientId={googleClientId}>
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <App />
      </AppProvider>
    </QueryClientProvider>
  </GoogleOAuthProvider>
);
