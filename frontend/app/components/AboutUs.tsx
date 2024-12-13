"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { Footer, Navbar } from "./layout";
import { Button } from "@/components/ui/button";
import TeamProfile from "./TeamProfile";

import background from "../public/aboutpage_text.png";
import heroimage from "../public/aboutpagehero.png";
import logo from "../public/LOGO.png";
import offer from "../public/offer.jpeg"
import mission from "../public/mission.png"
import flowerwork from "../public/flowerwork.webp"
import adam from "../public/adam.png"
import carmen from "../public/carmen.png"
import francisco from "../public/francisco.png"
import gabriela from "../public/gabriela.png"
import hrigved from "../public/hrigved.png"
import iryna from "../public/iryna.png"
import kevin from "../public/kevin.png"
import rona from "../public/rona.jpg"
import rukaiya from "../public/rukaiya.png"
import stefan from "../public/stefan.png"

export const TEAM_MEMBERS = [
  {
    name: "Francisco Padilla",
    role: "CEO",
    imageSrc: francisco,
  },
  {
    name: "Rukaiya Mansoor",
    role: "Project Manager",
    imageSrc: rukaiya,
  },
  {
    name: "Carmen Schäfer",
    role: "UX/UI Designer",
    imageSrc: carmen,
  },
  {
    name: "Hrigved Nair",
    role: "Marketing and Growth",
    imageSrc: hrigved,
  },
  {
    name: "Stefan Andrei",
    role: "Full stack Developer",
    imageSrc: stefan,
  },
]

export const ALL_TEAM_MEMBERS = [
  {
    name: "Francisco Padilla",
    role: "CEO",
    imageSrc: francisco,
  },
  {
    name: "Rukaiya Mansoor",
    role: "Project Manager",
    imageSrc: rukaiya,
  },
  {
    name: "Carmen Schäfer",
    role: "UX/UI Designer",
    imageSrc: carmen,
  },
  {
    name: "Hrigved Nair",
    role: "Marketing and Growth",
    imageSrc: hrigved,
  },
  {
    name: "Stefan Andrei",
    role: "Full stack Developer",
    imageSrc: stefan,
  },
  {
    name: "Adam Louhichi",
    role: "UX/UI Designer",
    imageSrc: adam,
  },
  {
    name: "Gabriela Beran",
    role: "HR & Recruitment",
    imageSrc: gabriela,
  },
  {
    name: "Kevin Kongpachith",
    role: "UX/UI Designer",
    imageSrc: kevin,
  },
  {
    name: "Iryna Voitsikhovska",
    role: "UX/UI Designer",
    imageSrc: iryna,
  },
  {
    name: "Rona Zong",
    role: "Fullstack Developer",
    imageSrc: rona,
  },
]

