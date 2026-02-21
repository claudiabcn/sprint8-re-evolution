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

const EmptyState = () => (
  <div className="flex flex-col items-center gap-3 py-16">
    <span className="text-5xl">📋</span>
    <p className="text-rose-600 font-medium">No hay registros todavía</p>
    <p className="text-rose-400 text-sm">Crea tu primer registro para empezar</p>
  </div>
);

const ServiceBadge = ({ tipo_servicio }: { tipo_servicio: string }) => (
  <span
    className="px-3 py-1 rounded-full text-xs font-bold text-white shadow-sm"
    style={{ backgroundColor: SERVICE_COLORS[tipo_servicio as keyof typeof SERVICE_COLORS] }}
  >
    {tipo_servicio}
  </span>
);

const StatusBadge = ({ estado_final }: { estado_final?: string }) => (
  <span className={`px-3 py-1 rounded-full text-xs font-bold shadow-sm ${STATUS_STYLES[estado_final ?? ''] ?? STATUS_STYLES_DEFAULT}`}>
    {estado_final || '-'}
  </span>
);

const RowActions = ({ service, onEdit, onDelete }: { service: Service; onEdit: (s: Service) => void; onDelete: (id: string) => void }) => (
  <div className="flex items-center gap-3">
    {service.notas && <NotesPopover notes={service.notas} />}
    <button onClick={() => onEdit(service)} title="Editar" className="transition-transform hover:scale-125">✏️</button>
    <button onClick={() => service.id && onDelete(service.id)} title="Eliminar" className="transition-transform hover:scale-125">🗑️</button>
  </div>
);

const DesktopTable = ({ services, onEdit, onDelete }: Props) => (
  <div className="hidden md:block overflow-x-auto">
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
        {services.map((service) => (
          <tr key={service.id} className="hover:bg-pink-50/50 transition-colors">
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-rose-900">
              {formatDate(service.fecha)}
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <ServiceBadge tipo_servicio={service.tipo_servicio} />
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-rose-800 font-medium">
              {service.entidad}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-rose-700">
              {service.duracion || '-'}
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <StatusBadge estado_final={service.estado_final} />
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
              <RowActions service={service} onEdit={onEdit} onDelete={onDelete} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const MobileCards = ({ services, onEdit, onDelete }: Props) => (
  <div className="md:hidden flex flex-col gap-3 p-4">
    {services.map((service) => (
      <div key={service.id} className="bg-white rounded-2xl border border-pink-100 shadow-sm p-4 flex flex-col gap-3">

        <div className="flex items-center justify-between">
          <span className="text-sm font-bold text-rose-900">📅 {formatDate(service.fecha)}</span>
          <RowActions service={service} onEdit={onEdit} onDelete={onDelete} />
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <ServiceBadge tipo_servicio={service.tipo_servicio} />
          <StatusBadge estado_final={service.estado_final} />
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="text-rose-800 font-medium">{service.entidad}</span>
          {service.duracion && (
            <span className="text-rose-500 text-xs">⏱️ {service.duracion}</span>
          )}
        </div>

      </div>
    ))}
  </div>
);

export default function ServiceTable({ services, onEdit, onDelete }: Props) {
  if (services.length === 0) return <EmptyState />;

  return (
    <>
      <DesktopTable services={services} onEdit={onEdit} onDelete={onDelete} />
      <MobileCards services={services} onEdit={onEdit} onDelete={onDelete} />
    </>
  );
}