import { Marker, Popup } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import { createClusterCustomIcon, createServiceIcon } from '../utils/mapIcons';
import { ENTITIES } from '../../../shared/constants/constants';
import type { MapLocation } from '../MapView';

interface MapMarkersProps {
  locations: MapLocation[];
}

// Build reverse lookup: entity label → service type
const ENTITY_TO_SERVICE_MAP: Record<string, string> = {};
Object.entries(ENTITIES).forEach(([serviceType, entities]) => {
  entities.forEach((entity: string) => {
    ENTITY_TO_SERVICE_MAP[entity] = serviceType;
  });
});

const MapMarkers = ({ locations }: MapMarkersProps) => {
  return (
    <MarkerClusterGroup iconCreateFunction={createClusterCustomIcon}>
      {locations.map((loc) => {
        const serviceType = ENTITY_TO_SERVICE_MAP[loc.label] ?? '';
        return (
          <Marker
            key={loc.label}
            position={[loc.lat, loc.lng]}
            icon={createServiceIcon(serviceType)}
          >
            <Popup>
              <strong>{serviceType}</strong><br />
              {loc.label}<br />
              {loc.address}
            </Popup>
          </Marker>
        );
      })}
    </MarkerClusterGroup>
  );
};

export default MapMarkers;