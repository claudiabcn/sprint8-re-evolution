import { useState } from 'react';
import { format, isSameDay, isSameMonth, addMonths, subMonths } from 'date-fns';
import { es } from 'date-fns/locale';
import { useCalendar } from './hooks/useCalendar';
import { SERVICE_COLORS } from '../../shared/constants/constants';
import Layout from '../../shared/components/Layout';
import Button from '../../shared/components/Button';
import ServiceForm from '../records/ServiceForm';

export default function Calendar() {
  const { currentDate, setCurrentDate, events, days, refreshEvents } = useCalendar();
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [showForm, setShowForm] = useState(false);
  const [preselectedDate, setPreselectedDate] = useState<string | null>(null);

  const handleEditEvent = (e: React.MouseEvent, event: any) => {
    e.stopPropagation();
    setPreselectedDate(null);
    setSelectedEvent(event);
    setShowForm(true);
  };

  const handleDayClick = (day: Date) => {
    setSelectedEvent(null);
    setPreselectedDate(format(day, 'yyyy-MM-dd')); 
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setSelectedEvent(null);
    setPreselectedDate(null);
    refreshEvents(); 
  };

  return (
    <Layout 
      title="Mi Calendario" 
      subtitle={format(currentDate, 'MMMM yyyy', { locale: es })}
      maxWidth="max-w-7xl"
      headerContent={
        <div className="flex items-center gap-3 bg-white/50 p-1.5 rounded-full border border-pink-100 shadow-sm backdrop-blur-sm">
          <Button 
            variant="secondary" 
            onClick={() => setCurrentDate(subMonths(currentDate, 1))}
            className="!p-0 h-10 w-10 flex items-center justify-center shadow-none rounded-full"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
            </svg>
          </Button>
          <div className="h-6 w-px bg-pink-200 mx-1"></div>
          <Button 
            variant="secondary" 
            onClick={() => setCurrentDate(addMonths(currentDate, 1))}
            className="!p-0 h-10 w-10 flex items-center justify-center shadow-none rounded-full"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
            </svg>
          </Button>
        </div>
      }
    >
      <div className="grid grid-cols-7 gap-px bg-pink-100 border border-pink-100 rounded-xl overflow-hidden shadow-inner">
        {['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'].map(d => (
          <div key={d} className="bg-pink-50/50 p-3 text-center text-xs font-bold text-rose-700 uppercase tracking-wider">
            {d}
          </div>
        ))}
          {days.map(day => {
          const dayEvents = events.filter(e => isSameDay(new Date(e.fecha), day));
          const isCurrentMonth = isSameMonth(day, currentDate);
          const isToday = isSameDay(day, new Date());
          return (
            <div 
              key={day.toString()} 
              onClick={() => handleDayClick(day)}
              className={`bg-white min-h-[130px] p-2 border-t border-l border-pink-50 transition-all duration-300 hover:bg-rose-50/40 cursor-pointer group ${
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
              <div className="flex flex-col gap-1.5">
                {dayEvents.map(event => (
                  <button
                    key={event.id}
                    onClick={(e) => handleEditEvent(e, event)}
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
        })}
      </div>
      {showForm && (
        <div className="fixed inset-0 bg-rose-950/40 backdrop-blur-md flex items-center justify-center z-[999] p-4 md:p-6 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl animate-in zoom-in-95 duration-200 my-auto">
            <ServiceForm 
              service={selectedEvent} 
              onClose={handleCloseForm} 
              initialDate={preselectedDate} 
            />
          </div>
        </div>
      )}
    </Layout>
  );
}