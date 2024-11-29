import React from "react";
import Image from "next/image";

import { Footer, Hero, Navbar, HeroOverlay, Welcome } from "../components";
import { Button } from "@/components/ui/button";

import heroimage from "../public/aboutpagehero.png";
import bigtext from "./public/text_logo_big.png";
import logo from '../../public/_Logo.png';

export const MISSION1_TITLE = "Empower Teams and Individuals";
export const MISSION1_DESCRIPTION = "Enable Efficient project management and collaboration, helping users focus on what matters and achieve their goals.";
export const MISSION2_TITLE = "Connect Talent with Opportunity";
export const MISSION2_DESCRIPTION = "Connect teams with skilled professionals for quick and effective project outsourcing.";
export const MISSION3_TITLE = "Enhance Flexibility and Scalability";
export const MISSION3_DESCRIPTION = "Offer adaptable tools that scale from single projects to complex workflows, supporting teams of all sizes.";

export const OFFER1_TITLE = "Efficient Project Management";
export const OFFER1_DESCRIPTION = "Organize tasks, timelines, and resources in one place. Track deadlines and progress effirtlessly with FlowerWork's intuitive dashboard.";
export const OFFER2_TITLE = "Flexible Talent and Scalability";
export const OFFER2_DESCRIPTION = "Quickly connect with verified professionals for outsourcing and scake your projects effortlessly, from solo ventures to multitea workflows.";
export const OFFER3_TITLE = "Seamless Collaboration";
export const OFFER3_DESCRIPTION = "Enhance team communication with real-time updates, file sharing, and feedback tools, keeping everyone aligned and contributing effectively.";
export const OFFER4_TITLE = "Secure Data and Goal Tracking";
export const OFFER4_DESCRIPTION = "Ensure data security and track all project actions with clear documentation. Set and reach your goals with customizable, user-friendly tools."

export const FLOWERWORK1_TITLE = "AI-Driven Task Management";
export const FLOWERWORK1_DESCRIPTION = "Experience enhanced project planning with AI tools for task optimization, priority setting, and accurate forecasting.";
export const FLOWERWORK2_TITLE = "Blockchain-Powered Talent Verification";
export const FLOWERWORK2_DESCRIPTION = "Ensure trust and transparency with blockchain-based profiles and credentials for verified talent connections.";
export const FLOWERWORK3_TITLE = "Automated Talent Matching";
export const FLOWERWORK3_DESCRIPTION = "Leverage AI to intelligently match projects with the best-fit professionals based on skills, availability, and past performance.";
export const FLOWERWORK4_TITLE = "Smart Contract Onboarding";
export const FLOWERWORK4_DESCRIPTION = "Use blockchain smart contracts for streamlined onboarding and clear collaboration agreements.";

export const JOIN_TEXT = "Become a part of our team";
export const JOIN_BUTTON_TEXT = "Collaborate with us";
export const TEAM_TEXT = "Our Success Team";

