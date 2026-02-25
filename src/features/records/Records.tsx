import { useServices } from './hooks/useServices';
import { useRecordsUI } from './hooks/useRecordsUI';
import ServiceTable from './components/ServiceTable';
import ServiceFormModal from './components/ServiceFormModal';
import ErrorBanner from './components/ErrorBanner';
import ConfirmDialog from '../../shared/components/ConfirmDialog';
import Button from '../../shared/components/Button';
import Layout from '../../shared/components/Layout';

export default function Records() {
  const { services, loading, error, setError, handleDelete, loadServices } = useServices();
  const { showForm, serviceToEdit, confirmId, setConfirmId, handleEdit, handleNew, handleCloseForm } = useRecordsUI();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-amber-50 to-pink-50 flex items-center justify-center">
        <div className="text-xl text-rose-700 font-semibold animate-pulse">Cargando actividades...</div>
      </div>
    );
  }

  return (
    <Layout
      title="Mis Actividades"
      subtitle="Historial completo de tus servicios"
      maxWidth="max-w-7xl"
      headerContent={<Button onClick={handleNew}>+ Nueva actividad</Button>}
    >
      {error && <ErrorBanner error={error} onClose={() => setError(undefined)} />}

      {confirmId && (
        <ConfirmDialog
          message="¿Estás segura de eliminar esta actividad?"
          onConfirm={() => handleDelete(confirmId).then(() => setConfirmId(undefined))}
          onCancel={() => setConfirmId(undefined)}
        />
      )}

      {showForm && (
        <ServiceFormModal
          service={serviceToEdit}
          onClose={() => handleCloseForm(loadServices)}
        />
      )}

      <ServiceTable
        services={services}
        onEdit={handleEdit}
        onDelete={setConfirmId}
      />
    </Layout>
  );
}
