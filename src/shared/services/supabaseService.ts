import { supabase } from '../../lib/supabase'; 
import type { Service, ServiceStatistics } from '../types/types';

const mapService = (service: any): Service => ({
  ...service,
  notas: service.notas ?? undefined,
  estado_final: service.estado_final ?? undefined,
  duracion: service.duracion ?? undefined,
  ubicacion: service.ubicacion ?? undefined,
  lat: service.lat ?? undefined,
  lng: service.lng ?? undefined,
});

const sanitizeForDB = (service: Partial<Service>) => {
  const clean = { ...service };
  Object.keys(clean).forEach(key => {
    if (clean[key as keyof Service] === undefined) {
      delete clean[key as keyof Service];
    }
  });
  return clean;
};

export const getServices = async (): Promise<Service[]> => {
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .order('fecha', { ascending: false });

  if (error) throw error;
  return (data || []).map(mapService);
};

export const getServiceById = async (id: string): Promise<Service | undefined> => {
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;
  return data ? mapService(data) : undefined;
};

export const createService = async (service: Service): Promise<Service> => {
  const { data, error } = await supabase
    .from('services')
    .insert([sanitizeForDB(service)]) 
    .select()
    .single();

  if (error) throw error;
  return mapService(data);
};

export const updateService = async (id: string, service: Partial<Service>): Promise<Service> => {
  const { data, error } = await supabase
    .from('services')
    .update(sanitizeForDB(service)) 
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return mapService(data);
};

export const deleteService = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('services')
    .delete()
    .eq('id', id);

  if (error) throw error;
};

export const getStatistics = async (): Promise<ServiceStatistics> => {
  const { data: services, error } = await supabase
    .from('services')
    .select('tipo_servicio, estado_final');

  if (error) throw error;

  const byType = services.reduce((acc: Record<string, number>, service) => {
    const key = service.tipo_servicio || 'Sin Tipo';
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});

  const byState = services
    .filter(s => s.estado_final) 
    .reduce((acc: Record<string, number>, service) => {
      const key = service.estado_final || 'Desconocido'; 
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});

  return {
    total: services.length,
    byType:  Object.entries(byType).map(([key, value])  => ({ label: key, count: value })),
    byState: Object.entries(byState).map(([key, value]) => ({ label: key, count: value }))
  };
};

export const getServicesWithLocation = async (): Promise<Service[]> => {
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .not('lat', 'is', null)
    .not('lng', 'is', null)
    .order('fecha', { ascending: false });

  if (error) throw error;
  return (data || []).map(mapService);
};