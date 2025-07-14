"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import navLogo from "@/app/public/Gaddr Logo - Gradient 3.png";
import signupLogo from "@/app/public/Gaddr_Logo-Angle_Purple 2.png";
import signupWallpaper from "@/app/public/signupWallpaper.png";
import googleIcon from "@/app/public/googleIcon.svg";
import showPasswordIcon from "@/app/public/showPasswordIcon.svg";
import { useAuth } from "@/lib/auth-context";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import Button from "@/app/components/ui/button";

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
        {/* Left: Login Card */}
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
              {/* Email Input */}
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300 text-base italic bg-white"
                    required
                  />
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300 text-base italic bg-white"
                    required
                  />
                  <div
                    className="absolute right-3 top-3 cursor-pointer z-10"
                    onClick={handleShowPassword}
                  >
                    <Image
                      src={showPasswordIcon}
                      alt="Toggle password visibility"
                      width={24}
                      height={24}
                    />
                  </div>
                </div>
                {/* Error Message */}
                {error && (
                  <p className="text-red-500 text-sm -mt-2 pb-2">{error}</p>
                )}
                <Button
                  text="Login"
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
                {/* Google Login Button */}
                <button
                  disabled
                  onClick={handleLoginWithGoogle}
                  className="w-full flex items-center justify-center space-x-2 border border-gray-300 py-2 rounded-lg mb-2 hover:bg-gray-100 transition opacity-50 cursor-not-allowed bg-white"
                  title="Google login is temporarily unavailable"
                >
                  <Image
                    src={googleIcon}
                    alt="Google Sign-In logo"
                    className="w-6 h-6"
                  />
                  <span>Login with Google</span>
                </button>
                <div className="text-center text-sm text-gray-500 mt-2 w-full">
                  Already have an account?{" "}
                  <Link
                    href="/jobs/sign-up"
                    className="text-[#7C3AED] font-semibold hover:underline"
                  >
                    Login
                  </Link>
                </div>
              </form>
            </CardContent>
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
