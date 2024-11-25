import React from 'react';
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import iconsample from "../../public/search.png";

export const SECTION_TITLE = "Recruitment made easy";
export const SECTION_SUBTITLE = "Post the Perfect Job Ad and Attract Top Talent";
export const SECTION_DESCRIPTION = "We want you to focus on what's important: growing your company. We take care of recruiting.";
export const SUB_SECTION_TITLE = "AI guided job ad creation";
export const SUB_SECTION_DESCRIPTION = "You don’t know what to text for recruiting the right talent for that task? Ask our AI and she’ll guide you through the perfect process";
export const SUB_SECTION_TITLE2 = "Ai guidance in recruitment";
export const SUB_SECTION_DESCRIPTION2 = "Harness the power of AI to streamline the hiring process, providing intelligent recommendations, candidate matching, and data-driven insights to help you find the best talent faster and more efficiently.";
export const SUB_SECTION_TITLE3 = "Salary payments in crypto, fiat or invoice";
export const SUB_SECTION_DESCRIPTION3 = "Flexible payment options allow you to pay your team in cryptocurrency, traditional fiat currencies, or via invoice, ensuring smooth and secure transactions tailored to your business needs.";
export const SUB_SECTION_TITLE4 = "Safe agreements that are either e-signature or smart contracts";
export const SUB_SECTION_DESCRIPTION4 = "Ensure secure and transparent agreements using e-signatures for quick approvals or smart contracts powered by blockchain for automated, tamper-proof execution.";
export const BUTTON_TEXT = "Start posting a job";


const SectionComponent5 = () => {
    return (
        <div className="w-full bg-bgdarkv5 py-20">
            <div className="max-w-[1440px] mx-auto px-6 h-auto flex flex-col space-y-8">

                {/* Top Section (Icon, Title, Subtitle, Description) */}
                <div className="text-white space-y-6 flex flex-col items-center lg:items-start">
                    <div className="w-250 h-25 mb-6">
                        <Image src={iconsample} alt="Icon" width={118} height={108} />
                    </div>

                    <h2 className="text-5xl font-extrabold leading-tight">{SECTION_TITLE}</h2>
                    <p className="text-xl font-semibold text-white">{SECTION_SUBTITLE}</p>
                    <p className="text-base font-extralight text-white leading-relaxed">{SECTION_DESCRIPTION}</p>
                </div>

                {/* Flex Container for Projects and Image */}
                <div className="flex flex-col lg:flex-row items-center lg:items-start gap-10">

                    {/* Left Content (Text Sections: Projects, Lists, Tasks & Subtasks) */}
                    <div className="flex-1 space-y-8 text-white text-center lg:text-left">
                        <div>
                            <h3 className="text-2xl font-bold">{SUB_SECTION_TITLE}</h3>
                            <p className="text-base font-extralight text-white leading-relaxed">{SUB_SECTION_DESCRIPTION}</p>
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold">{SUB_SECTION_TITLE2}</h3>
                            <p className="text-base font-extralight text-white leading-relaxed">{SUB_SECTION_DESCRIPTION2}</p>
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold">{SUB_SECTION_TITLE3}</h3>
                            <p className="text-base font-extralight text-white leading-relaxed">{SUB_SECTION_DESCRIPTION3}</p>
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold">{SUB_SECTION_TITLE4}</h3>
                            <p className="text-base font-extralight text-white leading-relaxed">{SUB_SECTION_DESCRIPTION4}</p>
                        </div>
                    </div>

                    {/* Right Content (Image Placeholder) */}
                    <div className="flex flex-col items-center lg:items-end space-y-6">
                        <div className="w-full sm:w-[685px] h-[300px] sm:h-[448px] bg-gray-700 rounded-lg mx-auto">
                            {/* Image Placeholder */}
                        </div>
                    </div>
                </div>

                {/* Button Section */}
                <div className="flex justify-center lg:justify-end">
                    <Button className="w-full sm:w-auto px-8 py-4 text-black bg-white font-medium rounded-lg text-lg shadow-md hover:shadow-lg">
                        {BUTTON_TEXT}
                    </Button>
                </div>

            </div>
        </div>
    );
};

export default SectionComponent5;
