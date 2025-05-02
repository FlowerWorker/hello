import Image from "next/image";
import Navbar2 from "./navbar2";
import bigtext from "../../public/text_logo_big.png";

export const TITLE = "From Idea to Execution!";
export const DESCRIPTION_2 = "Gaddr revolutionizes project management with AI-powered task optimization and blockchain-secured tracking.";

const HeroOverlay = () => {
    return (
        <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-between items-start text-center z-50">
            {/* Secondary Navigation Bar */}
            <Navbar2 className="w-full py-1" />

            {/* Top-Aligned Image */}
            <div className="ml-24 -mt-20">
                <Image
                    src={bigtext}
                    alt="big-text-logo"
                    width={1000}
                    height={200}
                />
            </div>

            {/* Bottom-Aligned Text Content */}
            <div className="text-white leading-relaxed text-left hidden md:block ml-20 mb-36"> {/* Reduced bottom margin */}
                <p className="mb-2 text-3xl font-semibold">{TITLE}</p> {/* Reduced bottom margin */}
                <p className="font-semibold text-base">Gaddr revolutionizes project management</p>
                <p className="font-semibold text-base">with AI-powered task optimization and</p>
                <p className="font-semibold text-base">blockchain-secured tracking.</p>
            </div>
        </div>
    );
};

export default HeroOverlay;
