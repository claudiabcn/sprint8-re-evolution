export interface Service {
  id?:           string;
  fecha:         string;
  tipo_servicio: string;
  entidad:       string;
  tipo?:         string;
  duracion?:     string;
  ubicacion?:    string;
  lat?:          number;
  lng?:          number;
  estado_final?: string;
  notas?:        string;
  created_at?:   string;
}

export interface ServiceStatistics {
  total:   number;
  byType:  StatItem[];
  byState: StatItem[];
}

export interface StatItem {
  label: string;
  count: number;
}

export interface UseServiceFormProps {
  service?: Service;           
  onClose: () => void;
  initialDate?: string;        
  initialServiceType?: string; 
}