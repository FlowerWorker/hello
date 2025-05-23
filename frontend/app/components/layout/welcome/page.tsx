import React from "react";
import image from "next/image";
import link from "next/link";
import home from "@/app/public/homeIcon.svg";
import leftArrow from "@/app/public/left-arrow.svg";
<Link href="/welcome">
  <div className="flex items-center py-2 px-2 cursor-pointer hover:bg-gray-100 rounded-md transition">
    <Image
      src={home}
      alt="home icon"
      className="w-5 h-5 md:w-6 md:h-6"
      style={{ width: "auto", height: "auto" }}
    />
    <p className="ml-4 text-xl">Home</p>
  </div>
</Link>
