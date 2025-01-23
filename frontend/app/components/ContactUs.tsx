"use client";

import React from "react";
import Image from "next/image";
import { Footer, InfoPageHeader } from "./layout"
import logo from "../public/LOGO_on_white.png";
import TiktokIcon from "./icons/TiktokIcon";
import InstagramIcon from "./icons/InstagramIcon";
import LinkedinIcon from "./icons/LinkedinIcon";
import FacebookIcon from "./icons/FacebookIcon";
import TwitterIcon from "./icons/TwitterIcon";

const ContactUs = () => {
    return (
        <div className="w-full bg-bgdarkv1 text-white text-base ">
            <header>
                <InfoPageHeader title={"Contact Us"}/>
            </header>
            
            <div className="max-w-full m-8">
                <p className="text-2xl font-regular font-opensans">We're here to help! Whether you have questions, feedback, or need assistance, our team is ready to support you. Reach out to us anytime, and we’ll ensure you get the answers and solutions you need. Let’s connect and make great things happen together!</p>
            </div>

            <div className="max-w-full bg-white text-black rounded-lg m-8">
                <div className="flex flex-row md:flex-col m-8">
                    {/* Logo Section */}
                    <div className="flex-[1] flex flex-col justify-center justify-items-center content-center items-center space-y-3 mt-20 mb-40">
                        <h1 className="text-3xl font-bold font-montserrat text-[#4A4744]">Contact Information</h1>
                        <Image
                            src={logo}
                            alt="logo"
                            width={400}
                            height={400}
                            // className="w-auto"
                        />
                        <p className="text-xl font-regular font-opensans">Get in touch with us. We're here to assist you.</p>

                        {/* Social Media Icons */}
                        <div className="flex justify-center space-x-8 pb-6 sm:mt-0">
                            <span><TiktokIcon /></span>
                            <InstagramIcon />
                            <LinkedinIcon />
                            <FacebookIcon />
                            <TwitterIcon />
                        </div>
                    </div>

                    {/* Form Field */}
                    <div className="flex-[1] flex flex-col justify-center justify-items-center content-center items-center space-y-3">
                        <p className="text-lg font-regular font-opensans">Don't hesitate to reach out! We're happy to answer any questions you have, no matter how big or small.</p>
                        <form className="w-full max-w-6xl mx-auto grid-inline grid-cols-1 sm:grid-cols-2 gap-4 px-4 sm:px-6 mb-10">
                            {/* Form Inputs */}
                            <div className="col-span-2">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="flex flex-col">
                                        <label className="block mb-2 text-sm text-black">
                                            Name
                                        </label>
                                        <input type="text" placeholder="Name" className="px-4 py-2 bg-white text-black border border-gray-300 rounded-md"/>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer>
                <Footer />
            </footer>
        </div>
    )
} 

export default ContactUs;