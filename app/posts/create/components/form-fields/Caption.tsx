import { ISchedulePostForm } from "@/types/types";
import { Field, FormikErrors, FormikTouched } from "formik";
import React from "react";

type Props = {
    errors: FormikErrors<ISchedulePostForm>;
    touched: FormikTouched<ISchedulePostForm>;
};

export default function Caption({ errors, touched }: Props) {
    return (
        <div>
            {errors.content && touched.content ? (
                <div
                    className="tooltip tooltip-right tooltip-error tooltip-open w-full"
                    data-tip={errors.content}
                >
                    <label className="label">
                        <span className="label-text">Content</span>
                    </label>
                    <Field
                        id="content"
                        name="content"
                        type="textarea"
                        placeholder="Write your post here"
                        as="textarea"
                        className="textarea textarea-bordered textarea-lg w-full"
                    />
                </div>
            ) : (
                <div className="w-full">
                    <label className="label">
                        <span className="label-text">Content</span>
                    </label>
                    <Field
                        id="content"
                        name="content"
                        type="textarea"
                        placeholder="Write your post here"
                        as="textarea"
                        className="textarea textarea-bordered textarea-lg w-full"
                    />
                </div>
            )}
        </div>
    );
}
