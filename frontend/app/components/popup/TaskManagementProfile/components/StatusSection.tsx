import React, { useState }from 'react';
import { StatusOption } from '../hooks/types';
import { StatusDropdown } from './StatusDropdown';

interface StatusSectionProps {
  status: StatusOption;
  setStatus: (status: StatusOption) => void;
}

export const StatusSection: React.FC<StatusSectionProps> = ({ status, setStatus }) => {
    const [isStatusOpen, setIsStatusOpen] = useState(false);

    return (
        <div className="relative mt-4 mb-6">
            <StatusDropdown 
                status={status}
                isStatusOpen={isStatusOpen}
                onToggle={() => setIsStatusOpen(!isStatusOpen)}
                onSelect={(option: StatusOption) => {
                  setStatus(option);
                  setIsStatusOpen(false);
                }}
            />
            
            {/* Current local time */}
            <p className="text-base text-gray-500 mt-2">{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} local time</p>
        </div>
    );
};