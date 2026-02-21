import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../features/auth/context/AuthContext';
import { authService } from '../../../features/auth/services/authService';

export const useNavbar = () => {
  const { session, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const handleAuthAction = async () => {
    if (session) {
      await authService.logout();
      navigate('/login');
    } else {
      navigate('/login');
    }
    setMenuOpen(false);
  };

  const isActive = (path: string) => location.pathname === path;
  const isLoginPage = location.pathname === '/login';

  return {
    session,
    loading,
    scrolled,
    menuOpen,
    setMenuOpen,
    handleAuthAction,
    isActive,
    isLoginPage,
  };
};
