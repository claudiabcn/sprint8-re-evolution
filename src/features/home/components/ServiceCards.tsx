import { useHomeForm } from '../hooks/useFormHome';
import ServiceModal from '../components/ServiceModal';

const services = [
  {
    title: "Cita médica",
    icon: "💪",
    type: "Cita médica",
    color: "from-pink-500/20 to-rose-500/5",
    border: "border-pink-200",
    text: "text-rose-900",
    desc: "Seguimiento profesional"
  },
  {
    title: "Fisioterapia",
    icon: "💆",
    type: "Fisioterapia",
    color: "from-amber-500/20 to-orange-500/5",
    border: "border-amber-200",
    text: "text-amber-900",
    desc: "Recupera tu equilibrio"
  },
  {
    title: "Rehabilitación vestibular",
    icon: "🧠",
    type: "Rehabilitación vestibular",
    color: "from-purple-500/20 to-indigo-500/5",
    border: "border-purple-200",
    text: "text-purple-900",
    desc: "Entrena tu centro"
  },
  {
    title: "Actividad física",
    icon: "💃",
    type: "Actividad física",
    color: "from-rose-500/20 to-pink-500/5",
    border: "border-rose-200",
    text: "text-rose-900",
    desc: "Energía en movimiento"
  }
];

const ServiceCards = () => {
  const { showForm, selectedServiceType, handleCardClick, handleCloseForm } = useHomeForm();

  return (
    <>
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

      <ServiceModal
        showForm={showForm}
        selectedServiceType={selectedServiceType}
        onClose={handleCloseForm}
      />
    </>
  );
};

export default ServiceCards;