import { Link } from 'react-router-dom';
import Button from '../../shared/components/Button';

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center p-6">
      <div className="relative w-full max-w-md text-center">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-400/20 via-amber-400/20 to-rose-400/20 rounded-3xl blur-3xl transform scale-110"></div>
        
        <div className="relative bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl border border-pink-100 p-10">
          <div className="h-1.5 bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 rounded-full mb-8"></div>
          
          <div className="relative inline-block mb-6">
            <span className="text-8xl block animate-bounce">🌀</span>
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-12 h-2 bg-rose-900/10 rounded-[100%] blur-sm"></div>
          </div>

          <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-rose-700 mb-3 tracking-tight">
            404
          </h1>
          
          <h2 className="text-xl font-bold text-rose-800 mb-2">
            Página no encontrada
          </h2>
          
          <p className="text-rose-500 font-medium mb-8">
            Parece que te has movido a un lugar que aún no existe.
          </p>

          <Link to="/">
            <Button withArrow className="w-full py-4 text-base">
              Volver al inicio
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}