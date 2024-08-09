"use client";

import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Link } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { UploadDropzone } from "@/utils/uploadthing";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";

const CreatePostSchema = Yup.object().shape({
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

interface Post {
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
    const pages = session?.user?.facebook_business_accounts.pages;
    const router = useRouter();
    if (!pages) router.push("/account-connect");
    console.log(pages);

    const createPost = async (post: any) => {
        if (post.page === "default") {
            alert("Please select a page to post to");
            return;
        }
        const selectedPage = pages.data.find((page: any) => page.name === post.page);

        if (!selectedPage) {
            alert("Selected page not found");
            return;
        }
        post.page = selectedPage;

        // const hours = post.time.getHours().toLocaleString();
        // const minutes = post.time.getMinutes().toLocaleString();
        // const seconds = post.time.getSeconds().toLocaleString();
        // console.log("Got date and time from date picker: ", post.date.getDate().toLocaleString());
        // console.log(
        //     `${hours < 10 ? "0" + hours : hours}:${minutes < 10 ? "0" + minutes : minutes}:${seconds < 10 ? "0" + seconds : seconds}`,
        // );

        const date = combineDateAndTime(post.date, post.time);

        // console.log("Combined UTC date: ", date.toUTCString());
        // console.log("Combined Local date: ", date.toLocaleString());

        const unixTimestamp = Math.floor(date.getTime() / 1000);
        post.unixTimestamp = unixTimestamp;

        console.log(unixTimestamp);
        console.log(new Date(unixTimestamp * 1000).toString());

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

        try {
            const res = await fetch(`/api/users/${session.user.id}/posts`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(post),
            });

            const data = await res.json();

            if (data.error) {
                console.log(data);
                return;
            }

            console.log(data);
            router.push("/");
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <div className="flex flex-col items-center min-h-[70vh] p-16">
            <div className="flex flex-col gap-4 justify-center items-center bg-base-200 p-12 rounded-lg shadow-lg w-3/5">
                <h1 className="text-3xl bold">Create Post</h1>
                <Formik
                    initialValues={{
                        content: "",
                        image: "",
                        link: "",
                        page: "default",
                        date: new Date(),
                        time: new Date(),
                    }}
                    validationSchema={CreatePostSchema}
                    onSubmit={(values, { setSubmitting, resetForm }) => {
                        createPost(values);
                        setSubmitting(false);
                        resetForm();
                    }}
                >
                    {({ handleSubmit, values, setFieldValue, errors, touched }) => (
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
                                                console.log("Files: ", res);
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
                                    console.log(values.date);
                                }}
                            />
                            <TimePicker
                                onChange={(time) => {
                                    setFieldValue("time", time?.toDate());
                                    console.log(values.time);
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
