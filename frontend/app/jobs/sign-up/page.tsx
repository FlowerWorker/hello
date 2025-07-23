"use client";

import React from "react";
import SignUpForm from "@/app/components/_jobs/popup/SignUpForm";
import { Footer, Navbar } from "../../components";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function JobsSignUpPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <header className="relative z-50 bg-white/80 backdrop-blur-md border-b border-gray-200/50 sticky top-0">
        <Navbar />
      </header>

      <main className="flex items-center justify-center min-h-[80vh] px-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Join Our Community
            </h1>
            <p className="text-gray-600">
              Create an account to start your job search journey
            </p>
          </div>

          <SignUpForm />

          <div className="text-center mt-6">
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link
                href="/jobs/login"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Sign in here
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
