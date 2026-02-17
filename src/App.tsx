import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './shared/components/Navbar';
import AppRoutes from './routes/appRoutes';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-pastel-yellow-50 via-white to-pastel-pink-50">
        <Navbar />
        <main>
          <AppRoutes />
        </main>
      </div>
    </Router>
  );
}

export default App;