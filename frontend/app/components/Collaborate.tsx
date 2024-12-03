// "use client";

// import React from 'react';
// import Link from 'next/link';
// import Image from "next/image";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Footer, Navbar } from "../components";

// import TwitterIcon from '../components/icons/TwitterIcon';
// import TiktokIcon from '../components/icons/TiktokIcon';
// import LinkedinIcon from '../components/icons/LinkedinIcon';
// import FacebookIcon from '../components/icons/FacebookIcon';
// import InstagramIcon from '../components/icons/InstagramIcon';

// import logo from '../public/_Logo.png';

// const Collaborate = () => {
//   return (
//     <div className="w-full bg-bgdarkv2 text-white">
//       {/* Header Section */}
//       <header className="relative z-30">
//         <Navbar className="z-40" />
//       </header>

//       {/* Hero Image Container */}


//       <div className="min-h-screen bg-bgdarkv2 text-white flex flex-col items-center py-10">
//         {/* Header */}
//         <header className="text-center max-w-3xl mb-10">
//           <h1 className="font-montserrat text-3xl sm:text-4xl font-bold mb-4">
//             Become part of our team
//           </h1>
//           <p className="font-opensans text-sm sm:text-base leading-7 text-left sm:text-center">
//             Are you ready to take your career to the next level? Join our team and
//             become part of a group of passionate, driven, and innovative individuals
//             dedicated to making a difference. We value creativity, collaboration, and
//             a commitment to excellence in everything we do.
//           </p>
//           <div className="flex flex-col w-full bg-bgdarkv2 gap-y-10 items-center sm:gap-y-20">
//             <span className="mb-4 sm:mb-0">
//               <Image src={logo} alt="sample-image" width={50} height={50} className="" />
//             </span>
//           </div>

//         </header>

//         {/* Team Selection Section */}
//         <section className="w-full max-w-2xl mb-10">
//           <h2 className="text-center font-montserrat text-xl sm:text-2xl font-bold mb-6">
//             Which team would you like to be a part of?
//           </h2>
//           <div className="flex flex-wrap justify-center gap-4">
//             {['HR team', 'Designer', 'Developer', 'Blockchain', 'Marketing', 'Finance'].map((team) => (
//               <Button
//                 key={team}
//                 className="border-2 border-purplev1 text-purplev1 px-4 py-2 rounded-md hover:bg-purplev1 hover:text-white transition"
//               >
//                 {team}
//               </Button>
//             ))}
//           </div>
//         </section>

//         {/* Form Section */}
//         <form className="w-full max-w-2xl grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
//           <Input type="text" placeholder="First name" className="col-span-1" />
//           <Input type="text" placeholder="Last name" className="col-span-1" />
//           <Input type="email" placeholder="Email" className="col-span-1" />
//           <Input type="tel" placeholder="Number (optional)" className="col-span-1" />
//           <Input type="url" placeholder="Portfolio" className="col-span-2" />
//           <div className="col-span-1">
//             <label className="block mb-2 text-sm">Resume</label>
//             <input
//               type="file"
//               accept=".pdf,.doc,.docx"
//               className="block w-full p-2 border border-gray-700 rounded-md bg-bgdarkv2"
//             />
//           </div>
//           <div className="col-span-1">
//             <label className="block mb-2 text-sm">Cover letter</label>
//             <input
//               type="file"
//               accept=".pdf,.doc,.docx"
//               className="block w-full p-2 border border-gray-700 rounded-md bg-bgdarkv2"
//             />
//           </div>
//         </form>

//         {/* Footer Links */}
//         <footer className="text-center">
//           <p className="text-sm mb-4">
//             Know someone who would fit in our team?{' '}
//             <Link href="#" className="text-purplev1 underline">
//               Share this page.
//             </Link>
//           </p>
//           <Button className="bg-purplev1 text-white px-6 py-2 rounded-md">
//             Collaborate with us
//           </Button>
//         </footer>
//       </div>
//       {/* Footer Links Section (Centered) */}
//       <div className="flex flex-col w-full bg-bgdarkv2 gap-y-10 items-center sm:gap-y-20">
//         <div className="flex flex-wrap justify-center w-full text-white text-base font-light gap-x-10 sm:gap-x-20 -mt-4 sm:-mt-20">
//           <Link href="/about-us" className="hover:underline">About FlowerWork</Link>
//           <Link href="#" className="hover:underline">Jobs</Link>
//           <Link href="#" className="hover:underline">Contact us</Link>
//           <Link href="#" className="hover:underline">Help & support</Link>
//           <Link href="#" className="hover:underline">All About Beta</Link>
//         </div>

