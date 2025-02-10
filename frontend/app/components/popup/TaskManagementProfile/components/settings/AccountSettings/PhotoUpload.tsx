import React, { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/app/components/popup/TaskManagementProfile/components/common/Button';
import profileImage from '@/app/public/user-icons/profileImage.png';

export const PhotoUpload: React.FC<{ onImageUpload: (file: File | null) => void; currentImage: string }> = ({ onImageUpload, currentImage }) => {
    const [previewImage, setPreviewImage] = useState<string>(currentImage || profileImage.src);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        if (file) {
            setPreviewImage(URL.createObjectURL(file));
            onImageUpload(file);
        }
    };

    const handleRemoveImage = () => {
        setPreviewImage(profileImage.src);
        onImageUpload(null);
    };

    return (
        <div className='flex items-start space-x-5 mb-5 w-full absolute top-16 p-5 z-0'>
            <div>
                <Image
                    className='rounded-full'
                    src={profileImage}
                    alt='profile photo'
                    width={150}
                    height={150}
                />
            </div>
            <div className='flex flex-col items-start h-full w-1/2 absolute' style={{ top: '120px', left: '150px' }}>
                <input
                    id='file-input'
                    type='file'
                    accept='image/*'
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                />
                <Button variant='primary' className='text-xs' onClick={() => document.getElementById('file-input')?.click()}>
                    Upload Photo
                </Button>
                <Button variant='secondary' className='text-xs underline italic' onClick={handleRemoveImage}>
                    Remove Photo
                </Button>
            </div>
        </div>
    );
};