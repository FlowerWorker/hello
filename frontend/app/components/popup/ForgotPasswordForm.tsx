"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import navLogo from "@/app/public/signupNavLogo.svg";
import signupLogo from "@/app/public/signupLogo.svg";
import signupWallpaper from "@/app/public/signupWallpaper.png";

/**
 * ForgotPasswordForm is a client-side component that renders a form for users to request a password reset link.
 *
 * The component accepts no props and renders a form with an input for the user's email address and a submit button.
 * When the form is submitted, the component will call the `handleSubmit` function, which is currently just a placeholder
 * and logs the email address to the console. The component will also display an alert box with a message indicating that
 * a recovery link has been sent to the email address.
 *
 * @returns The ForgotPasswordForm component.
 **/

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");

  // Handle form submission (e.g., to send the recovery link)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Handle the password reset request logic here (e.g., call API)
    console.log(email);
    alert("A recovery link has been sent to your email.");
  };

  return (
    <div className="min-h-screen flex flex-col ">
      {/* Navbar */}
      <div className="flex justify-center items-center h-[55px] bg-white">
        <Image
          src={navLogo}
          alt="Logo linking to the homepage"
          className="w-[40px] h-[40px]"
        />
      </div>

      <hr className="border-gray-300" />

      <div className="flex flex-1 flex-col md:flex-row">
        {/* Left Form Section */}
        <div className="flex-1 flex justify-center items-start p-4 md:p-0 md:-mr-32 md:pl-10 lg:pl-0 z-10">
          <div className="bg-white rounded-lg max-w-lg mx-auto pt-8 md:pt-16 px-6 md:px-0 w-full">
            <div className="text-center mb-10">
              <div className="flex justify-center ">
                <Image
                  src={signupLogo}
                  alt="Signup logo"
                  className="w-96"
                  priority
                />
              </div>

              <h1 className="text-[30px] font-bold text-[#4A4744]">
                Reset your password
              </h1>
            </div>

            <form onSubmit={handleSubmit}>
              {/* Email Input */}
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="text-gray-700 justify-center flex mb-2"
                >
                  We will send you a recovery link to this email address:
                </label>

                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="italic w-full px-4 py-2 border border-[#4A4744] rounded-md focus:outline-none focus:ring-2 focus:ring-purple-300"
                  required
                />
              </div>

              {/* Send Button */}
              <button
                type="submit"
                className="w-full py-2 bg-[#BD71D4] text-white rounded-md hover:bg-[#a361b8] transition"
              >
                Send recovery link
              </button>
            </form>

            <p className="text-center mt-4">
              <Link
                href="/login"
                className="text-[#BD71D4] font-semibold italic hover:underline"
              >
                Back to log in
              </Link>
            </p>
          </div>
        </div>

        {/* Right Image Section */}
        <div className="relative flex-1 pr-44 ml-10">
          <Image
            src={signupWallpaper}
            alt="Signup background wallpaper"
            className="absolute top-0 left-0 w-full h-full"
            priority
          />
        </div>
      </div>
    </div>
  );
}
