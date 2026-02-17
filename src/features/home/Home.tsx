import Button from '../../shared/components/Button';
import Layout from '../../shared/components/Layout';

const Home = () => {
  return (
    <Layout 
      title="Re-Evolución" 
      subtitle="Tu espacio personal para conectar, sanar y potenciar tu movimiento"
    >
      <div className="mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-rose-800 mb-2 tracking-tight">
          Tu camino de recuperación
        </h2>
        <div className="w-20 h-0.5 bg-gradient-to-r from-pink-500 to-amber-500 rounded-full"></div>
      </div>

      <p className="text-base md:text-lg text-rose-600 mb-6 font-light">
        Sigue tu progreso y registra cada paso de tu evolución
      </p>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="group relative bg-gradient-to-br from-pink-50 to-rose-50 rounded-lg p-4 border-2 border-pink-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-pink-300 cursor-pointer">
          <div className="absolute top-0 right-0 w-12 h-12 bg-pink-300/10 rounded-bl-full"></div>
          <div className="relative flex flex-col items-center gap-2 text-center">
            <span className="text-2xl transition-transform duration-300 group-hover:scale-110">💪</span>
            <h3 className="text-sm font-bold text-rose-800 leading-tight">Cita médica</h3>
          </div>
        </div>

        <div className="group relative bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg p-4 border-2 border-amber-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-amber-300 cursor-pointer">
          <div className="absolute top-0 right-0 w-12 h-12 bg-amber-300/10 rounded-bl-full"></div>
          <div className="relative flex flex-col items-center gap-2 text-center">
            <span className="text-2xl transition-transform duration-300 group-hover:scale-110">💆</span>
            <h3 className="text-sm font-bold text-amber-900 leading-tight">Fisioterapia</h3>
          </div>
        </div>

        <div className="group relative bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-4 border-2 border-purple-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-purple-300 cursor-pointer">
          <div className="absolute top-0 right-0 w-12 h-12 bg-purple-300/10 rounded-bl-full"></div>
          <div className="relative flex flex-col items-center gap-2 text-center">
            <span className="text-2xl transition-transform duration-300 group-hover:scale-110">🧠</span>
            <h3 className="text-sm font-bold text-purple-900 leading-tight">Rehabilitación vestibular</h3>
          </div>
        </div>

        <div className="group relative bg-gradient-to-br from-rose-50 to-pink-50 rounded-lg p-4 border-2 border-rose-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-rose-300 cursor-pointer">
          <div className="absolute top-0 right-0 w-12 h-12 bg-rose-300/10 rounded-bl-full"></div>
          <div className="relative flex flex-col items-center gap-2 text-center">
            <span className="text-2xl transition-transform duration-300 group-hover:scale-110">💃</span>
            <h3 className="text-sm font-bold text-rose-900 leading-tight">Actividad física</h3>
          </div>
        </div>
      </div>

      <div className="mt-10 text-center">
        <Button withArrow>Iniciar sesión</Button>
      </div>
    </Layout>
  );
};

export default Home;