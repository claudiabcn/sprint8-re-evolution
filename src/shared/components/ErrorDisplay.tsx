import Button from './Button';

interface ErrorDisplayProps {
  message?: string;
  onRetry: () => void;
  title?: string;
  icon?: string;
}

export default function ErrorDisplay({ 
  message, 
  onRetry, 
  title = "¡Ups! Algo falló", 
  icon = "🌀" 
}: ErrorDisplayProps) {
  return (
    <div className="relative w-full max-w-md mx-auto">
      <div className="absolute inset-0 bg-gradient-to-r from-pink-400/20 via-amber-400/20 to-rose-400/20 rounded-3xl blur-2xl transform scale-110"></div>
      
      <div className="relative bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl border border-pink-100 p-8 text-center">
        <div className="h-1.5 bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 rounded-full mb-8"></div>

        <div className="w-24 h-24 bg-rose-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-5xl animate-pulse">{icon}</span>
        </div>

        <h2 className="text-3xl font-black text-rose-900 mb-3 tracking-tight">
          {title}
        </h2>

        {message && (
          <p className="text-rose-600 font-medium mb-8 bg-rose-50/50 py-3 px-4 rounded-xl border border-rose-100 italic">
            {message}
          </p>
        )}

        <Button onClick={onRetry} className="w-full py-4 text-base">
          🔄 Reintentar ahora
        </Button>
      </div>
    </div>
  );
}