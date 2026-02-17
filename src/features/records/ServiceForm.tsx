
import { SERVICE_TYPES, DURATIONS, FINAL_STATES } from '../../shared/constants/constants';
import { useServiceForm } from '../records/hooks/useServiceForm';
import Button from '../../shared/components/Button';
import { Service } from '../../shared/services/supabaseService';

interface Props {
  service: Service | null;
  onClose: () => void;
  initialDate?: string | null;
}

export default function ServiceForm({ service, onClose, initialDate }: Props) {
  const { 
    formData, 
    loading, 
    error, 
    success, 
    availableEntities, 
    handleChange, 
    handleSubmit 
  } = useServiceForm({ service, onClose, initialDate });

  return (
    <div className="p-6">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-rose-500 to-amber-600">
            {service ? 'Editar Registro' : 'Nuevo Registro'}
          </h2>
          <button onClick={onClose} className="text-rose-400 hover:text-rose-600 text-3xl font-bold transition-colors">×</button>
        </div>
        <div className="h-1 bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 rounded-full w-24"></div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-bold text-rose-800 mb-2">📅 Fecha <span className="text-red-500">*</span></label>
          <input type="date" name="fecha" value={formData.fecha} onChange={handleChange} required
            className="w-full px-4 py-3 border-2 border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all bg-white" />
        </div>

        <div>
          <label className="block text-sm font-bold text-rose-800 mb-2">🏥 Tipo <span className="text-red-500">*</span></label>
          <select name="tipo_servicio" value={formData.tipo_servicio} onChange={handleChange} required
            className="w-full px-4 py-3 border-2 border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all bg-white">
            <option value="">Selecciona un tipo</option>
            {SERVICE_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>

        <div>
          <label className="block text-sm font-bold text-rose-800 mb-2">🏢 Entidad <span className="text-red-500">*</span></label>
          <select name="entidad" value={formData.entidad} onChange={handleChange} required disabled={!formData.tipo_servicio}
            className="w-full px-4 py-3 border-2 border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all bg-white disabled:bg-pink-50 disabled:text-gray-400">
            <option value="">Selecciona entidad</option>
            {availableEntities.map(e => <option key={e} value={e}>{e}</option>)}
          </select>
        </div>

        {formData.ubicacion && (
          <div>
            <label className="block text-sm font-bold text-rose-800 mb-2">📍 Ubicación</label>
            <div className="w-full px-4 py-3 border-2 border-pink-100 rounded-lg bg-pink-50 text-rose-700 text-sm italic">{formData.ubicacion}</div>
          </div>
        )}

        <div>
          <label className="block text-sm font-bold text-rose-800 mb-2">⏱️ Duración</label>
          <select name="duracion" value={formData.duracion} onChange={handleChange}
            className="w-full px-4 py-3 border-2 border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all bg-white">
            <option value="">Selecciona duración</option>
            {DURATIONS.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
        </div>

        <div>
          <label className="block text-sm font-bold text-rose-800 mb-2">💫 Estado Final</label>
          <select name="estado_final" value={formData.estado_final} onChange={handleChange}
            className="w-full px-4 py-3 border-2 border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all bg-white">
            <option value="">Selecciona estado</option>
            {FINAL_STATES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        <div>
          <label className="block text-sm font-bold text-rose-800 mb-2">📝 Notas</label>
          <textarea name="notas" value={formData.notas} onChange={handleChange} rows={3}
            className="w-full px-4 py-3 border-2 border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all bg-white resize-none"
            placeholder="Notas opcionales" />
        </div>

        {error && <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">⚠️ {error}</div>}
        {success && <div className="p-3 rounded-lg bg-green-50 border border-green-200 text-green-700 text-sm">✅ {success}</div>}

        <div className="flex gap-3 pt-4">
          <Button type="submit" loading={loading} className="flex-1">
            {service ? '✅ Actualizar' : '✨ Crear'}
          </Button>
          <Button type="button" variant="secondary" onClick={onClose} className="flex-1">
            ❌ Cancelar
          </Button>
        </div>
      </form>
    </div>
  );
}