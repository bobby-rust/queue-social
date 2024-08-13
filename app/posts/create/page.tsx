"use client";

import React, { useEffect } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Check, Link, Plus } from "lucide-react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { UploadDropzone } from "@/utils/uploadthing";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import getPages from "@/lib/getPages";

const CreatePostSchema = Yup.object().shape({
    socials: Yup.array().required("Socials are required"),
    content: Yup.string().required("Content is required"),
    image: Yup.mixed(),
    link: Yup.string().url("Invalid URL format"),
    page: Yup.string().required("Page is required"),
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

const availableSocials = ["Facebook", "Instagram"];

interface Post {
    socials: any;
    content: string;
    image: any;
    link: string;
    page: any;
    date: Date;
    time: Date;
    unixTimestamp: number;
}

export default function CreatePost() {
    const { data: session }: any = useSession();
    const pages = getPages(session.user?.id);
    console.log("PAGES: ", pages);
    const router = useRouter();
    if (!pages) router.push("/account-connect");

    const createPost = async (post: any) => {
        if (post.page === "default") {
            alert("Please select a page to post to");
            return;
        }
        const selectedPage = pages.find((page: any) => page.name === post.page);

        if (!selectedPage) {
            alert("Selected page not found");
            return;
        }
        post.page = selectedPage;

        if (post.socials.includes("instagram")) {
            if (!post.image) {
                alert("Instagram posts require at least one image.");
                return;
            }
        }

        const date = combineDateAndTime(post.date, post.time);

        const unixTimestamp = Math.floor(date.getTime() / 1000);
        post.unixTimestamp = unixTimestamp;

        const now = new Date();
        const nowUTC = Date.UTC(
            now.getUTCFullYear(),
            now.getUTCMonth(),
            now.getUTCDate(),
            now.getUTCHours(),
            now.getUTCMinutes(),
            now.getUTCSeconds(),
        );

        const diff = (date.getTime() - nowUTC) / 60000;
        if (diff < 15) {
            alert("Please choose a time at least 15 minutes in the future.");
            return;
        }

        const body = {
            socials: post.socials,
            content: post.content,
            image: post.image,
            link: post.link,
            page: post.page,
            unixTimestamp: unixTimestamp,
        };

        try {
            const res = await fetch(`/api/users/${session.user.id}/posts`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
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

    const handleToggleSocial = (socials: string[], social: string, func: any) => {
        if (socials.includes(social.toLowerCase())) {
            func(
                "socials",
                socials.filter((s) => s !== social.toLowerCase()),
            );
        } else {
            func("socials", [...socials, social.toLowerCase()]);
        }
    };

    return (
        <div className="flex flex-col items-center min-h-[70vh] p-16">
            <div className="flex flex-col gap-4 justify-center items-center bg-base-200 p-12 rounded-lg shadow-lg w-3/5">
                <h1 className="text-3xl bold">Create Post</h1>
                <Formik
                    initialValues={{
                        socials: [],
                        content: "",
                        image: "",
                        link: "",
                        page: "default",
                        date: new Date(),
                        time: new Date(),
                    }}
                    validationSchema={CreatePostSchema}
                    onSubmit={(values, { setSubmitting, resetForm }) => {
                        console.log("Submitting form: ", values);
                        createPost(values);
                        setSubmitting(false);
                        resetForm();
                    }}
                >
                    {({ values, setFieldValue, errors, touched }) => (
                        <Form className="flex flex-col gap-4 w-full">
                            <div className="form-control w-full min-h-80">
                                <div>
                                    <label className="label">
                                        <span className="label-text">Socials</span>
                                    </label>
                                    <div className="flex gap-4">
                                        {availableSocials.map((social) => (
                                            <button
                                                type="button"
                                                className="btn btn-ghost h-16 w-16 p-2"
                                                onClick={() =>
                                                    handleToggleSocial(
                                                        values.socials,
                                                        social,
                                                        setFieldValue,
                                                    )
                                                }
                                            >
                                                <div className="indicator">
                                                    <Image
                                                        src={`/${social.toLowerCase()}_icon.png`}
                                                        alt={social}
                                                        width={50}
                                                        height={50}
                                                    />
                                                    <span
                                                        className={`badge p-[1px] badge-md ${values.socials.includes(social.toLowerCase()) ? "bg-green-400" : "badge-primary"} indicator-item h-6 w-6`}
                                                    >
                                                        {values.socials.includes(
                                                            social.toLowerCase(),
                                                        ) ? (
                                                            <Check size={24} />
                                                        ) : (
                                                            <Plus size={24} />
                                                        )}
                                                    </span>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
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
                            <Field
                                as="select"
                                component="select"
                                name="page"
                                id="page"
                                className="select select-bordered w-full max-w-xs"
                            >
                                <option value="default" disabled>
                                    Which page would you like to post to?
                                </option>
                                {pages?.data.map((page: any) => (
                                    <option key={page.id}>{page.name}</option>
                                ))}
                            </Field>
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
                            <button type="submit" className="btn btn-primary w-1/5">
                                Submit
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
}
