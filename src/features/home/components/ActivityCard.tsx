interface Props {
  icon:  string;
  label: string;
  time?: string;
  color?: 'pink' | 'yellow';
  onClick?: () => void;
}

export default function ActivityCard({
  icon,
  label,
  time,
  color   = 'pink',
  onClick,
}: Props) {
  const bg = color === 'pink' ? 'bg-pastel-pink' : 'bg-pastel-yellow';

  return (
    <div
      onClick={onClick}
      className="glass-card rounded-card p-5 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 cursor-pointer"
    >
      <div className={`w-11 h-11 rounded-full ${bg} flex items-center justify-center mb-4`}>
        <span className="text-xl">{icon}</span>
      </div>
      <p className="text-sm font-semibold text-primary-text">{label}</p>
      {time && (
        <p className="text-xs mt-0.5 text-primary-text/60">{time}</p>
      )}
    </div>
  );
}