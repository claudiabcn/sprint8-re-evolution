import { Routes, Route } from 'react-router-dom';
import Home from '../features/home/Home';
import Records from '../features/records/Records';
import NotFound from '../shared/components/NotFound';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/records" element={<Records />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;