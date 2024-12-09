import React from 'react';
import Link from 'next/link';
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import TwitterIcon from '../icons/TwitterIcon';
import TiktokIcon from '../icons/TiktokIcon';
import LinkedinIcon from '../icons/LinkedinIcon';
import FacebookIcon from '../icons/FacebookIcon';
import InstagramIcon from '../icons/InstagramIcon';
import logo from '../../public/_Logo.png';

export const NEWSLETTER_TEXT_TITLE = "Receive newsletters to explore FlowerWork";
export const NEWSLETTER_TEXT_INFO = "Leave your email to receive information about upcoming features";
export const NEWSLETTER_TEXT = "Send";

const Footer = () => {
  return (
    <div className="flex flex-col w-full bg-bgdarkv2 gap-y-10 items-center sm:gap-y-20">
      {/* Sign Up Email Section */}
      <div className="w-full flex flex-col items-center">
        <div className="text-center max-w-2xl w-full">
          <h1 className="font-montserrat text-2xl sm:text-[32px] font-bold text-white mb-4 sm:mb-6 sm:mt-16">
            {NEWSLETTER_TEXT_TITLE}
          </h1>
          <p className="font-opensans text-sm sm:text-base text-white font-light leading-[25px] mb-4">
            {NEWSLETTER_TEXT_INFO}
          </p>
        </div>
        <div className="flex flex-col sm:flex-row w-full max-w-lg items-center gap-y-4 sm:gap-y-0 sm:space-x-2">
          <Input
            type="email"
            placeholder="Enter your e-mail..."
            className="flex-grow p-3 rounded-md border"
          />
          <Button type="submit" className="bg-purplev1 text-white font-bold w-full sm:w-auto px-4 py-2 rounded-md">
            {NEWSLETTER_TEXT}
          </Button>
        </div>
      </div>

      {/* Full-width Divider Line */}
      <div className="w-full h-px bg-white my-6 sm:my-8"></div>

      {/* Footer Links Section (Centered) */}
      <div className="flex flex-wrap justify-center w-full text-white text-base font-light gap-x-10 sm:gap-x-20 -mt-4 sm:-mt-20">
        <Link href="#" className="hover:underline">About FlowerWork</Link>
        <Link href="#" className="hover:underline">Jobs</Link>
        <Link href="/contact" className="hover:underline">Contact us</Link>
        <Link href="#" className="hover:underline">Help & support</Link>
        <Link href="#" className="hover:underline">All About Beta</Link>
      </div>

      {/* Logo, Legal Links, and Social Icons Section */}
      <div className="flex flex-col sm:flex-row justify-between w-full items-center text-white max-w-[1000px] -mt-10 gap-y-6 sm:gap-y-0 sm:-mt-14 sm:mb-2">
        {/* Logo and Legal Links */}
        <div className="flex flex-col sm:flex-row items-center sm:space-x-8">
          <span className="mb-4 sm:mb-0">
            <Image src={logo} alt="sample-image" width={50} height={50} className="" />
          </span>
          <div className="flex flex-wrap justify-center sm:justify-start gap-x-6 sm:gap-x-20 text-sm">
            <Link href="/terms" className="hover:underline">Terms & Service</Link>
            <Link href="/privacy" className="hover:underline">Privacy Policy</Link>
          </div>
        </div>

        {/* Social Icons Section */}
        <div className="flex space-x-6">
          <span className="[&>svg]:h-6 [&>svg]:w-6 [&>svg]:fill-gray-500 [&>svg]:hover:fill-white transition-colors duration-300">
            <TiktokIcon />
          </span>
          <span className="[&>svg]:h-6 [&>svg]:w-6 [&>svg]:fill-gray-500 [&>svg]:hover:fill-white transition-colors duration-300">
            <InstagramIcon />
          </span>
          <span className="[&>svg]:h-6 [&>svg]:w-6 [&>svg]:fill-gray-500 [&>svg]:hover:fill-white transition-colors duration-300">
            <LinkedinIcon />
          </span>
          <span className="[&>svg]:h-6 [&>svg]:w-6 [&>svg]:fill-gray-500 [&>svg]:hover:fill-white transition-colors duration-300">
            <FacebookIcon />
          </span>
          <span className="[&>svg]:h-6 [&>svg]:w-6 [&>svg]:fill-gray-500 [&>svg]:hover:fill-white transition-colors duration-300">
            <TwitterIcon />
          </span>
        </div>
      </div>
    </div>
  );
}

export default Footer;
