import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const navLinks = [
  { path: '/calendar',   label: 'Calendario',   icon: '📅' },
  { path: '/records',    label: 'Registros',    icon: '📋' },
  { path: '/statistics', label: 'Progreso',     icon: '📈' }, 
  { path: '/maps',       label: 'Centros',      icon: '📍' },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className={`sticky top-0 z-[100] transition-all duration-500 ${
      scrolled 
        ? 'py-2 bg-white/80 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border-b border-rose-50' 
        : 'py-5 bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className={`flex justify-between items-center transition-all duration-500 ${
          scrolled ? 'h-14' : 'h-16'
        }`}>
          
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative w-11 h-11 flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-tr from-pink-400 to-amber-400 rounded-2xl rotate-6 group-hover:rotate-12 group-hover:scale-110 transition-all duration-500 opacity-20" />
                <div className="w-10 h-10 bg-white rounded-2xl shadow-sm flex items-center justify-center group-hover:-rotate-6 transition-all duration-500 border border-rose-50">
                  <span className="text-2xl">✨</span>
                </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-[1000] leading-none text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-amber-600 tracking-tighter">
                Re-Evolución
              </span>
              <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-rose-300">Movimiento • Salud</span>
            </div>
          </Link>

          <div className="hidden md:flex items-center p-1.5 bg-rose-50/50 backdrop-blur-md rounded-full border border-rose-100/50">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative flex items-center gap-2 px-6 py-2.5 rounded-full font-bold text-sm transition-all duration-500 ${
                  isActive(link.path)
                    ? 'text-rose-700 shadow-sm'
                    : 'text-rose-400/80 hover:text-rose-600 hover:bg-white/50'
                }`}
              >
                {isActive(link.path) && (
                  <div className="absolute inset-0 bg-white rounded-full shadow-sm animate-in fade-in zoom-in-95 duration-300" />
                )}
                
                <span className="relative z-10 text-lg">{link.icon}</span>
                <span className="relative z-10">{link.label}</span>
              </Link>
            ))}
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`md:hidden p-3 rounded-2xl transition-all ${
                isMenuOpen ? 'bg-rose-600 text-white' : 'bg-rose-50 text-rose-500 hover:bg-rose-100'
            }`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d={isMenuOpen ? "M6 18L18 6" : "M4 8h16M4 16h16"} />
            </svg>
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden absolute top-20 left-4 right-4 p-4 bg-white/95 backdrop-blur-2xl rounded-[2.5rem] shadow-2xl border border-rose-50 space-y-2 animate-in slide-in-from-top-10 duration-500 ease-out">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className={`flex items-center gap-4 px-6 py-5 rounded-[1.8rem] font-black transition-all ${
                  isActive(link.path)
                    ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-lg shadow-rose-200'
                    : 'text-rose-400 hover:bg-rose-50'
                }`}
              >
                <span className="text-3xl bg-white/20 p-2 rounded-xl">{link.icon}</span>
                <span className="text-lg">{link.label}</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;