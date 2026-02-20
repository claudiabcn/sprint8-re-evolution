import type { Service } from '../../../shared/types/types';
import { SERVICE_COLORS } from '../../../shared/constants/constants';
import { formatDate } from '../../../shared/utils/dateUtils';
import { STATUS_STYLES, STATUS_STYLES_DEFAULT } from '../../../config/appData';
import NotesPopover from './NotesPopover';

interface Props {
  services: Service[];
  onEdit: (service: Service) => void;
  onDelete: (id: string) => void;
}

const TABLE_HEADERS = ['Fecha', 'Servicio', 'Entidad', 'Duración', 'Estado', 'Acciones'];

export default function ServiceTable({ services, onEdit, onDelete }: Props) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-pink-100">
        <thead className="bg-gradient-to-r from-pink-50 to-rose-50">
          <tr>
            {TABLE_HEADERS.map(header => (
              <th key={header} className="px-6 py-4 text-left text-xs font-bold text-rose-700 uppercase tracking-wider">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white/60 divide-y divide-pink-100">
          {services.length === 0 ? (
            <tr>
              <td colSpan={6} className="px-6 py-12 text-center">
                <div className="flex flex-col items-center gap-3">
                  <span className="text-5xl">📋</span>
                  <p className="text-rose-600 font-medium">No hay registros todavía</p>
                  <p className="text-rose-400 text-sm">Crea tu primer registro para empezar</p>
                </div>
              </td>
            </tr>
          ) : (
            services.map((service) => (
              <tr key={service.id} className="hover:bg-pink-50/50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-rose-900">
                  {formatDate(service.fecha)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className="px-3 py-1 rounded-full text-xs font-bold text-white shadow-sm"
                    style={{ backgroundColor: SERVICE_COLORS[service.tipo_servicio as keyof typeof SERVICE_COLORS] }}
                  >
                    {service.tipo_servicio}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-rose-800 font-medium">
                  {service.entidad}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-rose-700">
                  {service.duracion || '-'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold shadow-sm ${STATUS_STYLES[service.estado_final ?? ''] ?? STATUS_STYLES_DEFAULT}`}>
                    {service.estado_final || '-'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex items-center gap-3">
                    {service.notas && <NotesPopover notes={service.notas} />}
                    <button onClick={() => onEdit(service)} title="Editar" className="transition-transform hover:scale-125">✏️</button>
                    <button 
                    onClick={() => service.id && onDelete(service.id)} 
                    title="Eliminar" 
                    className="transition-transform hover:scale-125"
                  >
                    🗑️
                  </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}