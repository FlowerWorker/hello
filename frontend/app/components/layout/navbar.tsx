import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import logo from "../../public/LOGO.png";
import { Share2 } from "lucide-react";
import user from "../../public/user.png";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface NavbarProps extends React.HTMLAttributes<HTMLDivElement> { }
const Navbar: React.FC<NavbarProps> = ({ className, ...props }) => {
  return (
    <div
      className={cn(
        "w-full bg-navbardark flex items-center justify-between px-6 h-16",
        className
      )}
      {...props}
    >
      {/* Logo and Text */}
      <Link href="#" className="flex items-center space-x-2">
        <span className="text-white text-lg font-semibold">
          <Image src={logo} alt="logo" className="inline-block" />
        </span>
      </Link>

      {/* Navigation Menu */}
      <NavigationMenu>
        <NavigationMenuList className="flex items-center gap-4">
          {/* Share Link */}
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <a href="#" className="text-white flex items-center gap-2">
                <Share2 className="h-5 w-5" />
              </a>
            </NavigationMenuLink>
          </NavigationMenuItem>

          {/* Signp Up Button */}
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link
                href="/sign-up"
                className="flex items-center gap-2 text-white"
              >
                Sign up
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

          {/* Login Button */}
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link href="login">
                <Button className="bg-purplev1 text-black px-2 py-1 md:px-4 md:py-2 rounded-lg flex items-center justify-center min-w-[30px] min-h-[30px] md:min-w-[40px] md:min-h-[40px] hover:bg-purplev2">
                  <Image
                    src={user}
                    alt="usericon"
                    className="h-4 w-4 md:h-5 md:w-5 object-contain"
                  />
                </Button>
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default Navbar;
