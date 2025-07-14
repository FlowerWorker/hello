"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Footer, Navbar } from "../components";
import { useAuth } from "@/lib/auth-context";

// Import existing images
import searchIcon from "../public/search.png";
import managementIcon from "../public/management_logo.png";
import gaddrLogo from "../public/gaddr.png";
import heroImage from "../public/landingpageheronew.png";

const JobsLandingPage = () => {
  const { token } = useAuth();
  const [isVisible, setIsVisible] = useState(false);
  const [currentStat, setCurrentStat] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleGetStarted = () => {
    if (token) {
      window.location.href = "/jobs/dashboard";
    } else {
      window.location.href = "/jobs/sign-up";
    }
  };

  const handlePostJob = () => {
    if (token) {
      window.location.href = "/jobs/post";
    } else {
      window.location.href = "/jobs/login";
    }
  };

  const features = [
    {
      icon: searchIcon,
      title: "AI-Powered Matching",
      description:
        "Our advanced AI algorithm connects you with the perfect opportunities based on your skills, experience, and career goals.",
      gradient: "from-blue-500 to-purple-600",
    },
    {
      icon: managementIcon,
      title: "Global Opportunities",
      description:
        "Access job opportunities from top companies worldwide. Work remotely or relocate to exciting new locations.",
      gradient: "from-green-500 to-teal-600",
    },
    {
      icon: gaddrLogo,
      title: "Smart Collaboration",
      description:
        "Seamlessly collaborate with hiring teams, track applications, and manage your career journey in one place.",
      gradient: "from-orange-500 to-red-600",
    },
    {
      icon: searchIcon,
      title: "Real-time Analytics",
      description:
        "Get insights into your application performance, market trends, and salary comparisons to make informed decisions.",
      gradient: "from-purple-500 to-pink-600",
    },
  ];

  const stats = [
    { number: "50K+", label: "Active Jobs", icon: "💼" },
    { number: "100K+", label: "Talented Professionals", icon: "👥" },
    { number: "98%", label: "Success Rate", icon: "🎯" },
    { number: "24/7", label: "Support Available", icon: "🛟" },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Software Engineer",
      company: "TechCorp",
      content:
        "Found my dream job within 2 weeks! The AI matching is incredible.",
      avatar: "👩‍💻",
    },
    {
      name: "Michael Chen",
      role: "Product Manager",
      company: "InnovateLab",
      content:
        "The platform made my job search so much easier. Highly recommended!",
      avatar: "👨‍💼",
    },
    {
      name: "Emily Rodriguez",
      role: "UX Designer",
      company: "CreativeStudio",
      content: "Amazing opportunities and great support team. Love it!",
      avatar: "👩‍🎨",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Header */}
      <header className="relative z-50 bg-white/80 backdrop-blur-md border-b border-gray-200/50 sticky top-0">
        <Navbar />
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-turquoiseLight via-purplev1 to-purplev2">
          <div className="absolute inset-0 bg-white/5 opacity-30"></div>
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute top-40 right-20 w-32 h-32 bg-purplev1/20 rounded-full blur-2xl animate-bounce"></div>
          <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-turquoiseLight/30 rounded-full blur-lg animate-ping"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div
              className={`space-y-8 transition-all duration-1000 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
            >
              <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full border border-white/30 text-white text-sm font-medium">
                🚀 Join 100,000+ professionals
              </div>

              <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight">
                Your Dream Job
                <span className="block bg-gradient-to-r from-gold via-yellow-400 to-orange-400 bg-clip-text text-transparent">
                  Awaits Here
                </span>
              </h1>

              <p className="text-xl lg:text-2xl text-white/90 max-w-lg leading-relaxed">
                Discover opportunities that match your skills, passion, and
                career goals. Join thousands who've found their perfect role.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={handleGetStarted}
                  size="lg"
                  className="bg-white text-darkblue hover:bg-gray-100 font-semibold px-8 py-4 text-lg shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300"
                >
                  🚀 Get Started Free
                </Button>
                <Button
                  onClick={handlePostJob}
                  variant="outline"
                  size="lg"
                  className="border-2 border-white/50 text-whit font-semibold px-8 py-4 text-lg backdrop-blur-sm hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                >
                  💼 Post a Job
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="flex items-center gap-6 pt-8">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-10 h-10 bg-white/20 rounded-full border-2 border-white/30 flex items-center justify-center text-white font-bold"
                    >
                      {i}
                    </div>
                  ))}
                </div>
                <div className="text-white/80">
                  <div className="font-semibold">
                    Trusted by 10,000+ companies
                  </div>
                  <div className="text-sm">Join the community today</div>
                </div>
              </div>
            </div>

            {/* Interactive Search Card */}
            <div
              className={`transition-all duration-1000 delay-300 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
            >
              <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">
                <div className="text-center mb-8">
                  <h3 className="text-3xl font-bold text-white mb-2">
                    Find Your Perfect Match
                  </h3>
                  <p className="text-white/70">
                    Search thousands of opportunities
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="relative">
                    <Input
                      placeholder="Job title, keywords, or company"
                      className="bg-white/90 border-0 text-darkblue placeholder:text-gray-600 h-14 text-lg rounded-xl shadow-lg"
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      🔍
                    </div>
                  </div>

                  <div className="relative">
                    <Input
                      placeholder="Location or remote"
                      className="bg-white/90 border-0 text-darkblue placeholder:text-gray-600 h-14 text-lg rounded-xl shadow-lg"
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      📍
                    </div>
                  </div>

                  <Button className="w-full bg-gradient-to-r from-gold to-orange-400 text-darkblue hover:from-orange-400 hover:to-gold font-bold h-14 text-lg rounded-xl shadow-xl transform hover:scale-105 transition-all duration-300">
                    🔥 Search Jobs
                  </Button>
                </div>

                {/* Quick Stats */}
                <div className="mt-8 pt-6 border-t border-white/20">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-white">50K+</div>
                      <div className="text-white/60 text-sm">Jobs</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-white">100K+</div>
                      <div className="text-white/60 text-sm">Professionals</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-white">98%</div>
                      <div className="text-white/60 text-sm">Success Rate</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Animated Stats Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Trusted by Professionals Worldwide
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Join thousands of professionals who have transformed their careers
              with our platform
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className={`text-center p-8 rounded-2xl bg-white shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-500 ${
                  currentStat === index ? "ring-4 ring-turquoiseLight/30" : ""
                }`}
              >
                <div className="text-4xl mb-4">{stat.icon}</div>
                <div className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-turquoiseLight to-purplev1 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Why Choose Our Platform?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We provide cutting-edge tools and features to accelerate your
              career growth
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="group bg-white border-0 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-500 overflow-hidden"
              >
                <CardHeader className="text-center pb-4">
                  <div
                    className={`w-20 h-20 mx-auto mb-6 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300`}
                  >
                    <Image
                      src={feature.icon}
                      alt={feature.title}
                      width={40}
                      height={40}
                      className="opacity-90"
                    />
                  </div>
                  <CardTitle className="text-xl text-gray-900">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 text-center leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-r from-purplev1 to-purplev2 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              What Our Users Say
            </h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Real stories from professionals who found their dream jobs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="bg-white/10 backdrop-blur-sm border-white/20 shadow-xl"
              >
                <CardContent className="p-8">
                  <div className="text-center">
                    <div className="text-4xl mb-4">{testimonial.avatar}</div>
                    <p className="text-white/90 text-lg mb-6 italic">
                      "{testimonial.content}"
                    </p>
                    <div>
                      <div className="font-semibold text-white">
                        {testimonial.name}
                      </div>
                      <div className="text-white/70">{testimonial.role}</div>
                      <div className="text-white/60 text-sm">
                        {testimonial.company}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 via-purple-900 to-purplev2 relative overflow-hidden">
        <div className="absolute inset-0 bg-white/5 opacity-30"></div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl lg:text-6xl font-bold text-white mb-6">
            Ready to Transform Your Career?
          </h2>
          <p className="text-xl lg:text-2xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
            Join thousands of professionals who have found their dream jobs and
            accelerated their careers with our platform.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
            <Button
              onClick={handleGetStarted}
              size="lg"
              className="bg-gradient-to-r from-gold to-orange-400 text-darkblue hover:from-orange-400 hover:to-gold font-bold px-10 py-4 text-xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300"
            >
              🚀 Start Your Journey
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-white/50 text-white font-bold px-10 py-4 text-xl backdrop-blur-sm hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              📚 Learn More
            </Button>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center gap-8 items-center">
            <div className="flex items-center gap-2 text-white/70">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                ✓
              </div>
              <span>Free to Join</span>
            </div>
            <div className="flex items-center gap-2 text-white/70">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                🔒
              </div>
              <span>Secure & Private</span>
            </div>
            <div className="flex items-center gap-2 text-white/70">
              <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                ⚡
              </div>
              <span>Instant Access</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default JobsLandingPage;
