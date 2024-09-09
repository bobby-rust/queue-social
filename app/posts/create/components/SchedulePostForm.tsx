"use client";

import { ISchedulePostForm } from "@/types/types";
import { Formik, Form } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { handleChangeShouldPreviewRender, submitPost } from "../utils";
import { useSession } from "next-auth/react";
import getSocialPages from "@/lib/getSocialPages";
import PostPreviews from "./previews/PostPreviews";
import DatePicker from "./DatePicker";
import Socials from "./form-fields/Socials";
import { SocialPages } from "@/types/types";
import Caption from "./form-fields/Caption";
import PostLink from "./form-fields/PostLink";
import Images from "./form-fields/Images";
import SubmitButton from "./form-fields/SubmitButton";

const CreatePostSchema = Yup.object().shape({
    content: Yup.string().required("Content is required"),
    date: Yup.date().required("Date is required"),
    hour: Yup.number().required("Hour is required"),
    minute: Yup.number().required("Minute is required"),
    am: Yup.boolean().required("AM/PM is required"),
    image: Yup.mixed(),
    link: Yup.string().url("Invalid URL format"),
    facebook: Yup.array(),
    instagram: Yup.array(),
    x: Yup.array(),
    unixTimestamp: Yup.number(),
});

function SchedulePostForm() {
    const { data: session }: any = useSession();

    const [socialPages, setSocialPages] = useState<SocialPages>({
        facebook: [],
        instagram: [],
        x: [],
    });

    const [disableSubmit, setDisableSubmit] = useState(false);
    const [shouldPreviewRender, setShouldPreviewRender] = useState(false);

    useEffect(() => {
        const fetchSocialPages = async () => {
            const pages = await getSocialPages(session?.user?.id);
            console.log("Got pages back from api: ", pages);
            for (let social of [pages.facebook, pages.instagram, pages.x]) {
                social.forEach((page: any) => {
                    page.selected = false;
                });
            }
            setSocialPages(pages);
        };

        fetchSocialPages();
    }, []);

    useEffect(() => {
        console.log("PAGES: ", socialPages);
    }, [socialPages]);

    return (
        <Formik<ISchedulePostForm>
            initialValues={{
                content: "",
                image: { fileUrl: "", fileId: "" },
                link: "",
                facebook: [],
                instagram: [],
                x: [],
                date: new Date(),
                hour: 1,
                minute: 0,
                am: true,
                unixTimestamp: 0,
            }}
            validationSchema={CreatePostSchema}
            onSubmit={(values, { setSubmitting, resetForm }) => {
                console.log("Submitting form: ", values);
                submitPost(session?.user?.id, values);
                setSubmitting(false);
                resetForm();
            }}
        >
            {({ setFieldValue, errors, values, touched }) => {
                useEffect(() => {
                    console.log("Formik values changed: ", values);

                    const { facebook, instagram, x } = values;
                    handleChangeShouldPreviewRender(
                        { facebook, instagram, x },
                        setShouldPreviewRender,
                    );
                }, [values]);

                return (
                    <Form className="flex gap-4 justify-center w-full max-h-[70vh]">
                        <div className="flex gap-4 flex-col w-1/2">
                            <h1 className="font-bold text-2xl">Create Post</h1>
                            <div className="divider before:h-[1px] after:h-[1px] m-0"></div>
                            <div className="form-control w-full min-h-80">
                                <Socials
                                    socialPages={socialPages}
                                    values={values}
                                    setFieldValue={setFieldValue}
                                />
                                <Caption errors={errors} touched={touched} />
                                <PostLink errors={errors} touched={touched} />
                                <Images setFieldValue={setFieldValue} />
                                <DatePicker setFieldValue={setFieldValue} formState={values} />
                                <SubmitButton disableSubmit={disableSubmit} />
                            </div>
                        </div>
                        {shouldPreviewRender && <PostPreviews />}
                    </Form>
                );
            }}
        </Formik>
    );
}

export default SchedulePostForm;
