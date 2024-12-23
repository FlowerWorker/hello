import React from "react";
import Image, { StaticImageData } from "next/image";

interface TeamProfileProps {
    imageSrc: StaticImageData | string;
    name: string;
    role: string;
}

const TeamProfile = ({imageSrc, name, role} : TeamProfileProps) => {
  return (
    <div className="text-center text-white space-y-4">
      <Image
        src={imageSrc}
        alt={`${name}'s profile`}
        className="w-48 h-48 md:w-56 md:h-56 sm:w-48 sm:h-48 object-cover mx-auto"
      />
      <div>
        <h3 className="text-xl font-semibold">{name}</h3>
        <p>{role}</p>
      </div>
    </div>
  );
}

export default TeamProfile;