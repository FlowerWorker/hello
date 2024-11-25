import React from "react";
import { CardSection, InfoSection, SectionComponent3, SectionComponent4, SectionComponent5 } from ".";

export const HERO_TITLE = "Flowerwork in action";

const Hero = () => {
  return (
    <div className="flex flex-col items-center lg:gap-0">
      {/* Section 1 */}
      <div className="w-full h-full bg-bgdarkv3 flex justify-center items-center">
        <div className="max-w-[1440px] max-h-[796px]">
          <h1 className="font-montserrat font-bold text-[18px] leading-[26px] text-white mt-10">{HERO_TITLE}</h1>
          <InfoSection />
        </div>
      </div>

      {/* Section 2 */}
      <div
        className="w-full h-full flex items-center justify-center py-16 sm:py-24"
        style={{ background: "linear-gradient(to top, #80f1e9, #4e7573, #343434 80%)" }}
      >
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 overflow-x-auto">
          {/* Card Container */}
          <div className="flex space-x-4 lg:space-x-7 flex-nowrap lg:flex-wrap">
            <CardSection />
          </div>
        </div>
      </div>


      {/* Section 3 */}
      <SectionComponent3 />

      {/* Section 4 */}
      <SectionComponent4 />

      {/* Section 5 */}
      <SectionComponent5 />
    </div>
  );
};

export default Hero;
