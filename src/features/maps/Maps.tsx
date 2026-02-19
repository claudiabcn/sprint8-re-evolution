import { useState, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useLocations } from './hooks/useLocations';
import MapFilters from './components/MapFilters';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

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
      const matchType    = selectedType === 'Todos'  || loc.tipo_servicio === selectedType;
      const matchEntidad = selectedEntidad === 'Todas' || loc.entidad === selectedEntidad;
      const matchFrom    = !dateFrom || loc.fecha >= dateFrom;
      const matchTo      = !dateTo   || loc.fecha <= dateTo;
      return matchType && matchEntidad && matchFrom && matchTo;
    });
  }, [locations, selectedType, selectedEntidad, dateFrom, dateTo]);

  if (loading) return <p className="p-4">Cargando mapa...</p>;
  if (error)   return <p className="p-4 text-red-500">{error}</p>;

  const center: [number, number] = [41.3874, 2.1686];

  return (
    <div className="p-6 flex gap-6">
      <div className="flex-1">
        <h1 className="text-4xl font-black text-rose-900 mb-6">Mapa de servicios</h1>
        <MapContainer
          center={center}
          zoom={13}
          style={{ height: '600px', width: '100%', borderRadius: '2rem' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {filtered.map((loc) => (
            <Marker key={loc.id} position={[Number(loc.lat), Number(loc.lng)]}>
              <Popup>
                <strong>{loc.tipo_servicio}</strong><br />
                {loc.entidad}<br />
                {loc.ubicacion}<br />
                {loc.fecha}<br />
                {loc.estado_final && <span>Estado: {loc.estado_final}</span>}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

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
  );
};

export default Maps;