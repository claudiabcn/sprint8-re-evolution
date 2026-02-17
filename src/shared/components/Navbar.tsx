import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const navLinks = [
  { path: '/',        label: 'Inicio',    icon: '🏠' },
  { path: '/records', label: 'Registros', icon: '📋' },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-[100] bg-white/70 backdrop-blur-md border-b border-pink-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-gradient-to-br from-pink-100 to-amber-100 rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
              <span className="text-2xl">🏋️</span>
            </div>
            <span className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-rose-500 to-amber-600 tracking-tighter">
              Re-Evolución
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative flex items-center gap-2 px-5 py-2 rounded-full font-bold text-sm transition-all duration-300 ${
                  isActive(link.path)
                    ? 'text-rose-600 bg-pink-50'
                    : 'text-rose-400 hover:text-rose-600 hover:bg-rose-50/50'
                }`}
              >
                <span>{link.icon}</span>
                <span>{link.label}</span>
                {isActive(link.path) && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-0.5 bg-gradient-to-r from-pink-500 to-amber-500 rounded-full" />
                )}
              </Link>
            ))}
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-xl text-rose-500 hover:bg-pink-50 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden pb-6 space-y-1 animate-in slide-in-from-top-4 duration-200">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className={`flex items-center gap-4 px-4 py-4 rounded-2xl font-bold transition-all ${
                  isActive(link.path)
                    ? 'bg-gradient-to-r from-pink-50 to-amber-50 text-rose-700 shadow-sm border border-pink-100'
                    : 'text-rose-400 hover:bg-pink-50'
                }`}
              >
                <span className="text-2xl">{link.icon}</span>
                <span>{link.label}</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;