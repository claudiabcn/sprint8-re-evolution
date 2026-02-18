import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from './services/authService';
import { useAuth } from './context/AuthContext'; 
import Button from '../../shared/components/Button';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  

  const { session } = useAuth();

  useEffect(() => {
    if (session) {
      navigate('/');
    }
  }, [session, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await authService.login({ email, password });
    } catch (error: any) {
      alert('Error de acceso: ' + (error.message || 'Credenciales incorrectas'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-50 to-amber-50 p-6">
      <div className="w-full max-w-md bg-white rounded-[3rem] shadow-2xl shadow-rose-200/50 p-10 border border-rose-100 animate-in fade-in zoom-in duration-500">
        
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-tr from-pink-500 to-amber-500 rounded-[2rem] text-white text-4xl mb-4 shadow-lg rotate-3 transition-transform hover:rotate-0 duration-500">
            ✨
          </div>
          <h1 className="text-3xl font-black text-rose-900 tracking-tighter italic">Re-Evolución</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-bold text-rose-900 ml-4">Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-6 py-4 rounded-full bg-rose-50/50 border-2 border-transparent focus:border-pink-300 focus:bg-white outline-none transition-all font-medium placeholder:text-rose-300"
              placeholder="admin@re-evolucion.com"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-bold text-rose-900 ml-4">Contraseña</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-6 py-4 rounded-full bg-rose-50/50 border-2 border-transparent focus:border-pink-300 focus:bg-white outline-none transition-all font-medium placeholder:text-rose-300"
              placeholder="••••••••"
              required
            />
          </div>


          <Button 
            type="submit" 
            variant="primary"
            className="w-full py-5 text-lg shadow-rose-200" 
            loading={loading}
            withArrow
          >
            Entrar
          </Button>
        </form>

      </div>
    </div>
  );
};

export default LoginPage;