import Link from 'next/link';
import ProfileSettings from '@/app/components/popup/TaskManagementProfile/components/settings/page';
import { SettingsSectionProps } from '../hooks/types';

export const SettingsSection = ({ isSettingsOpen, toggleSettings }: SettingsSectionProps) => {
    return (
        <div className="flex flex-col items-start gap-3">
            {/* Settings and Logout Section */}
            {/* Settings Popup */}
            <button onClick={toggleSettings} className="text-xl font-medium font-mono hover:underline">
                Settings
            </button>
            {isSettingsOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <ProfileSettings toggleSettings={toggleSettings}/>
            </div>
            )}

            <Link href="/logout" legacyBehavior>
            <a className="text-xl font-medium font-mono hover:underline">
                Log out of FlowerWorker
            </a>
            </Link>
        </div>
    )
}
