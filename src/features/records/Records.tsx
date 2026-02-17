import { useState, useEffect } from 'react';
import { getServices, deleteService, Service } from '../../shared/services/supabaseService';
import { SERVICE_COLORS } from '../../shared/constants/constants';
import ServiceForm from './ServiceForm';

export default function Records() {
  const [services, setServices]         = useState<Service[]>([]);
  const [loading, setLoading]           = useState(true);
  const [showForm, setShowForm]         = useState(false);
  const [serviceToEdit, setServiceToEdit] = useState<Service | null>(null);

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    try {
      setLoading(true);
      const data = await getServices();
      setServices(data);
    } catch (error) {
      console.error('Error loading services:', error);
      alert('Error al cargar los servicios');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('¿Estás seguro de eliminar este registro?')) {
      try {
        await deleteService(id);
        loadServices();
      } catch (error) {
        console.error('Error deleting service:', error);
        alert('Error al eliminar el servicio');
      }
    }
  };

  const handleEdit = (service: Service) => {
    setServiceToEdit(service);
    setShowForm(true);
  };

  const handleNew = () => {
    setServiceToEdit(null);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setServiceToEdit(null);
    loadServices();
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-amber-50 to-pink-50 flex items-center justify-center">
        <div className="text-xl text-rose-700 font-semibold">Cargando registros...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-amber-50 to-pink-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-rose-500 to-amber-600">
              Mis Registros
            </h1>
            <p className="text-rose-600 mt-1">Historial completo de tus servicios</p>
          </div>
          <button
            onClick={handleNew}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 text-white px-6 py-3 rounded-full font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <span className="text-xl">+</span>
            <span>Nuevo Registro</span>
          </button>
        </div>

        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
              <ServiceForm service={serviceToEdit} onClose={handleCloseForm} />
            </div>
          </div>
        )}


        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-pink-400/20 via-amber-400/20 to-rose-400/20 rounded-2xl blur-xl transform scale-105"></div>

          <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-pink-200/50 overflow-hidden">
            <div className="h-1.5 bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500"></div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-pink-100">
                <thead className="bg-gradient-to-r from-pink-50 to-rose-50">
                  <tr>
                    {['Fecha', 'Servicio', 'Entidad', 'Duración', 'Ubicación', 'Estado', 'Acciones'].map(header => (
                      <th key={header} className="px-6 py-4 text-left text-xs font-bold text-rose-700 uppercase tracking-wider">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white/60 divide-y divide-pink-100">
                  {services.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="px-6 py-12 text-center">
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
                        <td className="px-6 py-4 text-sm text-rose-700 max-w-[200px] truncate">
                          {service.ubicacion || '-'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold shadow-sm ${
                            service.estado_final === 'Bien'         ? 'bg-green-100 text-green-800'  :
                            service.estado_final === 'Muy mareada'  ? 'bg-red-100 text-red-800'      :
                            service.estado_final === 'Algo mareada' ? 'bg-yellow-100 text-yellow-800':
                            service.estado_final === 'Cansada'      ? 'bg-orange-100 text-orange-800':
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {service.estado_final || '-'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button
                            onClick={() => handleEdit(service)}
                            className="text-pink-600 hover:text-pink-800 font-semibold mr-4 transition-colors"
                          >
                            ✏️ Editar
                          </button>
                          <button
                            onClick={() => handleDelete(service.id!)}
                            className="text-red-600 hover:text-red-800 font-semibold transition-colors"
                          >
                            🗑️ Eliminar
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {services.length > 0 && (
              <div className="bg-gradient-to-r from-pink-50 to-rose-50 px-6 py-4 border-t border-pink-200">
                <p className="text-sm text-rose-700">
                  Total de registros: <span className="font-bold text-rose-900">{services.length}</span>
                </p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}