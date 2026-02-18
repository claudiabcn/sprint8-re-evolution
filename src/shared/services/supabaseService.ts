import { createClient } from '@supabase/supabase-js';
import type { Service, ServiceStatistics } from '../types/types';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export const getServices = async (): Promise<Service[]> => {
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .order('fecha', { ascending: false });

  if (error) throw error;

  return data || [];
};

export const getServiceById = async (id: string): Promise<Service | null> => {
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;

  return data;
};

export const createService = async (service: Service): Promise<Service> => {
  const { data, error } = await supabase
    .from('services')
    .insert([service])
    .select()
    .single();

  if (error) throw error;

  return data;
};

export const updateService = async (id: string, service: Partial<Service>): Promise<Service> => {
  const { data, error } = await supabase
    .from('services')
    .update(service)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;

  return data;
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

  const byType = services.reduce((acc: any, service) => {
    acc[service.tipo_servicio] = (acc[service.tipo_servicio] || 0) + 1;
    return acc;
  }, {});

  const byState = services
    .filter(s => s.estado_final)
    .reduce((acc: any, service) => {
      acc[service.estado_final] = (acc[service.estado_final] || 0) + 1;
      return acc;
    }, {});

  return {
    total: services.length,
    byType:  Object.entries(byType).map(([key, value])  => ({ label: key, count: value })),
    byState: Object.entries(byState).map(([key, value]) => ({ label: key, count: value }))
  };
};


















