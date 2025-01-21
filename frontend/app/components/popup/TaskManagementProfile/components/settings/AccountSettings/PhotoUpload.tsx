import Image from "next/image";
import { Button } from "../../common/Button";
import profileImage from "@/app/public/user-icons/profileImage.png";

export const PhotoUpload: React.FC = () => (
  <div className="flex items-start space-x-5 mb-5 w-full absolute top-16 p-5 z-0">
    <div>
      <Image
        className="rounded-full"
        src={profileImage}
        alt="profile photo"
        width={150}
        height={150}
      />
    </div>
    <div className="flex flex-col items-start h-full w-1/2 absolute" style={{ top: '120px', left: '150px' }}>
      <Button variant="primary" className="text-xs">
        Upload Photo
      </Button>
      <Button variant="secondary" className="text-xs underline italic">
        Remove Photo
      </Button>
    </div>
  </div>
); 