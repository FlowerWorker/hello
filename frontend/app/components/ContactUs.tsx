/* eslint-disable react/no-unescaped-entities */
"use client";

import React, { useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { Navbar, Footer, InfoPageHeader } from "./layout"
import { Button } from "@/components/ui/button";
import logo from "../public/LOGO_on White.svg";
import TiktokIcon from "../public/Tiktok_on White.svg";
import InstagramIcon from "../public/Instagram_on White.svg";
import LinkedinIcon from "../public/LinkedIn_on White.svg";
import FacebookIcon from "../public/Facebook_on White.svg";
import TwitterIcon from "../public/X_on White.svg";
import EmailIcon from "../public/Mail full_on White.svg";
import VectorIcon from "../public/Vector_on White.svg";

const ContactUs = () => {
    return (
        <div className="w-full bg-bgdarkv1 text-white text-base ">
            {/* Header Section */}
            <header className="relative z-30">
                <Navbar className="z-40" />
            </header>

            <main className="flex flex-col w-full max-w-[1920px] mx-auto h-auto px-[2%] md:px-[12%] py-[80px] gap-[64px]">
                <div className="container mx-auto">
                    <InfoPageHeader title={"Contact Us"}/>
                </div>
                <div className="max-w-full m-8">
                    <p className="text-2xl font-regular font-opensans">
                        We're here to help! Whether you have questions, feedback, or need assistance, our team is ready to support you. Reach out to us anytime, and we’ll ensure you get the answers and solutions you need. Let’s connect and make great things happen together!
                    </p>
                </div>

                <div className="max-w-full bg-white text-black rounded-lg m-8">
                    <div className="flex flex-row md:flex-row sm:flex-col m-8">
                        {/* Logo Section */}
                        <ContactInfoSection />
                        {/* Form Field */}
                        <ContactFormSection />
                    </div>
                </div>
            </main>
            
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
            <SocialMediaIcons />

            <div className="flex flex-col">
                <div className="flex flex-row">
                    <Image src={EmailIcon} alt={"Email Icon"} />
                    
                </div>
                <div className="flex flex-row">
                    <Image src={VectorIcon} alt={"Vector Icon"}/>
                    <p>Gothemburg & Stockholm</p>
                </div>
            </div>
        </div>
    )
}

const SocialMediaIcons = () => {
    return (
        <div className="flex justify-center space-x-8 pb-6 sm:mt-0">           
            <Image src={TiktokIcon} alt="Tiktok Icon"/>
            <Image src={InstagramIcon} alt="Instagram Icon"/>
            <Image src={LinkedinIcon} alt="Linkedin Icon"/>
            <Image src={FacebookIcon} alt="Facebook Icon"/>
            <Image src={TwitterIcon} alt="Twitter Icon"/>
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
            <form className="w-full max-w-6xl mx-auto grid-inline gap-4 px-4 sm:px-6 mb-10">
                {/* Form Inputs */}
                <div className="grid grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-4">
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
                <div className="grid grid-cols-1 gap-4">
                    <div className="mt-6 flex flex-col"> 
                        <label className="block mb-2 text-sm text-black">
                            Phonenumber (optional)
                        </label>
                        <input type="tel" placeholder="Enter your phonenumber..." className="px-4 py-2 bg-white text-black border border-gray-300 rounded-md"/>
                    </div>
                    <div className="mt-8 flex flex-col">
                        <label className="block mb-2 text-sm text-black">
                            Email
                        </label>
                        <input type="email" placeholder="Enter your mail..." className="px-4 py-2 bg-white text-black border border-gray-300 rounded-md"/>
                    </div>
                    <div className="mt-8">
                        <label className="block mb-2 text-sm text-black">
                            Write us a message
                        </label>
                        <ReactQuill theme="snow"/>
                    </div>
                    <Button type="submit" className="bg-purplev1 text-white font-medium w-full sm:w-auto px-6 py-3 rounded-md shadow-md hover:shadow-lg hover:bg-purplev2">
                        Save
                    </Button>
                </div>
                
            </form>
        </div>
    )
}

const ReactQuill = dynamic(() => import("react-quill"), { srr: false });

const RichTextEditor = () => {
    const [content, setContent] = useState("");

    const modules = {
        toolbar: [
            [{ header: '1' }, { header: '2' }, { font: [] }],
            [{ size: [] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [
            { list: 'ordered' },
            { list: 'bullet' },
            { indent: '-1' },
            { indent: '+1' },
            ],
            ['link', 'image', 'video'],
            ['clean'],
        ],
        clipboard: {
            // toggle to add extra line breaks when pasting HTML:
            matchVisual: false,
        },
    }

    /*
    * Quill editor formats
    * See https://quilljs.com/docs/formats/
    */
    const formats = [
        'header',
        'font',
        'size',
        'bold',
        'italic',
        'underline',
        'strike',
        'blockquote',
        'list',
        'bullet',
        'indent',
        'link',
        'image',
        'video',
    ];

    const handleEditorChange = (newContent) => {
        setContent(newContent);
    };
    
    return (
        <div className="h-screen w-screen flex items-center flex-col">
            <div className="m-10  flex flex-col items-center">
                <span className="text-2xl text-center">
                    Quill Rich Text Editor
                </span> 
                <div className='text-center'>Author : Soubhagyajit Borah</div>
                <div className='text-center'>visit <a href="https://www.sjbtechcenter.online/" target='_blank' className="text-blue-500">www.sjbtechcenter.online</a> for more information</div>
                </div>
                <div className="h-full w-[90vw]">
                <ReactQuill
                    value={content}
                    onChange={handleEditorChange}
                    modules={modules}
                    formats={formats}
                    className="w-full h-[70%] mt-10 bg-white"
                />
            </div>
        </div>
    );
}

export default ContactUs;