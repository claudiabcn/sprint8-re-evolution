import { useMemo } from 'react';
import { ENTITIES } from '../../../shared/constants/constants';

interface MapFiltersProps {
  selectedType: string;
  selectedEntidad: string;
  onTypeChange: (value: string) => void;
  onEntidadChange: (value: string) => void;
  onReset: () => void;
}

const SERVICE_TYPES = ['Todos', ...Object.keys(ENTITIES)];

const MapFilters = ({
  selectedType,
  selectedEntidad,
  onTypeChange,
  onEntidadChange,
  onReset,
}: MapFiltersProps) => {

  const entityOptions = useMemo(() => {
    if (selectedType === 'Todos') return [];
    return ['Todas', ...(ENTITIES[selectedType as keyof typeof ENTITIES] ?? [])];
  }, [selectedType]);

  return (
    <div className="w-64 bg-white/80 backdrop-blur-sm rounded-3xl border-2 border-pink-100 shadow-lg p-6 flex flex-col gap-5">
      <h2 className="text-xl font-black text-rose-900">Filtros</h2>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-bold text-rose-700 uppercase tracking-wide">
          Tipo de servicio
        </label>
        <select
          value={selectedType}
          onChange={e => onTypeChange(e.target.value)}
          className="border-2 border-pink-100 rounded-2xl p-2 text-sm text-rose-900 bg-white focus:outline-none focus:border-pink-400 transition-colors"
        >
          {SERVICE_TYPES.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>

      {selectedType !== 'Todos' && (
        <div className="flex flex-col gap-1">
          <label className="text-sm font-bold text-rose-700 uppercase tracking-wide">
            {selectedType === 'Actividad física' ? 'Actividad' : 'Entidad'}
          </label>
          <select
            value={selectedEntidad}
            onChange={e => onEntidadChange(e.target.value)}
            className="border-2 border-pink-100 rounded-2xl p-2 text-sm text-rose-900 bg-white focus:outline-none focus:border-pink-400 transition-colors"
          >
            {entityOptions.map(e => (
              <option key={e} value={e}>{e}</option>
            ))}
          </select>
        </div>
      )}

      <button
        onClick={onReset}
        className="mt-auto text-sm font-bold text-rose-400 hover:text-rose-600 underline transition-colors"
      >
        Limpiar filtros
      </button>
    </div>
  );
};

export default MapFilters;