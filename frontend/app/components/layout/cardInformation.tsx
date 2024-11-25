import React from 'react';
import Image from "next/image";
import InfoCard from '../ui/infoCard';
import sample from "../../public/management_logo.png";
import sample2 from "../../public/outsourcing_icon.png";
import sample3 from "../../public/search.png";

export const HERO_INFO_TITLE1 = "Create a Project, Manage Tasks, and Boost Team Productivity"
export const HERO_INFO_TITLE2 = "Post Projects or Outsource Tasks with Ease"
export const HERO_INFO_TITLE3 = "Post the Perfect Job Ad and Attract Top Talent"

export const HERO_INFO_BODY_1_1 = "Centralised platform for all your project needs."
export const HERO_INFO_BODY_1_2 = "Effortless task management and team collaboration."
export const HERO_INFO_BODY_1_3 = "Keep your team aligned and projects moving forward, no matter the size."

export const HERO_INFO_BODY_2_1 = "Tap into a vast pool of freelancers or interns."
export const HERO_INFO_BODY_2_2 = "Save time and resources by directly outsourcing tasks."
export const HERO_INFO_BODY_2_3 = "Get high-quality results while focusing on your core objectives. "

export const HERO_INFO_BODY_3_1 = "Reach a global talent pool with FlowerWork’s intuitive job posting system."
export const HERO_INFO_BODY_3_2 = "Tailor your job ads for maximum visibility and response."
export const HERO_INFO_BODY_3_3 = "Simplify your hiring process while ensuring top-notch applicants."

const InfoSection = () => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <InfoCard
          title={HERO_INFO_TITLE1}
          bodyText={[HERO_INFO_BODY_1_1, HERO_INFO_BODY_1_2, HERO_INFO_BODY_1_3]}
          imageSrc={sample}
        />
        <InfoCard
          title={HERO_INFO_TITLE2}
          bodyText={[HERO_INFO_BODY_2_1, HERO_INFO_BODY_2_2, HERO_INFO_BODY_2_3]}
          imageSrc={sample2}
        />
        <InfoCard
          title={HERO_INFO_TITLE3}
          bodyText={[HERO_INFO_BODY_3_1, HERO_INFO_BODY_3_2, HERO_INFO_BODY_3_3]}
          imageSrc={sample3}
        />
      </div>
    );
  };
  
  export default InfoSection;
