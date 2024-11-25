import React from 'react';
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import iconsample from "../../public/outsourcing_icon.png";

export const SECTION_TITLE = "Hire the best freelancers for any job, online";
export const SECTION_SUBTITLE = "Post Projects or Outsource Tasks with Ease";
export const SECTION_DESCRIPTION = "Esay and time saving. Flowerwork’s outsourcing tool is all you need to get high-quality results while focusing on your core objectives. ";
export const SUB_SECTION_TITLE = "Post a project";
export const SUB_SECTION_DESCRIPTION = "Create and post a project or start a contest to find the perfect professional match for your needs ";
export const SUB_SECTION_TITLE2 = "Outsource an intern task";
export const SUB_SECTION_DESCRIPTION2 = "Is there an intern task that you see your team isn’t able to manage? No problem! Outsource your task or project in a few simple steps and tap into a vast pool of freelancers.";
export const SUB_SECTION_TITLE3 = "Find freeelancers";
export const SUB_SECTION_DESCRIPTION3 = "Decide from among thousands of talents, which one fits best for fullfilling the task.";
export const BUTTON_TEXT = "Start exploring talents";

const SectionComponent4 = () => {
    return (
        <div className="w-full bg-bgdarkv2 py-20">
            <div className="max-w-[1440px] mx-auto px-6 h-auto flex flex-col space-y-8">

                {/* Top Section (Icon, Title, Subtitle, Description) */}
                <div className="text-white space-y-6 flex flex-col items-center lg:items-start">
                    <div className="w-25 h-25 mb-6">
                        <Image src={iconsample} alt="Icon" width={118} height={108} />
                    </div>

                    <h2 className="text-5xl font-extrabold leading-tight">{SECTION_TITLE}</h2>
                    <p className="text-xl font-semibold text-white">{SECTION_SUBTITLE}</p>
                    <p className="text-base font-extralight text-white leading-relaxed">{SECTION_DESCRIPTION}</p>
                </div>

                {/* Flex Container for Projects and Image */}
                <div className="flex flex-col lg:flex-row items-center lg:items-start gap-10 max-w-6xl mx-auto">

                    {/* Left Content (Image Placeholder) */}
                    <div className="flex flex-col items-center lg:items-start space-y-6">
                        <div className="w-full sm:w-[500px] h-[300px] sm:h-[448px] bg-gray-700 rounded-lg mx-auto">
                            {/* Image Placeholder */}
                        </div>
                    </div>

                    {/* Right Content (Text Sections: Projects, Lists, Tasks & Subtasks) */}
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


export default SectionComponent4;
