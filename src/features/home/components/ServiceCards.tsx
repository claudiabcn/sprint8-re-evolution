import { useHomeForm } from '../hooks/useFormHome';
import ServiceModal from '../components/ServiceModal';
import { SERVICE_TYPES } from '../../../shared/constants/constants';
import { SERVICE_CARD_CONFIG } from '../../../config/appData';

const ServiceCards = () => {
  const { showForm, selectedServiceType, handleCardClick, handleCloseForm } = useHomeForm();

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {SERVICE_TYPES.map((type) => {
          const { icon, desc, color, border, text } = SERVICE_CARD_CONFIG[type];
          return (
            <button
              key={type}
              onClick={() => handleCardClick(type)}
              className={`group relative flex flex-col items-center justify-between p-10 min-h-[320px] rounded-[3rem] border-2 ${border} bg-gradient-to-br ${color} transition-all duration-500 hover:-translate-y-4 hover:shadow-[0_30px_60px_-15px_rgba(251,113,133,0.3)] active:scale-95`}
            >
              <div className="w-24 h-24 bg-white/80 backdrop-blur-sm rounded-3xl flex items-center justify-center shadow-md border border-white transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                <span className="text-5xl">{icon}</span>
              </div>

              <div className="mt-8 text-center">
                <h3 className={`text-2xl font-black ${text} leading-tight mb-2`}>
                  {type}
                </h3>
                <p className={`text-sm opacity-70 font-medium ${text}`}>
                  {desc}
                </p>
              </div>

              <div className={`mt-6 px-4 py-2 rounded-full bg-white/40 text-xs font-bold uppercase tracking-widest ${text} group-hover:bg-white transition-colors`}>
                Registrar +
              </div>
            </button>
          );
        })}
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