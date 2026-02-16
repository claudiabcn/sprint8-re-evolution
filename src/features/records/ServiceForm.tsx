import { useState, useEffect } from 'react';
import { createService, updateService, Service } from '../../shared/services/supabaseService';
import {
  SERVICE_TYPES,
  ENTITIES,
  APPOINTMENT_TYPES,
  DURATIONS,
  LOCATIONS,
  FINAL_STATES
} from '../../shared/constants/constants';

interface Props {
  service: Service | null;
  onClose: () => void;
}

export default function ServiceForm({ service, onClose }: Props) {
  const [formData, setFormData] = useState<Partial<Service>>({
    fecha: '',
    tipo_servicio: '',
    entidad: '',
    tipo: '',
    duracion: '',
    ubicacion: '',
    estado_final: '',
    notas: ''
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (service) {
      setFormData({
        ...service,
        fecha: service.fecha.split('T')[0]
      });
    }
  }, [service]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name === 'tipo_servicio') {
      setFormData({
        ...formData,
        [name]: value,
        entidad: ''
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.fecha || !formData.tipo_servicio || !formData.entidad) {
      alert('Por favor completa los campos obligatorios: Fecha, Tipo de Servicio y Entidad');
      return;
    }

    try {
      setLoading(true);
      
      if (service?.id) {
        await updateService(service.id, formData);
        alert('Servicio actualizado correctamente');
      } else {
        await createService(formData as Service);
        alert('Servicio creado correctamente');
      }
      
      onClose();
    } catch (error) {
      console.error('Error saving service:', error);
      alert('Error al guardar el servicio');
    } finally {
      setLoading(false);
    }
  };

  const availableEntities = formData.tipo_servicio 
    ? ENTITIES[formData.tipo_servicio as keyof typeof ENTITIES] 
    : [];

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-rose-500 to-amber-600">
            {service ? 'Editar Registro' : 'Nuevo Registro'}
          </h2>
          <button
            onClick={onClose}
            className="text-rose-400 hover:text-rose-600 text-3xl font-bold transition-colors"
          >
            ×
          </button>
        </div>
        <div className="h-1 bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 rounded-full w-24"></div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Date */}
        <div>
          <label className="block text-sm font-bold text-rose-800 mb-2">
            📅 Fecha <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            name="fecha"
            value={formData.fecha}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border-2 border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all bg-white"
          />
        </div>

        {/* Service Type */}
        <div>
          <label className="block text-sm font-bold text-rose-800 mb-2">
            🏥 Tipo de Servicio <span className="text-red-500">*</span>
          </label>
          <select
            name="tipo_servicio"
            value={formData.tipo_servicio}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border-2 border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all bg-white"
          >
            <option value="">Selecciona un tipo</option>
            {SERVICE_TYPES.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        {/* Entity */}
        <div>
          <label className="block text-sm font-bold text-rose-800 mb-2">
            🏢 Entidad <span className="text-red-500">*</span>
          </label>
          <select
            name="entidad"
            value={formData.entidad}
            onChange={handleChange}
            required
            disabled={!formData.tipo_servicio}
            className="w-full px-4 py-3 border-2 border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all bg-white disabled:bg-pink-50 disabled:text-gray-400"
          >
            <option value="">Selecciona una entidad</option>
            {availableEntities.map(entity => (
              <option key={entity} value={entity}>{entity}</option>
            ))}
          </select>
        </div>

        {/* Appointment Type (for medical appointments) */}
        {formData.tipo_servicio === 'Cita médica' && (
          <div>
            <label className="block text-sm font-bold text-rose-800 mb-2">
              📋 Tipo de Cita
            </label>
            <select
              name="tipo"
              value={formData.tipo}
              onChange={handleChange}
              className="w-full px-4 py-3 border-2 border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all bg-white"
            >
              <option value="">Selecciona un tipo</option>
              {APPOINTMENT_TYPES.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
        )}

        {/* Duration */}
        <div>
          <label className="block text-sm font-bold text-rose-800 mb-2">
            ⏱️ Duración
          </label>
          <select
            name="duracion"
            value={formData.duracion}
            onChange={handleChange}
            className="w-full px-4 py-3 border-2 border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all bg-white"
          >
            <option value="">Selecciona duración</option>
            {DURATIONS.map(duration => (
              <option key={duration} value={duration}>{duration}</option>
            ))}
          </select>
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-bold text-rose-800 mb-2">
            📍 Ubicación
          </label>
          <select
            name="ubicacion"
            value={formData.ubicacion}
            onChange={handleChange}
            className="w-full px-4 py-3 border-2 border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all bg-white"
          >
            <option value="">Selecciona ubicación</option>
            {LOCATIONS.map(location => (
              <option key={location} value={location}>{location}</option>
            ))}
          </select>
        </div>

        {/* Final State */}
        <div>
          <label className="block text-sm font-bold text-rose-800 mb-2">
            💫 Estado Final
          </label>
          <select
            name="estado_final"
            value={formData.estado_final}
            onChange={handleChange}
            className="w-full px-4 py-3 border-2 border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all bg-white"
          >
            <option value="">Selecciona estado</option>
            {FINAL_STATES.map(state => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>
        </div>

        {/* Notes */}
        <div>
          <label className="block text-sm font-bold text-rose-800 mb-2">
            📝 Notas
          </label>
          <textarea
            name="notas"
            value={formData.notas}
            onChange={handleChange}
            rows={3}
            className="w-full px-4 py-3 border-2 border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all bg-white resize-none"
            placeholder="Notas adicionales (opcional)"
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 text-white py-3 rounded-full font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {loading ? '⏳ Guardando...' : (service ? '✅ Actualizar' : '✨ Crear')}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="flex-1 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 py-3 rounded-full font-bold hover:from-gray-200 hover:to-gray-300 transition-all duration-300"
          >
            ❌ Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}