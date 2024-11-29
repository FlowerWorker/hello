import React from "react";
import Image from "next/image";


interface TeamProfileProps {
    imageSrc: string;
    name: string;
    role: string;
}


const TeamProfile = ({imageSrc, name, role} : TeamProfileProps) => {
    return (
      <div className="text-center text-white space-y-4">
        <Image
          src={imageSrc}
          alt={`${name}'s profile`}
          width={200}
          height={200}
          className="w-48 h-48 md:w-56 md:h-56 object-cover mx-auto"
        />
        <div>
          <h3 className="text-xl font-semibold">{name}</h3>
          <p>{role}</p>
        </div>
      </div>
    );
}
  

export default TeamProfile;
