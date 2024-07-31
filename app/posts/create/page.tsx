"use client";

import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link } from "lucide-react";
import TextInput from "@/app/components/TextInput";
import IconInput from "./IconInput";

const CreatePostSchema = Yup.object().shape({
	content: Yup.string().required("Content is required"),
	image: Yup.mixed(),
	link: Yup.string().url("Invalid URL format"),
});

export default function CreatePost() {
	return (
		<div className="flex flex-col justify-center items-center min-h-[70vh]">
			<div className="flex flex-col gap-4 justify-center items-center bg-base-200 p-12 rounded-lg shadow-lg">
				<h1 className="text-3xl bold">Create Post</h1>
				<Formik
					initialValues={{ content: "", image: null, link: "" }}
					validationSchema={CreatePostSchema}
					onSubmit={(values) => {
						console.log(values);
					}}>
					{({ errors, touched }) => (
						<Form className="flex flex-col gap-4">
							<div className="form-control">
								<label className="label">
									<span className="label-text">Content</span>
								</label>
								<Field
									id="content"
									name="content"
									type="textarea"
									placeholder="Content"
									as="textarea"
									className="textarea textarea-bordered textarea-lg h-36 w-96"
								/>
								<ErrorMessage name="content" component="div" className="text-red-500" />
							</div>
							{errors.link && touched.link ? (
								<div className="tooltip tooltip-right tooltip-open tooltip-error w-full" data-tip={errors.link}>
									<label className="label-text" htmlFor="link">
										<span>Link</span>
										<IconInput icon={Link} type="text" id="link" name="link" placeholder="Link" />
									</label>
								</div>
							) : (
								<div className="w-full">
									<label className="label" htmlFor="link">
										<span className="label-text">Link</span>
										<IconInput icon={Link} type="text" id="link" name="link" placeholder="Link" />
									</label>
								</div>
							)}
							<div className="form-control w-full max-w-xs">
								<label className="label">
									<span className="label-text">Image (optional)</span>
								</label>
								<Field id="image" name="image" type="file" placeholder="Image" className="file-input file-input-bordered" />
							</div>
							<button type="submit" className="btn btn-primary">
								Submit
							</button>
						</Form>
					)}
				</Formik>
			</div>
		</div>
	);
}
