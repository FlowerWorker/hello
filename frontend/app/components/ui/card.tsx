import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

type PricingCardProps = {
  cardType: string;
  rate: string;
  description: string;
  benefits: string[];
  link: string;
  buttonDesc: string;
  isFeatured?: boolean;
  paylabel: string;
};

export const CARD_NEW_TEXT = "NEW";
export const CARD_LINK_TEXT = "Learn more about ";


const PricingCard = ({ cardType, rate, description, benefits, link, buttonDesc, isFeatured, paylabel }: PricingCardProps) => {
  return (
    <div className="group inline-block relative">
      <Card className="w-[318px] h-[471px] rounded-[20px] border-none text-left bg-white flex flex-col shadow-bottom-only transform transition-transform duration-500 md:hover:scale-110 md:hover:bg-cardhover">
        {/* Card Header */}
        <CardHeader className="">
          <div className="flex items-center space-x-2">
            <CardTitle className="text-2xl font-semibold">{cardType}</CardTitle>
            {isFeatured && (
              <span className="bg-turquoiseLight text-white text-xs font-bold px-3 py-0.5 rounded-lg">
                {CARD_NEW_TEXT}
              </span>
            )}
          </div>
          <CardDescription className="text-md text-gray-700 pt-1">
            {description}
          </CardDescription>
          <div className="pt-4">
            <p className="text-4xl font-bold">{rate}</p>
            <p className="text-sm text-gray-500">{paylabel}</p>
          </div>
        </CardHeader>

        {/* Card Content (Benefits) */}
        <CardContent className="flex-1 min-h-[100px]">
          <ul className="space-y-0.5 text-left list-disc list-inside text-gray-800">
            {benefits.map((benefit, index) => (
              <li key={index} className="text-sm">{benefit}</li>
            ))}
          </ul>
        </CardContent>

        {/* Card Footer (Button and Link) */}
        <CardFooter className="flex flex-col items-end space-y-1 mt-auto">
          <Button
            variant="outline"
            className="w-auto h-[40px] rounded-full text-black border border-black transition-colors duration-300 group-hover:bg-turquoiseDark group-hover:text-black group-hover:border-none"
          >
            <span className="py-2 font-semibold">
              {buttonDesc}
            </span>
          </Button>
          <Link href={link} className="underline italic text-gray-500">
            {CARD_LINK_TEXT}{cardType}
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default PricingCard;
