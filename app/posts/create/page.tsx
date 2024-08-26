"use client";

import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Link } from "lucide-react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { UploadDropzone } from "@/utils/uploadthing";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import getPages from "@/lib/getPages";
import PageSelect from "./PageSelect";
import type { XPage } from "@/models/XPage";
import type { FacebookPage } from "@/models/FacebookPage";
import type { InstagramPage } from "@/models/InstagramPage";

interface SchedulePostForm {
    content: string;
    image: { fileUrl: string; fileId: string };
    link: string;
    fbPages: string[];
    igPages: string[];
    xPages: string[];
    date: Date;
    time: Date;
    unixTimestamp: number;
}

interface Pages {
    fbPages: any;
    igPages: any;
    xPages: any;
}

const CreatePostSchema = Yup.object().shape({
    content: Yup.string().required("Content is required"),
    date: Yup.date().required("Date is required"),
    time: Yup.date().required("Time is required"),
    image: Yup.mixed(),
    link: Yup.string().url("Invalid URL format"),
    fbPages: Yup.array(),
    igPages: Yup.array(),
    xPages: Yup.array(),
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

function checkTime(time: Date) {
    const now = new Date();
    const nowUTC = Date.UTC(
        now.getUTCFullYear(),
        now.getUTCMonth(),
        now.getUTCDate(),
        now.getUTCHours(),
        now.getUTCMinutes(),
        now.getUTCSeconds(),
    );

    console.log("nowUTC: ", nowUTC);
    console.log("time.getTime(): ", time.getTime());
    const diff = (time.getTime() - nowUTC) / 60000;
    console.log("diff: ", diff);
    return diff >= 15;
}

export default function CreatePost() {
    const { data: session }: any = useSession();

    const [pages, setPages] = useState<Pages>({
        fbPages: [],
        igPages: [],
        xPages: [],
    });

    const [disableSubmit, setDisableSubmit] = useState(true);

    const router = useRouter();
    if (!pages) router.push("/connect");
    if (!session) {
        router.push("/api/auth/signin");
    }

    function findPagesFromNames(social: string, pagesNames: string[]) {
        switch (social) {
            case "facebook":
                return pages.fbPages.filter((page: any) => pagesNames.includes(page.name));
            case "instagram":
                return pages.igPages.filter((page: any) => pagesNames.includes(page.name));
            case "x":
                return pages.xPages.filter((page: any) => pagesNames.includes(page.name));
            default:
                return [];
        }
    }

    const submitPost = async (post: SchedulePostForm) => {
        const schedulePostRequest: SchedulePostRequest = {
            userId: session.user.id,
            content: post.content,
            image: post.image,
            link: post.link,
            fbPages: findPagesFromNames("facebook", post.fbPages), // Convert page names to page objects
            igPages: findPagesFromNames("instagram", post.igPages),
            xPages: findPagesFromNames("x", post.xPages),
            unixTimestamp: post.unixTimestamp,
        };

        // Convert date and time to combined unix timestamp
        const date = combineDateAndTime(post.date, post.time);
        const unixTimestamp = Math.floor(date.getTime() / 1000);
        schedulePostRequest.unixTimestamp = unixTimestamp;

        // Check if time is at least 15 minutes in the future
        if (!checkTime(date)) {
            alert("Please choose a time at least 15 minutes in the future.");
            return;
        }

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

    const postToTwitter = async () => {
        const url = `/api/users/${session.user.id}/posts/twitter`;
        const response = await fetch(url, {
            method: "POST",
        });
        console.log(response);
    };

    return (
        <div className="flex flex-col items-center min-h-[70vh] p-16">
            <div className="flex flex-col gap-4 justify-center items-center bg-base-200 p-12 rounded-lg shadow-lg w-3/5">
                <h1 className="text-3xl bold">Create Post</h1>
                <Formik<SchedulePostForm>
                    initialValues={{
                        content: "",
                        image: { fileUrl: "", fileId: "" },
                        link: "",
                        fbPages: [],
                        igPages: [],
                        xPages: [],
                        date: new Date(),
                        time: new Date(),
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
                    {({ setFieldValue, errors, touched }) => (
                        <Form className="flex flex-col gap-4 w-full">
                            <div className="form-control w-full min-h-80">
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
                            <PageSelect
                                Icon={() => (
                                    <Image
                                        src="/facebook_icon.png"
                                        alt="Facebook"
                                        width={20}
                                        height={20}
                                    />
                                )}
                                pages={pages.fbPages.map((page: any) => page.name)}
                                setFieldValue={setFieldValue}
                                social="Facebook"
                                field="fbPages"
                            />

                            <PageSelect
                                Icon={() => (
                                    <Image
                                        src="/instagram_icon.png"
                                        alt="Instagram"
                                        width={20}
                                        height={20}
                                    />
                                )}
                                pages={pages.igPages.map((page: any) => page.name)}
                                setFieldValue={setFieldValue}
                                social="Instagram"
                                field="igPages"
                            />

                            <DatePicker
                                onChange={(date) => {
                                    setFieldValue("date", date?.toDate());
                                }}
                            />
                            <TimePicker
                                onChange={(time) => {
                                    setFieldValue("time", time?.toDate());
                                }}
                            />
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
            <button
                onClick={postToTwitter}
                className="btn btn-ghost btn-wide flex justify-center items-center border-2 border-slate-300"
            >
                Post to Twitter
            </button>
        </div>
    );
}
