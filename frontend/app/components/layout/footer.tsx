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

export const NEWSLETTER_TEXT_TITLE = "Explore FlowerWork and future task management";
export const NEWSLETTER_TEXT_INFO = "Subscribe to our email newsletters for upcoming features and offers";
export const NEWSLETTER_TEXT = "Subscribe";

const Footer = () => {
  return (
    <div className="flex flex-col w-full bg-bgdarkv8 gap-y-10 items-center sm:gap-y-16 px-4 sm:px-8 sm:pt-10">
      {/* Email Subscription Section */}
      <div className="w-full max-w-[800px] text-center flex flex-col gap-y-6 sm:gap-y-8">
        <h1 className="font-montserrat text-xl sm:text-3xl font-bold text-white">
          {NEWSLETTER_TEXT_TITLE}
        </h1>
        <p className="font-opensans text-sm sm:text-base text-white font-light">
          {NEWSLETTER_TEXT_INFO}
        </p>
        <div className="flex flex-col sm:flex-row w-full gap-4">
          <Input
            type="email"
            placeholder="Enter your email..."
            className="flex-grow p-3 rounded-md border text-gray-900"
          />
          <Button
            type="submit"
            className="bg-purplev1 text-white font-medium w-full sm:w-auto px-6 py-3 rounded-md shadow-md hover:shadow-lg hover:bg-purplev2"
          >
            {NEWSLETTER_TEXT}
          </Button>
        </div>
      </div>

      {/* Divider Line */}
      <div className="w-full h-px bg-white my-6 sm:my-0"></div>

      {/* Footer Links Section */}
      <div className="flex flex-wrap justify-center w-full text-white text-sm sm:text-base font-light gap-x-10 sm:gap-x-40 sm:-mt-6">
        <Link href="#" className="flex items-center">
          <Image
            src={logo}
            alt="FlowerWork Logo"
            className="w-10 h-10 hover:opacity-80 transition-opacity duration-300"
          />
        </Link>
        <Link href="/about-us" className="hover:underline">About FlowerWork</Link>
        <Link href="/contact-us" className="hover:underline">Contact Us</Link>
        <Link href="/terms-and-conditions" className="hover:underline">Terms & Conditions</Link>
        <Link href="/privacy-policy" className="hover:underline">Privacy Policy</Link>
      </div>

      {/* Social Media Icons */}
      <div className="flex justify-center space-x-8 text-white pb-10 sm:-mt-12">
        <span className="[&>svg]:h-6 [&>svg]:w-6 [&>svg]:fill-white [&>svg]:hover:fill-gray-400 transition duration-300">
          <TiktokIcon />
        </span>
        <span className="[&>svg]:h-6 [&>svg]:w-6 [&>svg]:fill-white [&>svg]:hover:fill-gray-400 transition duration-300">
          <InstagramIcon />
        </span>
        <span className="[&>svg]:h-6 [&>svg]:w-6 [&>svg]:fill-white [&>svg]:hover:fill-gray-400 transition duration-300">
          <LinkedinIcon />
        </span>
        <span className="[&>svg]:h-6 [&>svg]:w-6 [&>svg]:fill-white [&>svg]:hover:fill-gray-400 transition duration-300">
          <FacebookIcon />
        </span>
        <span className="[&>svg]:h-6 [&>svg]:w-6 [&>svg]:fill-white [&>svg]:hover:fill-gray-400 transition duration-300">
          <TwitterIcon />
        </span>
      </div>
    </div>
  );
};

export default Footer;
