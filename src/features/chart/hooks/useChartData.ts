import { useState, useEffect } from 'react';
import { getServices } from '../../../shared/services/supabaseService';
import type { Service } from '../../../shared/types/types';

export interface ChartData {
  servicesByType: Record<string, number>;
  servicesByDate: Record<string, number>;
}

export const useChartData = () => {
  const [data, setData]       = useState<ChartData | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState<string | undefined>(undefined);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const services: Service[] = await getServices();

        const servicesByType = services.reduce((acc, s) => {
          acc[s.tipo_servicio] = (acc[s.tipo_servicio] || 0) + 1;
          return acc;
        }, {} as Record<string, number>);

        const servicesByDate = services.reduce((acc, s) => {
          acc[s.fecha] = (acc[s.fecha] || 0) + 1;
          return acc;
        }, {} as Record<string, number>);

        setData({ servicesByType, servicesByDate });
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