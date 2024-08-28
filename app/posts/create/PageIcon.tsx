"use client";

import React from "react";
import Image from "next/image";
import { Check } from "lucide-react";
import { Plus } from "lucide-react";

type Props = {
    social: string;
    page: any;
    checked: boolean;
    setChecked: React.Dispatch<React.SetStateAction<boolean>>;
};

const PageIcon = (props: Props) => {
    const { social, page, checked, setChecked } = props;
    return (
        <div className="flex flex-col justify-center items-center">
            <div className="tooltip" data-tip={page.name}>
                <button
                    className="flex flex-col justify-center items-center aspect-square h-auto btn btn-ghost rounded-full p-0"
                    type="button"
                    onClick={() => setChecked(page)}
                >
                    <div className="relative w-12 h-12 flex justify-center items-center">
                        <div className="flex flex-col justify-center items-center">
                            <Image
                                src={`/${social}_icon.png`}
                                width={16}
                                height={16}
                                alt={`${social} icon`}
                                className="absolute top-0 left-0"
                            />

                            {checked ? (
                                <Check
                                    className="absolute bottom-0 right-0 rounded-full text-white bg-green-600 p-[1px]"
                                    size={20}
                                />
                            ) : (
                                <Plus
                                    className="absolute bottom-0 right-0 rounded-full bg-white p-[1px]"
                                    size={20}
                                />
                            )}

                            <Image
                                src={page.profilePicture}
                                width={40}
                                height={40}
                                alt="Profile Image"
                                className="rounded-full"
                            />
                        </div>
                    </div>
                </button>
            </div>
        </div>
    );
};

export default PageIcon;
