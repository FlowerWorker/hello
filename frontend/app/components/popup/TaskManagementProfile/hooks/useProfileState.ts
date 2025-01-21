import { useState } from 'react';
import { StatusOption } from '../../shared/types';

export const useProfileState = () => {
    const [status, setStatus] = useState<StatusOption>({
      label: "Update my status",
      icon: null,
    });
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  
    const toggleSettings = () => setIsSettingsOpen(prev => !prev);
  
    return {
      status,
      setStatus,
      isSettingsOpen,
      toggleSettings,
    };
};