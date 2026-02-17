interface Props {
  icon: string;
  label: string;
  time?: string;
  color?: 'pink' | 'amber' | 'purple' | 'rose';
  onClick?: () => void;
}

const colorVariants = {
  pink:   'from-pink-50 to-rose-50 border-pink-200 hover:border-pink-300 text-rose-800',
  amber:  'from-amber-50 to-orange-50 border-amber-200 hover:border-amber-300 text-amber-900',
  purple: 'from-purple-50 to-pink-50 border-purple-200 hover:border-purple-300 text-purple-900',
  rose:   'from-rose-50 to-pink-50 border-rose-200 hover:border-rose-300 text-rose-900',
};

export default function ActivityCard({
  icon,
  label,
  time,
  color = 'pink',
  onClick,
}: Props) {
  return (
    <div
      onClick={onClick}
      className={`group relative bg-gradient-to-br ${colorVariants[color]} rounded-xl p-4 border-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-pointer overflow-hidden`}
    >
      <div className="absolute top-0 right-0 w-12 h-12 bg-white/20 rounded-bl-full transition-transform group-hover:scale-110"></div>
      
      <div className="relative flex flex-col items-center gap-2 text-center">
        <span className="text-2xl transition-transform duration-300 group-hover:scale-110">
          {icon}
        </span>
        
        <div>
          <h3 className="text-sm font-bold leading-tight">
            {label}
          </h3>
          {time && (
            <p className="text-xs mt-1 opacity-70 font-medium italic">
              {time}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}