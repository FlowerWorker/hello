import Image from "next/image";
import { Footer, Hero, Navbar, HeroOverlay, Welcome } from "./components";
import heroimage from "./public/temp_herotextandimage.png";
import logo from "./public/LOGO.png"
import mobileBackground from "./public/landingpagehero.jpg";

export default function Home() {
  return (
    <div className="w-full">
      {/* Header Section */}
      <header className="relative">
        <Navbar className="" />
      </header>

      {/* Hero Image Container */}
      <div className="relative w-full max-h-screen">
        {/* Large and Medium Screen Content */}
        <div className="hidden md:block">
          <Image
            src={heroimage}
            alt="sample-image"
            className="w-full h-auto object-cover"
          />
        </div>

        {/* Mobile Screen Content */}
        <div
          className="md:hidden bg-cover bg-center relative w-full h-auto flex flex-col items-center justify-start px-4 py-8 space-y-6"
          style={{
            backgroundImage: `url('${mobileBackground.src}')`, // Background Image
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50 z-0"></div>
          {/* Logo */}
          <Image
            src={logo}
            alt="logo"
            width={200}
            height={200}
            className="w-auto z-10"
          />
          {/* First Text */}
          <p className="text-purplev1 text-center  font-bold z-10">
            Hire workforce effortlessly and streamline workflows
          </p>

          {/* Additional Text */}
          <div className="text-white text-center z-10">
            <p className="font-semibold text-lg">All in One Innovative Platform</p>
            <p className="text-sm mt-2">
              <span className="font-bold text-purplev1">FlowerWork </span>
              allows you to define workflows, connect with skilled talents, collaborate seamlessly, assign tasks efficiently, and track progress securely.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="bg-neutral-400">
        <Welcome />
        <Hero />
      </main>

      {/* Footer */}
      <footer>
        <Footer />
      </footer>
    </div>
  );
}
