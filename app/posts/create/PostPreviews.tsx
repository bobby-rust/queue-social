"use client";

import React, { useState } from "react";
import { useFormikContext } from "formik";
import InstagramPostPreview from "./InstagramPostPreview";
import FacebookPostPreview from "./FacebookPostPreview";
import type { SchedulePostForm } from "@/types/types";
import XPostPreview from "./XPostPreview";

const PostPreviews = () => {
  const { values } = useFormikContext<SchedulePostForm>();

  let socialPages = [
    { pages: values.facebook, social: "facebook" },
    { pages: values.instagram, social: "instagram" },
    { pages: values.x, social: "x" },
  ];

  React.useEffect(() => {
    socialPages = [
      { pages: values.facebook, social: "facebook" },
      { pages: values.instagram, social: "instagram" },
      { pages: values.x, social: "x" },
    ];
    console.log("walues change.");
  }, [values]);

  const renderPreview = () => {
    for (let { social, pages } of socialPages) {
      if (pages.length > 0) {
        switch (social) {
          case "facebook":
            return <FacebookPostPreview />;
          case "instagram":
            return <InstagramPostPreview />;
          case "x":
            return <XPostPreview />;
          default:
            return null;
        }
      }
    }
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
      {renderPreview()}
    </div>
  );
};

export default PostPreviews;
