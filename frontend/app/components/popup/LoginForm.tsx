"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import navLogo from "@/app/public/signupNavLogo.svg";
import signupLogo from "@/app/public/signupLogo.svg";
import signupWallpaper from "@/app/public/signupWallpaper.png";
import googleIcon from "@/app/public/googleIcon.svg";
import showPasswordIcon from "@/app/public/showPasswordIcon.svg";
import { useAuth } from "@/lib/auth-context";

/**
 * LoginForm is a client-side component that renders a form for users to log in.
 *
 * The component accepts no props and renders a form with input fields for email and password, a Google login button,
 * and a submit button. When the form is submitted, the component will call the `handleSubmit` function, which currently
 * just logs the email and password to the console. The component will also display an error message if either the email
 * or password fields are empty.
 *
 * @returns The LoginForm component.
 */
export default function LoginForm() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const { login } = useAuth();

  /**
   * Handles the "Log in with Google" button click. This function should be
   * implemented to use a service like Firebase, OAuth, etc. to log the user in
   * with their Google account.
   */
  const handleLoginWithGoogle = () => {
    // Implement Google login here (using a service like Firebase, OAuth, etc.)
    console.log("Logging in with Google...");
  };

  /**
   * Handles the form submission by preventing the default form submission
   * behavior, performing simple validation on the email and password fields,
   * and attempting to log the user in with the provided credentials.
   * If the email or password fields are empty, it logs an error message.
   * If the credentials are valid, it proceeds with the login logic (e.g., sends
   * the credentials to an API).
   *
   * @param {React.FormEvent} e - The form submission event.
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Simple validation
    if (!email || !password) {
      setError("Please fill in both email and password fields.");
      return;
    }

    try {
      // Send the login request
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      if (!response.ok) {
        throw new Error("Invalid email or password. Please try again.");
      }

      const data = await response.json();

      // Extract the token from the Authorization header
      const token = response.headers.get("Authorization")?.split(" ")[1]; // This will get the Bearer token part

      if (token) {
        // Save the token using the login function from the context
        login(token);
      }

      console.log("Login successful:", data);

      // Clear previous errors
      setError(null);

      // Redirect upon successful login
      router.push("/task-management-dashboard");
    } catch (error) {
      // Handle any errors that occur during the API call
      console.error("Login error:", error);

      // Extract the error message
      let errorMessage =
        "An error occurred while logging in. Please try again.";

      if (error instanceof Error) {
        if (
          "response" in error &&
          error.response &&
          typeof error.response === "object"
        ) {
          errorMessage =
            (error.response as any)?.data?.message || error.message;
        } else {
          errorMessage = error.message; // Fallback to the generic error message
        }
      }

      setError(errorMessage);
    }
  };

  /**
   * Handles the "Show password" button click. When clicked, this function toggles
   * the state of the `showPassword` state variable, which controls whether the
   * password input field is displayed as a password or as plain text.
   */
  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
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

      <hr className="border-gray-300" />

      <div className="flex flex-1 flex-col md:flex-row">
        {/* Left Form Section */}
        <div className="flex-1 flex justify-center items-start p-4 md:p-0 md:-mr-32 z-10 md:pl-10 lg:pl-0">
          <div className="bg-white rounded-lg max-w-lg mx-auto pt-8 md:pt-16 px-6 md:px-0 w-full">
            <div className="text-center mb-10">
              <h1 className="text-2xl font-bold">Welcome back to </h1>
              <div className="flex justify-center ">
                <Image
                  src={signupLogo}
                  alt="Signup logo"
                  className="w-96"
                  priority
                />
              </div>
              <p className="text-[#000000]">Log in to get back on track.</p>
            </div>

            {/* Google Login Button */}
            <button
              disabled
              onClick={handleLoginWithGoogle}
              className="w-full flex items-center justify-center space-x-2 border border-gray-300 py-2 rounded-md mb-4 hover:bg-gray-100 transition opacity-50 cursor-not-allowed"
              title="Google login is temporarily unavailable"
            >
              <Image
                src={googleIcon}
                alt="Google Sign-In logo"
                className="w-6 h-6"
              />
              <span>Log in with Google</span>
            </button>

            <div className="flex items-center my-4">
              <hr className="flex-grow border-gray-300" />
              <span className="px-2 text-gray-400">or</span>
              <hr className="flex-grow border-gray-300" />
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit}>
              {/* Email Input */}
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border border-[#4A4744] rounded-md 
                  focus:outline-none focus:ring-2 focus:ring-purple-300 italic"
                  required
                />
              </div>

              {/* Password Input */}
              <div className="mb-4">
                <label htmlFor="password" className="block text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    placeholder="Enter your password..."
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-2 border border-[#4A4744] rounded-md 
                    focus:outline-none focus:ring-2 focus:ring-purple-300 italic"
                    required
                  />
                  <div
                    className="absolute right-3 top-2.5 cursor-pointer z-10"
                    onClick={handleShowPassword}
                  >
                    <Image
                      src={showPasswordIcon}
                      alt="Toggle password visibility"
                    />
                  </div>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <p className="text-red-500 text-sm -mt-3 pb-2">{error}</p>
              )}

              {/* Forgot Password Link */}
              <div className="flex mb-12 justify-end -mt-3">
                <Link
                  href="/forgot-password"
                  className="text-[#BD71D4] font-semibold italic inline-block hover:underline"
                >
                  Forgot your password?
                </Link>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-2 bg-[#BD71D4] text-white rounded-md hover:bg-[#a361b8] transition"
              >
                Log in
              </button>
            </form>

            {/* Sign Up Link */}
            <p className="text-center mt-4">
              Don’t have an account?{" "}
              <Link
                href="/sign-up"
                className="text-[#BD71D4] font-semibold italic hover:underline"
              >
                Sign up
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
