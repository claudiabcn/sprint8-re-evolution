import { SERVICE_TYPES, DURATIONS, FINAL_STATES } from '../../shared/constants/constants';
import { useServiceForm } from '../records/hooks/useServiceForm';
import Button from '../../shared/components/Button';
import type { Service } from '../../shared/types/types';

interface Props {
  service?: Service;           
  onClose: () => void;
  initialDate?: string;        
  initialServiceType?: string; 
}

export default function ServiceForm({ service, onClose, initialDate, initialServiceType }: Props) {
  const { 
    formData, 
    loading, 
    // Se eliminan 'success' y 'error' por ser asignaciones inútiles (dead stores)
    availableEntities, 
    handleChange, 
    handleSubmit 
  } = useServiceForm({ 
    service, 
    onClose, 
    initialDate, 
    initialServiceType 
  });

  return (
    <div className="p-5 md:p-6">
      <div className="mb-5">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl md:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-rose-500 to-amber-600">
            {service ? 'Editar actividad' : 'Nueva Actividad'}
          </h2>
          <button 
            onClick={onClose} 
            className="text-rose-400 hover:text-rose-600 text-3xl font-bold transition-colors leading-none"
            aria-label="Cerrar"
          >
            ×
          </button>
        </div>
        <div className="h-1 bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 rounded-full w-20"></div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-rose-800 mb-1.5 uppercase tracking-wider">📅 Fecha <span className="text-red-500">*</span></label>
            <input 
              type="date" 
              name="fecha" 
              value={formData.fecha} 
              onChange={handleChange} 
              required
              className="w-full px-4 py-2.5 border-2 border-pink-200 rounded-xl focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all bg-white text-sm" 
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-rose-800 mb-1.5 uppercase tracking-wider">🏥 Tipo <span className="text-red-500">*</span></label>
            <select 
              name="tipo_servicio" 
              value={formData.tipo_servicio} 
              onChange={handleChange} 
              required
              className="w-full px-4 py-2.5 border-2 border-pink-200 rounded-xl focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all bg-white text-sm"
            >
              <option value="">Selecciona</option>
              {SERVICE_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-rose-800 mb-1.5 uppercase tracking-wider">🏢 Entidad <span className="text-red-500">*</span></label>
          <select 
            name="entidad" 
            value={formData.entidad} 
            onChange={handleChange} 
            required 
            disabled={!formData.tipo_servicio}
            className="w-full px-4 py-2.5 border-2 border-pink-200 rounded-xl focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all bg-white disabled:bg-pink-50 disabled:text-gray-400 text-sm"
          >
            <option value="">Selecciona entidad</option>
            {availableEntities.map(e => <option key={e} value={e}>{e}</option>)}
          </select>
        </div>

        {formData.ubicacion && (
          <div className="px-4 py-2 border-2 border-pink-100 rounded-xl bg-pink-50/50 text-rose-700 text-[11px] italic">
            📍 {formData.ubicacion}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-rose-800 mb-1.5 uppercase tracking-wider">⏱️ Duración</label>
            <select 
              name="duracion" 
              value={formData.duracion} 
              onChange={handleChange}
              className="w-full px-4 py-2.5 border-2 border-pink-200 rounded-xl focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all bg-white text-sm"
            >
              <option value="">Selecciona</option>
              {DURATIONS.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-rose-800 mb-1.5 uppercase tracking-wider">💫 Estado</label>
            <select 
              name="estado_final" 
              value={formData.estado_final} 
              onChange={handleChange}
              className="w-full px-4 py-2.5 border-2 border-pink-200 rounded-xl focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all bg-white text-sm"
            >
              <option value="">Selecciona</option>
              {FINAL_STATES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-rose-800 mb-1.5 uppercase tracking-wider">📝 Notas</label>
          <textarea 
            name="notas" 
            value={formData.notas} 
            onChange={handleChange} 
            rows={2}
            className="w-full px-4 py-2.5 border-2 border-pink-200 rounded-xl focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all bg-white resize-none text-sm"
            placeholder="Notas opcionales" 
          />
        </div>

        <div className="flex gap-3 pt-2">
          <Button type="submit" loading={loading} className="flex-1 py-3 text-sm">
            {service ? 'Actualizar' : 'Crear Actividad'}
          </Button>
          <Button type="button" variant="secondary" onClick={onClose} className="flex-1 py-3 text-sm">
            Cancelar
          </Button>
        </div>
      </form>
    </div>
  );
}