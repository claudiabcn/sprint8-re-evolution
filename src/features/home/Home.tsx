const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-amber-50 to-pink-50">
      <div className="max-w-6xl mx-auto px-6 py-12">

        <div className="text-center mb-12 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-8 w-24 h-24 bg-gradient-to-br from-pink-300/20 to-amber-300/20 rounded-full blur-3xl"></div>

          <div className="relative inline-block">
            <h1 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-rose-500 to-amber-600 mb-3 tracking-tight leading-none">
              Re-Evolución
            </h1>
            <div className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-pink-400 to-transparent opacity-60"></div>
          </div>

          <p className="text-lg md:text-xl text-rose-700 font-light mt-4 max-w-2xl mx-auto">
            Tu espacio personal para conectar, sanar y potenciar tu movimiento
          </p>
        </div>

        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-pink-400/20 via-amber-400/20 to-rose-400/20 rounded-2xl blur-xl transform scale-105"></div>

          <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-pink-200/50 overflow-hidden">
            <div className="h-1.5 bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500"></div>

            <div className="p-6 md:p-8">
              <div className="mb-6">
                <h2 className="text-2xl md:text-3xl font-bold text-rose-800 mb-2 tracking-tight">
                  Tu camino de recuperación
                </h2>
                <div className="w-20 h-0.5 bg-gradient-to-r from-pink-500 to-amber-500 rounded-full"></div>
              </div>

              <p className="text-base md:text-lg text-rose-600 mb-6 font-light">
                Sigue tu progreso y registra cada paso de tu evolución
              </p>

              <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">

                <div className="group relative bg-gradient-to-br from-pink-50 to-rose-50 rounded-lg p-4 border-2 border-pink-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-pink-300 cursor-pointer">
                  <div className="absolute top-0 right-0 w-12 h-12 bg-pink-300/10 rounded-bl-full"></div>
                  <div className="relative flex flex-col items-center gap-2 text-center">
                    <span className="text-2xl transition-transform duration-300 group-hover:scale-110">💪</span>
                    <h3 className="text-sm font-bold text-rose-800 leading-tight">
                      Cita médica
                    </h3>
                  </div>
                </div>

                <div className="group relative bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg p-4 border-2 border-amber-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-amber-300 cursor-pointer">
                  <div className="absolute top-0 right-0 w-12 h-12 bg-amber-300/10 rounded-bl-full"></div>
                  <div className="relative flex flex-col items-center gap-2 text-center">
                    <span className="text-2xl transition-transform duration-300 group-hover:scale-110">💆</span>
                    <h3 className="text-sm font-bold text-amber-900 leading-tight">
                      Fisioterapia
                    </h3>
                  </div>
                </div>

                <div className="group relative bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-4 border-2 border-purple-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-purple-300 cursor-pointer">
                  <div className="absolute top-0 right-0 w-12 h-12 bg-purple-300/10 rounded-bl-full"></div>
                  <div className="relative flex flex-col items-center gap-2 text-center">
                    <span className="text-2xl transition-transform duration-300 group-hover:scale-110">🧠</span>
                    <h3 className="text-sm font-bold text-purple-900 leading-tight">
                      Rehabilitación vestibular
                    </h3>
                  </div>
                </div>

                <div className="group relative bg-gradient-to-br from-rose-50 to-pink-50 rounded-lg p-4 border-2 border-rose-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-rose-300 cursor-pointer">
                  <div className="absolute top-0 right-0 w-12 h-12 bg-rose-300/10 rounded-bl-full"></div>
                  <div className="relative flex flex-col items-center gap-2 text-center">
                    <span className="text-2xl transition-transform duration-300 group-hover:scale-110">💃</span>
                    <h3 className="text-sm font-bold text-rose-900 leading-tight">
                      Actividad física
                    </h3>
                  </div>
                </div>

              </div>

              <div className="mt-10 text-center">
                <button className="group relative inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 text-white px-6 py-3 rounded-full font-bold text-sm shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-pink-300/40">
                  <span>Iniciar sesión</span>
                  <svg
                    className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
