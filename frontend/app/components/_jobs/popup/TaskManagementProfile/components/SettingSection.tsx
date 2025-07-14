import ProfileSettings from '@/app/components/popup/TaskManagementProfile/components/settings/UserProfile';
import { SettingsSectionProps } from '@/app/components/popup/TaskManagementProfile/hooks';
import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';


export const SettingsSection: React.FC<SettingsSectionProps> = ({ isSettingsOpen, toggleSettings }) => {
    const { logout } = useAuth();

    const router = useRouter();
    const pathname = usePathname();

    const handleLogout = () => {
        // Perform logout operations, like clearing cookies or localStorage
        logout();
        // After logout, redirect to the homepage
        if (pathname === '/') {
            window.location.reload();
          } else {
            router.push('/');
          }
      };

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
            <button onClick={handleLogout} className='text-xl font-medium font-mono hover:underline'>
                Log out of Gaddr
            </button>
        </div>
    )
}