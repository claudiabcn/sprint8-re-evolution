import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './shared/components/Navbar';
import AppRoutes from './routes/appRoutes';
import ErrorBoundary from './shared/components/ErrorBoundary';
import { AuthProvider } from './features/auth/context/AuthContext';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-amber-50">
                    <Navbar />
                    <main className="max-w-7xl mx-auto px-4 py-8">

            <ErrorBoundary>
              <AppRoutes />
            </ErrorBoundary>
          </main>
          
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;