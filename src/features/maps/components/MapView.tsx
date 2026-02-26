import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import MapMarkers from './MapMarkers';

import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

export interface MapLocation {
  label: string;
  address: string;
  lat: number;
  lng: number;
}

interface MapViewProps {
  locations: MapLocation[];
}

const CENTER: [number, number] = [41.4050, 2.1700];

const MapView = ({ locations }: MapViewProps) => {
  return (
    <MapContainer
      center={CENTER}
      zoom={13}
      style={{ height: '600px', width: '100%', borderRadius: '2rem' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapMarkers locations={locations} />
    </MapContainer>
  );
};

export default MapView;