export const HOME_CONTENT = {
  hero: {
    heading:     '¿Qué hacemos hoy?',
    description: 'Registra tu actividad para visualizar tu progreso y sanar de forma consciente.',
  },
  quote: {
    icon: '✨',
    text: 'La evolución es un proceso, no un destino.',
  },
} as const;

export const HOME_LAYOUT = {
  title:    'Tu Re-Evolución',
  subtitle: 'Rehabilita tu cuerpo, evoluciona tu movimiento.',
} as const;

export const SERVICE_CARD_CONFIG: Record<string, {
  icon:   string;
  desc:   string;
  color:  string;
  border: string;
  text:   string;
}> = {
  'Cita médica': {
    icon:   '💪',
    desc:   'Seguimiento profesional',
    color:  'from-pink-500/20 to-rose-500/5',
    border: 'border-pink-200',
    text:   'text-rose-900',
  },
  'Fisioterapia': {
    icon:   '💆',
    desc:   'Recupera tu equilibrio',
    color:  'from-amber-500/20 to-orange-500/5',
    border: 'border-amber-200',
    text:   'text-amber-900',
  },
  'Rehabilitación vestibular': {
    icon:   '🧠',
    desc:   'Entrena tu cerebro',
    color:  'from-purple-500/20 to-indigo-500/5',
    border: 'border-purple-200',
    text:   'text-purple-900',
  },
  'Actividad física': {
    icon:   '💃',
    desc:   'Energía en movimiento',
    color:  'from-rose-500/20 to-pink-500/5',
    border: 'border-rose-200',
    text:   'text-rose-900',
  },
};
export const STATUS_STYLES: Record<string, string> = {
  'Bien':         'bg-green-100 text-green-800',
  'Muy mareada':  'bg-red-100 text-red-800',
  'Algo mareada': 'bg-yellow-100 text-yellow-800',
  'Cansada':      'bg-orange-100 text-orange-800',
};

export const STATUS_STYLES_DEFAULT = 'bg-gray-100 text-gray-800';

export const CHART_COLORS = {
  primary:     '#fb7185',                    
  primaryFill: 'rgba(251, 113, 133, 0.15)',
  point:       '#fdba74',                    
  title:       '#881337',                    
  grid:        'rgba(251, 113, 133, 0.1)',
} as const;

export const BAR_COLORS = {
  background: [
    'rgba(251, 113, 133, 0.7)',  // Cita médica
    'rgba(253, 186, 116, 0.7)',  // Fisioterapia
    'rgba(196, 181, 253, 0.7)',  // Rehabilitación vestibular
    'rgba(134, 239, 172, 0.7)',  // Actividad física
  ],
  border: ['#fb7185', '#fdba74', '#c4b5fd', '#86efac'],
} as const;