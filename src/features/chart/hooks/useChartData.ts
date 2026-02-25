import { useState, useEffect } from 'react';
import { getStatistics } from '../../../shared/services/statisticsService';
import { getServices } from '../../../shared/services/supabaseService';
import { SERVICE_TYPES } from '../../../shared/constants/constants';
import { BAR_COLORS } from '../../../config/appData';
import type { Service } from '../../../shared/types/types';


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
        const byMonths = processMonthlyTypes(services);
        const vestibularStats = processVestibularStats(services);
        setData({ ...stats, byDuration: durationData,vestibularStats, services, byMonths });
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

function processVestibularStats(services: Service[]) {
  const vestibular = services.filter(s => s.tipo_servicio === 'Rehabilitación vestibular');

  // Contar por estado_final
  const stateCount: Record<string, number> = {};
  vestibular.forEach(s => {
    const state = s.estado_final || 'Sin estado';
    stateCount[state] = (stateCount[state] || 0) + 1;
  });
  const byState = Object.entries(stateCount).map(([label, count]) => ({ label, count }));

  // Contar por entidad/ubicacion
  const entityCount: Record<string, number> = {};
  vestibular.forEach(s => {
    const entity = s.entidad || 'Sin entidad';
    entityCount[entity] = (entityCount[entity] || 0) + 1;
  });
  const byEntity = Object.entries(entityCount).map(([label, count]) => ({ label, count }));

  return { byState, byEntity };
}

function processMonthlyTypes(services: Service[]) {
  const MONTH_NAMES = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
                       'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

  const now = new Date();
  const last3 = Array.from({ length: 3 }, (_, i) => {
    const d = new Date(now.getFullYear(), now.getMonth() - (2 - i), 1);
    return { month: d.getMonth(), year: d.getFullYear() };
  });

  return last3.map(({ month, year }) => {
    const monthServices = services.filter(s => {
      const d = new Date(s.fecha);
      return d.getMonth() === month && d.getFullYear() === year;
    });

    const byType = SERVICE_TYPES.map(type => ({
      label: type,
      count: monthServices.filter(s => s.tipo_servicio === type).length,
    })).filter(item => item.count > 0); 

    return {
      month: `${MONTH_NAMES[month]} ${year}`,
      byType,
    };
  });
}

function processMonthlyDurations(services: Service[]) {
  const now = new Date();
  const last6Months = Array.from({ length: 6 }, (_, i) => {
    const d = new Date(now.getFullYear(), now.getMonth() - (5 - i), 1);
    return { month: d.getMonth(), year: d.getFullYear() };
  });

  const monthLabels = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

  const datasets = SERVICE_TYPES.map((type, index) => {
    const monthlyMinutes = last6Months.map(({ month, year }) =>
      services
        .filter(s => {
          const d = new Date(s.fecha);
          return s.tipo_servicio === type && d.getMonth() === month && d.getFullYear() === year;
        })
        .reduce((acc, s) => acc + parseInt(s.duracion?.split(' ')[0] || '0'), 0)
    );

    return {
      label: type,
      data: monthlyMinutes,
      backgroundColor: BAR_COLORS.background[index],
      borderColor: BAR_COLORS.border[index],
      borderWidth: 2,
      borderRadius: 6,
    };
  });

  return {
    labels: last6Months.map(({ month, year }) =>
      `${monthLabels[month]} ${year !== now.getFullYear() ? year : ''}`
    ),
    datasets,
  };
}