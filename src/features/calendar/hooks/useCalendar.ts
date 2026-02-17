import { useState, useEffect } from 'react';
import { getServices, Service } from '../../../shared/services/supabaseService';
import { 
  startOfMonth, 
  endOfMonth, 
  eachDayOfInterval, 
  startOfWeek, 
  endOfWeek 
} from 'date-fns';

export function useCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const data = await getServices(); 
      setEvents(data);
    } catch (err) {
      console.error("Error al cargar eventos:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  const calendarStart = startOfWeek(monthStart, { weekStartsOn: 1 });
  const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 1 });

  const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd });

  return {
    currentDate,
    setCurrentDate,
    events,
    days,
    loading,
    refreshEvents: fetchEvents
  };
}