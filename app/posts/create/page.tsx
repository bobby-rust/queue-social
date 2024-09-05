"use client";

import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Link } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { UploadDropzone } from "@/utils/uploadthing";
import getPages from "@/lib/getPages";
import PageIcon from "./PageIcon";
import { SchedulePostRequest } from "@/types/types";
import DatePicker from "./DatePicker";
import { fromZonedTime } from "date-fns-tz";
import PostPreviews from "./PostPreviews";
import type { SchedulePostForm } from "@/types/types";

interface Pages {
    facebook: any;
    instagram: any;
    x: any;
}

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

function combineDateAndTime(date: Date, hours: number, minutes: number, am: boolean) {
    console.log("date: ", date, "hours: ", hours, "minutes: ", minutes);
    if (am && hours === 12) {
        hours = 0;
    } else if (!am && hours !== 12) {
        hours += 12;
    }
    console.log("Hours after editing: ", hours);
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    console.log("timezone: ", timezone);
    const combinedDate = fromZonedTime(
        new Date(date.getFullYear(), date.getMonth(), date.getDate(), hours, minutes, 0),
        timezone,
    );
    console.log("combinedDate: ", combinedDate);
    return combinedDate;
}

export default function CreatePost() {
    const { data: session }: any = useSession();

    const [disableSubmit, setDisableSubmit] = useState(false);
    const [imagePreview, setImagePreview] = useState<string[]>([]);
    const [pages, setPages] = useState<Pages>({
        facebook: [],
        instagram: [],
        x: [],
    });

    const router = useRouter();

    if (!session) {
        router.push("/api/auth/signin");
    }

    const submitPost = async (post: SchedulePostForm) => {
        console.log("Submitting post: ", post);
        setDisableSubmit(true);
        const schedulePostRequest: SchedulePostRequest = {
            userId: session.user.id,
            content: post.content,
            image: post.image,
            link: post.link,
            facebook: post.facebook,
            instagram: post.instagram,
            x: post.x,
            date: combineDateAndTime(post.date, post.hour, post.minute, post.am),
        };

        try {
            const res = await fetch(`/api/users/${session.user.id}/posts`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(schedulePostRequest),
            });

            const data = await res.json();

            if (data.error) {
                console.log(data);
                return;
            }

            router.push("/");
        } catch (e) {
            console.log(e);
        }
    };

    const handleImageLoad = (event: React.SyntheticEvent<HTMLImageElement>) => {
        const target = event.currentTarget;
        const { width, height } = target;
        console.log(width, height);
    };

    useEffect(() => {
        const fetchPages = async () => {
            const pages = await getPages(session?.user?.id);
            for (let social of [pages.facebook, pages.instagram, pages.x]) {
                social.forEach((page: any) => {
                    page.selected = false;
                });
            }
            setPages(pages);
        };

        fetchPages();
    }, []);

    useEffect(() => {
        console.log("PAGES: ", pages);
    }, [pages]);

    return (
        <div className="flex justify-center min-h-[70vh] p-16 gap-4">
            <div className="flex flex-col gap-4 justify-center items-center bg-base-200 p-12 rounded-lg shadow-lg w-3/5">
                <Formik<SchedulePostForm>
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
                        submitPost(values);
                        setSubmitting(false);
                        resetForm();
                    }}
                >
                    {({ setFieldValue, errors, values, touched }) => {
                        useEffect(() => {
                            console.log("Formik values changed: ", values);
                        }, [values]);
                        return (
                            <Form className="flex gap-4 justify-center w-full">
                                <div className="flex flex-col">
                                    <h1 className="font-bold text-2xl">Create Post</h1>
                                    <div className="divider before:h-[1px] after:h-[1px] m-0"></div>
                                    <div className="form-control w-full min-h-80">
                                        <div className="flex gap-4">
                                            {Object.entries(pages).map(([social, pages]) => (
                                                <div className="flex gap-4">
                                                    {pages.map((page: any) => (
                                                        <PageIcon
                                                            social={social}
                                                            key={page.id}
                                                            page={page}
                                                            checked={page.selected}
                                                            setChecked={(pageToToggle: any) => {
                                                                // We can edit pages while we iterate through it because we do not change its length.
                                                                console.log(
                                                                    "value[social: ",
                                                                    values[social],
                                                                );
                                                            }}
                                                        />
                                                    ))}
                                                </div>
                                            ))}
                                        </div>
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
                                                    className="textarea textarea-bordered textarea-lg w-full min-h-80"
                                                />
                                            </div>
                                        ) : (
                                            <div className="w-full min-h-80">
                                                <label className="label">
                                                    <span className="label-text">Content</span>
                                                </label>
                                                <Field
                                                    id="content"
                                                    name="content"
                                                    type="textarea"
                                                    placeholder="Write your post here"
                                                    as="textarea"
                                                    className="textarea textarea-bordered textarea-lg w-full min-h-80"
                                                />
                                            </div>
                                        )}
                                    </div>
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
                                    <div className="form-control w-full max-w-xs">
                                        {errors.image && touched.image ? (
                                            <div
                                                className="tooltip tooltip-right tooltip-error tooltip-open"
                                                data-tip={errors.image}
                                            >
                                                <label className="label">
                                                    <span className="label-text">
                                                        Add an image to your post (optional)
                                                    </span>
                                                </label>
                                                <Field
                                                    id="image"
                                                    name="image"
                                                    type="file"
                                                    placeholder="Image"
                                                    className="file-input file-input-bordered"
                                                ></Field>
                                            </div>
                                        ) : (
                                            <div>
                                                <label className="label">
                                                    <span className="label-text">
                                                        Add an image to your post (optional)
                                                    </span>
                                                </label>
                                                <UploadDropzone
                                                    endpoint="imageUploader"
                                                    onClientUploadComplete={(res: any) => {
                                                        setFieldValue("image", {
                                                            fileUrl: res[0].serverData.fileUrl,
                                                            fileId: res[0].serverData.fileId,
                                                        });
                                                        setImagePreview([
                                                            ...imagePreview,
                                                            res[0].serverData.fileUrl,
                                                        ]);
                                                        alert("Upload complete");
                                                    }}
                                                    onUploadError={(e: Error) => {
                                                        console.error(e.message);
                                                        alert("Upload Error");
                                                    }}
                                                />

                                                <div className="flex">
                                                    {imagePreview.map((image: string) => (
                                                        <div className="flex">
                                                            <Image
                                                                src={image}
                                                                width={100}
                                                                height={100}
                                                                alt="Uploaded Image"
                                                                onLoad={handleImageLoad}
                                                            />
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <DatePicker setFieldValue={setFieldValue} formState={values} />
                                    <button
                                        type="submit"
                                        className={`btn btn-primary w-1/5 ${disableSubmit ? "btn-disabled" : ""}`}
                                    >
                                        {disableSubmit && (
                                            <span className="loading loading-spinner"></span>
                                        )}
                                        {disableSubmit ? "Submitting Post..." : "Submit"}
                                    </button>
                                </div>
                                <PostPreviews />
                            </Form>
                        );
                    }}
                </Formik>
            </div>
        </div>
    );
}
