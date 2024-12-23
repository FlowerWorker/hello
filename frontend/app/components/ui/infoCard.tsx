import React from 'react';
import Link from 'next/link';
import Image, { StaticImageData } from "next/image";
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

type InfoCardProps = {
    title: string;
    bodyText: string[];
    imageSrc: StaticImageData;
    isComingSoon?: boolean;
    linkTarget: string;
};

export const INFOCARD_BUTTON_TEXT = "+ info"; // Corrected typo

const InfoCard = ({ title, bodyText, imageSrc, isComingSoon, linkTarget }: InfoCardProps) => {
    return (
        <Card className="flex flex-col bg-transparent border-none">
            {/* Card Header */}
            <CardHeader className="text-left">
                <Image src={imageSrc} alt={title} className="width:auto height:auto"/>
                <CardTitle className="font-montserrat text-white font-bold text-3xl leading-[42px] pt-5">{title}</CardTitle>
            </CardHeader>

            {/* Card Content (Benefits) */}
            <CardContent className="flex-grow">
                <ul className="list-disc px-6 space-y-2 text-white font-light">
                    {bodyText.map((text, index) => (
                        <li key={index}>{text}</li>
                    ))}
                </ul>
            </CardContent>
            {/* Card Footer (Button or Coming Soon Text) */}
            <CardFooter className="flex justify-end mt-auto">
                {isComingSoon ? (
                    <p className="mt-4 text-3xl	text-white font-light">Coming Soon!</p>
                ) : (
                    <Link href={linkTarget} passHref>
                        <Button className="mt-4 px-6 py-2 bg-white text-black rounded-md hover:bg-greyv1">
                            {INFOCARD_BUTTON_TEXT}
                        </Button>
                    </Link>
                )}
            </CardFooter>
        </Card>
    );
};

export default InfoCard;
