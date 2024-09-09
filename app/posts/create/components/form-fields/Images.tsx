import { UploadButton } from "@/utils/uploadthing";
import React from "react";
import { FormikErrors } from "formik";
import { ISchedulePostForm } from "@/types/types";

type Props = {
    setFieldValue: (
        field: string,
        value: any,
        shouldValidate?: boolean | undefined,
    ) => Promise<void | FormikErrors<ISchedulePostForm>>;
};

export default function Images({ setFieldValue }: Props) {
    return (
        <div className="form-control w-full max-w-xs">
            <UploadButton
                endpoint="imageUploader"
                onClientUploadComplete={(res) => {
                    // Do something with the response
                    console.log("Files: ", res);
                    setFieldValue("image", res);
                }}
                onUploadError={(error: Error) => {
                    // Do something with the error.
                    alert(`ERROR! ${error.message}`);
                }}
            />
        </div>
    );
}
