import { format, addMonths, subMonths } from 'date-fns';
import { es } from 'date-fns/locale';
import Button from '../../../shared/components/Button';

interface CalendarHeaderProps {
  currentDate: Date;
  setCurrentDate: (date: Date) => void;
}

export function CalendarHeader({ currentDate, setCurrentDate }: CalendarHeaderProps) {
  return (
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
  );
}