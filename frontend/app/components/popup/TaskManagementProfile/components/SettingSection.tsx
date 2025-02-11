import ProfileSettings from '@/app/components/popup/TaskManagementProfile/components/settings/UserProfile';
import { SettingsSectionProps } from '@/app/components/popup/TaskManagementProfile/hooks';

export const SettingsSection: React.FC<SettingsSectionProps> = ({ isSettingsOpen, toggleSettings }) => {
    return (
        <div className='flex flex-col items-start gap-3'>
            {/* Settings Popup */}
            <button onClick={toggleSettings} className='text-xl font-medium font-mono hover:underline'>
                Settings
            </button>
            {isSettingsOpen && (
                <ProfileSettings toggleSettings={toggleSettings} />
            )}

            {/* Logout Section */}
            <button className='text-xl font-medium font-mono hover:underline'>
                Log out of FlowerWorker
            </button>
        </div>
    )
}