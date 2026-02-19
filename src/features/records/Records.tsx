import { useState, useEffect } from 'react';
import { getServices, deleteService } from '../../shared/services/supabaseService';
import type { Service } from '../../shared/types/types';
import { SERVICE_COLORS } from '../../shared/constants/constants';
import { formatDate } from '../../shared/utils/dateUtils';
import NotesPopover from '../records/components/NotesPopover';
import ConfirmDialog from '../../shared/components/ConfirmDialog';
import ServiceForm from './ServiceForm';
import Button from '../../shared/components/Button';
import Layout from '../../shared/components/Layout';

export default function Records() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [error, setError] = useState<string | undefined>(undefined);
  const [showForm, setShowForm] = useState(false);
  const [serviceToEdit, setServiceToEdit] = useState<Service | undefined>(undefined);
  const [confirmId, setConfirmId] = useState<string | undefined>(undefined);

  useEffect(() => { loadServices(); }, []);

  const loadServices = async () => {
    try {
      setLoading(true);
      setError(undefined);
      const data = await getServices();
      setServices(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar los registros');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      setError(undefined);
      await deleteService(id);
      setConfirmId(undefined);
      loadServices();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al eliminar el registro');
      setConfirmId(undefined);
    }
  };

  const handleEdit = (service: Service) => { 
    setServiceToEdit(service); 
    setShowForm(true); 
  };
  
  const handleNew = () => { 
    setServiceToEdit(undefined); 
    setShowForm(true); 
  };

  const handleCloseForm = () => { 
    setShowForm(false); 
    setServiceToEdit(undefined); 
    loadServices(); 
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-amber-50 to-pink-50 flex items-center justify-center">
        <div className="text-xl text-rose-700 font-semibold animate-pulse">Cargando registros...</div>
      </div>
    );
  }

  return (
    <Layout 
      title="Mis Registros" 
      subtitle="Historial completo de tus servicios"
      maxWidth="max-w-7xl"
      headerContent={<Button onClick={handleNew}>+ Nuevo Registro</Button>}
    >
      {error && (
        <div className="flex items-center justify-between gap-2 bg-red-50 border-2 border-red-200 text-red-700 text-sm font-medium px-4 py-3 rounded-lg mb-6">
          <div className="flex items-center gap-2">
            <span>⚠️</span>
            <span>{error}</span>
          </div>
          <button onClick={() => setError(undefined)} className="text-red-400 hover:text-red-600 font-bold text-lg leading-none">×</button>
        </div>
      )}

      {confirmId && (
        <ConfirmDialog
          message="¿Estás segura de eliminar este registro?"
          onConfirm={() => handleDelete(confirmId)}
          onCancel={() => setConfirmId(undefined)}
        />
      )}

      {showForm && (
        <div className="fixed inset-0 bg-rose-950/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-in zoom-in-95 duration-200">
            <ServiceForm service={serviceToEdit} onClose={handleCloseForm} />
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-pink-100">
          <thead className="bg-gradient-to-r from-pink-50 to-rose-50">
            <tr>
              {['Fecha', 'Servicio', 'Entidad', 'Duración', 'Estado', 'Acciones'].map(header => (
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
                    <span className="px-3 py-1 rounded-full text-xs font-bold text-white shadow-sm"
                      style={{ backgroundColor: SERVICE_COLORS[service.tipo_servicio as keyof typeof SERVICE_COLORS] }}>
                      {service.tipo_servicio}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-rose-800 font-medium">{service.entidad}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-rose-700">{service.duracion || '-'}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold shadow-sm ${
                      service.estado_final === 'Bien'           ? 'bg-green-100 text-green-800'   :
                      service.estado_final === 'Muy mareada'    ? 'bg-red-100 text-red-800'       :
                      service.estado_final === 'Algo mareada'   ? 'bg-yellow-100 text-yellow-800' :
                      service.estado_final === 'Cansada'        ? 'bg-orange-100 text-orange-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {service.estado_final || '-'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center gap-3">
                      {service.notas && <NotesPopover notes={service.notas} />}
                      <button onClick={() => handleEdit(service)} title="Editar" className="transition-transform hover:scale-125">✏️</button>
                      <button onClick={() => setConfirmId(service.id)} title="Eliminar" className="transition-transform hover:scale-125">🗑️</button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}