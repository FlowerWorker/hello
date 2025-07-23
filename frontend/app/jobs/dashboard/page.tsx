"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Footer, Navbar } from "../../components";
import { useAuth } from "@/lib/auth-context";
import Link from "next/link";

export default function JobsDashboard() {
  const { token } = useAuth();

  if (!token) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
        <header className="relative z-50 bg-white/80 backdrop-blur-md border-b border-gray-200/50 sticky top-0">
          <Navbar />
        </header>
        <div className="flex items-center justify-center min-h-[60vh]">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Authentication Required</CardTitle>
              <CardDescription>
                Please log in to access the jobs dashboard.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Link href="/jobs/login">
                <Button className="w-full">Login</Button>
              </Link>
              <Link href="/jobs/sign-up">
                <Button variant="outline" className="w-full">
                  Sign Up
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <header className="relative z-50 bg-white/80 backdrop-blur-md border-b border-gray-200/50 sticky top-0">
        <Navbar />
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Jobs Dashboard
          </h1>
          <p className="text-gray-600">
            Manage your job applications and opportunities
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Active Applications</CardTitle>
              <CardDescription>Jobs you've applied to</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">12</div>
              <p className="text-sm text-gray-500">+3 this week</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Interviews Scheduled</CardTitle>
              <CardDescription>Upcoming interviews</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">3</div>
              <p className="text-sm text-gray-500">Next: Tomorrow</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Saved Jobs</CardTitle>
              <CardDescription>Jobs you've bookmarked</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-600">25</div>
              <p className="text-sm text-gray-500">+5 this week</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Recent Applications</CardTitle>
              <CardDescription>Your latest job applications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div>
                      <h4 className="font-semibold">
                        Senior Software Engineer
                      </h4>
                      <p className="text-sm text-gray-500">TechCorp Inc.</p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-blue-600">
                        Applied
                      </div>
                      <div className="text-xs text-gray-500">2 days ago</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common tasks and shortcuts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Link href="/jobs/post">
                  <Button className="w-full justify-start">
                    📝 Post a New Job
                  </Button>
                </Link>
                <Button variant="outline" className="w-full justify-start">
                  🔍 Search Jobs
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  ⭐ View Saved Jobs
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  📊 View Analytics
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
