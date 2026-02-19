import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useLocations } from './hooks/useLocations';
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

  if (loading) return <p className="p-4">Cargando mapa...</p>;
  if (error)   return <p className="p-4 text-red-500">{error}</p>;

  const center: [number, number] = [41.3874, 2.1686];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Mapa de servicios</h1>
      <MapContainer
        center={center}
        zoom={13}
        style={{ height: '600px', width: '100%', borderRadius: '12px' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {locations.map((loc) => (
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
  );
};

export default Maps;