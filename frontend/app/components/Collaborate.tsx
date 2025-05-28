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

import logo from '@/app/public/Gaddr Logo - Gradient 3.png';

export const FILE_DROP = "Drag & drop any images or documents that might be helpful in explaining your brief here. (Max 25 MB)";
export const BECOME_PART = "Become a part of our team";
export const PART_TEXT = "Are you ready to take your career to the next level? Join our team and become part of a group of passionate, driven, and innovative individuals dedicated to making a difference. We value creativity, collaboration, and a commitment to excellence in everything we do.";
export const WHICH_PART = "Which team would you like to be a part of?";
export const RECOMEND_SOMEONE = "Know someone who would be a great fit for our team?";
export const THANKS = "Thank you for applying to Gaddr!"
export const CATCH = "Your info has been submitted, we'll catch up with you soon!";

const Collaborate = () => {
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [coverLetterFile, setCoverLetterFile] = useState<File | null>(null);
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);
  const [showPopup, setShowPopup] = useState(false); // State to control popup visibility

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowPopup(true); // Show the popup when form is submitted
  };

  const closePopup = () => setShowPopup(false); // Close the popup



  const CustomInput = ({ placeholder, type = "text", className }: { placeholder: string; type?: string; className?: string }) => {
    const [isFocused, setIsFocused] = useState(false);
    const [value, setValue] = useState(""); // Track the input's value

    const handleFocus = () => {
      setIsFocused(true);
    };

    const handleBlur = () => {
      setIsFocused(false);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value); // Update value on input
    };

    const getBackgroundColor = () => {
      if (isFocused) return "#FFFFFF"; // Active background
      if (!isFocused && value.trim() !== "") return "#FFFFFF"; // Filled background
      if (isFocused && !value.trim()) return "#F3F3F6"; // On click background
      return "#EAEAED"; // Default or hover background
    };

    const getBorderColor = () => {
      if (isFocused) return "#181615"; // Active border
      if (value.trim()) return "#171929"; // Filled border
      return "#B055CC"; // Hover and click border
    };

    return (
      <input
        type={type}
        placeholder={placeholder}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleChange}
        value={value}
        style={{
          backgroundColor: getBackgroundColor(),
          border: `1.5px solid ${getBorderColor()}`,
          borderRadius: "8px",
          padding: "10px 15px",
          width: "100%",
          outline: "none",
          color: "black",
          transition: "background-color 0.3s ease, border-color 0.3s ease",
        }}
        className={className}
      />
    );
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
  };

  const handleDrop = (
    e: React.DragEvent<HTMLDivElement>,
    setFile: React.Dispatch<React.SetStateAction<File | null>>
  ) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
      console.log("Selected file:", droppedFile.name);
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
                key={team} // Added key prop
                onClick={() => setSelectedTeam(team)} // Set the selected team
                className={`border-2 px-6 py-2 rounded-full transition ${selectedTeam === team
                  ? "bg-purple-500 text-white border-purple-500"
                  : "text-purple-500 border-purple-500 hover:bg-purple-500 hover:text-white"
                  }`}
              >
                {team}
              </Button>
            ))}
          </div>
        </section>


        {/* Form Section */}
        <form
          className="w-full max-w-6xl mx-auto grid-inline grid-cols-1 sm:grid-cols-2 gap-4 px-4 sm:px-6 mb-10"
          onSubmit={handleFormSubmit}
        >
          {/* Form Inputs */}
          <div className="col-span-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="block mb-2 text-sm text-white">First name</label>
                <CustomInput
                  type="text"
                  placeholder="First name"
                  className="px-4 py-2 bg-white text-black border border-gray-300 rounded-md"
                />
              </div>
              <div className="flex flex-col">
                <label className="block mb-2 text-sm text-white">Last name</label>
                <CustomInput
                  type="text"
                  placeholder="Last name"
                  className="px-4 py-2 bg-white text-black border border-gray-300 rounded-md"
                />
              </div>
            </div>
            <div className="mt-6">
              <label className="block mb-2 text-sm text-white">Email</label>
              <CustomInput
                type="email"
                placeholder="Email"
                className="col-span-1 px-4 py-2 bg-white text-black border border-gray-300 rounded-md"
              />
            </div>
            <div className="mt-6">
              <label className="block mb-2 text-sm text-white">Number</label>
              <CustomInput
                type="tel"
                placeholder="Number (optional)"
                className="col-span-1 px-4 py-2 bg-white text-black border border-gray-300 rounded-md"
              />
            </div>
            <div className="mt-6">
              <label className="block mb-2 text-sm text-white">Portfolio</label>
              <CustomInput
                type="url"
                placeholder="URL"
                className="col-span-2 px-4 py-2 bg-white text-black border border-gray-300 rounded-md"
              />
            </div>
          </div>

          {/* Resume and Cover Letter Sections */}
          <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Resume Section */}
            <div className="flex flex-col">
              <label className="block mb-2 text-sm text-white">Resume</label>
              <div
                onDrop={(e) => handleDrop(e, setResumeFile)}
                onDragOver={handleDragOver}
                className="p-4 border border-gray-400 rounded-md bg-white text-black flex flex-row items-center"
              >
                <Input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  id="resume"
                  className="hidden"
                  onChange={(e) => {
                    const selectedFile = e.target.files?.[0];
                    if (selectedFile) setResumeFile(selectedFile);
                  }}
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
                    const resumeInput = document.getElementById("resume") as HTMLInputElement;
                    if (resumeInput) resumeInput.click();
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
                    style={{
                      display: "inline-block",
                    }}
                  >
                    <path d="M21.44 11.05L12.4 20.1c-1.69 1.69-4.44 1.69-6.13 0-1.69-1.69-1.69-4.44 0-6.13l8.1-8.1c1.17-1.17 3.07-1.17 4.24 0 1.17 1.17 1.17 3.07 0 4.24l-8.1 8.1a1.5 1.5 0 01-2.12-2.12L15.18 7.3" />
                  </svg>
                  <span>Attach a file</span>
                </Button>
                <p className="mt-2 text-gray-500 text-sm text-center">{FILE_DROP}</p>
              </div>
              {resumeFile && (
                <div className="mt-2 flex items-center justify-between">
                  <p className="text-sm text-gray-300">Selected file: {resumeFile.name}</p>
                  <Button
                    className="text-red-500 hover:text-red-700 transition"
                    onClick={() => setResumeFile(null)}
                  >
                    Remove
                  </Button>
                </div>
              )}
            </div>

            {/* Cover Letter Section */}
            <div className="flex flex-col">
              <label className="block mb-2 text-sm text-white">Cover Letter</label>
              <div
                onDrop={(e) => handleDrop(e, setCoverLetterFile)}
                onDragOver={handleDragOver}
                className="p-4 border border-gray-400 rounded-md bg-white text-black flex flex-row items-center"
              >
                <Input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  id="coverLetter"
                  className="hidden"
                  onChange={(e) => {
                    const selectedFile = e.target.files?.[0];
                    if (selectedFile) setCoverLetterFile(selectedFile);
                  }}
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
                    const coverLetterInput = document.getElementById("coverLetter") as HTMLInputElement;
                    if (coverLetterInput) coverLetterInput.click();
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
                    style={{
                      display: "inline-block",
                    }}
                  >
                    <path d="M21.44 11.05L12.4 20.1c-1.69 1.69-4.44 1.69-6.13 0-1.69-1.69-1.69-4.44 0-6.13l8.1-8.1c1.17-1.17 3.07-1.17 4.24 0 1.17 1.17 1.17 3.07 0 4.24l-8.1 8.1a1.5 1.5 0 01-2.12-2.12L15.18 7.3" />
                  </svg>
                  <span>Attach a file</span>
                </Button>
                <p className="mt-2 text-gray-500 text-sm text-center">{FILE_DROP}</p>
              </div>
              {coverLetterFile && (
                <div className="mt-2 flex items-center justify-between">
                  <p className="text-sm text-gray-300">Selected file: {coverLetterFile.name}</p>
                  <Button
                    className="text-red-500 hover:text-red-700 transition"
                    onClick={() => setCoverLetterFile(null)}
                  >
                    Remove
                  </Button>
                </div>
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
            <Button className="bg-purple-500 text-white px-6 py-2 rounded-md hover:bg-purple-600 transition">
              Collaborate with us
            </Button>
          </div>
        </form>

      </div >
      {/* Popup */}
      {showPopup && (
        <div
          onClick={closePopup} // Close popup when clicking outside
          style={{
            animation: "fadeIn 0.5s ease-in-out",
          }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
        >
          <div
            onClick={(e) => e.stopPropagation()} // Prevent click inside the popup from closing it
            style={{
              animation: "slideIn 0.5s ease-in-out",
              background: "linear-gradient(90deg, #9C2BBF 0%, #4C165D 100%)", // Adjusted gradient to match
              color: "white",
              borderRadius: "16px", // More rounded corners
              padding: "24px",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)", // Subtle shadow for elevation
              maxWidth: "400px", // Ensure it matches screenshot proportions
              textAlign: "start", // Center text alignment
              position: "relative",
            }}
          >
            <h2 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "12px" }}>
              {THANKS}
            </h2>
            <p style={{ fontSize: "14px", marginBottom: "24px" }}>
              {CATCH}
            </p>
            <div
              style={{
                position: "absolute",
                bottom: "16px",
                right: "16px",
                width: "40px",
                height: "40px",
              }}
            >
              <Image
                src={logo} // Use your logo here
                alt="Flowerwork Logo"
                width={40}
                height={40}
              />
            </div>
          </div>
        </div>
      )}



      {/* Scoped styles */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideIn {
          from {
            transform: translateY(-50%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>


      {/* Full-width Divider Line */}
      <div className="w-full h-px bg-white my-6 sm:my-0"></div>
      <div className="flex flex-col w-full bg-bgdarkv8 gap-y-10 items-center sm:gap-y-8 px-4 sm:px-8 sm:pt-4">
        {/* Footer Links Section */}
        <div className="flex flex-wrap justify-center w-full text-white text-sm sm:text-base font-light gap-x-10 sm:gap-x-40 sm:mt-4">
          <Link href="#" className="flex items-center">
            <Image
              src={logo}
              alt="FlowerWork Logo"
              className="w-10 h-10 hover:opacity-80 transition-opacity duration-300"
            />
          </Link>
          <Link href="/about-us" className="hover:underline">About Gaddr</Link>
          <Link href="#" className="hover:underline">Contact Us</Link>
          <Link href="#" className="hover:underline">Terms & Conditions</Link>
          <Link href="#" className="hover:underline">Privacy Policy</Link>
        </div>

        {/* Social Media Icons */}
        <div className="flex justify-center space-x-8 text-white pb-6 sm:mt-0">
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
    </div>
  );
};

export default Collaborate;