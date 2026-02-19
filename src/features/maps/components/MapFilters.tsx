import type { Service } from '../../../shared/types/types';

interface MapFiltersProps {
  locations: Service[];
  selectedType: string;
  selectedEntidad: string;
  dateFrom: string;
  dateTo: string;
  onTypeChange: (value: string) => void;
  onEntidadChange: (value: string) => void;
  onDateFromChange: (value: string) => void;
  onDateToChange: (value: string) => void;
  onReset: () => void;
}

const MapFilters = ({
  locations,
  selectedType,
  selectedEntidad,
  dateFrom,
  dateTo,
  onTypeChange,
  onEntidadChange,
  onDateFromChange,
  onDateToChange,
  onReset,
}: MapFiltersProps) => {
  const serviceTypes = ['Todos', ...Array.from(new Set(locations.map(l => l.tipo_servicio)))];

  const entidades = selectedType !== 'Todos'
    ? ['Todas', ...Array.from(new Set(
        locations
          .filter(l => l.tipo_servicio === selectedType)
          .map(l => l.entidad)
      ))]
    : [];

  const handleTypeChange = (value: string) => {
    onTypeChange(value);
    onEntidadChange('Todas');
  };

  return (
    <div className="w-64 bg-white/80 backdrop-blur-sm rounded-3xl border-2 border-pink-100 shadow-lg p-6 flex flex-col gap-5">
      <h2 className="text-xl font-black text-rose-900">Filtros</h2>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-bold text-rose-700 uppercase tracking-wide">
          Tipo de servicio
        </label>
        <select
          value={selectedType}
          onChange={e => handleTypeChange(e.target.value)}
          className="border-2 border-pink-100 rounded-2xl p-2 text-sm text-rose-900 bg-white focus:outline-none focus:border-pink-400 transition-colors"
        >
          {serviceTypes.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>

      {selectedType !== 'Todos' && (
        <div className="flex flex-col gap-1">
          <label className="text-sm font-bold text-rose-700 uppercase tracking-wide">
            Entidad
          </label>
          <select
            value={selectedEntidad}
            onChange={e => onEntidadChange(e.target.value)}
            className="border-2 border-pink-100 rounded-2xl p-2 text-sm text-rose-900 bg-white focus:outline-none focus:border-pink-400 transition-colors"
          >
            {entidades.map(e => (
              <option key={e} value={e}>{e}</option>
            ))}
          </select>
        </div>
      )}

      <div className="flex flex-col gap-1">
        <label className="text-sm font-bold text-rose-700 uppercase tracking-wide">
          Desde
        </label>
        <input
          type="date"
          value={dateFrom}
          onChange={e => onDateFromChange(e.target.value)}
          className="border-2 border-pink-100 rounded-2xl p-2 text-sm text-rose-900 bg-white focus:outline-none focus:border-pink-400 transition-colors"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-bold text-rose-700 uppercase tracking-wide">
          Hasta
        </label>
        <input
          type="date"
          value={dateTo}
          onChange={e => onDateToChange(e.target.value)}
          className="border-2 border-pink-100 rounded-2xl p-2 text-sm text-rose-900 bg-white focus:outline-none focus:border-pink-400 transition-colors"
        />
      </div>

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