//         {/* Logo, Legal Links, and Social Icons Section */}
//         <div className="flex flex-col sm:flex-row justify-between w-full items-center text-white max-w-[1000px] -mt-10 gap-y-6 sm:gap-y-0 sm:-mt-14 sm:mb-2">
//           {/* Logo and Legal Links */}
//           <div className="flex flex-col sm:flex-row items-center sm:space-x-8">
//             <span className="mb-4 sm:mb-0">
//               <Image src={logo} alt="sample-image" width={50} height={50} className="" />
//             </span>
//             <div className="flex flex-wrap justify-center sm:justify-start gap-x-6 sm:gap-x-20 text-sm">
//               <Link href="#" className="hover:underline">Terms & Service</Link>
//               <Link href="#" className="hover:underline">Privacy Policy</Link>
//             </div>
//           </div>

//           {/* Social Icons Section */}
//           <div className="flex space-x-6">
//             <span className="[&>svg]:h-6 [&>svg]:w-6 [&>svg]:fill-gray-500 [&>svg]:hover:fill-white transition-colors duration-300">
//               <TiktokIcon />
//             </span>
//             <span className="[&>svg]:h-6 [&>svg]:w-6 [&>svg]:fill-gray-500 [&>svg]:hover:fill-white transition-colors duration-300">
//               <InstagramIcon />
//             </span>
//             <span className="[&>svg]:h-6 [&>svg]:w-6 [&>svg]:fill-gray-500 [&>svg]:hover:fill-white transition-colors duration-300">
//               <LinkedinIcon />
//             </span>
//             <span className="[&>svg]:h-6 [&>svg]:w-6 [&>svg]:fill-gray-500 [&>svg]:hover:fill-white transition-colors duration-300">
//               <FacebookIcon />
//             </span>
//             <span className="[&>svg]:h-6 [&>svg]:w-6 [&>svg]:fill-gray-500 [&>svg]:hover:fill-white transition-colors duration-300">
//               <TwitterIcon />
//             </span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Collaborate;
import React from 'react';
import Link from 'next/link';
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Footer, Navbar } from "../components";

import TwitterIcon from '../components/icons/TwitterIcon';
import TiktokIcon from '../components/icons/TiktokIcon';
import LinkedinIcon from '../components/icons/LinkedinIcon';
import FacebookIcon from '../components/icons/FacebookIcon';
import InstagramIcon from '../components/icons/InstagramIcon';

import logo from '../public/_Logo.png';

