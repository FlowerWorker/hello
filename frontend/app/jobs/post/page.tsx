"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Footer, Navbar } from "../../components";
import { useAuth } from "@/lib/auth-context";
import Link from "next/link";

export default function PostJob() {
  const { token } = useAuth();
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    type: "full-time",
    salary: "",
    description: "",
    requirements: "",
    benefits: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Job posting data:", formData);
    alert("Job posted successfully!");
  };

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
                Please log in to post a job.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Link href="/jobs/login">
                <Button className="w-full">Login</Button>
              </Link>
              <Link href="/jobs/sign-up">
                <Button variant="outline" className="w-full">Sign Up</Button>
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

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Post a New Job</h1>
          <p className="text-gray-600">Create a job posting to find the perfect candidate</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Job Details</CardTitle>
            <CardDescription>
              Fill in the details below to create your job posting
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                    Job Title *
                  </label>
                  <Input
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="e.g., Senior Software Engineer"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                    Company Name *
                  </label>
                  <Input
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    placeholder="e.g., TechCorp Inc."
                    required
                  />
                </div>

                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                    Location *
                  </label>
                  <Input
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="e.g., San Francisco, CA or Remote"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-2">
                    Job Type *
                  </label>
                  <select
                    id="type"
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="full-time">Full-time</option>
                    <option value="part-time">Part-time</option>
                    <option value="contract">Contract</option>
                    <option value="internship">Internship</option>
                    <option value="freelance">Freelance</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="salary" className="block text-sm font-medium text-gray-700 mb-2">
                    Salary Range
                  </label>
                  <Input
                    id="salary"
                    name="salary"
                    value={formData.salary}
                    onChange={handleInputChange}
                    placeholder="e.g., $80,000 - $120,000"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                  Job Description *
                </label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Describe the role, responsibilities, and what makes this position exciting..."
                  rows={6}
                  required
                />
              </div>

              <div>
                <label htmlFor="requirements" className="block text-sm font-medium text-gray-700 mb-2">
                  Requirements & Qualifications
                </label>
                <Textarea
                  id="requirements"
                  name="requirements"
                  value={formData.requirements}
                  onChange={handleInputChange}
                  placeholder="List the required skills, experience, and qualifications..."
                  rows={4}
                />
              </div>

              <div>
                <label htmlFor="benefits" className="block text-sm font-medium text-gray-700 mb-2">
                  Benefits & Perks
                </label>
                <Textarea
                  id="benefits"
                  name="benefits"
                  value={formData.benefits}
                  onChange={handleInputChange}
                  placeholder="Describe the benefits, perks, and what makes your company great to work for..."
                  rows={4}
                />
              </div>

              <div className="flex gap-4 pt-6">
                <Button type="submit" className="flex-1">
                  📝 Post Job
                </Button>
                <Link href="/jobs/dashboard">
                  <Button type="button" variant="outline" className="flex-1">
                    Cancel
                  </Button>
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
} 