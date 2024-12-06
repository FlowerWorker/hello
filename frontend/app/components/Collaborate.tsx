"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Navbar } from "../components";

import TwitterIcon from '../components/icons/TwitterIcon';
import TiktokIcon from '../components/icons/TiktokIcon';
import LinkedinIcon from '../components/icons/LinkedinIcon';
import FacebookIcon from '../components/icons/FacebookIcon';
import InstagramIcon from '../components/icons/InstagramIcon';

import logo from '../public/_Logo.png';

export const FILE_DROP = "Drag & drop any images or documents that might be helpful in explaining your brief here. (Max 25 MB)";
export const BECOME_PART = "Become a part of our team";
export const PART_TEXT = "Are you ready to take your career to the next level? Join our team and become part of a group of passionate, driven, and innovative individuals dedicated to making a difference. We value creativity, collaboration, and a commitment to excellence in everything we do.";
export const WHICH_PART = "Which team would you like to be a part of?";
export const RECOMEND_SOMEONE = "Know someone who would be a great fit for our team?";

const Collaborate = () => {
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [coverLetterFile, setCoverLetterFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, setFile: React.Dispatch<React.SetStateAction<File | null>>): void => {
    const file = e.target.files?.[0];
    if (file) {
      setFile(file); // Update the state with the selected file
      console.log("Selected file:", file.name);
    }
  };

  return (
    <div className="w-full min-h-screen bg-bgdarkv2 text-white">
      {/* Header Section */}
      <header className="relative z-30 w-full">
        <Navbar className="z-40" />
      </header>

      <div className="w-full bg-bgdarkv2 text-white flex flex-col py-10">
        {/* Header */}
        <header className="text-center max-w-6xl mx-auto mb-10">
          <h1 className="font-montserrat text-3xl sm:text-4xl font-bold mb-4">
            {BECOME_PART}
          </h1>
          <p className="font-opensans text-sm sm:text-base leading-7">
            {PART_TEXT}
          </p>
          <div className="flex justify-center my-6">
            <Image src={logo} alt="Team Logo" width={80} height={80} />
          </div>
        </header>

        {/* Team Selection Section */}
        <section className="w-full max-w-6xl mx-auto mb-10">
          <h2 className="font-montserrat text-xl sm:text-2xl font-bold mb-6 text-center">
            {WHICH_PART}
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            {["HR team", "Designer", "Developer", "Blockchain", "Marketing", "Finance"].map((team) => (
              <Button
                key={team}
                className="border-2 border-purple-500 text-purple-500 px-6 py-2 rounded-full hover:bg-purple-500 hover:text-white transition"
              >
                {team}
              </Button>
            ))}
          </div>
        </section>

        {/* Form Section */}
        <form className="w-full max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10"
        onSubmit={(e) => e.preventDefault()}
        >
          <div className="col-span-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="block mb-2 text-sm text-white">First name</label>
                <Input
                  type="text"
                  placeholder="First name"
                  className="px-4 py-2 bg-white text-black border border-gray-300 rounded-md"
                />
              </div>
              <div className="flex flex-col">
                <label className="block mb-2 text-sm text-white">Last name</label>
                <Input
                  type="text"
                  placeholder="Last name"
                  className="px-4 py-2 bg-white text-black border border-gray-300 rounded-md"
                />
              </div>
            </div>
            <div className="mt-6">
              <label className="block mb-2 text-sm text-white">Email</label>
              <Input
                type="email"
                placeholder="Email"
                className="col-span-1 px-4 py-2 bg-white text-black border border-gray-300 rounded-md"
              />
            </div>
            <div className="mt-6">
              <label className="block mb-2 text-sm text-white">Number</label>
              <Input
                type="tel"
                placeholder="Number (optional)"
                className="col-span-1 px-4 py-2 bg-white text-black border border-gray-300 rounded-md"
              />
            </div>
            <div className="mt-6">
              <label className="block mb-2 text-sm text-white">Portfolio</label>
              <Input
                type="url"
                placeholder="URL"
                className="col-span-2 px-4 py-2 bg-white text-black border border-gray-300 rounded-md"
              />
            </div>
          </div>

          {/* Resume Section */}
          <div className="mt-10">
            <div className="col-span-1">
              <label className="block mb-2 text-sm text-white">Resume</label>
              <div className="p-4 border border-gray-400 rounded-md bg-white text-black flex items-center">
                <Input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  id="resume"
                  className="hidden"
                  onChange={(e) => handleFileChange(e, setResumeFile)}
                />
                <Button
                  className="flex items-center justify-center bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200 transition"
                  style={{
                    minWidth: "120px",
                    fontSize: "0.875rem",
                    color: "#555555",
                    padding: "8px",
                    gap: "8px",
                    whiteSpace: "nowrap",
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    const resumeInput = document.getElementById('resume');
                    if (resumeInput) (resumeInput as HTMLInputElement).click();
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-5 h-5"
                  >
                    <path d="M21.44 11.05L12.4 20.1c-1.69 1.69-4.44 1.69-6.13 0-1.69-1.69-1.69-4.44 0-6.13l8.1-8.1c1.17-1.17 3.07-1.17 4.24 0 1.17 1.17 1.17 3.07 0 4.24l-8.1 8.1a1.5 1.5 0 01-2.12-2.12L15.18 7.3" />
                  </svg>
                  <span>Attach a file</span>
                </Button>
                <p className="ml-4 text-gray-500 text-sm">{FILE_DROP}</p>
              </div>
              {resumeFile && (
                <p className="mt-2 text-sm text-gray-300">Selected file: {resumeFile.name}</p>
              )}
            </div>
          </div>

          {/* Cover Letter Section */}
          <div className="mt-10">
            <div className="col-span-1">
              <label className="block mb-2 text-sm text-white">Cover Letter</label>
              <div className="p-4 border border-gray-400 rounded-md bg-white text-black flex items-center">
                <Input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  id="coverLetter"
                  className="hidden"
                  onChange={(e) => handleFileChange(e, setCoverLetterFile)}
                />
                <Button
                  className="flex items-center justify-center bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200 transition"
                  style={{
                    minWidth: "120px",
                    fontSize: "0.875rem",
                    color: "#555555",
                    padding: "8px",
                    gap: "8px",
                    whiteSpace: "nowrap",
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    const coverLetterInput = document.getElementById('coverLetter');
                    if (coverLetterInput) (coverLetterInput as HTMLInputElement).click();
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-5 h-5"
                  >
                    <path d="M21.44 11.05L12.4 20.1c-1.69 1.69-4.44 1.69-6.13 0-1.69-1.69-1.69-4.44 0-6.13l8.1-8.1c1.17-1.17 3.07-1.17 4.24 0 1.17 1.17 1.17 3.07 0 4.24l-8.1 8.1a1.5 1.5 0 01-2.12-2.12L15.18 7.3" />
                  </svg>
                  <span>Attach a file</span>
                </Button>
                <p className="ml-4 text-gray-500 text-sm">{FILE_DROP}</p>
              </div>
              {coverLetterFile && (
                <p className="mt-2 text-sm text-gray-300">Selected file: {coverLetterFile.name}</p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-16 col-span-2 flex items-center justify-between">
            <p className="text-sm">
              {RECOMEND_SOMEONE}{' '}
              <a href="#" className="text-purple-500 underline">
                Share this page.
              </a>
            </p>
            <button className="bg-purple-500 text-white px-6 py-2 rounded-md hover:bg-purple-600 transition">
              Collaborate with us
            </button>
          </div>
        </form>
      </div>

      {/* Full-width Divider Line */}
      <div className="w-full h-px bg-white my-6 sm:my-8"></div>

      {/* Footer Links Section (Centered) */}
      <div className="flex flex-col w-full bg-bgdarkv2 gap-y-4 items-center sm:gap-y-6">
        <div className="flex flex-wrap justify-center w-full text-white text-base font-light gap-x-10 sm:gap-x-20">
          <Link href="/about-us" className="hover:underline">About FlowerWork</Link>
          <Link href="#" className="hover:underline">Jobs</Link>
          <Link href="#" className="hover:underline">Contact us</Link>
          <Link href="#" className="hover:underline">Help & support</Link>
          <Link href="#" className="hover:underline">All About Beta</Link>
        </div>

        {/* Logo, Legal Links, and Social Icons Section */}
        <div className="flex flex-col sm:flex-row justify-between w-full items-center text-white max-w-[1000px] gap-y-4 sm:gap-y-6 sm:mb-2">
          {/* Logo and Legal Links */}
          <div className="flex flex-col sm:flex-row items-center sm:space-x-8">
            <span className="mb-4 sm:mb-0">
              <Image src={logo} alt="sample-image" width={50} height={50} className="" />
            </span>
            <div className="flex flex-wrap justify-center sm:justify-start gap-x-6 sm:gap-x-20 text-sm">
              <Link href="#" className="hover:underline">Terms & Service</Link>
              <Link href="#" className="hover:underline">Privacy Policy</Link>
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
    </div>
  );
};

export default Collaborate;