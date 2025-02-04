import { createContext, useContext, useState, ReactNode } from 'react';
import {
  getUserFromLocalStorage,
  getUserIdFromLocalStorage,
} from '../utils/storageUtils';
import { IUser } from '../models';

// Define the shape of the context
interface AppContextType {
  user: IUser;
  setUser: (userId: IUser) => void;
}

// Create the context with a default value
const AppContext = createContext<AppContextType | undefined>(undefined);

// Provider component
export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IUser>(getUserFromLocalStorage());

  return (
    <AppContext.Provider value={{ user, setUser: setUser }}>
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
