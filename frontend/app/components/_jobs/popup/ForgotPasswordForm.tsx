"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import navLogo from "@/app/public/Gaddr Logo - Gradient 3.png";
import signupLogo from "@/app/public/Gaddr_Logo-Angle_Purple 2.png";
import signupWallpaper from "@/app/public/signupWallpaper.png";
import PasswordSentPopup from "./PasswordSentPopup";

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
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [popupEmail, setPopupEmail] = useState<string>("");

  // Handle form submission (e.g., to send the recovery link)
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Show loading state
    setLoading(true);
    setError(""); // Reset error message

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/forgot-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }), // Send the email in the request body
        }
      );

      if (!response.ok) {
        // Handle error if the response is not OK (status code is not 2xx)
        const errorData = await response.json();
        setError(
          errorData.message || "Something went wrong, please try again."
        );
      } else {
        // Success: Show an alert or message
        setPopupEmail(email); // Save the email for the popup
        setShowPopup(true);
        setEmail(""); // Clear the input field
      }
    } catch (error) {
      // Handle any network or unexpected errors
      setError("An error occurred. Please try again.");
    } finally {
      // Hide loading state after request is done
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col ">
      {/* Navbar */}
      <div className="flex justify-center items-center h-[55px] bg-white">
        <Link href="/">
          <Image
            src={navLogo}
            alt="Logo linking to the homepage"
            className="w-[70px] h-[50px]"
            priority
          />
        </Link>
      </div>

      {/* Popup confirmation */}
      {showPopup && (
        <div className="px-4 sm:px-10">
          <div className="fixed top-0 left-0 w-full h-full bg-gray-300 bg-opacity-30 z-20"></div>
          <PasswordSentPopup email={popupEmail} />
        </div>
      )}

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

              {/* Error Message */}
              {error && (
                <div className="text-red-500 text-center mb-4 -mt-2">
                  {error}
                </div>
              )}

              {/* Send Button */}
              <button
                type="submit"
                className="w-full py-2 bg-[#BD71D4] text-white rounded-md hover:bg-[#a361b8] transition"
              >
                {loading ? "Sending..." : "Send recovery link"}
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
