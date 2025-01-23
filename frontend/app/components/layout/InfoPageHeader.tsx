"use client";

import { format } from 'date-fns';
import { usePathname } from 'next/navigation';

interface InfoPageHeaderProps {
  title: string;
}

const InfoPageHeader: React.FC<InfoPageHeaderProps> = ({ title }) => {

    const today = format(new Date(), 'dd.MMM.yyyy');
    const pathname = usePathname();
    const isActive = (href: string) => pathname === href;
    
    return (
        <div className="flex flex-1 flex-col p-6 bg-gradient-to-r from-[#1C1819] to-[#BD71D4] rounded-lg
            max-w-full h-[459px] pt-[80px] pr-[80px] pb-[24px] pl-[80px] gap-[80px]">
            {/* Page Title */}
            <h1 className="font-montserrat text-6xl font-bold text-white text-center">{title}</h1>
        
            <div className="flex flex-col items-center h-full justify-between">
                {/* Navigation Links */}
                <div className="flex justify-center gap-[160px]">
                    <a href="/privacy-policy"
                        className={`font-montserrat text-2xl text-white ${isActive('/privacy-policy') ? 'font-bold border-b-4 pb-2 w-[20%]' : ''} hover:underline`}
                    >
                    Privacy Policy
                    </a>
                    <a href="/terms-and-conditions"
                        className={`font-montserrat text-2xl text-white ${isActive('/terms-and-conditions') ? 'font-bold border-b-4 pb-3 inline-block ' : ''} hover:underline`}
                    >
                    Terms & Conditions
                    </a>
                    <a href="/contact-us"
                        className={`font-montserrat text-2xl text-white ${isActive('/contact') ? 'font-bold border-b-4 pb-2 w-[20%]' : ''} hover:underline`}
                    >
                    Contact Us
                    </a>

                </div>
                {/* Today's Date */}
                <div className="text-white text-md font-open-sans self-start">Effective date: {today}</div>
            </div>
        </div>
    );
};

export default InfoPageHeader;