const AboutUs = () => {
  const [showAll, setShowAll] = useState(false);
  const toggleShowAll = () => { setShowAll(!showAll) };

  return (
    <div className="w-full bg-bgdarkv1 text-white text-base">
      {/* Header Section */}
      <header className="relative z-30">
        <Navbar className="z-40" />
      </header>

      {/* Hero Image Container */}
      <div className="w-full relative overflow-hidden max-h-screen">
        {/* LG and MD Screen */}
        <div className="hidden md:block">
          {/* Background Image */}
          <Image
            src={background}
            alt="sample-image"
            className="w-full h-auto object-cover"
          />
        </div>

        {/* Mobile Screen */}
        <div className="block md:hidden bg-cover bg-center relative w-full h-auto">
          {/* Background Image */}
          <Image
            src={heroimage}
            alt="sample-image"
            className="w-full h-auto object-cover"
          />
          {/* Content Overlay */}
          <div className="flex flex-col items-start absolute inset-0 bg-black bg-opacity-50 z-0 gap-4 mx-10 px-4 py-4 space-y-4">
            <Image
              src={logo}
              alt="logo"
              width={200}
              height={200}
              className="w-auto"
            />
            <div className="font-bold">
              <p>Is the all-in-one platform to streamline workflows, connect with top talents, foster seamless collaboration, assign tasks effortlessly, and securely track progress.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex flex-col items-center max-w-[1440px] mx-auto px-6 h-auto space-y-8">
        {/* Offer Section */}
        <section className="flex flex-col lg:flex-row items-center justify-center gap-6 mx-8 py-6">
          <div className="flex-1">
            <h1 className="font-bold text-3xl md:text-4xl lg:text-5xl leading-relaxed">
              What <span className="text-purplev1">We Offer Now</span>
            </h1>
            <hr className="border-t-4 md:border-t-6 mt-4 mb-6"></hr>
            <div className="flex flex-col space-y-6">
              <div className="flex flex-row pb-2 gap-4">
                <p className="flex-[1] font-bold text-lg md:text-xl lg:text-2xl">Efficient Project Management</p>
                <p className="flex-[2] font-semibold text-base md:text-lg lg:text-xl">Organize tasks, timelines, and resources - all in one place with FlowerWork’s intuitive dashboard, keeping deadlines and progress on track.</p>
              </div>
              <div className="flex flex-row pb-2 gap-4">
                <p className="flex-[1] font-bold text-lg md:text-xl lg:text-2xl">Flexible Talent and Scalability</p>
                <p className="flex-[2] font-semibold text-base md:text-lg lg:text-xl">Access verified professionals and scale projects seamlessly, whether for solo ventures or multi-team workflows.</p>
              </div>
              <div className="flex flex-row pb-2 gap-4">
                <p className="flex-[1] font-bold text-lg md:text-xl lg:text-2xl">Collaborative Workflows</p>
                <p className="flex-[2] font-semibold text-base md:text-lg lg:text-xl">Streamline communication with real-time updates, file sharing, and feedback tools to stay aligned and productive.</p>
              </div>
              <div className="flex flex-row pb-2 gap-4">
                <p className="flex-[1] font-bold text-lg md:text-xl lg:text-2xl">Secure Data and Goal Tracking</p>
                <p className="flex-[2] font-semibold text-base md:text-lg lg:text-xl">Protect your data while tracking project actions with clear documentation and customizable tools to achieve your goals.</p>
              </div>
            </div>
          </div>
          {/* Background Image */}
          <div className="mx-auto">
            <Image
              src={offer}
              alt="sample-image"
              className="w-[417px] h-[391px] object-cover"
            />
          </div>
        </section>

        {/* Mission Section */}
        <section className="flex flex-col lg:flex-row items-center justify-center gap-6 mx-8 py-6">
          {/* Background Image */}
          <div className="mx-auto">
            <Image
              src={mission}
              alt="sample-image"
              className="w-[432px] h-[391px] object-cover"
            />
          </div>
          <div className="flex-1">
            <h1 className="font-bold text-3xl md:text-4xl lg:text-5xl leading-relaxed">
              Our <span className="text-purplev1 font-bold">Mission</span>
            </h1>
            <hr className="border-t-4 md:border-t-6 mt-4 mb-6"></hr>
            <div className="flex flex-col space-y-6">
              <div className="flex flex-row pb-2 gap-4">
                <p className="flex-[1] font-bold text-lg md:text-xl lg:text-2xl">Empowering Teams and Individuals</p>
                <p className="flex-[2] font-semibold text-base md:text-lg lg:text-xl">Drive efficient project management and seamless collaboration, enabling teams and individuals to focus on what truly matters and achieve exceptional results.</p>
              </div>
              <div className="flex flex-row pb-2 gap-4">
                <p className="flex-[1] font-bold text-lg md:text-xl lg:text-2xl">Bridging Talent and Opportunity</p>
                <p className="flex-[2] font-semibold text-base md:text-lg lg:text-xl">Bridge the gap between talent and opportunity by curating professional talent pools tailored to meet unique needs and exceed expectations.</p>
              </div>
              <div className="flex flex-row pb-2 gap-4">
                <p className="flex-[1] font-bold text-lg md:text-xl lg:text-2xl">Scaling Success with Flexibility</p>
                <p className="flex-[2] font-semibold text-base md:text-lg lg:text-xl">Deliver adaptable solutions that evolve with you—scaling effortlessly from small tasks to complex workflows, empowering teams of any size to succeed.</p>
              </div>
              <div className="flex flex-row pb-2 gap-4">
                <p className="flex-[1] font-bold text-lg md:text-xl lg:text-2xl">Increase productivity efficiently</p>
                <p className="flex-[2] font-semibold text-base md:text-lg lg:text-xl">Equipped with advanced features to streamline workflows, optimizing resource with seasoned experts, and tailored solutions, businesses drive efficiency and boost productivity.</p>
              </div>
            </div>
          </div>

        </section>

        {/* Flowerwork Section */}
        <section className="flex flex-col lg:flex-row items-center justify-center gap-6 mx-8 py-6">
          <div className="flex-1">
            <h1 className="font-bold text-3xl md:text-4xl lg:text-5xl leading-relaxed">
              Upcoming Features on <span className="text-purplev1 font-bold">FlowerWork</span>
            </h1>
            <hr className="border-t-4 md:border-t-6 mt-4 mb-6"></hr>
            <div className="flex flex-col space-y-6">
              <div className="flex flex-row pb-2 gap-4">
                <p className="flex-[1] font-bold text-lg md:text-xl lg:text-2xl">AI-Driven Task Management</p>
                <p className="flex-[2] font-semibold text-base md:text-lg lg:text-xl">Elevate your entire project management with our AI tools, automating task creation, priority setting, precise forecasting, real time updates, etc.</p>
              </div>
              <div className="flex flex-row pb-2 gap-4">
                <p className="flex-[1] font-bold text-lg md:text-xl lg:text-2xl">Blockchain-Powered Talent Verification</p>
                <p className="flex-[2] font-semibold text-base md:text-lg lg:text-xl">Build trust and transparency with blockchain-secured profiles and verified credentials for talent connections you can rely on.</p>
              </div>
              <div className="flex flex-row pb-2 gap-4">
                <p className="flex-[1] font-bold text-lg md:text-xl lg:text-2xl">Automated Talent Matching</p>
                <p className="flex-[2] font-semibold text-base md:text-lg lg:text-xl">Let AI intelligently match your projects with the best-fit professionals based on skills, availability, and performance history, while automating your interview process.</p>
              </div>
              <div className="flex flex-row pb-2 gap-4">
                <p className="flex-[1] font-bold text-lg md:text-xl lg:text-2xl">Smart Contract Onboarding</p>
                <p className="flex-[2] font-semibold text-base md:text-lg lg:text-xl">Simplify onboarding and collaboration with blockchain-powered smart contracts for secure and efficient agreements.</p>
              </div>
            </div>
          </div>
          {/* Background Image */}
          <div className="mx-auto">
            <Image
              src={flowerwork}
              alt="sample-image"
              className="w-[434px] h-[434px] object-cover"
            />
          </div>
        </section>
      </main>

      {/* Team Container */}
      <div className="flex flex-col items-center">
        <h1 className="font-montserrat text-2xl sm:text-[32px] font-bold text-white mb-4 sm:mb-6 sm:mt-16">
          Our Success Team
        </h1>
        {/* Pictures */}
        <div className="relative w-full flex flex-wrap justify-center gap-8">
          {/* Background Image */}
          {!showAll && TEAM_MEMBERS.map((member, index) => (
            <TeamProfile
              key={index}
              name={member.name}
              role={member.role}
              imageSrc={member.imageSrc}
            />
          ))}
          {showAll && ALL_TEAM_MEMBERS.map((member, index) => (
            <TeamProfile
              key={index}
              name={member.name}
              role={member.role}
              imageSrc={member.imageSrc} />
          ))}
        </div>
        <Button onClick={toggleShowAll} className="bg-purplev1 hover:bg-purple-700 text-white px-4 py-2 mt-2 rounded">
          {showAll ? "Show Less" : "Show All"}
        </Button>
      </div>

      {/* Join Us Container */}
      <div suppressHydrationWarning={true} className="pb-10 flex flex-col items-center">
        <h1 className="font-montserrat text-2xl sm:text-[32px] font-bold text-white mb-4 sm:mb-6 sm:mt-16">
          You can be one os us too!
        </h1>
        <Button className="bg-purplev1 hover:bg-purplev-700 text-white font-bold px-6 py-3">
          <Link href="/collaborate">
            Collaborate with us
          </Link>

        </Button>
      </div>

      {/* Footer */}
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default AboutUs;