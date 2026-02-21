import { useState, useMemo } from 'react';
import { useLocations } from './hooks/useLocations';
import MapView from './components/MapView';
import MapFilters from './components/MapFilters';

const Maps = () => {
  const { locations, loading, error } = useLocations();

  const [selectedType, setSelectedType]       = useState('Todos');
  const [selectedEntidad, setSelectedEntidad] = useState('Todas');
  const [dateFrom, setDateFrom]               = useState('');
  const [dateTo, setDateTo]                   = useState('');

  const handleReset = () => {
    setSelectedType('Todos');
    setSelectedEntidad('Todas');
    setDateFrom('');
    setDateTo('');
  };

  const filtered = useMemo(() => {
    return locations.filter(loc => {
      const matchType    = selectedType === 'Todos'    || loc.tipo_servicio === selectedType;
      const matchEntidad = selectedEntidad === 'Todas' || loc.entidad === selectedEntidad;
      const matchFrom    = !dateFrom || loc.fecha >= dateFrom;
      const matchTo      = !dateTo   || loc.fecha <= dateTo;
      return matchType && matchEntidad && matchFrom && matchTo;
    });
  }, [locations, selectedType, selectedEntidad, dateFrom, dateTo]);

  if (loading) return <p className="p-4">Cargando mapa...</p>;
  if (error)   return <p className="p-4 text-red-500">{error}</p>;

  return (
    <div className="p-4 md:p-6 flex flex-col md:flex-row gap-6">
      
      <div className="md:order-2">
        <MapFilters
          locations={locations}
          selectedType={selectedType}
          selectedEntidad={selectedEntidad}
          dateFrom={dateFrom}
          dateTo={dateTo}
          onTypeChange={setSelectedType}
          onEntidadChange={setSelectedEntidad}
          onDateFromChange={setDateFrom}
          onDateToChange={setDateTo}
          onReset={handleReset}
        />
      </div>

      <div className="flex-1 md:order-1">
        <h1 className="text-4xl font-black text-rose-900 mb-6">Mapa de servicios</h1>
        <MapView locations={filtered} />
      </div>

    </div>
  );
};

export default Maps;