import { Routes, Route } from 'react-router-dom';
import Home from '../features/home/Home'; 
import Records from '../features/records/Records';
import Calendar from '../features/calendar/Calendar';
import LoginPage from '../features/auth/LoginPage';
import Maps from '../features/maps/Maps';
import Charts from '../features/chart/Charts';
import { AuthGuard } from '../features/auth/components/AuthGuard';
import NotFound from '../shared/components/NotFound';

const AppRoutes = () => {
  return (
    <Routes>

      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginPage />} />

      <Route path="/records" element={
        <AuthGuard>
          <Records />
        </AuthGuard>
      } />
      
      <Route path="/calendar" element={
        <AuthGuard>
          <Calendar />
        </AuthGuard>
      } /> 

      <Route path="/maps" element={
        <AuthGuard>
          <Maps />
        </AuthGuard>
      } />

            <Route path="/charts" element={
        <AuthGuard>
          <Charts />
        </AuthGuard>
      } />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;