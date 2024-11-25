import React from 'react';
import Image, { StaticImageData } from "next/image";
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

type InfoCardProps = {
    title: string;
    bodyText: string[];
    imageSrc: StaticImageData;
};

export const INFOCARD_BUTTON_TEXT = "+ info"; // Corrected typo

const InfoCard = ({ title, bodyText, imageSrc }: InfoCardProps) => {
    return (
        <Card className="flex flex-col bg-transparent border-none">
            {/* Card Header */}
            <CardHeader className="text-left">
                <Image src={imageSrc} alt={title} className='mb-10'/>
                <CardTitle className="font-montserrat text-white font-bold text-3xl leading-[42px]">{title}</CardTitle>
            </CardHeader>

            {/* Card Content (Benefits) */}
            <CardContent className="flex-grow">
                <ul className="list-disc px-6 space-y-2 text-white">
                    {bodyText.map((text, index) => (
                        <li key={index}>{text}</li>
                    ))}
                </ul>
            </CardContent>

            {/* Card Footer (Button) */}
            <CardFooter className="flex justify-end mt-auto">
                <Button className="mt-4 px-6 py-2 bg-white text-black rounded-md">
                    {INFOCARD_BUTTON_TEXT}
                </Button>
            </CardFooter>
        </Card>
    );
};

export default InfoCard;
