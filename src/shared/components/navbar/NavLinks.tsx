import { Link } from 'react-router-dom';

export const navLinks = [
  { path: '/calendar', label: 'Calendario', icon: '📅' },
  { path: '/records',  label: 'Actividades',  icon: '📋' },
  { path: '/charts',   label: 'Progreso',   icon: '📈' },
  { path: '/maps',     label: 'Centros',    icon: '📍' },
];

interface NavLinksProps {
  isActive: (path: string) => boolean;
  variant: 'desktop' | 'mobile';
  menuOpen?: boolean;
}

const NavLinks = ({ isActive, variant, menuOpen }: NavLinksProps) => {
  if (variant === 'desktop') {
    return (
      <div className="flex items-center p-1.5 bg-rose-50/50 backdrop-blur-md rounded-full border border-rose-100">
        {navLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`px-6 py-2.5 rounded-full font-bold text-sm transition-all ${
              isActive(link.path)
                ? 'bg-white text-rose-700 shadow-sm'
                : 'text-rose-400 hover:text-rose-600'
            }`}
          >
            {link.label}
          </Link>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {navLinks.map((link, i) => (
        <Link
          key={link.path}
          to={link.path}
          style={{ transitionDelay: menuOpen ? `${i * 60}ms` : '0ms' }}
          className={`flex items-center gap-4 px-5 py-4 rounded-2xl font-bold text-base transition-all duration-300 ${
            menuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
          } ${
            isActive(link.path)
              ? 'bg-rose-500 text-white shadow-md shadow-rose-200'
              : 'bg-rose-50 text-rose-700 hover:bg-rose-100'
          }`}
        >
          <span className="text-xl">{link.icon}</span>
          {link.label}
          {isActive(link.path) && (
            <span className="ml-auto w-2 h-2 rounded-full bg-white/70" />
          )}
        </Link>
      ))}
    </div>
  );
};

export default NavLinks;
