import { useContext } from 'react';
import ProfilContext from '../contexts/ProfilContext';

export const useProfil = () => {
  const context = useContext(ProfilContext);
  if (!context) {
    throw new Error("useProfil must be used within a ProfilProvider");
  }
  return context;
};