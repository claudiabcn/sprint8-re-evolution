import { useState, useEffect } from 'react';
import { getServicesWithLocation } from '../../../shared/services/supabaseService';
import type { Service } from '../../../shared/types/types';

export const useLocations = () => {
  const [locations, setLocations] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        setLoading(true);
        setError(undefined);
        const data = await getServicesWithLocation();
        setLocations(data);
      } catch (err) {
        setError('Error al cargar las ubicaciones');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchLocations();
  }, []);

  return { locations, loading, error };
};