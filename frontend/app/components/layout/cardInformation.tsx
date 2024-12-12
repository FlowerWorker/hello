import React from 'react';
import Image from "next/image";
import InfoCard from '../ui/infoCard';
import sample from "../../public/management_logo.png";
import sample2 from "../../public/outsourcing_icon.png";
import sample3 from "../../public/search.png";

export const HERO_INFO_TITLE1 = "All-in-one project dashboard"
export const HERO_INFO_TITLE2 = "Talent pool access with multi-platform job listing"
export const HERO_INFO_TITLE3 = "End-end AI Assistance & Blockchain Security System"

export const HERO_INFO_BODY_1_1 = "Streamline your workflow with the centralized platform for all your project needs"
export const HERO_INFO_BODY_1_2 = "Effortless task management and team collaboration"
export const HERO_INFO_BODY_1_3 = "Keep your team in sync and projects on track, regardless of size"

export const HERO_INFO_BODY_2_1 = "Post job ADs on your personal or FlowerWork’s LinkedIn"
export const HERO_INFO_BODY_2_2 = "Get access to the unlimited talent pool"
export const HERO_INFO_BODY_2_3 = "Follow the hiring process on your dashboard"

export const HERO_INFO_BODY_3_1 = "Enhance talent matching and interviewing through AI-driven recommendations"
export const HERO_INFO_BODY_3_2 = "Streamline workflows, hiring and project management with AI-powered analytics and automation"
export const HERO_INFO_BODY_3_3 = "Ensure secure payments and data protection with blockchain encryption"

const InfoSection = () => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <InfoCard
          title={HERO_INFO_TITLE1}
          bodyText={[HERO_INFO_BODY_1_1, HERO_INFO_BODY_1_2, HERO_INFO_BODY_1_3]}
          imageSrc={sample}
          isComingSoon = {false}
          linkTarget="#section1"
        />
        <InfoCard
          title={HERO_INFO_TITLE2}
          bodyText={[HERO_INFO_BODY_2_1, HERO_INFO_BODY_2_2, HERO_INFO_BODY_2_3]}
          imageSrc={sample3}
          isComingSoon = {false}
          linkTarget="#section2"
        />
        <InfoCard
          title={HERO_INFO_TITLE3}
          bodyText={[HERO_INFO_BODY_3_1, HERO_INFO_BODY_3_2, HERO_INFO_BODY_3_3]}
          imageSrc={sample2}
          isComingSoon = {true}
          linkTarget="#"
        />
      </div>
    );
  };
  
  export default InfoSection;
