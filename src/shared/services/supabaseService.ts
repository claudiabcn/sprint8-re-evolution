import { createClient } from '@supabase/supabase-js';


const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export interface Service {
  id?: string;
  fecha: string;
  tipo_servicio: string;
  entidad: string;
  tipo?: string;
  duracion?: string;
  ubicacion?: string;
  estado_final?: string;
  notas?: string;
  created_at?: string;
}

export const getServices = async (): Promise<Service[]> => {
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .order('fecha', { ascending: false });

  if (error) {
    console.error('Error fetching services:', error);
    throw error;
  }

  return data || [];
};


export const getServiceById = async (id: string): Promise<Service | null> => {
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching service:', error);
    throw error;
  }

  return data;
};

export const createService = async (service: Service): Promise<Service> => {
  const { data, error } = await supabase
    .from('services')
    .insert([service])
    .select()
    .single();

  if (error) {
    console.error('Error creating service:', error);
    throw error;
  }

  return data;
};


export const updateService = async (id: string, service: Partial<Service>): Promise<Service> => {
  const { data, error } = await supabase
    .from('services')
    .update(service)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating service:', error);
    throw error;
  }

  return data;
};


export const deleteService = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('services')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting service:', error);
    throw error;
  }
};


export const getStatistics = async () => {
  const { data: services, error } = await supabase
    .from('services')
    .select('tipo_servicio, estado_final');

  if (error) {
    console.error('Error fetching statistics:', error);
    throw error;
  }


  const byType = services.reduce((acc: any, service) => {
    const type = service.tipo_servicio;
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {});


  const byState = services
    .filter(s => s.estado_final)
    .reduce((acc: any, service) => {
      const state = service.estado_final;
      acc[state] = (acc[state] || 0) + 1;
      return acc;
    }, {});

  return {
    total: services.length,
    byType: Object.entries(byType).map(([key, value]) => ({ _id: key, count: value })),
    byState: Object.entries(byState).map(([key, value]) => ({ _id: key, count: value }))
  };
};