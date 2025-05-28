/* eslint-disable react/no-unescaped-entities */
import React from "react";
import Image from "next/image";
import sample from "../../public/sample1.jpg";
import sponsorLogo7 from "../../public/hemmet.png";
import sponsorLogo6 from "../../public/ljus.png";
import sponsorLogo5 from "../../public/synsam.png";
import sponsorLogo3 from "../../public/wwf.png";
import sponsorLogo2 from "../../public/gaddr.png";
import sponsorLogo1 from "../../public/schibsted.png";
import sponsorLogo4 from "../../public/ur.png";

import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input"

export const WELCOME_TEXT = "Start to flow with us today!!!";
export const WELCOME_TEXT_INFO = "More features, updates, offers, and free blockchain lessons"
export const WELCOME_SIGNUP_TEXT = "Subscribe"

const sponsorLogos = [
  sponsorLogo1,
  sponsorLogo3,
  sponsorLogo4,
  sponsorLogo5,
  sponsorLogo6,
  sponsorLogo7,
];

const welcome = () => {
  return (
    <div className="flex flex-col gap-0 lg:gap-0">
      <p className=" bg-bgdarkv6 text-white text-base text-center pt-3">Our team has worked with</p>
      {/* Sponsor Banner */}
      <ScrollArea className="w-full bg-bgdarkv6 pt-8 pb-3">
        <div className="flex lg:w-full lg:justify-center mg:w-full mg:justify-center gap-6 px-4">
          {sponsorLogos.map((logo, index) => (
            <div
              key={index}
              className="flex justify-center items-center shrink-0 lg:flex-grow"
            >
              <Image
                src={logo}
                alt={`Sponsor Logo ${index + 1}`}
                className="object-contain filter mix-blend-screen"
              />
            </div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      <div className="flex flex-col items-center bg-bgdarkv7 p-8 sm:p-16 space-y-6">
        {/* Text Section */}
        <div className="text-center space-y-4">
          <h1 className="font-montserrat text-2xl sm:text-[32px] font-bold text-white">
            {WELCOME_TEXT}
          </h1>
          <p className="font-opensans text-sm sm:text-lg text-white leading-6 sm:leading-[25px]">
            {WELCOME_TEXT_INFO}
          </p>
        </div>

        {/* Input and Button Section */}
        <div className="flex flex-col sm:flex-row justify-center w-full max-w-2xl items-center gap-4 sm:gap-2">
          <Input
            type="email"
            placeholder="Enter your e-mail..."
            className="w-full max-w-md p-2 text-sm rounded-md border text-gray-900"
          />
          <Button
            type="submit"
            className="bg-purplev1 text-white font-medium px-4 py-3 rounded-md w-full sm:w-auto hover:bg-purplev2"
          >
            {WELCOME_SIGNUP_TEXT}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default welcome;
