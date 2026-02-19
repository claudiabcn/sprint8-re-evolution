import { Marker, Popup } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import { createClusterCustomIcon, createServiceIcon } from '../utils/mapIcons';
import type { Service } from '../../../shared/types/types';

interface MapMarkersProps {
  locations: Service[];
}

const MapMarkers = ({ locations }: MapMarkersProps) => {
  return (
    <MarkerClusterGroup iconCreateFunction={createClusterCustomIcon}>
      {locations.map((loc) => (
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
  );
};

export default MapMarkers;