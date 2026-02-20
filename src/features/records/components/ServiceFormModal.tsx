import type { Service } from '../../../shared/types/types';
import ServiceForm from '../ServiceForm';

interface Props {
  service?: Service;
  onClose: () => void;
}

export default function ServiceFormModal({ service, onClose }: Props) {
  return (
    <div className="fixed inset-0 bg-rose-950/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-in zoom-in-95 duration-200">
        <ServiceForm service={service} onClose={onClose} />
      </div>
    </div>
  );
}
