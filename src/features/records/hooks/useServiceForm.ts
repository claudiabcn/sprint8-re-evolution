import { useState, useEffect } from 'react';
import { createService, updateService, Service } from '../../../shared/services/supabaseService';
import { ENTITIES, ENTITY_LOCATIONS } from '../../../shared/constants/constants';

interface UseServiceFormProps {
  service: Service | null;
  onClose: () => void;
  initialDate?: string | null;
  initialServiceType?: string | null; 
}

export function useServiceForm({ 
  service, 
  onClose, 
  initialDate, 
  initialServiceType 
}: UseServiceFormProps) {
  const [formData, setFormData] = useState<Partial<Service>>({
    fecha: initialDate || new Date().toISOString().split('T')[0], 
    tipo_servicio: initialServiceType || '', 
    entidad: '',
    duracion: '',
    ubicacion: '',
    estado_final: '',
    notas: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (service) {
      setFormData({
        ...service,
        fecha: service.fecha.split('T')[0]
      });
    } else {

      setFormData(prev => ({ 
        ...prev, 
        fecha: initialDate || prev.fecha,
        tipo_servicio: initialServiceType || prev.tipo_servicio
      }));
    }
  }, [service, initialDate, initialServiceType]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setError(null);
    const { name, value } = e.target;

    if (name === 'tipo_servicio') {
      setFormData(prev => ({
        ...prev,
        tipo_servicio: value,
        entidad: '', 
        ubicacion: ''
      }));
      return;
    }

    if (name === 'entidad') {
      const location = ENTITY_LOCATIONS[value as keyof typeof ENTITY_LOCATIONS];
      setFormData(prev => ({
        ...prev,
        entidad: value,
        ubicacion: location?.address || ''
      }));
      return;
    }

    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      setLoading(true);
      if (service?.id) {
        await updateService(service.id, formData as Service);
        setSuccess('Servicio actualizado correctamente');
      } else {
        await createService(formData as Service);
        setSuccess('Servicio creado correctamente');
      }
      setTimeout(() => onClose(), 800);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al guardar el servicio');
    } finally {
      setLoading(false);
    }
  };

  const availableEntities = formData.tipo_servicio
    ? ENTITIES[formData.tipo_servicio as keyof typeof ENTITIES] || []
    : [];

  return {
    formData,
    loading,
    error,
    success,
    availableEntities,
    handleChange,
    handleSubmit
  };
}