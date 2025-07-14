"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import navLogo from "@/app/public/Gaddr Logo - Gradient 3.png";
import signupLogo from "@/app/public/Gaddr_Logo-Angle_Purple 2.png";
import signupWallpaper from "@/app/public/signupWallpaper.png";
import googleIcon from "@/app/public/googleIcon.svg";
import showPasswordIcon from "@/app/public/showPasswordIcon.svg";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import Button from "@/app/components/ui/button";

/**
 * The SignUpForm component renders a sign up form with fields for email, password,
 * confirm password, checkbox for accepting terms and conditions, and an optional checkbox for
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

  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [confirmPasswordError, setConfirmPasswordError] = useState<string>("");
  const [generalError, setGeneralError] = useState<string>("");
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState<boolean>(false);

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
    if (name === "confirmPassword") {
      setConfirmPassword(value);
      if (formData.password && value !== formData.password) {
        setConfirmPasswordError("Passwords do not match.");
      } else {
        setConfirmPasswordError("");
      }
      return;
    }
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });

    if (name === "password") {
      validatePassword(value);
      if (confirmPassword && value !== confirmPassword) {
        setConfirmPasswordError("Passwords do not match.");
      } else {
        setConfirmPasswordError("");
      }
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

    if (confirmPassword !== formData.password) {
      setConfirmPasswordError("Passwords do not match.");
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
          throw new Error(
            "This email is already registered. Please log in or use a different email."
          );
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
      setConfirmPassword("");
      setConfirmPasswordError("");

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

  /**
   * Toggles the visibility of the confirm password input field.
   */
  const toggleConfirmPasswordVisibility = (): void => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F7F7]">
      {/* Navbar */}
      <div className="flex justify-center items-center h-[55px] bg-white border-b border-gray-200">
        <Link href="/">
          <Image
            src={navLogo}
            alt="Logo linking to the homepage"
            className="w-[70px] h-[50px]"
            priority
          />
        </Link>
      </div>
      <div className="flex flex-1 flex-col md:flex-row items-stretch justify-center w-full max-w-6xl mx-auto py-8 md:py-16 gap-6">
        {/* Left: Sign Up Card */}
        <div className="flex-1 flex items-center justify-center">
          <Card className="w-full max-w-md rounded-2xl shadow-lg bg-white flex flex-col justify-between min-h-[600px]">
            <CardHeader className="pt-10 pb-4 text-left">
              <h1 className="text-3xl font-bold leading-tight mb-2">
                Welcome to <span className="font-black">Gaddr</span>
              </h1>
              <p className="text-base text-gray-500 mb-6">
                Gaze and attention modeling powered by AI is optimizing virtual
                reality experiences
              </p>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <form onSubmit={handleSignUp} className="flex flex-col gap-4">
                <div>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300 text-base italic bg-white"
                    required
                  />
                </div>
                <div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email address"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300 text-base italic bg-white"
                    required
                    aria-invalid={passwordError ? "true" : "false"}
                    aria-describedby="email-error"
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
                <div className="relative">
                  <input
                    type={passwordVisible ? "text" : "password"}
                    id="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300 text-base italic bg-white"
                    required
                    aria-invalid={passwordError ? "true" : "false"}
                    aria-describedby="password-error"
                  />
                  <div
                    className="absolute right-3 top-3 cursor-pointer z-10"
                    onClick={togglePasswordVisibility}
                  >
                    <Image
                      src={showPasswordIcon}
                      alt="Toggle password visibility"
                      width={24}
                      height={24}
                    />
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
                <div className="relative">
                  <input
                    type={confirmPasswordVisible ? "text" : "password"}
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300 text-base italic bg-white"
                    required
                    aria-invalid={confirmPasswordError ? "true" : "false"}
                    aria-describedby="confirm-password-error"
                  />
                  <div
                    className="absolute right-3 top-3 cursor-pointer z-10"
                    onClick={toggleConfirmPasswordVisibility}
                  >
                    <Image
                      src={showPasswordIcon}
                      alt="Toggle confirm password visibility"
                      width={24}
                      height={24}
                    />
                  </div>
                  {confirmPasswordError && (
                    <p
                      id="confirm-password-error"
                      className="text-red-500 text-sm mt-1"
                      role="alert"
                    >
                      {confirmPasswordError}
                    </p>
                  )}
                </div>
                {generalError && (
                  <div
                    className="bg-red-200 text-red-800 p-3 rounded-md mb-2"
                    role="alert"
                    aria-live="assertive"
                  >
                    {generalError}
                  </div>
                )}
                <div className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    name="acceptTerms"
                    checked={formData.acceptTerms}
                    onChange={handleInputChange}
                    className="mr-2 cursor-pointer"
                    required
                  />
                  <span className="text-gray-700 text-sm">
                    I accept all the
                    <Link href="/terms-and-conditions">
                      <span className="font-semibold ml-1">
                        Terms & Conditions
                      </span>
                    </Link>
                    .
                  </span>
                </div>
                <div className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    name="receiveUpdates"
                    checked={formData.receiveUpdates}
                    onChange={handleInputChange}
                    className="mr-2 cursor-pointer"
                  />
                  <span className="text-gray-700 text-sm">
                    I’d like to receive occasional emails about product updates,
                    new features, and special promotions.
                  </span>
                </div>
                <Button
                  text="Sign up"
                  backgroundColor="#7C3AED"
                  hoverColor="#8B5CF6"
                  textColor="white"
                  width={360}
                  hoverwidth={370}
                  height={48}
                  padding={[10, 0]}
                />
                <div className="flex items-center my-2">
                  <hr className="flex-grow border-gray-300" />
                  <span className="px-2 text-gray-400">or</span>
                  <hr className="flex-grow border-gray-300" />
                </div>
                <button
                  disabled
                  onClick={handleGoogleSignUp}
                  className="w-full flex items-center justify-center space-x-2 border border-gray-300 py-2 rounded-lg mb-2 hover:bg-gray-100 transition opacity-50 cursor-not-allowed bg-white"
                  title="Google Sign-Up is temporarily unavailable"
                >
                  <Image
                    src={googleIcon}
                    alt="Google Sign-In logo"
                    className="w-6 h-6"
                  />
                  <span>Signup with Google</span>
                </button>
                <div className="text-center text-sm text-gray-500 mt-2">
                  Already have an account?{" "}
                  <Link
                    href="/jobs/login"
                    className="text-[#7C3AED] font-semibold hover:underline"
                  >
                    Login
                  </Link>
                </div>
              </form>
            </CardContent>
            <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100 mt-4">
              <div className="flex items-center -space-x-2">
               
                <Image
                  src={signupLogo}
                  alt="User2"
                  width={32}
                  height={32}
                  className="rounded-full border-2 border-white"
                />
              </div>
              <div className="ml-4 text-sm text-gray-700 font-medium">
                Join with <span className="font-bold">20k+ Users!</span>
              </div>
            </div>
          </Card>
        </div>
        {/* Right: Marketing/Visual Section */}
        <div className="flex-1 flex flex-col items-center justify-center p-6">
          <div className="w-full max-w-lg rounded-2xl overflow-hidden shadow-none bg-[#E6F2F8] flex flex-col items-center justify-center min-h-[500px] relative">
            <div className="absolute inset-0">
              <Image
                src={signupWallpaper}
                alt="Signup background wallpaper"
                fill
                style={{ objectFit: "cover", opacity: 0.95 }}
                priority
              />
            </div>
            <div className="relative z-10 flex flex-col items-center justify-center h-full w-full p-10">
              <h2 className="text-2xl md:text-3xl font-bold text-center mb-4 text-[#2A2D4B]">
                AI Revolutionizing the way we create, render, and experience
                content.
              </h2>
              <p className="text-base text-gray-700 text-center mb-6">
                Create design brief with AI voice command to make awesome 3d
                images that suits your needs.
              </p>
              <div className="flex items-center gap-2 bg-white/80 rounded-full px-6 py-2 shadow-md">
                <span className="w-3 h-3 bg-[#00B5D9] rounded-full inline-block mr-2"></span>
                <span className="font-semibold text-[#2A2D4B]">Creating</span>
               
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