const Collaborate = () => {
  return (
    <div className="w-full bg-bgdarkv2 text-white">
  {/* Header Section */}
  <header className="relative z-30">
    <Navbar className="z-40" />
  </header>

  <div className="min-h-screen bg-bgdarkv2 text-white flex flex-col items-center py-10">
    {/* Header */}
    <header className="text-center max-w-3xl mb-10">
      <h1 className="font-montserrat text-3xl sm:text-4xl font-bold mb-4">
        Become part of our team
      </h1>
      <p className="font-opensans text-sm sm:text-base leading-7">
        Are you ready to take your career to the next level? Join our team and
        become part of a group of passionate, driven, and innovative
        individuals dedicated to making a difference. We value creativity,
        collaboration, and a commitment to excellence in everything we do.
      </p>
      <div className="flex justify-center my-6">
        <Image src={logo} alt="Team Logo" width={80} height={80} />
      </div>
    </header>

    {/* Team Selection Section */}
    <section className="w-full max-w-2xl mb-10 text-center">
      <h2 className="font-montserrat text-xl sm:text-2xl font-bold mb-6">
        Which team would you like to be a part of?
      </h2>
      <div className="flex flex-wrap justify-center gap-4">
        {["HR team", "Designer", "Developer", "Blockchain", "Marketing", "Finance"].map((team) => (
          <button
            key={team}
            className="border-2 border-purple-500 text-purple-500 px-6 py-2 rounded-full hover:bg-purple-500 hover:text-white transition"
          >
            {team}
          </button>
        ))}
      </div>
    </section>

    {/* Form Section */}
    <form className="w-full max-w-2xl grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
      <input
        type="text"
        placeholder="First name"
        className="col-span-1 px-4 py-2 bg-white text-black border border-gray-300 rounded-md"
      />
      <input
        type="text"
        placeholder="Last name"
        className="col-span-1 px-4 py-2 bg-white text-black border border-gray-300 rounded-md"
      />
      <input
        type="email"
        placeholder="Email"
        className="col-span-1 px-4 py-2 bg-white text-black border border-gray-300 rounded-md"
      />
      <input
        type="tel"
        placeholder="Number (optional)"
        className="col-span-1 px-4 py-2 bg-white text-black border border-gray-300 rounded-md"
      />
      <input
        type="url"
        placeholder="Portfolio"
        className="col-span-2 px-4 py-2 bg-white text-black border border-gray-300 rounded-md"
      />
      {/* Resume Section */}
      <div className="col-span-1">
        <label className="block mb-2 text-sm text-white">Resume</label>
        <div className="p-4 border border-gray-400 rounded-md bg-white text-black flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-5 h-5 mr-2 text-gray-500"
          >
            <path d="M21.44 11.05L12.4 20.1c-1.69 1.69-4.44 1.69-6.13 0-1.69-1.69-1.69-4.44 0-6.13l8.1-8.1c1.17-1.17 3.07-1.17 4.24 0 1.17 1.17 1.17 3.07 0 4.24l-8.1 8.1a1.5 1.5 0 01-2.12-2.12L15.18 7.3" />
          </svg>
          <span className="text-gray-500 text-sm">Attach a file</span>
        </div>
      </div>
      {/* Cover Letter Section */}
      <div className="col-span-1">
        <label className="block mb-2 text-sm text-white">Cover Letter</label>
        <div className="p-4 border border-gray-400 rounded-md bg-white text-black flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-5 h-5 mr-2 text-gray-500"
          >
            <path d="M21.44 11.05L12.4 20.1c-1.69 1.69-4.44 1.69-6.13 0-1.69-1.69-1.69-4.44 0-6.13l8.1-8.1c1.17-1.17 3.07-1.17 4.24 0 1.17 1.17 1.17 3.07 0 4.24l-8.1 8.1a1.5 1.5 0 01-2.12-2.12L15.18 7.3" />
          </svg>
          <span className="text-gray-500 text-sm">Attach a file</span>
        </div>
      </div>
    </form>

    {/* Submit Button */}
    <div className="text-center">
      <p className="text-sm mb-4">
        Know someone who would fit in our team?{' '}
        <a href="#" className="text-purple-500 underline">
          Share this page.
        </a>
      </p>
      <button className="bg-purple-500 text-white px-6 py-2 rounded-md hover:bg-purple-600 transition">
        Collaborate with us
      </button>
    </div>
  </div>

      {/* Full-width Divider Line */}
      <div className="w-full h-px bg-white my-6 sm:my-8"></div>

      {/* Footer Links Section (Centered) */}
      <div className="flex flex-col w-full bg-bgdarkv2 gap-y-4
items-center sm:gap-y-6">
        <div className="flex flex-wrap justify-center w-full text-white
text-base font-light gap-x-10 sm:gap-x-20">
          <Link href="/about-us" className="hover:underline">About FlowerWork</Link>
          <Link href="#" className="hover:underline">Jobs</Link>
          <Link href="#" className="hover:underline">Contact us</Link>
          <Link href="#" className="hover:underline">Help & support</Link>
          <Link href="#" className="hover:underline">All About Beta</Link>
        </div>

        {/* Logo, Legal Links, and Social Icons Section */}
        <div className="flex flex-col sm:flex-row justify-between w-full
items-center text-white max-w-[1000px] gap-y-4 sm:gap-y-6 sm:mb-2">
          {/* Logo and Legal Links */}
          <div className="flex flex-col sm:flex-row items-center sm:space-x-8">
            <span className="mb-4 sm:mb-0">
              <Image src={logo} alt="sample-image" width={50} height={50}
                className="" />
            </span>
            <div className="flex flex-wrap justify-center sm:justify-start
gap-x-6 sm:gap-x-20 text-sm">
              <Link href="#" className="hover:underline">Terms & Service</Link>
              <Link href="#" className="hover:underline">Privacy Policy</Link>
            </div>
          </div>

          {/* Social Icons Section */}
          <div className="flex space-x-6">
            <span className="[&>svg]:h-6 [&>svg]:w-6 [&>svg]:fill-gray-500
[&>svg]:hover:fill-white transition-colors duration-300">
              <TiktokIcon />
            </span>
            <span className="[&>svg]:h-6 [&>svg]:w-6 [&>svg]:fill-gray-500
[&>svg]:hover:fill-white transition-colors duration-300">
              <InstagramIcon />
            </span>
            <span className="[&>svg]:h-6 [&>svg]:w-6 [&>svg]:fill-gray-500
[&>svg]:hover:fill-white transition-colors duration-300">
              <LinkedinIcon />
            </span>
            <span className="[&>svg]:h-6 [&>svg]:w-6 [&>svg]:fill-gray-500
[&>svg]:hover:fill-white transition-colors duration-300">
              <FacebookIcon />
            </span>
            <span className="[&>svg]:h-6 [&>svg]:w-6 [&>svg]:fill-gray-500
[&>svg]:hover:fill-white transition-colors duration-300">
              <TwitterIcon />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collaborate;