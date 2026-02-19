import { useState, useCallback } from 'react';
import { format, isSameDay, isSameMonth } from 'date-fns';
import { es } from 'date-fns/locale';
import { useCalendar } from './hooks/useCalendar';
import Layout from '../../shared/components/Layout';
import ServiceForm from '../records/ServiceForm';
import { CalendarHeader } from './components/CalendarHeader';
import { CalendarDay } from './components/CalendarDay';
import type { Service } from '../../shared/types/types';

export default function Calendar() {
  const { currentDate, setCurrentDate, events, days, refreshEvents } = useCalendar();
  
  const [selectedEvent, setSelectedEvent] = useState<Service | undefined>(undefined);
  const [preselectedDate, setPreselectedDate] = useState<string | undefined>(undefined);
  const [showForm, setShowForm] = useState(false);

  const handleEditEvent = useCallback((e: React.MouseEvent, event: Service) => {
    e.stopPropagation();
    setPreselectedDate(undefined); 
    setSelectedEvent(event);
    setShowForm(true);
  }, []);

  const handleDayClick = useCallback((day: Date) => {
    setSelectedEvent(undefined); 
    setPreselectedDate(format(day, 'yyyy-MM-dd')); 
    setShowForm(true);
  }, []);

  const handleCloseForm = useCallback(() => {
    setShowForm(false);
    setSelectedEvent(undefined); 
    setPreselectedDate(undefined); 
    refreshEvents(); 
  }, [refreshEvents]);

  return (
    <Layout 
      title="Mi Calendario" 
      subtitle={format(currentDate, 'MMMM yyyy', { locale: es })}
      maxWidth="max-w-7xl"
      headerContent={
        <CalendarHeader 
          currentDate={currentDate} 
          setCurrentDate={setCurrentDate} 
        />
      }
    >
      <div className="grid grid-cols-7 gap-px bg-pink-100 border border-pink-100 rounded-xl overflow-hidden shadow-inner">
        {['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'].map(d => (
          <div key={d} className="bg-pink-50/50 p-3 text-center text-xs font-bold text-rose-700 uppercase tracking-wider">
            {d}
          </div>
        ))}
        
        {days.map(day => (
          <CalendarDay 
            key={day.toString()} 
            day={day}
            events={events.filter(e => isSameDay(new Date(e.fecha), day))}
            isCurrentMonth={isSameMonth(day, currentDate)}
            onClick={handleDayClick}
            onEditEvent={handleEditEvent}
          />
        ))}
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