import React, {useState, useEffect, useRef} from 'react';
import {Button} from '@/app/components/popup/TaskManagementProfile/components/common/Button';
import profileImage from '@/app/public/user-icons/profileImage.png';
import {toast} from 'sonner';

interface PhotoUploadProps {
    onImageUpload: (file: File | null) => void;
    currentImage: string;
}

export const PhotoUpload: React.FC<PhotoUploadProps> =
    ({
        currentImage,
        onImageUpload,
    }) => {
    const [previewImage, setPreviewImage] = useState(currentImage);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (!currentImage) {
            setPreviewImage(profileImage.src);
        } else if (currentImage.startsWith('blob:')) {
            setPreviewImage(currentImage);
        } else {
            const signedUrl = `${process.env.NEXT_PUBLIC_API_URL}/public/image?key=${encodeURIComponent(currentImage)}&t=${Date.now()}`;
            setPreviewImage(signedUrl);
        }
    }, [currentImage]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] ?? null;
        if (!file) return;

        const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
        const maxSize = 5 * 1024 * 1024; // 5MB

        if (!allowedTypes.includes(file.type)) {
            toast.error('File must be a valid image (JPEG, PNG, WebP)');
            return;
        }

        if (file.size > maxSize) {
            toast.error('Image must be under 5MB.');
            return;
        }

        setPreviewImage(URL.createObjectURL(file));
        onImageUpload(file);
    };

    const handleRemoveImage = () => {
        setPreviewImage(profileImage.src);
        onImageUpload(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <div className="flex flex-col items-start gap-2 mt-6">
            <img
                className="rounded-full object-cover"
                src={previewImage}
                alt="profile"
                width={100}
                height={100}
            />
            <input
                ref={fileInputRef}
                id="file-input"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
            />
            <div className="flex gap-4 mt-2">
                <Button
                    variant="primary"
                    className="text-sm"
                    onClick={() => fileInputRef.current?.click()}
                >
                    Upload Photo
                </Button>
                <Button
                    variant="secondary"
                    className="text-sm underline italic"
                    onClick={handleRemoveImage}
                >
                    Remove Photo
                </Button>
            </div>
        </div>
    );
};