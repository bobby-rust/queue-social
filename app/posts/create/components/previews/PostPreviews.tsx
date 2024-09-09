"use client";

import React, { useEffect, useState } from "react";
import { useFormikContext } from "formik";
import InstagramPostPreview from "./socials/InstagramPostPreview";
import FacebookPostPreview from "./socials/FacebookPostPreview";
import type { ISchedulePostForm } from "@/types/types";
import XPostPreview from "./socials/XPostPreview";
import { determineSelectedSocialPreview } from "../../utils";

const PostPreviews = () => {
    const { values } = useFormikContext<ISchedulePostForm>();

    const [selected, setSelected] = useState<string | null>(null);

    useEffect(() => {
        const socialPages = {
            facebook: values.facebook,
            instagram: values.instagram,
            x: values.x,
        };
        determineSelectedSocialPreview(socialPages, setSelected);
    }, [values]);

    return (
        <div className="w-1/2 p-5">
            <div className="flex justify-center items-center">
                <div className="flex flex-col gap-4">
                    <div className="join">
                        {values.facebook.length > 0 && (
                            <input
                                className="join-item btn"
                                type="radio"
                                name="options"
                                aria-label="Facebook"
                                checked={selected === "facebook"}
                                onClick={() => setSelected("facebook")}
                            />
                        )}

                        {values.instagram.length > 0 && (
                            <input
                                className="join-item btn"
                                type="radio"
                                name="options"
                                aria-label="Instagram"
                                checked={selected === "instagram"}
                                onClick={() => setSelected("instagram")}
                            />
                        )}
                        {values.x.length > 0 && (
                            <input
                                className="join-item btn"
                                type="radio"
                                name="options"
                                checked={selected === "x"}
                                aria-label="X"
                                onClick={() => setSelected("x")}
                            />
                        )}
                    </div>
                    <div className="flex items-center w-full max-w-[400px]">
                        {selected === "facebook" && <FacebookPostPreview />}
                        {selected === "instagram" && <InstagramPostPreview />}
                        {selected === "x" && <XPostPreview />}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostPreviews;
