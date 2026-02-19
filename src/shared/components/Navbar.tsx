import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../features/auth/context/AuthContext';
import { authService } from '../../features/auth/services/authService';

const navLinks = [
  { path: '/calendar',   label: 'Calendario',   icon: '📅' },
  { path: '/records',    label: 'Registros',    icon: '📋' },
  { path: '/charts', label: 'Progreso',     icon: '📈' }, 
  { path: '/maps',       label: 'Centros',      icon: '📍' },
];

const Navbar = () => {
  const { session, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (loading) return <nav className="h-16" />;

  const handleAuthAction = async () => {
    if (session) {
      await authService.logout();
      navigate('/login');
    } else {
      navigate('/login');
    }
  };

  const isActive = (path: string) => location.pathname === path;
  const isLoginPage = location.pathname === '/login';

  return (
    <nav className={`sticky top-0 z-[100] transition-all duration-500 ${
      scrolled ? 'py-2 bg-white/80 backdrop-blur-xl shadow-sm border-b' : 'py-5 bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          
          <Link to="/" className="flex items-center gap-3">
            <span className="text-xl font-black text-rose-600 tracking-tighter italic">Re-Evolución</span>
          </Link>

          <div className="hidden md:flex items-center gap-4">
            {session && (
              <div className="flex items-center p-1.5 bg-rose-50/50 backdrop-blur-md rounded-full border border-rose-100">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`px-6 py-2.5 rounded-full font-bold text-sm transition-all ${
                      isActive(link.path) ? 'bg-white text-rose-700 shadow-sm' : 'text-rose-400 hover:text-rose-600'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}

            {!isLoginPage && (
              <button 
                onClick={handleAuthAction}
                className={`px-8 py-3 rounded-full font-bold shadow-lg transition-all hover:scale-105 active:scale-95 ${
                  session 
                  ? 'bg-rose-100 text-rose-600 hover:bg-rose-200' 
                  : 'bg-gradient-to-r from-rose-500 to-pink-600 text-white'
                }`}
              >
                {session ? 'Cerrar Sesión' : 'Iniciar Sesión'}
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;