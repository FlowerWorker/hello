import React from 'react';
import Image from 'next/image';
import email from '@/app/public/activeIcon.svg';
import copyIcon from '@/app/public/copyIconWhite.svg';

export const ContactSection = () => {
    return (
        <div className='mb-6'>
            {/* Contact Information Section */}
            <h3 className='text-xl font-bold Montserrat mb-3'>Contact Information</h3>
            <div className='flex items-center gap-4'>
                <Image
                    src={email}
                    alt='Email icon'
                    width={20}
                    height={20}
                />
                <div>
                    <p className='text-base flex items-center gap-2'>E-mail</p>
                    <div className='flex items-center'>
                        <a
                            href='mailto:username@gmail.com'
                            className='text-purple-500 font-semibold open-sans italic hover:underline'
                        >
                            username@gmail.com
                        </a>
                        <Image
                            src={copyIcon}
                            alt='Copy Icon'
                            className='w-5 h-5'
                        />
                    </div>
                </div>
            </div>

            <div className='flex items-center gap-4'>
                <Image
                    src={email}
                    alt='Email icon'
                    width={20}
                    height={20}
                />
                <div>
                    <p className='text-base flex items-center gap-2'>Phone Number</p>
                    <div className='flex items-center'>
                        <a
                            href='tel:01231234532'
                            className='text-purple-500 font-semibold open-sans italic hover:underline'
                        >
                            01231234532
                        </a>
                        <Image
                            src={copyIcon}
                            alt='Copy Icon'
                            className='w-5 h-5'
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}