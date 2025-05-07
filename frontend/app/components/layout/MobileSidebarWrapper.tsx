"use client";

import React from "react";
import Image from "next/image";
import userIcon from "@/app/public/user-icon.png";
import home from "@/app/public/homeIcon.svg";
import agenda from "@/app/public/agendaIcon.svg";
import members from "@/app/public/membersIcon.svg";
import settings from "@/app/public/settingsIcon.svg";
import downArrow from "@/app/public/down-arrow.svg";
import bellIcon from "@/app/public/bell-icon.svg";

export default function MobileSidebar({
  isVisible,
  onClose,
}: {
  isVisible: boolean;
  onClose: () => void;
}) {
  return (
    <>
      {/* Overlay */}
      {isVisible && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 z-50 h-full bg-gradient-to-b from-[#282624] to-[#4c1c56] transition-transform duration-300 ease-in-out ${
          isVisible ? "translate-x-0" : "-translate-x-full"
        } w-[80%] max-w-[320px] text-white font-montserrat`}
      >
        <div className="p-4 flex flex-col h-full">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-xl font-montserrat">Workspaces</h1>
            <button 
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center text-white/80 hover:text-white"
            >
              ✕
            </button>
          </div>

          {/* Workspace Info */}
          <div className="flex items-center gap-3 mb-8">
            <Image
              src={userIcon}
              alt="avatar"
              className="rounded-full w-9 h-9"
              width={36}
              height={36}
            />
            <span className="text-lg font-montserrat">Workspace name</span>
          </div>

          {/* Navigation */}
          <nav className="space-y-6 border-t border-white/10 pt-6">
                    <div className="font-montserrat">
                        <div className="flex items-center py-2 px-2">
                            <Image
                                src={home}
                                alt="home icon"
                                className="w-5 h-5 md:w-6 md:h-6"
                                style={{ width: "auto", height: "auto" }}
                            />
                            <p className="ml-4 text-xl">Home</p>
                        </div>
                        <hr />
                        <div className="flex items-center py-2 px-2">
                            <Image
                                src={agenda}
                                alt="agenda icon"
                                style={{ width: "auto", height: "auto" }}
                            />
                            <p className="ml-4 text-xl">Agenda</p>
                        </div>
                        <hr />
                        <div className="flex items-center justify-between py-2 px-2">
                            <div className="flex items-center">
                                <Image
                                    src={members}
                                    alt="members icon"
                                    style={{ width: "auto", height: "auto" }}
                                />
                                <span className="flex ml-3">
                                    <p className="text-xl">Members </p>
                                </span>
                            </div>
                        </div>
                        <hr />
                        <div className="flex items-center py-2 px-2">
                            <Image
                                src={settings}
                                alt="settings icon"
                                style={{ width: "auto", height: "auto" }}
                            />
                            <p className="ml-4 text-xl">Settings</p>
                        </div>
                    </div>


                    {/* Bottom sidebar container */}
                    <div className="mt-4">
                        <div className="flex justify-between pb-1  px-2">
                            <p className=" text-xl font-montserrat">Projects </p>

                            <div>
                                <Image src={downArrow} alt="down arrow icon" />
                            </div>
                        </div>

                        <hr />
                    </div>
          </nav>

          {/* Footer */}
          <div className="mt-auto pt-6 border-t border-white/10">
            <p className="text-sm text-white/60 text-center">
              © 2024 Gaddr. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
