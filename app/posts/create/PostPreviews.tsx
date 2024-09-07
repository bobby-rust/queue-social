"use client";

import React, { useState } from "react";
import { useFormikContext } from "formik";
import InstagramPostPreview from "./InstagramPostPreview";
import FacebookPostPreview from "./FacebookPostPreview";
import type { SchedulePostForm } from "@/types/types";

const PostPreviews = () => {
    const [selected, setSelected] = useState<"facebook" | "instagram" | "x" | null>(null);
    // Is this stateful??
    const { values } = useFormikContext<SchedulePostForm>();

    // Is this stateful?? ?  it needs to be how do I make this stateful
    const socialPages = [
        { pages: values.facebook, social: "facebook" },
        { pages: values.instagram, social: "instagram " },
        { pages: values.x, social: "x" },
    ];

    const Preview = () => {
        let preview: any = null;
        socialPages.map(({ pages, social }) => {
            if (pages.length > 0 && !preview) {
                if (social === "facebook") {
                    preview = <FacebookPostPreview />;
                } else if (social === "instagram") {
                    preview = <InstagramPostPreview />;
                } else if (social === "x") {
                    preview = <div>X preview</div>;
                }
            }
        });

        return preview;
    };

    return (
        <div>
            <div className="join">
                {socialPages.map(
                    ({ pages, social }, index) =>
                        pages.length > 0 && (
                            <input
                                key={index}
                                className="join-item btn"
                                type="radio"
                                name="options"
                                aria-label={social[0].toUpperCase() + social.substring(1)}
                                onClick={() => {}}
                            />
                        ),
                )}
            </div>
            {socialPages.map(({ pages, social }) => {
                if (pages.length > 0) {
                    if (social === "facebook") {
                        return <FacebookPostPreview />;
                    } else if (social === "instagram") {
                        return <InstagramPostPreview />;
                    } else if (social === "x") {
                        return <div>X preview</div>;
                    }
                }
            })}
        </div>
    );
};

export default PostPreviews;
