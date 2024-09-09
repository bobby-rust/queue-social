import { ISchedulePostForm } from "@/types/types";
import { Field, FormikErrors, FormikTouched } from "formik";
import { Link } from "lucide-react";
import React from "react";

type Props = {
    errors: FormikErrors<ISchedulePostForm>;
    touched: FormikTouched<ISchedulePostForm>;
};

export default function PostLink({ errors, touched }: Props) {
    return (
        <div>
            <div className="label">
                <span className="label-text">Link (optional)</span>
            </div>
            {errors.link && touched.link ? (
                <div
                    className="tooltip tooltip-right tooltip-error tooltip-open"
                    data-tip={errors.link}
                >
                    <label className="input input-bordered flex items-center gap-2">
                        <Link />
                        <Field
                            id="link"
                            name="link"
                            type="text"
                            className="grow"
                            placeholder="Add a link to your post here"
                        />
                    </label>
                </div>
            ) : (
                <div>
                    <label className="input input-bordered flex items-center gap-2">
                        <Link />
                        <Field
                            id="link"
                            name="link"
                            type="text"
                            className="grow"
                            placeholder="Add a link to your post here"
                        />
                    </label>
                </div>
            )}
        </div>
    );
}
