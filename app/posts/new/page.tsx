"use client";

import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const CreatePostSchema = Yup.object().shape({
	content: Yup.string().required("Content is required"),
	image: Yup.mixed(),
	link: Yup.string().url("Invalid URL format"),
});

export default function CreatePost() {
	return (
		<div className="flex flex-col justify-center items-center min-h-[70vh]">
			<h1 className="text-3xl bold">Create Post</h1>
			<Formik
				initialValues={{ content: "", image: null, link: "" }}
				validationSchema={CreatePostSchema}
				onSubmit={(values) => {
					console.log(values);
				}}>
				{({ errors, touched }) => (
					<Form className="flex flex-col gap-4">
						<div className="form-control w-full max-w-xs">
							<label className="label">
								<span className="label-text">Content</span>
							</label>
							<Field id="content" name="content" type="text" placeholder="Content" className="input input-bordered w-full max-w-xs" />
							<ErrorMessage name="content" component="div" className="text-red-500" />
						</div>
						<div className="form-control w-full max-w-xs">
							<label className="label">
								<span className="label-text">Image</span>
							</label>
							<Field id="image" name="image" type="file" placeholder="Image" className="input input-bordered w-full max-w-xs" />
							<ErrorMessage name="image" component="div" className="text-red-500" />
						</div>
						<div className="form-control w-full max-w-xs">
							<label className="label">
								<span className="label-text">Link</span>
							</label>
							<Field id="link" name="link" type="text" placeholder="Link" className="input input-bordered w-full max-w-xs" />
							<ErrorMessage name="link" component="div" className="text-red-500" />
						</div>
						<button type="submit" className="btn btn-primary">
							Submit
						</button>
					</Form>
				)}
			</Formik>
		</div>
	);
}
