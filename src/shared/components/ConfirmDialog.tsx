import Button from './Button';

interface Props {
  message:   string;
  onConfirm: () => void;
  onCancel:  () => void;
}

export default function ConfirmDialog({ message, onConfirm, onCancel }: Props) {
  return (
    <div className="fixed inset-0 bg-rose-900/20 backdrop-blur-sm flex items-center justify-center z-[100] p-4 animate-in fade-in duration-300">
      <div className="bg-white rounded-3xl shadow-2xl border border-pink-100 p-6 max-w-sm w-full transform animate-in zoom-in-95 duration-200">
        <div className="h-1.5 bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 rounded-full mb-6"></div>

        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-rose-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-4xl">🗑️</span>
          </div>
          <p className="text-rose-900 font-bold text-lg leading-tight px-2">{message}</p>
          <p className="text-rose-500 text-sm mt-2 font-medium">Esta acción no se puede deshacer</p>
        </div>

        <div className="flex flex-col gap-3">
          <Button 
            variant="danger" 
            onClick={onConfirm}
            className="w-full py-3"
          >
            Confirmar eliminación
          </Button>
          <Button 
            variant="secondary" 
            onClick={onCancel}
            className="w-full py-3"
          >
            No, volver atrás
          </Button>
        </div>
      </div>
    </div>
  );
}