const AboutUs = () => {
    return (
      <div className="w-full bg-bgdarkv2 text-white">
        {/* Header Section */}
        <header className="relative z-30">
          <Navbar className="z-40" />
        </header>

        {/* Hero Image Container */}
        <div className="relative w-full">
          {/* Background Image */}
          <Image
            src={heroimage}
            alt="sample-image"
            height={360}
            className="w-full object-cover"
          />
        </div>

        {/* Main Content */}
        <main className="w-full flex flex-col items-center">
          <section className="p-8 text-center max-w-4xl">
            <h1 className="text-white text-lg md:text-2xl leading-relaxed">
              <span className="text-purple-400 font-bold">FlowerWork</span> is an innovative platform that gives you full control of your projects, enabling effortless collaboration and easy access to the talent you need — all in one place.
            </h1>
          </section>

          {/* Mission Section */}
          <section className="p-8 flex flex-row items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">
                Our <span className="text-purple-400 font-bold">Mission</span>
              </h2>
              <hr className="mb-4"></hr>
              {/* <div className="flex flex-row pb-4">
                <ul>
                  <li className="pb-2">{MISSION1_TITLE}</li>
                  <li className="pb-2">{MISSION2_TITLE}</li>
                  <li className="pb-2">{MISSION3_TITLE}</li>
                </ul>
                <ul>
                  <li className="pb-2">{MISSION1_DESCRIPTION}</li>
                  <li className="pb-2">{MISSION2_DESCRIPTION}</li>
                  <li className="pb-2">{MISSION3_DESCRIPTION}</li>
                </ul>
              </div> */}
              <div className="flex flex-row pb-2">
                <p>{MISSION1_TITLE}</p>
                <p>{MISSION1_DESCRIPTION}</p>
              </div>
              <div className="flex flex-row pb-2">
                <p>{MISSION2_TITLE}</p>
                <p>{MISSION2_DESCRIPTION}</p>
              </div>
              <div className="flex flex-row pb-2">
                <p>{MISSION3_TITLE}</p>
                <p>{MISSION3_DESCRIPTION}</p>
              </div>
            </div>
            <div className="relative w-full">
              {/* Background Image */}
              <Image
                src={heroimage}
                alt="sample-image"
                height={360}
                className="w-full object-cover"
              />
            </div>
          </section>

          <section className="p-8 flex flex-row items-center">
            <div className="relative w-full">
              {/* Background Image */}
              <Image
                src={heroimage}
                alt="sample-image"
                height={360}
                className="w-full object-cover"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-4">
                What <span className="text-purple-400 font-bold">We Offer</span>
              </h2>
              <hr className="mb-4"></hr>
              <div className="flex flex-row pb-2">
                <p className="leading-relaxed">{OFFER1_TITLE}</p>
                <p>{OFFER1_DESCRIPTION}</p>
              </div>
              <div className="flex flex-row pb-2">
                <p>{OFFER2_TITLE}</p>
                <p>{OFFER2_DESCRIPTION}</p>
              </div>
              <div className="flex flex-row pb-2">
                <p>{OFFER3_TITLE}</p>
                <p>{OFFER3_DESCRIPTION}</p>
              </div>
              <div className="flex flex-row pb-2">
                <p>{OFFER4_TITLE}</p>
                <p>{OFFER4_DESCRIPTION}</p>
              </div>
            </div>
            
          </section>

          <section className="p-8 flex flex-row items-center">
            <div>
              <h2 className="text-3xl font-semibold">Coming soon to <span className="text-purple-400 font-bold">FlowerWork</span></h2>
              <hr className="mb-4"></hr>
              <div className="flex flex-row pb-2">
                <p>{FLOWERWORK1_TITLE}</p>
                <p>{FLOWERWORK1_DESCRIPTION}</p>
              </div>
              <div className="flex flex-row pb-2">
                <p>{FLOWERWORK2_TITLE}</p>
                <p>{FLOWERWORK2_DESCRIPTION}</p>
              </div>
              <div className="flex flex-row pb-2">
                <p>{FLOWERWORK3_TITLE}</p>
                <p>{FLOWERWORK3_DESCRIPTION}</p>
              </div>
              <div className="flex flex-row pb-2">
                <p>{FLOWERWORK4_TITLE}</p>
                <p>{FLOWERWORK4_DESCRIPTION}</p>
              </div>
            </div>
            <div className="relative w-full">
              {/* Background Image */}
              <Image
                src={heroimage}
                alt="sample-image"
                height={360}
                className="w-full object-cover"
              />
            </div>
          </section>
        </main>

        {/* Join Us Container */}
        <div className="pb-10 flex flex-col items-center">
          <h1 className="font-montserrat text-2xl sm:text-[32px] font-bold text-white mb-4 sm:mb-6 sm:mt-16">
            {JOIN_TEXT}
          </h1>          
          <Button type="submit" className="bg-purplev1 hover:bg-purple-500 text-white font-bold px-6 py-3">
            {JOIN_BUTTON_TEXT}
          </Button>
        </div>

        {/* Team Container */}
        <div className="flex flex-col items-center">
          <h1 className="font-montserrat text-2xl sm:text-[32px] font-bold text-white mb-4 sm:mb-6 sm:mt-16">
            {TEAM_TEXT}
          </h1>
          {/* Pictures */}
          <div className="relative w-full flex flex-row">
            {/* Background Image */}
            <Image
              src={heroimage}
              alt="sample-image"
              width={800}
              height={360}
              className="object-cover"
            />
            <Image
              src={heroimage}
              alt="sample-image"
              width={800}
              height={360}
              className="object-cover"
            />
            <Image
              src={heroimage}
              alt="sample-image"
              width={800}
              height={360}
              className="object-cover"
            />
          </div>


        </div>

        {/* Footer */}
        <footer>
          <Footer/>
        </footer>
      </div>
    );
  };
  
  export default AboutUs;