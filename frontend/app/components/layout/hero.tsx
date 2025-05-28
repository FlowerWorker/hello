"use client";

import React, { useState } from "react";
import { CardSection, InfoSection, SectionComponent3, SectionComponent4, SectionComponent5 } from ".";
import SectionComponent from './SectionComponent';
import iconsample from "../../public/management_logo.png";
import iconsample2 from "../../public/search.png";
import placeholderImageSample from '../../public/Screenshot.png';
import placeholderImageSample2 from '../../public/section2demo_image.png';
import { useAuth } from "@/lib/auth-context";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

export const CARDSELECTION_TITLE = "Join Us with the Free Plan"

const subSections1 = [
  {
    title: "Manage Every Project Seamlessly",
    description:
      "We keep your tasks and subtasks structured, set clear timelines, and assign responsibilities. Our visualized progress help you to track progress effortlessly from planning to completion. Customize your milestones or follow our default three-stage progress tracker.",
  },
  {
    title: "Collaborate Effortlessly with Your Team",
    description:
      "Work smarter, not harder. Use our intuitive dashboard to collaborate in real time with specific teams, track updates, and ensure smooth communication for every project milestone.",
  },
  {
    title: "End-to-End Project Control",
    description:
      "From setting goals to final delivery, we provide everything you need to manage projects efficiently. Simplify your process with one click.",
  },
];

const subSections2 = [
  {
    title: "Instant Access to Top Talent",
    description: "Your job listings can be posted directly on Gaddr or LinkedIn. This give you access to our global pool of qualified professionals. You can reach the right candidates quickly with our diverse and extensive talent network.",
  },
  {
    title: "Streamlined Hiring Made Simple",
    description: "You deserve a faster, more efficient way to find the right talent.With Gaddr, optimize job postings, track candidates, and customize ads to attract the best. Simplify your hiring process with our intuitive dashboard, keeping everything organized and chaos-free.",
  },
  {
    title: "Tailored Solutions for Your Growth",
    description: "We provide professionally designed job ads tailored to meet both your immediate needs and long-term growth. Effortlessly customized postings match you with top-tier talent exactly suited to your goals.",
  },
];

const Hero = () => {
  const {token} = useAuth();
  const [hasScrolled, setHasScrolled] = useState(false);
  
  var redirectionPage="";
  if(token){
    redirectionPage="/task-management-dashboard";
  }else{
    redirectionPage="/login";
  }

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;
    if (target.scrollLeft > 0 || target.scrollTop > 0) {
      setHasScrolled(true);
    }
  };

  return (
    <div className="flex flex-col items-center lg:gap-0">
      {/* Section 1 */}
      <div className="w-full h-full bg-bgdarkv8 flex justify-center items-center">
        <div className="max-w-[1440px] w-full px-4 sm:px-8">
          <InfoSection />
        </div>
      </div>

      {/* Section 2 */}
      <div
        className="w-full h-full flex items-center justify-center py-16 sm:py-24"
        style={{ background: "linear-gradient(to top, #80f1e9, #4e7573, #282624 85%)" }}
      >
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 flex flex-col items-center relative">
          {/* Section Title */}
          <h1 className="font-semibold text-[40px] leading-[48px] text-white text-center mb-8">
            {CARDSELECTION_TITLE}
          </h1>

          {/* Scroll Instruction */}
          <div
            className={`text-center text-white text-sm mb-2 ${!hasScrolled ? "animate-pulse" : ""
              } block sm:hidden`}
          >
            Swipe or scroll to view more →
          </div>

          {/* Card Container */}
          <div className="flex flex-col w-full">
            <ScrollArea
              className="w-full"
              onScrollCapture={handleScroll}
            >
              <CardSection />
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </div>
        </div>
      </div>

      {/* Section 3 */}
      {/*<SectionComponent3 />*/}

      {/* Section 4 */}
      {/*<SectionComponent4 />*/}

      {/* Section 5 */}
      {/*<SectionComponent5 />*/}

      {/* Section Components */}
      <div className="w-full">
        <SectionComponent
          icon={iconsample}
          sectionTitle="Boost Your Team’s Productivity"
          sectionSubtitle="Simplify Project Management, Empower Collaboration, Achieve More"
          sectionDescription="With Gaddr’s flexible and intuitive platform, you can effortlessly assign tasks, set timelines, and track milestones all in your collaborative workspace."
          subSections={subSections1}
          buttonText="Start boosting my team today"
          buttonTargetPage={redirectionPage}
          backgroundClassName="bg-bgdarkv7"
          placeholderImage={placeholderImageSample}
          idstring="section1"
        />

        <SectionComponent
          icon={iconsample2}
          sectionTitle="Recruitment made easy "
          sectionSubtitle="Post the Perfect Job Ad and Attract Top Talent"
          sectionDescription="We want you to focus on what's important: growing your company."
          subSections={subSections2}
          buttonText="Elevate Your Team"
          buttonTargetPage={redirectionPage}
          backgroundClassName="bg-bgdarkv8"
          placeholderImage={placeholderImageSample2}
          idstring="section2"
        />
      </div>
    </div>
  );
};

export default Hero;
