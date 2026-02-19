import { useState, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
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

const createClusterCustomIcon = (cluster: any) => {
  return L.divIcon({
    html: `<div style="
      background: linear-gradient(135deg, #fb7185, #fdba74);
      color: white;
      border-radius: 50%;
      width: 50px;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 900;
      font-size: 16px;
      box-shadow: 0 4px 20px rgba(244,63,94,0.5);
      border: 4px solid white;
    ">${cluster.getChildCount()}</div>`,
    className: '',
    iconSize: L.point(50, 50),
  });
};

const serviceEmojis: Record<string, string> = {
  'Fisioterapia':                '💆',
  'Rehabilitación vestibular':   '🧠',
  'Actividad física':            '💃',
  'Cita médica':                 '🩺',
};

const createServiceIcon = (tipoServicio: string) => {
  const emoji = serviceEmojis[tipoServicio] || '📍';
  return L.divIcon({
    html: `<div style="
      background: linear-gradient(135deg, #fb7185, #fdba74);
      border-radius: 50% 50% 50% 0;
      transform: rotate(-45deg);
      width: 44px;
      height: 44px;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 20px rgba(244,63,94,0.5);
      border: 3px solid white;
    ">
      <span style="transform: rotate(45deg); font-size: 20px;">${emoji}</span>
    </div>`,
    className: '',
    iconSize: L.point(44, 44),
    iconAnchor: L.point(22, 44),
  });
};

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
          <MarkerClusterGroup iconCreateFunction={createClusterCustomIcon}>
            {filtered.map((loc) => (
              <Marker
                key={loc.id}
                position={[Number(loc.lat), Number(loc.lng)]}
                icon={createServiceIcon(loc.tipo_servicio)}
              >
                <Popup>
                  <strong>{loc.tipo_servicio}</strong><br />
                  {loc.entidad}<br />
                  {loc.ubicacion}<br />
                  {loc.fecha}<br />
                  {loc.estado_final && <span>Estado: {loc.estado_final}</span>}
                </Popup>
              </Marker>
            ))}
          </MarkerClusterGroup>
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