import { useState } from 'react';
import Layout from '../../shared/components/Layout';
import ServiceForm from '../records/ServiceForm';

const Home = () => {
  const [showForm, setShowForm] = useState(false);
  const [selectedServiceType, setSelectedServiceType] = useState<string | null>(null);

  const handleCardClick = (serviceType: string) => {
    setSelectedServiceType(serviceType);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setSelectedServiceType(null);
  };

  const services = [
    { title: "Cita médica", icon: "💪", type: "Cita médica", color: "from-pink-500/20 to-rose-500/5", border: "border-pink-200", text: "text-rose-900", desc: "Seguimiento profesional" },
    { title: "Fisioterapia", icon: "💆", type: "Fisioterapia", color: "from-amber-500/20 to-orange-500/5", border: "border-amber-200", text: "text-amber-900", desc: "Recupera tu equilibrio" },
    { title: "Rehabilitación vestibular", icon: "🧠", type: "Rehabilitación vestibular", color: "from-purple-500/20 to-indigo-500/5", border: "border-purple-200", text: "text-purple-900", desc: "Entrena tu centro" },
    { title: "Actividad física", icon: "💃", type: "Actividad física", color: "from-rose-500/20 to-pink-500/5", border: "border-rose-200", text: "text-rose-900", desc: "Energía en movimiento" }
  ];

  return (
    <Layout 
          title="Tu Re-Evolución" 
      subtitle="Rehabilita tu cuerpo, evoluciona tu movimiento."
    >
      <div className="mb-12 text-center md:text-left">
        <h2 className="text-4xl md:text-5xl font-black text-rose-900 mb-4 tracking-tight">
          ¿Qué hacemos hoy?         </h2>
        <p className="text-rose-700/70 text-lg max-w-2xl mb-6">
          Registra tu actividad para visualizar tu progreso y sanar de forma consciente.
        </p>
        <div className="w-32 h-2 bg-gradient-to-r from-pink-500 to-amber-500 rounded-full mx-auto md:mx-0"></div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {services.map((service) => (
          <button 
            key={service.type}
            onClick={() => handleCardClick(service.type)}
            className={`group relative flex flex-col items-center justify-between p-10 min-h-[320px] rounded-[3rem] border-2 ${service.border} bg-gradient-to-br ${service.color} transition-all duration-500 hover:-translate-y-4 hover:shadow-[0_30px_60px_-15px_rgba(251,113,133,0.3)] active:scale-95`}
          >
            <div className="w-24 h-24 bg-white/80 backdrop-blur-sm rounded-3xl flex items-center justify-center shadow-md border border-white transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
               <span className="text-5xl">{service.icon}</span>
            </div>
            
            <div className="mt-8 text-center">
              <h3 className={`text-2xl font-black ${service.text} leading-tight mb-2`}>
                {service.title}
              </h3>
              <p className={`text-sm opacity-70 font-medium ${service.text}`}>
                {service.desc}
              </p>
            </div>

            <div className={`mt-6 px-4 py-2 rounded-full bg-white/40 text-xs font-bold uppercase tracking-widest ${service.text} group-hover:bg-white transition-colors`}>
                Registrar +
            </div>
          </button>
        ))}
      </div>

      <div className="mt-20 text-center">
        <div className="inline-flex items-center gap-3 p-2 pr-8 rounded-full bg-white shadow-sm border border-rose-100">
           <span className="flex h-10 w-10 items-center justify-center rounded-full bg-rose-500 text-white animate-pulse">✨</span>
           <p className="text-rose-900 font-semibold italic">
             "La evolución es un proceso, no un destino."
           </p>
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-rose-950/60 backdrop-blur-xl flex items-center justify-center z-[999] p-4">
          <div className="bg-white rounded-[3.5rem] max-w-lg w-full shadow-2xl animate-in fade-in zoom-in duration-300 max-h-[90vh] overflow-y-auto">
            <ServiceForm 
              service={null} 
              onClose={handleCloseForm} 
              initialServiceType={selectedServiceType} 
            />
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Home;