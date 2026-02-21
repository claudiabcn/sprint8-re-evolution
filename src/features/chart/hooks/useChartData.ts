import { useState, useEffect } from 'react';
import { getStatistics } from '../../../shared/services/statisticsService';
import { getServices } from '../../../shared/services/supabaseService';
import { SERVICE_TYPES } from '../../../shared/constants/constants';
import { BAR_COLORS } from '../../../config/appData';
import type { ServiceStatistics, Service } from '../../../shared/types/types';

export const useChartData = () => {
  const [data, setData] = useState<any>(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [stats, services] = await Promise.all([
          getStatistics(),
          getServices()
        ]);

        const durationData = processMonthlyDurations(services);
        setData({ ...stats, byDuration: durationData });
      } catch (err) {
        setError('Error al cargar los datos');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return { data, loading, error };
};

function processMonthlyDurations(services: Service[]) {
  const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
  
  const datasets = SERVICE_TYPES.map((type, index) => {
    const monthlyMinutes = new Array(12).fill(0);

    services
      .filter(s => s.tipo_servicio === type)
      .forEach(s => {
        const monthIndex = new Date(s.fecha).getMonth();
        const mins = parseInt(s.duracion?.split(' ')[0] || '0');
        monthlyMinutes[monthIndex] += mins;
      });

    return {
      label: type,
      data: monthlyMinutes,
      backgroundColor: BAR_COLORS.background[index],
      borderColor: BAR_COLORS.border[index],
      borderWidth: 2,
      borderRadius: 6,
    };
  });

  return { labels: months, datasets };
}