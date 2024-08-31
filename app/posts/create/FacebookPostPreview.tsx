import React from "react";
import { CircleUser } from "lucide-react";
import { FormikState, useFormikContext } from "formik";
import { SchedulePostForm } from "@/types/types";
import Image from "next/image";
import { FileUpload } from "@/components/ui/file-upload";

type Props = {};

const handleFileUpload = (e: any) => {};

const FacebookPostPreview = () => {
    const { values }: FormikState<SchedulePostForm> = useFormikContext();
    return (
        <div className="flex flex-col gap-2 bg-white">
            <div className="divider h-1 before:h-[1px] after:h-[1px] m-1"></div>
            <div className="flex justify-between">
                <div className="flex justify-center items-center gap-1">
                    <div className="flex gap-2 justify-center items-center">
                        {values.facebook[0]?.profilePicture ? (
                            <Image
                                src={values.facebook[0].profilePicture}
                                height={40}
                                width={40}
                                alt="Profile image"
                                className="rounded-full cursor-pointer"
                            />
                        ) : (
                            <CircleUser />
                        )}
                        <p className="font-bold text-sm cursor-pointer">
                            {values.facebook[0]?.name || "Select an account"}
                        </p>
                    </div>
                    <p className="text-xs text-slate-500">•</p>
                    <p className="text-slate-500 font-light text-sm">11m</p>
                </div>
                <p className="flex items-center justify-center">
                    <svg
                        aria-label="More options"
                        className="x1lliihq x1n2onr6 x5n08af"
                        fill="currentColor"
                        height="24"
                        role="img"
                        viewBox="0 0 24 24"
                        width="24"
                    >
                        <title>More options</title>
                        <circle cx="12" cy="12" r="1.5"></circle>
                        <circle cx="6" cy="12" r="1.5"></circle>
                        <circle cx="18" cy="12" r="1.5"></circle>
                    </svg>
                </p>
            </div>
            <div className="overflow-hidden flex justify-center items-center">
                {values.image.fileUrl ? (
                    <Image
                        src={values.image.fileUrl}
                        height={400}
                        width={300}
                        alt="Post image"
                        className="rounded-[3px]"
                    />
                ) : (
                    <div>
                        <FileUpload onChange={handleFileUpload} />
                    </div>
                )}
            </div>
            <div className="flex justify-between">
                <div className="flex gap-2">
                    <div>
                        <svg
                            aria-label="Unlike"
                            className="x1lliihq x1n2onr6 xxk16z8"
                            fill="red"
                            height="24"
                            role="img"
                            viewBox="0 0 48 48"
                            width="24"
                        >
                            <title>Unlike</title>
                            <path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path>
                        </svg>
                    </div>
                    <div>
                        <svg
                            aria-label="Comment"
                            className="x1lliihq x1n2onr6 x5n08af"
                            fill="currentColor"
                            height="24"
                            role="img"
                            viewBox="0 0 24 24"
                            width="24"
                        >
                            <title>Comment</title>
                            <path
                                d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z"
                                fill="none"
                                stroke="currentColor"
                                stroke-linejoin="round"
                                stroke-width="2"
                            ></path>
                        </svg>
                    </div>
                    <div>
                        <svg
                            aria-label="Share"
                            className="x1lliihq x1n2onr6 xyb1xck"
                            fill="currentColor"
                            height="24"
                            role="img"
                            viewBox="0 0 24 24"
                            width="24"
                        >
                            <title>Share</title>
                            <line
                                fill="none"
                                stroke="currentColor"
                                stroke-linejoin="round"
                                stroke-width="2"
                                x1="22"
                                x2="9.218"
                                y1="3"
                                y2="10.083"
                            ></line>
                            <polygon
                                fill="none"
                                points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334"
                                stroke="currentColor"
                                stroke-linejoin="round"
                                stroke-width="2"
                            ></polygon>
                        </svg>
                    </div>
                </div>
                <div>
                    <svg
                        aria-label="Save"
                        className="x1lliihq x1n2onr6 x5n08af"
                        fill="currentColor"
                        height="24"
                        role="img"
                        viewBox="0 0 24 24"
                        width="24"
                    >
                        <title>Save</title>
                        <polygon
                            fill="none"
                            points="20 21 12 13.44 4 21 4 3 20 3 20 21"
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                        ></polygon>
                    </svg>
                </div>
            </div>
            <p className="font-bold text-sm">213 likes</p>
            <div className="flex h-12 gap-2 ">
                <p className="text-sm font-bold line-clamp-2 text-ellipsis">
                    <span className="mr-1">{values.facebook[0]?.name || "Select an account"}</span>
                    <span className="font-normal">{values.content || "Write a content..."}</span>
                </p>
                <p className="text-sm font-normal"></p>
            </div>
            <div className="flex flex-col gap-[2px]">
                <div className="flex justify-between">
                    <div className="flex gap-2">
                        <p className="font-bold text-sm">TammySmith34</p>
                        <p className="text-sm font-normal">Nice!</p>
                    </div>
                    <svg
                        aria-label="Like"
                        className="x1lliihq x1n2onr6 x1roi4f4"
                        fill="currentColor"
                        height="13"
                        role="img"
                        viewBox="0 0 24 24"
                        width="13"
                    >
                        <title>Like</title>
                        <path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z"></path>
                    </svg>
                </div>
                <div className="flex justify-between">
                    <div className="flex gap-2">
                        <p className="font-bold text-sm">FrederickPlantino</p>
                        <p className="text-sm font-normal">Can't wait!</p>
                    </div>
                    <svg
                        aria-label="Unlike"
                        className="x1lliihq x1n2onr6 xxk16z8"
                        fill="red"
                        height="13"
                        role="img"
                        viewBox="0 0 48 48"
                        width="13"
                    >
                        <title>Unlike</title>
                        <path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path>
                    </svg>
                </div>
            </div>
            <div className="flex justify-between">
                <p className="text-sm font-light text-slate-600">Add a comment...</p>
                <p>
                    <svg
                        aria-label="Emoji"
                        className="x1lliihq x1n2onr6 x1roi4f4"
                        fill="currentColor"
                        height="13"
                        role="img"
                        viewBox="0 0 24 24"
                        width="13"
                    >
                        <title>Emoji</title>
                        <path d="M15.83 10.997a1.167 1.167 0 1 0 1.167 1.167 1.167 1.167 0 0 0-1.167-1.167Zm-6.5 1.167a1.167 1.167 0 1 0-1.166 1.167 1.167 1.167 0 0 0 1.166-1.167Zm5.163 3.24a3.406 3.406 0 0 1-4.982.007 1 1 0 1 0-1.557 1.256 5.397 5.397 0 0 0 8.09 0 1 1 0 0 0-1.55-1.263ZM12 .503a11.5 11.5 0 1 0 11.5 11.5A11.513 11.513 0 0 0 12 .503Zm0 21a9.5 9.5 0 1 1 9.5-9.5 9.51 9.51 0 0 1-9.5 9.5Z"></path>
                    </svg>
                </p>
            </div>
            <div className="divider h-1 before:h-[1px] after:h-[1px] m-1"></div>
        </div>
    );
};

export default FacebookPostPreview;
