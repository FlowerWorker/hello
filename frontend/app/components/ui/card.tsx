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
  commingSoon?: boolean;
};

export const CARD_NEW_TEXT = "NEW";
export const CARD_LINK_TEXT = "Learn more about ";


const PricingCard = ({ cardType, rate, description, benefits, link, buttonDesc, isFeatured, paylabel, commingSoon }: PricingCardProps) => {
  return (
    <div className="group inline-block relative">
      <Card className="w-[318px] h-[490px] rounded-[20px] border-none text-left bg-white flex flex-col shadow-bottom-only transform transition-transform duration-500 md:hover:scale-110 md:hover:bg-cardhover">
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
            {!commingSoon ? (
              <>
                <p className="text-4xl font-bold">{rate}</p>
                <p className="text-sm text-gray-500">{paylabel}</p>
              </>
            ) : (
              <p className="text-4xl font-bold text-black">
                Coming Soon
              </p>
            )}
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
        <CardFooter className="flex flex-col items-end space-y-2 mt-auto">
          {!commingSoon ? (
            <Button
              className="w-auto h-[40px] rounded-lg text-black bg-turquoiseLight hover:bg-turquoiseDark"
            >
              <span className="py-2 font-light">
                {buttonDesc}
              </span>
            </Button>
          ) : (
            <p className="flex justify-center items-center w-full h-[40px] text-xl">
              Contact us for more details!
            </p>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default PricingCard;
