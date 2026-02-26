import { useState, useMemo } from 'react';
import { ENTITIES, ENTITY_LOCATIONS } from '../../shared/constants/constants';
import MapView from './components/MapView';
import MapFilters from './components/MapFilters';

// Build a lookup: entity label → service type
const ENTITY_TO_SERVICE: Record<string, string> = {};
Object.entries(ENTITIES).forEach(([serviceType, entities]) => {
  entities.forEach(entity => {
    ENTITY_TO_SERVICE[entity] = serviceType;
  });
});

const Maps = () => {
  const [selectedType, setSelectedType]       = useState('Todos');
  const [selectedEntidad, setSelectedEntidad] = useState('Todas');

  const handleReset = () => {
    setSelectedType('Todos');
    setSelectedEntidad('Todas');
  };

  const filtered = useMemo(() => {
    return Object.entries(ENTITY_LOCATIONS)
      .filter(([label]) => {
        const serviceType  = ENTITY_TO_SERVICE[label];
        const matchType    = selectedType === 'Todos' || serviceType === selectedType;
        const matchEntidad = selectedEntidad === 'Todas' || label === selectedEntidad;
        return matchType && matchEntidad;
      })
      .map(([label, loc]) => ({ label, ...loc }));
  }, [selectedType, selectedEntidad]);

  return (
    <div className="p-4 md:p-6 flex flex-col md:flex-row gap-6">

      <div className="md:order-2">
        <MapFilters
          selectedType={selectedType}
          selectedEntidad={selectedEntidad}
          onTypeChange={(value) => { setSelectedType(value); setSelectedEntidad('Todas'); }}
          onEntidadChange={setSelectedEntidad}
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