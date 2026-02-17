import { useState, useEffect } from 'react';
import { createService, updateService, Service } from '../../../shared/services/supabaseService';
import { ENTITIES, ENTITY_LOCATIONS } from '../../../shared/constants/constants';

interface UseServiceFormProps {
  service: Service | null;
  onClose: () => void;
}

export function useServiceForm({ service, onClose }: UseServiceFormProps) {
  const [formData, setFormData] = useState<Partial<Service>>({
    fecha:         '',
    tipo_servicio: '',
    entidad:       '',
    tipo:          '',
    duracion:      '',
    ubicacion:     '',
    lat:           undefined,
    lng:           undefined,
    estado_final:  '',
    notas:         ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (service) {
      setFormData({
        ...service,
        fecha: service.fecha.split('T')[0]
      });
    }
  }, [service]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setError(null);

    const { name, value } = e.target;

    if (name === 'tipo_servicio') {
      setFormData(prev => ({
        ...prev,
        tipo_servicio: value,
        entidad:       '',
        ubicacion:     '',
        lat:           undefined,
        lng:           undefined
      }));
      return;
    }

    if (name === 'entidad') {
      const location = ENTITY_LOCATIONS[value];
      setFormData(prev => ({
        ...prev,
        entidad:   value,
        ubicacion: location?.address || '',
        lat:       location?.lat,
        lng:       location?.lng
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
        await updateService(service.id, formData);
        setSuccess('Servicio actualizado correctamente');
      } else {
        await createService(formData as Service);
        setSuccess('Servicio creado correctamente');
      }
      setTimeout(() => onClose(), 800);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al guardar el servicio';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const availableEntities = formData.tipo_servicio
    ? ENTITIES[formData.tipo_servicio as keyof typeof ENTITIES]
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