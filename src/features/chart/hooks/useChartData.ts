import { useState, useEffect } from 'react';
import { getStatistics } from '../../../shared/services/supabaseService';
import type { ServiceStatistics } from '../../../shared/types/types';

export const useChartData = () => {
  const [data, setData]       = useState<ServiceStatistics | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState<string | undefined>(undefined);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const stats = await getStatistics();
        setData(stats);
      } catch (err) {
        setError('Error al cargar los datos');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};