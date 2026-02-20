import { useState, useEffect } from 'react';
import { getServices, deleteService } from '../../../shared/services/supabaseService';
import type { Service } from '../../../shared/types/types';

export function useServices() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => { loadServices(); }, []);

  const loadServices = async () => {
    try {
      setLoading(true);
      setError(undefined);
      const data = await getServices();
      setServices(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar los registros');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      setError(undefined);
      await deleteService(id);
      await loadServices();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al eliminar el registro');
    }
  };

  return { services, loading, error, setError, handleDelete, loadServices };
}
