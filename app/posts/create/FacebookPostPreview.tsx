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
        <div>
            <h1>Facebook Post Preview</h1>
        </div>
    );
};

export default FacebookPostPreview;
