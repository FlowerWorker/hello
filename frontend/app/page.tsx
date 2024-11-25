import Image from "next/image";
import { Footer, Hero, Navbar, HeroOverlay, Welcome } from "./components";
import heroimage from "./public/landingpagehero.jpg";
import bigtext from "./public/text_logo_big.png";

export default function Home() {
  return (
    <div className="w-full">
      {/* Header Section */}
      <header className="relative z-30">
        <Navbar className="z-40" />
      </header>

      {/* Hero Image Container */}
      <div className="relative w-full max-h-[1020px]">
        {/* Background Image */}
        <Image
          src={heroimage}
          alt="sample-image"
          width={1920}
          height={1080}
          className="w-full object-cover"
        />

        {/* Content Overlay */}
        <HeroOverlay />
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
