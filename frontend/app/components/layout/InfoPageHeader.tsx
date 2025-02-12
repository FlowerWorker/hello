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
            max-w-full h-[240px] md:h-[459px] px-6 md:px-[80px] pt-6 md:pt-[80px] pb-[24px] space-y-14 lg:space-y-28">
            {/* Page Title */}
            <h1 className="font-montserrat text-2xl md:text-4xl lg:text-6xl font-bold text-white text-center">{title}</h1>
        
            <div className="flex flex-col items-center h-full justify-between">
                {/* Navigation Links */}
                <div className="flex flex-row text-sm md:text-lg lg:text-2xl justify-center gap-4 md:gap-[160px]">
                    <a href="/privacy-policy"
                        className={`block font-montserrat text-white ${isActive('/privacy-policy') ? 'font-bold border-b-2 md:border-b-3 pb-3' : ''} hover:underline`}
                    >
                    Privacy Policy
                    </a>
                    <a href="/terms-and-conditions"
                        className={`block font-montserrat text-white ${isActive('/terms-and-conditions') ? 'font-bold border-b-2 md:border-b-3 pb-3 inline-block' : ''} hover:underline`}
                    >
                    Terms & Conditions
                    </a>
                    <a href="/contact-us"
                        className={`block font-montserrat text-white ${isActive('/contact-us') ? 'font-bold border-b-2 md:border-b-3 pb-3' : ''} hover:underline`}
                    >
                    Contact Us
                    </a>

                </div>
            </div>

            {/* Today's Date */}
            <div className="text-white text-xs md:text-base font-open-sans self-start">Effective date: {today}</div>
        </div>
    );
};

export default InfoPageHeader;