import { createContext, useContext, useState, ReactNode } from 'react';
import { LocalStorageKeys } from '../models/enums/localStorageKeys';
import { getUserIdFromLocalStorage } from '../utils/getUserId';

// Define the shape of the context
interface AppContextType {
  userId: string;
  setUserId: (userId: string) => void;
}

// Create the context with a default value
const AppContext = createContext<AppContextType | undefined>(undefined);

// Provider component
export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [userId, setUserId] = useState<string>(getUserIdFromLocalStorage());

  return (
    <AppContext.Provider value={{ userId, setUserId: setUserId }}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use context
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
