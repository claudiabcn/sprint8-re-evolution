import ServiceForm from '../../records/ServiceForm';

interface ServiceModalProps {
  showForm: boolean;
  selectedServiceType: string | undefined;
  onClose: () => void;
}

const ServiceModal = ({ showForm, selectedServiceType, onClose }: ServiceModalProps) => {
  if (!showForm) return null;

  return (
    <div className="fixed inset-0 bg-rose-950/60 backdrop-blur-xl flex items-center justify-center z-[999] p-4">
      <div className="bg-white rounded-[3.5rem] max-w-lg w-full shadow-2xl animate-in fade-in zoom-in duration-300 max-h-[90vh] overflow-y-auto">
        <ServiceForm
          service={undefined}
          onClose={onClose}
          initialServiceType={selectedServiceType}
        />
      </div>
    </div>
  );
};

export default ServiceModal;