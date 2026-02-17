export const SERVICE_TYPES = [
  'Rehabilitación vestibular',
  'Fisioterapia',
  'Cita médica',
  'Actividad física'
];

export const ENTITIES = {
  'Rehabilitación vestibular': ['IRVE', 'CAP', 'Cos & Essència', 'Casa'],
  'Fisioterapia': ['Fissa', 'Fde Fisio', 'MyFisio'],
  'Cita médica': ['Onco', 'Neuro', 'General', 'Radio'],
  'Actividad física': ['Padel', 'Twerk', 'Flexi', 'Dirigida','Piscina', 'Fuerza']
};

export const ENTITY_LOCATIONS: Record<string, { address: string; lat: number; lng: number }> = {

  'IRVE':       { address: 'Carrer de Provença, 281, Barcelona',          lat: 41.3963, lng: 2.1634 },
  'CAP':        { address: 'Avinguda Meridiana, 428, Barcelona',          lat: 41.4331, lng: 2.1837 },
  'COS ESENCIA':{ address: 'Carrer Gran de Sant Andreu, 418, Barcelona',  lat: 41.4403, lng: 2.1886 },
  'CASA':       { address: 'Sant Andreu, Barcelona',                      lat: 41.4377, lng: 2.1911 },

  'FISSA':      { address: 'Carrer de Santa Coloma, 5, Barcelona',        lat: 41.4311, lng: 2.1931 },
  'FDE':        { address: 'Carrer de Lanzarote, 6, Barcelona',           lat: 41.4382, lng: 2.1901 },
  'MYFISIO':    { address: 'Carrer de Provença, 175, Barcelona',          lat: 41.3907, lng: 2.1557 },

  'Onco':       { address: 'Hospital Vall d\'Hebron, Barcelona',          lat: 41.4282, lng: 2.1409 },
  'Neuro':      { address: 'Hospital Vall d\'Hebron, Barcelona',          lat: 41.4282, lng: 2.1409 },
  'Cabec.':     { address: 'Hospital Vall d\'Hebron, Barcelona',          lat: 41.4282, lng: 2.1409 },
  'Radio':      { address: 'Hospital Vall d\'Hebron, Barcelona',          lat: 41.4282, lng: 2.1409 },

  'Padel':      { address: 'FES Padel Can Dragó, Barcelona',              lat: 41.4371, lng: 2.1842 },
  'Twerk':      { address: 'Centre Cívic Sagrada Família, Barcelona',     lat: 41.4056, lng: 2.1765 },
  'Gym':        { address: 'Piscina Can Dragó, Barcelona',                lat: 41.4362, lng: 2.1833 },
  'Piscina':    { address: 'Piscina Can Dragó, Barcelona',                lat: 41.4362, lng: 2.1833 },
  };

export const DURATIONS = [
  '15 min',
  '30 min',
  '45 min',
  '1 hora',
  '1.5 horas',
  '2 horas'
];

export const FINAL_STATES = [
  'Muy mareada',
  'Algo mareada',
  'Cansada',
  'Bien'
];


export const SERVICE_COLORS = {
  'Rehabilitación vestibular': '#3B82F6', 
  'Fisioterapia': '#10B981',              
  'Cita médica': '#EF4444',               
  'Actividad física': '#F59E0B'          
};