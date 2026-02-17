import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-amber-50 to-pink-50 flex items-center justify-center">
      <div className="text-center">
        <p className="text-8xl mb-4">🌀</p>
        <h1 className="text-4xl font-black text-rose-700 mb-2">Página no encontrada</h1>
        <p className="text-rose-500 mb-6">La ruta que buscas no existe</p>
        <Link
          to="/"
          className="bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 text-white px-6 py-3 rounded-full font-bold hover:scale-105 transition-all duration-300"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}