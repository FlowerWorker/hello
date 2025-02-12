"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import navLogo from "@/app/public/signupNavLogo.svg";
import signupLogo from "@/app/public/signupLogo.svg";
import signupWallpaper from "@/app/public/signupWallpaper.png";
import googleIcon from "@/app/public/googleIcon.svg";
import showPasswordIcon from "@/app/public/showPasswordIcon.svg";
import { useRouter } from "next/navigation";

/**
 * The SignUpForm component renders a sign up form with fields for email, password,
 * checkbox for accepting terms and conditions, and an optional checkbox for
 * receiving updates. The form also includes a button to sign up with Google.
 * The component handles form submission and validation.
 *
 * @returns The SignUpForm component.
 */

interface FormData {
  username: string;
  email: string;
  password: string;
  acceptTerms: boolean;
  receiveUpdates: boolean;
}

export default function SignUpForm() {
  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    password: "",
    acceptTerms: false,
    receiveUpdates: false,
  });

  const [passwordError, setPasswordError] = useState<string>("");
  const [generalError, setGeneralError] = useState<string>("");
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

  const router = useRouter();
  /**
   * Handles input change events by updating the formData state with the new
   * value of the input element. If the input element is the password field,
   * it also validates the password and sets the passwordError state
   * accordingly.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} e - The input change event.
   */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });

    if (name === "password") {
      validatePassword(value);
    }
  };

  /**
   * Validates the provided password against a set of criteria.
   * Sets an error message if the password does not meet the requirements.
   * Criteria: Password must be at least 8 characters long, include at least
   * one uppercase letter, one lowercase letter, one number, and one special character.
   *
   * @param {string} password - The password to validate.
   */
  const validatePassword = (password: string) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d\W_]{8,}$/;

    if (!passwordRegex.test(password)) {
      setPasswordError(
        "Password must be at least 8 characters long, include one uppercase letter, one lowercase letter, and one number."
      );
    } else {
      setPasswordError("");
    }
  };

  /**
   * Handles the sign up form submission by preventing the default form submission
   * behavior, validating the password, and attempting to submit the form data
   * to a mock API (or actual API call). If the password is invalid, it logs a
   * message to the console and returns early. If the API call is successful, it
   * resets any previous error and resets the form data. If the API call fails,
   * it sets a general error message.
   *
   * @param {React.FormEvent<HTMLFormElement>} e - The form submission event.
   */
  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (passwordError) {
      console.log("Fix password issues before submitting.");
      return;
    }

    if (!formData.acceptTerms) {
      setGeneralError("You must accept the terms and conditions.");
      return;
    }

    try {
      // Make the API call to your actual endpoint
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: formData.username,
            email: formData.email,
            password: formData.password,
          }),
        }
      );

      if (!response.ok) {
        if (response.status === 409) {
          throw new Error("This email is already registered. Please log in or use a different email.");
        }
        throw new Error("Failed to sign up. Please try again.");
      }

      const data = await response.json();
      console.log("Sign up successful:", data);

      // Reset form data and any previous errors upon successful sign-up
      setGeneralError("");
      setFormData({
        username: "",
        email: "",
        password: "",
        acceptTerms: false,
        receiveUpdates: false,
      });

      // Redirect the user to the login page after successful sign-up
      router.push("/login");
    } catch (error) {
      setGeneralError(
        "An error occurred while submitting the form. Please try again later."
      );
      console.error("Error during sign up:", error);
    }
  };

  /**
   * Redirects the user to the Google Sign-In page. This function is called
   * when the user clicks the "Sign up with Google" button.
   */
  const handleGoogleSignUp = (): void => {
    console.log("Redirecting to Google Sign-In...");
  };

  /**
   * Toggles the visibility of the password input field. When the user clicks the
   * "Show password" button, this function is called to toggle the state of the
   * `passwordVisible` state variable.
   */
  const togglePasswordVisibility = (): void => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <div className="flex justify-center items-center h-[55px] bg-white">
        <Link href="/">
          <Image
            src={navLogo}
            alt="Logo linking to the homepage"
            className="w-[40px] h-[40px]"
            priority
          />
        </Link>
      </div>

      <hr className="border-gray-300" />

      <div className="flex flex-1 flex-col md:flex-row">
        {/* Left Form Section */}
        <div className="flex-1 flex justify-center items-start p-4 md:p-0 md:-mr-32 md:ml-10 lg:pl-0 z-10 ">
          <div className="bg-white rounded-lg max-w-lg mx-auto pt-8 md:pt-16 px-6 md:px-0 w-full">
            <div className="text-center mb-10">
              <h1 className="text-2xl font-bold">Welcome to </h1>
              <div className="flex justify-center ">
                <Image
                  src={signupLogo}
                  alt="Signup logo"
                  className="w-96"
                  priority
                />
              </div>
              <p className="text-[#000000]">
                Let’s sign up quickly to get started.
              </p>
            </div>

            <button
              disabled
              onClick={handleGoogleSignUp}
              className="w-full flex items-center justify-center space-x-2 border border-gray-300 py-2 rounded-md mb-4 hover:bg-gray-100 transition opacity-50 cursor-not-allowed"
              title="Google Sign-Up is temporarily unavailable"
            >
              <Image
                src={googleIcon}
                alt="Google Sign-In logo"
                className="w-6 h-6"
              />
              <span>Sign up with Google</span>
            </button>

            <div className="flex items-center my-4">
              <hr className="flex-grow border-gray-300" />
              <span className="px-2 text-gray-400">or</span>
              <hr className="flex-grow border-gray-300" />
            </div>

            {generalError && (
              <div
                className="bg-red-200 text-red-800 p-3 rounded-md mb-4"
                role="alert"
                aria-live="assertive"
              >
                {generalError}
              </div>
            )}

            <form onSubmit={handleSignUp}>
              <div className="mb-4">
                <label htmlFor="username" className="block text-gray-700 mb-1">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Enter your username..."
                  value={formData.username}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-[#4A4744] rounded-md focus:outline-none focus:ring-2 focus:ring-purple-300 italic"
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email..."
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-[#4A4744] rounded-md focus:outline-none focus:ring-2 focus:ring-purple-300 italic"
                  required
                  aria-invalid={passwordError ? "true" : "false"} // Use "true" or "false" as per the validation state
                  aria-describedby="email-error" // If you have a specific error message for the input
                />
                {formData.email && !/\S+@\S+\.\S+/.test(formData.email) && (
                  <p
                    id="email-error"
                    className="text-red-500 text-sm mt-1"
                    role="alert"
                  >
                    Please enter a valid email address.
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label htmlFor="password" className="block text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={passwordVisible ? "text" : "password"}
                    id="password"
                    name="password"
                    placeholder="Enter your password..."
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-[#4A4744] rounded-md focus:outline-none focus:ring-2 focus:ring-purple-300 italic"
                    required
                    aria-invalid={passwordError ? "true" : "false"}
                    aria-describedby="password-error"
                  />
                  <div
                    className="absolute right-3 top-2.5 cursor-pointer z-10"
                    onClick={togglePasswordVisibility}
                  >
                    <Image
                      src={showPasswordIcon}
                      alt="Toggle password visibility"
                    />
                  </div>
                </div>
                {passwordError && (
                  <p
                    id="password-error"
                    className="text-red-500 text-sm mt-1"
                    role="alert"
                  >
                    {passwordError}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label className="flex items-center text-gray-700">
                  <input
                    type="checkbox"
                    name="acceptTerms"
                    checked={formData.acceptTerms}
                    onChange={handleInputChange}
                    className="mr-2 cursor-pointer"
                    required
                  />
                  I accept all the{" "}
                  <Link href="/terms-and-conditions">
                    <span className="font-semibold ml-1">
                      {" "}
                      Terms & Conditions
                    </span>
                  </Link>
                  .
                </label>
              </div>

              <div className="mb-4">
                <label className="flex items-center text-gray-700">
                  <input
                    type="checkbox"
                    name="receiveUpdates"
                    checked={formData.receiveUpdates}
                    onChange={handleInputChange}
                    className="mr-2 cursor-pointer"
                  />
                  I’d like to receive occasional emails about product updates,
                  new features, and special promotions.
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-2 bg-[#BD71D4] text-white rounded-md hover:bg-[#a361b8] transition"
              >
                Sign up
              </button>
            </form>

            <p className="text-center mt-4">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-[#BD71D4] font-semibold italic hover:underline"
              >
                Login
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
