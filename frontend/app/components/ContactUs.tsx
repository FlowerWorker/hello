'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import { Navbar, Footer, InfoPageHeader } from './layout'
import { Button } from '@/components/ui/button';
import logo from '../public/LOGO_on White.svg';
import TiktokIcon from '../public/Tiktok_on White.svg';
import InstagramIcon from '../public/Instagram_on White.svg';
import LinkedinIcon from '../public/LinkedIn_on White.svg';
import FacebookIcon from '../public/Facebook_on White.svg';
import TwitterIcon from '../public/X_on White.svg';
import EmailIcon from '../public/Mail full_on White.svg';
import VectorIcon from '../public/Vector_on White.svg';

const ContactUs = () => {
    return (
        <div className='w-full bg-bgdarkv1 text-white text-base '>
            {/* Header Section */}
            <header className='relative z-30'>
                <Navbar className='z-40' />
            </header>

            <main className='flex flex-col w-full max-w-[1920px] mx-auto h-auto md:px-[12%] py-[80px] gap-[64px]'>
                <div className='container mx-auto'>
                    <InfoPageHeader title={'Contact Us'}/>
                </div>
                <div className='max-w-full m-8'>
                    <p className='text-2xl font-regular font-opensans'>
                        We are here to help! Whether you have questions, feedback, or need assistance, our team is ready to support you. Reach out to us anytime, and we’ll ensure you get the answers and solutions you need. Let’s connect and make great things happen together!
                    </p>
                </div>

                <div className='max-w-full bg-white text-black rounded-lg'>
                    <div className='flex flex-row md:flex-row sm:flex-col'>
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
        <div className='flex-[1] flex flex-col items-start space-y-3 pt-40 pb-40 p-8 md:px-20 sm:px-10 bg-white md:bg-gradient'>
            <h1 className='text-3xl font-bold font-montserrat text-[#4A4744]'>Contact Information</h1>
            <Image
                src={logo}
                alt='logo'
            />
            <p className='text-xl font-regular font-opensans'>
                Get in touch with us. We are here to assist you.
            </p>
        
            {/* Social Media Icons */}
            <SocialMediaIcons />

            <div className='flex flex-row'>
                <Image src={EmailIcon} alt={'Email Icon'} />
                <p className='px-2'>Info@flowerworker.com</p>
            </div>

            <div className='flex flex-row'>
                <Image src={VectorIcon} alt={'Vector Icon'} />
                <p className='px-2'>Gothemburg & Stockholm</p>
            </div>
        </div>
    )
}

const SocialMediaIcons = () => {
    return (
        <div className='flex flex-row justify-start space-x-8 pb-6 sm:mt-0'>           
            <Image src={TiktokIcon} alt='Tiktok Icon'/>
            <Image src={InstagramIcon} alt='Instagram Icon'/>
            <Image src={LinkedinIcon} alt='Linkedin Icon'/>
            <Image src={FacebookIcon} alt='Facebook Icon'/>
            <Image src={TwitterIcon} alt='Twitter Icon'/>
        </div>
    )
}

const ContactFormSection = () => {
    return (
        <div className='flex-[1] flex flex-col space-y-3 p-8 sm:px-10 md:bg-white sm:bg-gradient'>
            <p className='text-lg font-regular font-opensans'>Do not hesitate to reach out! We are happy to answer any questions you have, no matter how big or small.</p>
            <form className='w-full max-w-6xl mx-auto grid-inline gap-4 mb-10'>
                {/* Form Inputs */}
                <div className='grid grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-4'>
                    <div className='flex flex-col'>
                        <label className='block mb-2 text-xl text-black font-semibold font-opensans'>
                            Name
                        </label>
                        <input type='text' placeholder='Enter your name...' className='px-4 py-2 bg-white text-black border border-[#4A4744] rounded-md'/>
                    </div>
                    <div className='flex flex-col'>
                        <label className='block mb-2 text-xl text-black font-semibold font-opensans'>
                            Surname
                        </label>
                        <input type='text' placeholder='Enter your surname...' className='px-4 py-2 bg-white text-black border border-[#4A4744] rounded-md'/>
                    </div>
                </div>
                <div className='grid grid-cols-1 gap-4'>
                    <div className='mt-6 flex flex-col'> 
                        <label className='block mb-2 text-xl text-black font-semibold font-opensans'>
                            Phonenumber (optional)
                        </label>
                        <input type='tel' placeholder='Enter your phonenumber...' className='px-4 py-2 bg-white text-black border border-[#4A4744] rounded-md'/>
                    </div>
                    <div className='mt-8 flex flex-col'>
                        <label className='block mb-2 text-xl text-black font-semibold font-opensans'>
                            Email
                        </label>
                        <input type='email' placeholder='Enter your mail...' className='px-4 py-2 bg-white text-black border border-[#4A4744] rounded-md'/>
                    </div>
                    <div className='mt-8'>
                        <label className='block mb-2 text-xl text-black font-semibold font-opensans'>
                            Write us a message
                        </label>
                        <RichTextEditor />
                    </div>
                </div>
            </form>
            <div className='flex justify-end'>
                <Button type='submit' className='bg-purplev1 text-xl text-white font-regular font-opensans px-6 py-3 rounded-md shadow-md hover:shadow-lg hover:bg-purplev2'>
                    Send
                </Button>
            </div>
        </div>
    )
}

const ReactQuill = dynamic(() => import('react-quill'), { ssr:false });

const RichTextEditor = () => {
    const [content, setContent] = useState('');

    const modules = {
        toolbar: [
            [{ size: [] }],
            ['bold', 'italic', 'strike'],
            ['blockquote'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['link', 'image'],
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
        'size',
        'bold',
        'italic',
        'strike',
        'blockquote',
        'list',
        'bullet',
        'link',
        'image',
    ];

    const handleEditorChange = (newContent: React.SetStateAction<string>) => {
        setContent(newContent);
    };
    
    return (
        <div className='flex flex-col items-center'>
            <ReactQuill
                value={content}
                onChange={handleEditorChange}
                modules={modules}
                formats={formats}
                className='w-full rounded-md'
            />
        </div>
    );
}

export default ContactUs;