import React from 'react';
import Image, { StaticImageData } from 'next/image';
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';

interface SubSection {
    title: string;
    description: string;
}

interface SectionComponentProps {
    icon: StaticImageData;
    sectionTitle: string;
    sectionSubtitle: string;
    sectionDescription: string;
    subSections: SubSection[];
    buttonText: string;
    buttonTargetPage: string;
    backgroundClassName: string;
    placeholderImage: StaticImageData;
    idstring: string;
}

const SectionComponent: React.FC<SectionComponentProps> = ({
    icon,
    sectionTitle,
    sectionSubtitle,
    sectionDescription,
    subSections,
    buttonText,
    buttonTargetPage,
    backgroundClassName,
    placeholderImage,
    idstring,
}) => {
    const router = useRouter();
    const handleRedirect = () => {
        router.push(buttonTargetPage); // Redirect to your desired page
      };

    return (
        <div id={`${idstring}`} className={`w-full py-20 ${backgroundClassName}`}>
            <div className="max-w-[1440px] mx-auto px-6 h-auto flex flex-col space-y-8">

                {/* Top Section (Icon, Title, Subtitle, Description) */}
                <div className="text-white space-y-6 flex flex-col items-start">
                    <div className="mb-6">
                        <Image src={icon} alt="Icon" className="object-contain w-auto h-auto max-w-[118px] max-h-[108px]" />
                    </div>

                    <h2 className="text-5xl font-extrabold leading-tight text-left">{sectionTitle}</h2>
                    <p className="text-xl font-semibold text-white text-left">{sectionSubtitle}</p>
                    <p className="text-base font-extralight text-white leading-relaxed pb-10 text-left">{sectionDescription}</p>
                </div>

                {/* Flex Container for Projects and Image */}
                <div className="flex flex-col lg:flex-row items-start gap-10">

                    {/* Left Content (Text Sections) */}
                    <div className="flex-1 space-y-8 text-white text-left">
                        {subSections.map((subSection, index) => (
                            <div key={index}>
                                <h3 className="text-2xl font-bold pb-5">{subSection.title}</h3>
                                <p className="text-base font-extralight text-white leading-relaxed">
                                    {subSection.description}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Right Content (Image Placeholder) */}
                    <div className="flex flex-col items-start space-y-6">
                        <div className="w-full sm:w-[685px] rounded-lg mx-auto">
                            <Image
                                src={placeholderImage}
                                alt="Placeholder Image"
                                className="w-[600px] h-[310px] rounded-lg object-cover"
                            />
                        </div>
                    </div>
                </div>

                {/* Button Section */}
                <div className="flex justify-start">
                    <Button 
                        className="w-full sm:w-auto px-8 py-4 text-black bg-white font-medium rounded-lg text-lg shadow-md hover:shadow-lg hover:bg-greyv1"
                        onClick={handleRedirect}
                    >
                        {buttonText}
                    </Button>
                </div>

            </div>
        </div>
    );
};

export default SectionComponent;
