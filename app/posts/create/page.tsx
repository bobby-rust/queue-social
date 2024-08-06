"use client";

import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Link } from "lucide-react";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useRouter } from "next/router";

const CreatePostSchema = Yup.object().shape({
    content: Yup.string().required("Content is required"),
    image: Yup.mixed(),
    link: Yup.string().url("Invalid URL format"),
    page: Yup.string().required("Page is required"), // if the form isnt submitting, make sure page is getting set.
});

interface Post {
    content: string;
    image: any;
    link: string;
    page: any;
}

export default function CreatePost() {
    const session: any = useSession();
    const pages = session.data?.user?.facebook_business_accounts.pages;
    const router = useRouter();
    console.log(pages);

    const createPost = async (post: Post) => {
        if (post.page === "default") {
            alert("Please select a page to post to");
        }
        console.log(post);
        for (const page of pages.data) {
            if (page.name === post.page) {
                post.page = page;
            }
        }

        const res = await fetch("/api/users/1/posts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(post),
        });
        const data = await res.json();
        console.log(data);
        router.push("/");
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
                    }}
                    validationSchema={CreatePostSchema}
                    onSubmit={(values, { setSubmitting }) => {
                        createPost(values);
                        setSubmitting(false);
                    }}
                >
                    {({ handleSubmit, values, setFieldValue, errors, touched }) => (
                        <Form
                            onChange={(e: any) => console.log(e.target.value)}
                            className="flex flex-col gap-4 w-full"
                        >
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
                                        />
                                    </div>
                                ) : (
                                    <div>
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
                                            onChange={(e: any) => {
                                                setFieldValue("image", e.target.files?.[0]);
                                            }}
                                            accept="image/*"
                                        />
                                    </div>
                                )}
                            </div>
                            <Field
                                as="select"
                                component="select"
                                name="page"
                                id="page"
                                className={`select select-bordered w-full max-w-xs`}
                            >
                                <option value="default" disabled selected>
                                    Which page would you like to post to?
                                </option>
                                {pages.data.map((page: any) => (
                                    <option key={page.id}>{page.name}</option>
                                ))}
                            </Field>
                            <button
                                type="submit"
                                className="btn btn-primary w-1/5"
                                onClick={(e: any) => handleSubmit(e)}
                            >
                                Submit
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
}
