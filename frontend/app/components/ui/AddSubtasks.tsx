"use client";

import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import Image from "next/image";

// Icon imports
import watchersIcon from "@/app/public/watchIcon.svg";
import addAssigneesIcon from "@/app/public/assigneesIcon.svg";
import deadlineIcon from "@/app/public/deadlineIcon.svg";
import descriptionIcon from "@/app/public/paperIcon.svg";
import attachementsIcon from "@/app/public/attachementsIcon.svg";
import attachementsDarkIcon from "@/app/public/attachementsDarkIcon.svg";
import descriptionDarkIcon from "@/app/public/descriptionDarkIcon.svg";

// Define the props type for the component
interface AddSubtasksProps {
    subtaskTitle: string;
    listName: string;
}

export default function AddSubtasks({
    subtaskTitle,
    listName,
}: AddSubtasksProps) {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Add your form submission logic here
        console.log("Form submitted");
    };

    return (
        <div
            className="flex flex-col bg-gray-50 w-full max-w-[545px] min-h-[646px] 
      rounded-[23px] gap-3 shadow-left-heavy px-6 py-6 mb-3 relative"
        >
            <div className="flex justify-around">
                <h1 className="font-bold text-[24px] -mt-2.5">Add Subtasks</h1>
                <CloseIcon className="absolute top-5 right-5 cursor-pointer" />
            </div>

            <hr className="border-[1px]" />

            <div>
                <h1 className="font-bold text-[20px]">Apply actions</h1>
                <p className="mt-2 text-[#181615] font-light">
                    Decide which actions from the main task you want to apply on this
                    subtask
                </p>
            </div>

            <div className="mt-4 ml-4">
                <h1 className="font-bold text-[22px]">{subtaskTitle}</h1>
                <p className="italic font-light">
                    in list <span className="underline">{listName}</span>
                </p>
            </div>

            {/* Form starts here */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-3 mt-5">
                {/* Watchers */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <input type="checkbox" className="form-checkbox cursor-pointer" />
                        <span className="font-semibold">Watchers:</span>
                        <div className="w-5 h-5 rounded-full bg-rose-300 flex items-center justify-center">
                            <span className="font-extrabold text-[8px]">EM</span>
                        </div>
                    </div>
                    <Image
                        src={watchersIcon}
                        alt="watchers icon"
                        width={0}
                        height={0}
                        sizes="100vw"
                        className="w-6 h-6 cursor-pointer"
                    />
                </div>

                <hr className="border-[1px]" />

                {/* Assignees */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <input type="checkbox" className="form-checkbox cursor-pointer" />
                        <span className="font-semibold">Assignees:</span>
                        <div className="flex items-center space-x-[-6px] relative mt-2 sm:mt-0">
                            <div className="w-5 h-5 rounded-full bg-green-400 flex items-center justify-center">
                                <span className="font-bold text-[10px]">BIO</span>
                            </div>
                            <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center">
                                <span className="font-bold text-[10px]">OM</span>
                            </div>
                            <div className="w-5 h-5 rounded-full bg-teal-400 flex items-center justify-center">
                                <span className="font-bold text-[10px]">MP</span>
                            </div>
                        </div>
                    </div>
                    <Image
                        src={addAssigneesIcon}
                        alt="add assignees icon"
                        width={0}
                        height={0}
                        sizes="100vw"
                        className="w-6 h-6 cursor-pointer"
                    />
                </div>

                {/* Deadline */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <input type="checkbox" className="form-checkbox cursor-pointer" />
                        <span className="font-semibold">Deadline:</span>
                        <span className="text-gray-600">16. Jul at 12:30</span>
                    </div>
                    <Image
                        src={deadlineIcon}
                        alt="deadline icon"
                        width={0}
                        height={0}
                        sizes="100vw"
                        className="w-6 h-6 cursor-pointer"
                    />
                </div>

                {/* Priority */}
                <div className="flex items-center gap-2">
                    <input type="checkbox" className="form-checkbox cursor-pointer" />
                    <span className="font-semibold">Priority:</span>
                    <div className="w-5 h-5 bg-green-300 rounded-full flex items-center justify-center">
                        !
                    </div>
                </div>

                {/* Label */}
                <div className="flex items-center gap-2">
                    <input type="checkbox" className="form-checkbox cursor-pointer" />
                    <span className="font-semibold">Label:</span>
                    <span className="px-2 text-sm bg-green-500 rounded">UX/UI</span>
                </div>

                {/* Description */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <input type="checkbox" className="form-checkbox cursor-pointer" />
                        <span className="font-semibold">Description:</span>
                        <Image
                            src={descriptionDarkIcon}
                            alt="description icon"
                            width={0}
                            height={0}
                            sizes="100vw"
                            className="w-5 h-5 cursor-pointer"
                        />
                    </div>
                    <Image
                        src={descriptionIcon}
                        alt="description icon"
                        width={0}
                        height={0}
                        sizes="100vw"
                        className="w-6 h-6 cursor-pointer"
                    />
                </div>

                {/* Attachments */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <input type="checkbox" className="form-checkbox cursor-pointer" />
                        <span className="font-semibold">Attachments:</span>
                        <Image
                            src={attachementsDarkIcon}
                            alt="attachments icon"
                            width={0}
                            height={0}
                            sizes="100vw"
                            className="w-6 h-6 cursor-pointer"
                        />
                    </div>
                    <Image
                        src={attachementsIcon}
                        alt="attachments icon"
                        width={0}
                        height={0}
                        sizes="100vw"
                        className="w-6 h-6 cursor-pointer"
                    />
                </div>

                <hr className="border-[1px]" />

                <button
                    type="submit"
                    className="border-black border-[1px] w-full h-12 rounded-[10px] text-[20px] font-light mt-5 -mb-3 hover:bg-gray-200"
                >
                    Save changes
                </button>
            </form>
        </div>
    );
}