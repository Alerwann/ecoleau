import { useContext } from 'react';
import userContext from '../contexts/UserContext';

export const useUser = () => {
  const context = useContext(userContext);
  if (!context) {
    throw new Error('useUser doit être utilisé dans UserProvider');
  }
  return context;
};