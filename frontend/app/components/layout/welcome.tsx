/* eslint-disable react/no-unescaped-entities */
import React from "react";
import Image from "next/image";
import sample from "../../public/sample1.jpg";
import sponsorlogo from "../../public/sponsor-logo.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"

export const WELCOME_TEXT = "Start to flow with us today!!!";
export const WELCOME_TEXT_INFO = "New updates alerts, discounts and free blockchain lessons"
export const WELCOME_SIGNUP_TEXT = "Sign up - It's free!"

const welcome = () => {
  return (
    <div className="flex flex-col gap-4 lg:gap-0">
      {/* Sponsor Banner */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 justify-items-center bg-bgdarkv1 py-8">
        {/* Render the same logo multiple times for now */}
        {Array(6).fill(null).map((_, index) => (
          <div key={index} className="flex justify-center items-center">
            <Image
              src={sponsorlogo}
              alt="Sponsor Logo"
              className="object-contain filter mix-blend-screen"
            />
          </div>
        ))}
      </div>
      <div className="flex flex-col items-center bg-bgdarkv2 p-16 space-y-4">
        <div className="text-center">
          <h1 className="font-montserrat text-[32px] font-bold text-white mb-6">{WELCOME_TEXT}</h1>
          <p className="font-opensans text-lg text-white leading-[25px] mb-2">{WELCOME_TEXT_INFO}</p>
        </div>
        <div className="flex w-full max-w-2xl items-center space-x-2">
          <Input
            type="email"
            placeholder="Enter your e-mail..."
            className="flex-grow p-3 rounded-md border"
          />
          <Button type="submit" className="bg-purplev1 text-white font-bold px-4 py-2 rounded-md">
            {WELCOME_SIGNUP_TEXT}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default welcome;
