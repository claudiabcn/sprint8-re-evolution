interface Props {
  error: string;
  onClose: () => void;
}

export default function ErrorBanner({ error, onClose }: Props) {
  return (
    <div className="flex items-center justify-between gap-2 bg-red-50 border-2 border-red-200 text-red-700 text-sm font-medium px-4 py-3 rounded-lg mb-6">
      <div className="flex items-center gap-2">
        <span>⚠️</span>
        <span>{error}</span>
      </div>
      <button onClick={onClose} className="text-red-400 hover:text-red-600 font-bold text-lg leading-none">×</button>
    </div>
  );
}
