import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const { session, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-rose-50">
        <div className="animate-bounce text-4xl">✨</div>
      </div>
    );
  }

  if (!session) {

    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};