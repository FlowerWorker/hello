"use client";

import React from "react";
import LoginForm from "@/app/components/_jobs/popup/LoginForm";
import { Footer, Navbar } from "../../components";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function JobsLoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <header className="relative z-50 bg-white/80 backdrop-blur-md border-b border-gray-200/50 sticky top-0">
        <Navbar />
      </header>

      <main className="flex items-center justify-center min-h-[80vh] px-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome Back
            </h1>
            <p className="text-gray-600">
              Sign in to access your jobs dashboard
            </p>
          </div>

          <LoginForm />

          <div className="text-center mt-6">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <Link
                href="/jobs/sign-up"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Sign up here
              </Link>
            </p>
            <div className="mt-4">
              <Link href="/jobs">
                <Button variant="outline" className="w-full">
                  ← Back to Jobs
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
