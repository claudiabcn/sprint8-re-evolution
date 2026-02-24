import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import { useAuth } from '../context/AuthContext';

export function useLoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  
  const [loginError, setLoginError] = useState<{ show: boolean; msg: string }>({
    show: false,
    msg: ''
  });

  const navigate = useNavigate();
  const { session } = useAuth();

  useEffect(() => {
    if (session) navigate('/');
  }, [session, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await authService.login({ email, password });
    } catch (error: any) {
      setLoginError({
        show: true,
        msg: error.message || 'Credenciales incorrectas. Por favor, revisa tus datos.'
      });
    } finally {
      setLoading(false);
    }
  };

  const closeError = () => setLoginError({ show: false, msg: '' });

  return { 
    email, setEmail, 
    password, setPassword, 
    loading, handleSubmit,
    loginError, closeError 
  };
}