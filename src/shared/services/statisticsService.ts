import type { ServiceStatistics } from '../types/types';
import { getServicesForStats } from './supabaseService';

type RawStat = { tipo_servicio: string; estado_final?: string };

const groupByType = (services: RawStat[]): Record<string, number> =>
  services.reduce((acc, service) => {
    const key = service.tipo_servicio || 'Sin Tipo';
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

const groupByState = (services: RawStat[]): Record<string, number> =>
  services
    .filter(s => s.estado_final)
    .reduce((acc, service) => {
      const key = service.estado_final!;
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

const toChartEntries = (record: Record<string, number>) =>
  Object.entries(record).map(([label, count]) => ({ label, count }));

export const getStatistics = async (): Promise<ServiceStatistics> => {
  const services = await getServicesForStats();

  return {
    total:   services.length,
    byType:  toChartEntries(groupByType(services)),
    byState: toChartEntries(groupByState(services)),
  };
};
