import { createContext, useContext } from 'react';
import { AuthContextType } from './interfaces';

export const Pr0dContext = createContext<AuthContextType | undefined>(undefined);

export const usePr0d = () => {
    const context = useContext(Pr0dContext);
    if (!context) {
        throw new Error('usePr0d must be used within a <Pr0dContext.Provider>');
    }
    return context;
};