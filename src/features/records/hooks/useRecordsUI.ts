import { useState } from 'react';
import type { Service } from '../../../shared/types/types';

export function useRecordsUI() {
  const [showForm, setShowForm] = useState(false);
  const [serviceToEdit, setServiceToEdit] = useState<Service | undefined>(undefined);
  const [confirmId, setConfirmId] = useState<string | undefined>(undefined);

  const handleEdit = (service: Service) => {
    setServiceToEdit(service);
    setShowForm(true);
  };

  const handleNew = () => {
    setServiceToEdit(undefined);
    setShowForm(true);
  };

  const handleCloseForm = (onAfterClose?: () => void) => {
    setShowForm(false);
    setServiceToEdit(undefined);
    onAfterClose?.();
  };

  return {
    showForm,
    serviceToEdit,
    confirmId,
    setConfirmId,
    handleEdit,
    handleNew,
    handleCloseForm,
  };
}
