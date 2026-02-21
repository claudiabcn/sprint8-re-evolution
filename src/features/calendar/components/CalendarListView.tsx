import { format, isSameDay, eachDayOfInterval, startOfMonth, endOfMonth } from 'date-fns';
import { es } from 'date-fns/locale';
import { SERVICE_COLORS } from '../../../shared/constants/constants';
import type { Service } from '../../../shared/types/types';

interface Props {
  currentDate: Date;
  events: Service[];
  onDayClick: (day: Date) => void;
  onEditEvent: (e: React.MouseEvent, event: Service) => void;
}

export function CalendarListView({ currentDate, events, onDayClick, onEditEvent }: Props) {
  const days = eachDayOfInterval({
    start: startOfMonth(currentDate),
    end: endOfMonth(currentDate),
  });

  const isToday = (day: Date) => isSameDay(day, new Date());
  const getDayEvents = (day: Date) => events.filter(e => isSameDay(new Date(e.fecha), day));

  return (
    <div className="flex flex-col gap-2">
      {days.map(day => {
        const dayEvents = getDayEvents(day);
        const today = isToday(day);

        return (
          <div
            key={day.toString()}
            onClick={() => onDayClick(day)}
            className={`flex items-start gap-4 p-3 rounded-2xl cursor-pointer transition-all active:scale-[0.98] ${
              today ? 'bg-rose-50 border-2 border-rose-200' : 'bg-white border border-pink-100 hover:bg-pink-50/50'
            }`}
          >
            {/* Day number */}
            <div className="flex flex-col items-center min-w-[40px]">
              <span className="text-xs font-bold text-rose-400 uppercase">
                {format(day, 'EEE', { locale: es })}
              </span>
              <span className={`text-lg font-black w-9 h-9 flex items-center justify-center rounded-full ${
                today
                  ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-md'
                  : 'text-rose-800'
              }`}>
                {format(day, 'd')}
              </span>
            </div>

            {/* Events or empty state */}
            <div className="flex-1 flex flex-col gap-1.5 pt-1">
              {dayEvents.length === 0 ? (
                <span className="text-xs text-rose-200 italic pt-1">Sin eventos</span>
              ) : (
                dayEvents.map(event => (
                  <button
                    key={event.id}
                    onClick={(e) => onEditEvent(e, event)}
                    className="text-xs px-3 py-1.5 rounded-xl text-white font-bold text-left hover:scale-[1.02] active:scale-95 transition-all shadow-sm border border-white/20"
                    style={{ backgroundColor: SERVICE_COLORS[event.tipo_servicio as keyof typeof SERVICE_COLORS] }}
                  >
                    {event.tipo_servicio}
                    {event.entidad && (
                      <span className="font-normal opacity-80"> · {event.entidad}</span>
                    )}
                  </button>
                ))
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
