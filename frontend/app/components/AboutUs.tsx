import React from "react";
import Image from "next/image";

import { Footer, Hero, Navbar, HeroOverlay, Welcome } from "../components";
import { Button } from "@/components/ui/button";

import heroimage from "../public/aboutpagehero.png";
import bigtext from "./public/text_logo_big.png";
import logo from '../../public/_Logo.png';

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
          <section className="p-8 text-center max-w-6xl">
            <h1 className="text-white text-lg md:text-2xl leading-relaxed">
              <span className="text-purple-400 font-bold">FlowerWork</span> is an innovative platform that gives you full control of your projects, enabling effortless collaboration and easy access to the talent you need — all in one place.
            </h1>
          </section>

          {/* Mission Section */}
          <section className="p-8 flex flex-row items-center">
            <div>
              <h2 className="text-3xl font-semibold">Our <span className="text-purple-400 font-bold">Mission</span></h2>
              <div className="flex flex-col">
                <ul>
                  <li>Empower Teams and Individuals</li>
                  <li>Connect Talent with Opportunity</li>
                  <li>Enhance Flexibility and Scalability</li>
                </ul>
                <ul>
                  <li>Enable Efficient project management and collaboration, helping users focus on what matters and achieve their goals.</li>
                  <li>Connect teams with skilled professionals for quick and effective project outsourcing.</li>
                  <li>Offer adaptable tools that scale from single projects to complex workflows, supporting teams of all sizes.</li>
                </ul>
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
              <h2 className="text-3xl font-semibold">What <span className="text-purple-400 font-bold">We Offer</span></h2>
              <ul>
                <li>Efficient Project Management</li>
                <li>Flexible Talent and Scalability</li>
                <li>Seamless Collaboration</li>
                <li>Secure Data and Goal Tracking</li>
              </ul>
              <ul>
                <li>Organize tasks, timelines, and resources in one place. Track deadlines and progress effirtlessly with FlowerWork's intuitive dashboard.</li>
                <li>Quickly connect with verified professionals for outsourcing and scake your projects effortlessly, from solo ventures to multitea workflows.</li>
                <li>Enhance team communication with real-time updates, file sharing, and feedback tools, keeping everyone aligned and contributing effectively.</li>
                <li>Ensure data security and track all project actions with clear documentation. Set and reach your goals with customizable, user-friendly tools.</li>
              </ul>
            </div>
            
          </section>

          <section className="p-8 flex flex-row items-center">
            <div>
              <h2 className="text-3xl font-semibold">Coming soon to <span className="text-purple-400 font-bold">FlowerWork</span></h2>
              <ul>
                <li>AI-Driven Task Management</li>
                <li>Blockchain-Powered Talent Verification</li>
                <li>Automated Talent Matching</li>
                <li>Smart Contract Onboarding</li>
              </ul>
              <ul>
                <li>Experience enhanced project planning with AI tools for task optimization, priority setting, and accurate forecasting.</li>
                <li>Ensure trust and transparency with blockchain-based profiles and credentials for verified talent connections.</li>
                <li>Leverage AI to intelligently match projects with the best-fit professionals based on skills, availability, and past performance.</li>
                <li>Use blockchain smart contracts for streamlined onboarding and clear collaboration agreements.</li>
              </ul>
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
          <Button type="submit" className="bg-purplev1 text-white font-bold">
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
          <Footer />
        </footer>
      </div>

        /* <div className="flex flex-col min-h-screen">
          <header className="bg-purplev1 text-white text-center py-6">
            <h1 className="text-3xl font-bold">About Us</h1>
          </header>
          <main className="flex-grow p-6 bg-gray-100">
            <section className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold mb-4">Who We Are</h2>
              <p className="text-lg leading-relaxed mb-6">
                FlowerWork is a team of passionate individuals dedicated to bringing innovative solutions to the floral industry. 
                We believe in the power of technology to enhance creativity and provide unique experiences for our customers.
              </p>
              <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
              <p className="text-lg leading-relaxed mb-6">
                Our mission is to revolutionize the way people experience flowers, combining tradition with modern technology. 
                We aim to create meaningful connections through beautiful designs and seamless digital experiences.
              </p>
              <h2 className="text-2xl font-bold mb-4">Our Team</h2>
              <p className="text-lg leading-relaxed">
                Our team is a diverse group of designers, developers, and visionaries working together to make FlowerWork a 
                platform for everyone who loves flowers.
              </p>
            </section>
          </main>
        </div> */
    );
  };
  
  export default AboutUs;