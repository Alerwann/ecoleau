
import { useState, useEffect } from 'react';
import { getProfilsWithoutAccount } from '../services/userProfilService';



export const useProfilsWithoutAccount = () => {
  const [profils, setProfils] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProfils = async () => {
    setLoading(true);
    try {
      const data = await getProfilsWithoutAccount();
      setProfils(data.profils);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfils();
  }, []);

  return { profils, loading, error, refetch: fetchProfils };
};