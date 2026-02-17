import { Service } from '../../shared/services/supabaseService';
import { SERVICE_TYPES, DURATIONS, FINAL_STATES } from '../../shared/constants/constants';
import { useServiceForm } from '../records/hooks/useServiceForm';

interface Props {
  service: Service | null;
  onClose: () => void;
}

export default function ServiceForm({ service, onClose }: Props) {
  const {
    formData,
    loading,
    error,
    success,
    availableEntities,
    handleChange,
    handleSubmit
  } = useServiceForm({ service, onClose });

  return (
    <div className="p-6">

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

        {formData.ubicacion && (
          <div>
            <label className="block text-sm font-bold text-rose-800 mb-2">
              📍 Ubicación
            </label>
            <div className="w-full px-4 py-3 border-2 border-pink-100 rounded-lg bg-pink-50 text-rose-700 text-sm">
              {formData.ubicacion}
            </div>
          </div>
        )}

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

        {error && (
          <div className="flex items-center gap-2 bg-red-50 border-2 border-red-200 text-red-700 text-sm font-medium px-4 py-3 rounded-lg">
            <span>⚠️</span>
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="flex items-center gap-2 bg-green-50 border-2 border-green-200 text-green-700 text-sm font-medium px-4 py-3 rounded-lg">
            <span>✅</span>
            <span>{success}</span>
          </div>
        )}

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