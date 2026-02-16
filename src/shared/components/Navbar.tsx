import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { path: '/', label: 'Inicio', icon: '🏠' },
    { path: '/calendar', label: 'Calendario', icon: '📅' },
    { path: '/maps', label: 'Mapa', icon: '🗺️' },
    { path: '/chart', label: 'Progreso', icon: '📊' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-gradient-to-r from-pastel-pink-100 via-pastel-yellow-50 to-pastel-pink-100 shadow-lg border-b-2 border-pastel-pink-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          <Link to="/" className="flex items-center gap-2 group">
            <span className="text-3xl group-hover:scale-110 transition-transform">🏋️</span>
            <span className="text-2xl font-extrabold text-pastel-pink-700 tracking-tight">
              Re-Evolución
            </span>
          </Link>


          <div className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all
                  ${
                    isActive(link.path)
                      ? 'bg-pastel-pink-200 text-pastel-pink-800 shadow-md'
                      : 'text-pastel-pink-700 hover:bg-pastel-pink-100 hover:text-pastel-pink-800'
                  }
                `}
              >
                <span className="text-xl">{link.icon}</span>
                <span>{link.label}</span>
              </Link>
            ))}
          </div>


          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg text-pastel-pink-700 hover:bg-pastel-pink-100 transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden pb-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all
                  ${
                    isActive(link.path)
                      ? 'bg-pastel-pink-200 text-pastel-pink-800 shadow-md'
                      : 'text-pastel-pink-700 hover:bg-pastel-pink-100'
                  }
                `}
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
