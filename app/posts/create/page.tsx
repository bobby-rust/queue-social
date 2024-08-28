"use client";

import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Link } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { UploadDropzone } from "@/utils/uploadthing";
import getPages from "@/lib/getPages";
import PageIcon from "./PageIcon";
import { SchedulePostRequest } from "@/types/types";
import Image from "next/image";
import DatePicker from "./DatePicker";

interface SchedulePostForm {
    content: string;
    image: { fileUrl: string; fileId: string };
    link: string;
    facebook: any[];
    instagram: any[];
    x: any[];
    date: Date;
    hour: number;
    minute: number;
    am: boolean;
    unixTimestamp: number;
    [key: string]: any;
}

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

function combineDateAndTime(day: Date, time: Date) {
    const year = day.getUTCFullYear();
    const month = day.getUTCMonth();
    const date = day.getUTCDate();

    const hours = time.getUTCHours();
    const minutes = time.getUTCMinutes();
    const seconds = time.getUTCSeconds();

    // Create a new Date object in UTC
    const combinedDate = new Date(Date.UTC(year, month, date, hours, minutes, seconds));
    return combinedDate;
}

// function checkTime(time: Date) {
//     const now = new Date();
//     const nowUTC = Date.UTC(
//         now.getUTCFullYear(),
//         now.getUTCMonth(),
//         now.getUTCDate(),
//         now.getUTCHours(),
//         now.getUTCMinutes(),
//         now.getUTCSeconds(),
//     );

//     console.log("nowUTC: ", nowUTC);
//     console.log("time.getTime(): ", time.getTime());
//     const diff = (time.getTime() - nowUTC) / 60000;
//     console.log("diff: ", diff);
//     return diff >= 15;
// }
function checkTime(time: Date) {
    const now = new Date();
    const diff = (time.getTime() - now.getTime()) / 60000;

    console.log("now: ", now);
    console.log("time: ", time.getTime());
    console.log("diff: ", diff);
    return diff >= 15;
}

export default function CreatePost() {
    const { data: session }: any = useSession();

    const [pages, setPages] = useState<Pages>({
        facebook: [],
        instagram: [],
        x: [],
    });

    const [disableSubmit, setDisableSubmit] = useState(false);

    const router = useRouter();
    if (!pages) router.push("/connect");
    if (!session) {
        router.push("/api/auth/signin");
    }

    // function findPagesFromNames(social: string, pagesNames: string[]) {
    //     switch (social) {
    //         case "facebook":
    //             return pages.facebook.filter((page: any) => pagesNames.includes(page.name));
    //         case "instagram":
    //             return pages.instagram.filter((page: any) => pagesNames.includes(page.name));
    //         case "x":
    //             return pages.x.filter((page: any) => pagesNames.includes(page.name));
    //         default:
    //             return [];
    //     }
    // }

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
            unixTimestamp: post.unixTimestamp,
        };

        // Convert date and time to combined unix timestamp
        // const date = combineDateAndTime(post.date, post.time);
        // const unixTimestamp = Math.floor(date.getTime() / 1000);
        // schedulePostRequest.unixTimestamp = unixTimestamp;

        // Check if time is at least 15 minutes in the future
        // if (!checkTime(date)) {
        //     alert("Please choose a time at least 15 minutes in the future.");
        //     return;
        // }

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

    useEffect(() => {
        async function fetchPages() {
            const pages = await getPages(session.user?.id);
            setPages(pages);
        }

        fetchPages();
    }, []);

    useEffect(() => {
        console.log("PAGES: ", pages);
    }, [pages]);

    return (
        <div className="flex flex-col items-center min-h-[70vh] p-16">
            <div className="flex flex-col gap-4 justify-center items-center bg-base-200 p-12 rounded-lg shadow-lg w-3/5">
                <h1 className="text-3xl bold">Create Post</h1>
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
                    {({ setFieldValue, errors, values, touched }) => (
                        <Form className="flex flex-col gap-4 w-full">
                            <div className="form-control w-full min-h-80">
                                <div className="flex gap-4">
                                    {Object.entries(pages).map(([social, pages]) => (
                                        <>
                                            {pages.map((page: any) => (
                                                <PageIcon
                                                    social={social}
                                                    key={page.id}
                                                    page={page}
                                                    checked={page.selected}
                                                    setChecked={(pageToSelect: any) => {
                                                        console.log("pageToSelect: ", pageToSelect);
                                                        // If page is already selected, unselect it
                                                        !values[social].includes(pageToSelect)
                                                            ? setFieldValue(social, [
                                                                  ...values[social],
                                                                  pageToSelect,
                                                              ])
                                                            : // If page is not selected, select it
                                                              setFieldValue(
                                                                  social,
                                                                  values[social].filter(
                                                                      (page: any) =>
                                                                          page.id !==
                                                                          pageToSelect.id,
                                                                  ),
                                                              );
                                                        page.selected = !page.selected;
                                                    }}
                                                />
                                            ))}
                                        </>
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
                                                alert("Upload complete");
                                            }}
                                            onUploadError={(e: Error) => {
                                                console.error(e.message);
                                                alert("Upload Error");
                                            }}
                                        />
                                    </div>
                                )}
                            </div>
                            <DatePicker setFieldValue={setFieldValue} formState={values} />
                            <button
                                type="submit"
                                className={`btn btn-primary w-1/5 ${disableSubmit ? "btn-disabled" : ""}`}
                            >
                                {disableSubmit && <span className="loading loading-spinner"></span>}
                                {disableSubmit ? "Submitting Post..." : "Submit"}
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
}
