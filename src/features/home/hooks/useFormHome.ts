import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/context/AuthContext';

export const useHomeForm = () => {
  const { session } = useAuth();
  const navigate = useNavigate();

  const [showForm, setShowForm]                   = useState(false);
  const [selectedServiceType, setSelectedServiceType] = useState<string | undefined>(undefined);

  const handleCardClick = (serviceType: string) => {
    if (!session) {
      navigate('/login');
      return;
    }
    setSelectedServiceType(serviceType);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setSelectedServiceType(undefined);
  };

  return { showForm, selectedServiceType, handleCardClick, handleCloseForm };
};