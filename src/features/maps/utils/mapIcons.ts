import L from 'leaflet';

const serviceEmojis: Record<string, string> = {
  'Fisioterapia':                '💆',
  'Rehabilitación vestibular':   '🧠',
  'Actividad física':            '💃',
  'Cita médica':                 '🩺',
};

export const createClusterCustomIcon = (cluster: any) => {
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

export const createServiceIcon = (tipoServicio: string) => {
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