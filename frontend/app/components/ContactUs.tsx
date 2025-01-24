/* eslint-disable react/no-unescaped-entities */
"use client";

import React, { useState } from "react";
import Image from "next/image";
import ReactQuill from 'react-quill';
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
                <p className="text-2xl font-regular font-opensans">
                    We're here to help! Whether you have questions, feedback, or need assistance, our team is ready to support you. Reach out to us anytime, and we’ll ensure you get the answers and solutions you need. Let’s connect and make great things happen together!
                </p>
            </div>

            <div className="max-w-full bg-white text-black rounded-lg m-8">
                <div className="flex flex-row md:flex-col m-8">
                    {/* Logo Section */}
                    <ContactInfoSection />
                    {/* Form Field */}
                    <ContactFormSection />
                </div>
            </div>

            {/* Footer */}
            <footer>
                <Footer />
            </footer>
        </div>
    )
} 

const ContactInfoSection = () => {
    return (
        <div className="flex-[1] flex flex-col justify-center justify-items-center content-center items-center space-y-3 mt-20 mb-40">
            <h1 className="text-3xl font-bold font-montserrat text-[#4A4744]">Contact Information</h1>
            <Image
                src={logo}
                alt="logo"
                width={400}
                height={400}
                // className="w-auto"
            />
            <p className="text-xl font-regular font-opensans">
                Get in touch with us. We're here to assist you.
            </p>

            {/* Social Media Icons */}
            <SocialMediaIcrons />
        </div>
    )
}

const SocialMediaIcrons = () => {
    return (
        <div className="flex justify-center space-x-8 pb-6 sm:mt-0">
            <TiktokIcon />
            <InstagramIcon />
            <LinkedinIcon />
            <FacebookIcon />
            <TwitterIcon />
        </div>
    )
}

const ContactFormSection = () => {
    const [content, setContent] = useState("");

    const handleChange = (value: string) => {
        setContent(value);
    };

    return (
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
                            <input type="text" placeholder="Enter your name..." className="px-4 py-2 bg-white text-black border border-gray-300 rounded-md"/>
                        </div>
                        <div className="flex flex-col">
                            <label className="block mb-2 text-sm text-black">
                                Surname
                            </label>
                            <input type="text" placeholder="Enter your surname..." className="px-4 py-2 bg-white text-black border border-gray-300 rounded-md"/>
                        </div>
                    </div>
                    <div className="mt-6"> 
                        <label className="block mb-2 text-sm text-black">
                            Phonenumber (optional)
                        </label>
                        <input type="tel" placeholder="Enter your phonenumber..." className="px-4 py-2 bg-white text-black border border-gray-300 rounded-md"/>
                    </div>
                    <div className="mt-8">
                        <label className="block mb-2 text-sm text-black">
                            Email
                        </label>
                        <input type="email" placeholder="Enter your mail..." className="px-4 py-2 bg-white text-black border border-gray-300 rounded-md"/>
                    </div>
                    <div className="mt-8">
                        <label className="block mb-2 text-sm text-black">
                            Write us a message
                        </label>
                        <ReactQuill value={content} onChange={handleChange} />
                    </div>
                </div>
            </form>
        </div>
    )
}

const RichTextEdito = () => {
    const [editorState, setEditorState] = useState(() => EditorState.createEmpty());

}
export default ContactUs;