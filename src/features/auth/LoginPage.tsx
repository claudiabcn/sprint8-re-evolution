import { useLoginForm } from './hooks/useLoginForm';
import { LoginForm } from './components/LoginForm';

const LoginPage = () => {
  const loginLogic = useLoginForm();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-50 to-amber-50 p-6">
      <div className="w-full max-w-md bg-white rounded-[3rem] shadow-2xl shadow-rose-200/50 p-10 border border-rose-100 animate-in fade-in zoom-in duration-500">
        
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-tr from-pink-500 to-amber-500 rounded-[2rem] text-white text-4xl mb-4 shadow-lg rotate-3">
            ✨
          </div>
          <h1 className="text-3xl font-black text-rose-900 tracking-tighter italic">Re-Evolución</h1>
        </div>

        <LoginForm {...loginLogic} />

      </div>
    </div>
  );
};

export default LoginPage;