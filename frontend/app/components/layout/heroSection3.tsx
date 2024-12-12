import React from 'react';
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import iconsample from "../../public/management_logo.png";

export const SECTION_TITLE = "Boost your team's productivity";
export const SECTION_SUBTITLE = "Create a Project, Manage Tasks, and Boost Team Productivity";
export const SECTION_DESCRIPTION = "Simple, flexible and powerful. Flowerwork's task management is all it takes to get a clear view of who’s doing what and what still needs to be done.";
export const SUB_SECTION_TITLE = "Projects";
export const SUB_SECTION_DESCRIPTION = "Flowerwork projects keep all your tasks and subtasks organized and work moving forward. In a glance, see everything from “still to do” to “team, we did it!”";
export const SUB_SECTION_TITLE2 = "Lists";
export const SUB_SECTION_DESCRIPTION2 = "Move tasks into different stages, depending on their evolution. Start with To do, In progress and Completed, or customize your workflow however your team needs. Flowerwork is editable to suit all team needs :)";
export const SUB_SECTION_TITLE3 = "Tasks & Subtasks";
export const SUB_SECTION_DESCRIPTION3 = "Divide your ideas into tasks and subtasks and hold all that information in a card to get the job done. Chat, attachments, descriptions and all activity around tasks & subtasks are visible in the same place.";
export const BUTTON_TEXT = "Start boosting my team today";

const SectionComponent3 = () => {
    return (
        <div className="w-full bg-bgdarkv7 py-20">
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

export default SectionComponent3;
