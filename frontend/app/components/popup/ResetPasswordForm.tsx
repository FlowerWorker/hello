"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import navLogo from "@/app/public/Gaddr Logo - Gradient 3.png";
import signupLogo from "@/app/public/Gaddr_Logo-Angle_Purple 2.png";
import signupWallpaper from "@/app/public/signupWallpaper.png";
import showPasswordIcon from "@/app/public/showPasswordIcon.svg";
import { useRouter } from "next/navigation";
import PasswordConfirmationPopup from "./PasswordConfirmationPopup";

/**
 * A form component that renders a form for users to set a new password
 * after resetting their password. The form contains fields for a new
 * password and a confirmation of the new password. The form also renders
 * a submit button to submit the new password.
 *
 * The component handles form validation and submission. If the password
 * does not meet the requirements, it displays an error message. If the
 * password and confirmation do not match, it displays an error message.
 * If the form is submitted successfully, it redirects the user to the
 * login page.
 */
const SetNewPasswordForm: React.FC = () => {
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [passwordMatch, setPasswordMatch] = useState<boolean>(true);
  const [passwordError, setPasswordError] = useState<string>("");
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] =
    useState<boolean>(false);
  const [token, setToken] = useState<string | null>(null);
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [showPopup, setShowPopup] = useState<boolean>(false);

  const router = useRouter(); // Hook for programmatic navigation

  // Extract the token from the URL query string
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const tokenFromUrl = queryParams.get("token");
    if (tokenFromUrl) {
      setToken(tokenFromUrl);
    }
  }, []);

  /**
   * Validates the provided password against a set of criteria.
   * Sets an error message if the password does not meet the requirements.
   * Criteria: Password must be at least 8 characters long, include at least
   * one uppercase letter, one lowercase letter, one number, and one special character.
   *
   * @param {string} password - The password to validate.
   */
  const validatePassword = (password: string): void => {
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
   * Handles the submission of the set new password form by preventing the default form
   * submission behavior, validating that the new password and confirmation match, and
   * checking that the password meets the required criteria. If the passwords do not match
   * or the password is invalid, it sets the appropriate error state. If the passwords match
   * and are valid, it proceeds with the password update logic and alerts the user of a successful
   * update. The form fields and error states are reset after a successful submission, and the
   * user is redirected to the login page.
   *
   * @param {React.FormEvent} e - The form submission event.
   */
  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setPasswordMatch(false);
      return;
    }

    validatePassword(password);

    if (passwordError) {
      return;
    }

    if (!token) {
      setGeneralError("Token is missing. Please try again.");

      return;
    }

    // Make API request to update the password
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/reset-password`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: token,
            new_password: password,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Password reset failed.");
      }

      // Show the confirmation popup instead of the alert
      setShowPopup(true);

      // Reset the form and error states after successful submit
      setPassword("");
      setConfirmPassword("");
      setPasswordError("");
      setPasswordMatch(true);

      // Redirect user to the login page after a short delay (popup visibility)
      setTimeout(() => {
        router.push("/login");
      }, 3000);
    } catch (error) {
      setGeneralError("An error occurred. Please try again.");
    }
  };

  /**
   * Toggles the visibility of the password input field by updating the
   * `passwordVisible` state. This function is typically called when the user
   * interacts with a button to show or hide the password.
   */
  const togglePasswordVisibility = (): void => {
    setPasswordVisible(!passwordVisible);
  };

  /**
   * Toggles the visibility of the confirm password input field by updating the
   * `confirmPasswordVisible` state. This function is typically called when the
   * user interacts with a button to show or hide the confirm password.
   */
  const toggleConfirmPasswordVisibility = (): void => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  return (
    <div className="min-h-screen flex flex-col ">
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

      {/* Popup confirmation */}
      {showPopup && (
        <div className="px-4 sm:px-10">
          <div className="fixed top-0 left-0 w-full h-full bg-gray-300 bg-opacity-30 z-20"></div>
          <PasswordConfirmationPopup />
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
                Set your new password
              </h1>
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

            <form onSubmit={handleSubmit}>
              {/* Password Input */}
              <div className="mb-4 relative">
                <label htmlFor="password" className="text-gray-700 flex mb-1">
                  Enter your new password:
                </label>

                <input
                  type={passwordVisible ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="Enter new password..."
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    validatePassword(e.target.value);
                  }}
                  className="italic w-full px-4 py-2 border border-[#4A4744] rounded-md focus:outline-none focus:ring-2 focus:ring-purple-300"
                  required
                />

                <div
                  className="absolute right-3 top-10 cursor-pointer z-10"
                  onClick={togglePasswordVisibility}
                >
                  <Image
                    src={showPasswordIcon}
                    alt="Toggle password visibility"
                  />
                </div>

                {passwordError && (
                  <p className="text-red-500 text-sm mt-2">{passwordError}</p>
                )}
              </div>

              {/* Confirm Password Input */}
              <div className="mb-4 relative">
                <label
                  htmlFor="confirmPassword"
                  className="text-gray-700  flex mb-1"
                >
                  Confirm your new password:
                </label>

                <input
                  type={confirmPasswordVisible ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Confirm your password..."
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="italic w-full px-4 py-2 border border-[#4A4744] rounded-md focus:outline-none focus:ring-2 focus:ring-purple-300"
                  required
                />

                <div
                  className="absolute right-3 top-10 cursor-pointer z-10"
                  onClick={toggleConfirmPasswordVisibility}
                >
                  <Image
                    src={showPasswordIcon}
                    alt="Toggle password visibility"
                  />
                </div>

                {!passwordMatch && (
                  <p className="text-red-500 text-sm mt-2">
                    Passwords do not match!
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-2 bg-[#BD71D4] text-white rounded-md hover:bg-[#a361b8] transition"
              >
                Submit new password
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
};

export default SetNewPasswordForm;
