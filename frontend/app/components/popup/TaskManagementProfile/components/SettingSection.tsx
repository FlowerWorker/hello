import Link from 'next/link';
import ProfileSettings from '@/app/components/popup/TaskManagementProfile/components/settings/page';
import { SettingsSectionProps } from '../hooks/types';

export const SettingsSection = ({ isSettingsOpen, toggleSettings }: SettingsSectionProps) => {
    return (
        <div className="flex flex-col items-start gap-3">
            {/* Settings Popup */}
            <button onClick={toggleSettings} className="text-xl font-medium font-mono hover:underline">
                Settings
            </button>
            {isSettingsOpen && (
                <ProfileSettings toggleSettings={toggleSettings}/>
            )}

            {/* Logout Section */}
            <Link href="/logout" legacyBehavior>
                <a className="text-xl font-medium font-mono hover:underline">
                    Log out of FlowerWorker
                </a>
            </Link>
        </div>
    )
}
