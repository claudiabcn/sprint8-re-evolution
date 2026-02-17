import { useState, useEffect, useRef } from 'react';

interface Props {
  notes: string;
}

export default function NotesPopover({ notes }: Props) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setVisible(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative inline-block">
      <button
        onClick={() => setVisible(!visible)}
        className="transition-transform hover:scale-110"
        title="Ver observaciones"
      >
        📝
      </button>

      {visible && (
        <div className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 w-56 bg-white border-2 border-pink-200 rounded-xl shadow-xl p-3">
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-pink-200"></div>
          <p className="text-sm text-rose-600 leading-relaxed">{notes}</p>
        </div>
      )}
    </div>
  );
}
