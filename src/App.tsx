import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar  from '../src/shared/components/Navbar';
import Home from './features/home/Home';
import Records from './features/records/Records';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-pastel-yellow-50 via-white to-pastel-pink-50">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/records" element={<Records />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;