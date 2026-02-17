interface Props {
  message:   string;
  onConfirm: () => void;
  onCancel:  () => void;
}

export default function ConfirmDialog({ message, onConfirm, onCancel }: Props) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl border border-pink-200/50 p-6 max-w-sm w-full">
        <div className="h-1 bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 rounded-full mb-5"></div>

        <div className="text-center mb-6">
          <span className="text-5xl block mb-3">🗑️</span>
          <p className="text-rose-800 font-semibold">{message}</p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onConfirm}
            className="flex-1 bg-gradient-to-r from-red-400 to-rose-500 text-white py-2.5 rounded-full font-bold shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
          >
            Eliminar
          </button>
          <button
            onClick={onCancel}
            className="flex-1 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 py-2.5 rounded-full font-bold hover:from-gray-200 hover:to-gray-300 transition-all duration-300"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}