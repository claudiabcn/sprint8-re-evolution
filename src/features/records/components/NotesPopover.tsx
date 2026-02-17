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
      >
        📝
      </button>

      {visible && (
        <div className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-3 w-64 bg-white/95 backdrop-blur-sm border-2 border-pink-100 rounded-2xl shadow-2xl p-4 animate-in fade-in zoom-in duration-200">
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-pink-100"></div>
          <p className="text-sm text-rose-800 leading-relaxed italic">"{notes}"</p>
        </div>
      )}
    </div>
  );
}