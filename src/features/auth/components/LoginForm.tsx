import Button from '../../../shared/components/Button';

interface LoginFormProps {
  email: string;
  setEmail: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
  loading: boolean;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
}

export function LoginForm({ 
  email, 
  setEmail, 
  password, 
  setPassword, 
  loading, 
  handleSubmit 
}: LoginFormProps) {
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label className="block text-sm font-bold text-rose-900 ml-4">Email</label>
        <input 
          type="email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-6 py-4 rounded-full bg-rose-50/50 border-2 border-transparent focus:border-pink-300 focus:bg-white outline-none transition-all font-medium"
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
          className="w-full px-6 py-4 rounded-full bg-rose-50/50 border-2 border-transparent focus:border-pink-300 focus:bg-white outline-none transition-all font-medium"
          placeholder="••••••••"
          required
        />
      </div>

      <Button type="submit" variant="primary" className="w-full py-5 text-lg" loading={loading} withArrow>
        Entrar
      </Button>
    </form>
  );
}