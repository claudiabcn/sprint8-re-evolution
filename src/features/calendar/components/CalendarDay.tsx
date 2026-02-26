import { format, isSameDay } from 'date-fns';
import { SERVICE_COLORS } from '../../../shared/constants/constants';
import type { Service } from '../../../shared/types/types';

interface CalendarDayProps {
  day: Date;
  events: Service[];
  isCurrentMonth: boolean;
  onClick: (day: Date) => void;
  onEditEvent: (e: React.MouseEvent, event: Service) => void;
}

export function CalendarDay({ day, events, isCurrentMonth, onClick, onEditEvent }: CalendarDayProps) {
  const isToday = isSameDay(day, new Date());

  // Manejador para soportar la tecla Enter o Espacio
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick(day);
    }
  };

  return (
    <div 
      role="button"
      tabIndex={0}
      onClick={() => onClick(day)}
      onKeyDown={handleKeyDown}
      aria-label={`Seleccionar día ${format(day, 'd')}`}
      className={`bg-white min-h-[130px] p-2 border-t border-l border-pink-50 transition-all duration-300 hover:bg-rose-50/40 cursor-pointer group outline-none focus-visible:ring-2 focus-visible:ring-pink-400 focus-visible:z-10 ${
        !isCurrentMonth ? 'opacity-30 bg-gray-50/50' : ''
      }`}
    >
      <div className="flex justify-between items-start mb-2">
        <span className={`text-xs font-bold w-7 h-7 flex items-center justify-center rounded-full transition-colors ${
          isToday ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-md' : 'text-rose-400 group-hover:text-rose-600'
        }`}>
          {format(day, 'd')}
        </span>
      </div>
      
      {/* El contenedor de eventos no debe propagar el click al padre (el día) */}
      <div className="flex flex-col gap-1.5" onClick={(e) => e.stopPropagation()}>
        {events.map(event => (
          <button
            key={event.id}
            onClick={(e) => onEditEvent(e, event)}
            className="text-[10px] p-1.5 rounded-lg text-white font-bold truncate hover:scale-105 active:scale-95 transition-all shadow-sm border border-white/20 text-left"
            style={{ 
              backgroundColor: SERVICE_COLORS[event.tipo_servicio as keyof typeof SERVICE_COLORS] 
            }}
          >
            {event.tipo_servicio}
          </button>
        ))}
      </div>
    </div>
  );
}