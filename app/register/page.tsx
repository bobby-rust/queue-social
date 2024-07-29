"use client";

import React from "react";
import { Formik, Field, Form } from "formik";
import { KeyRound, Mail, User } from "lucide-react";
import TextInput from "../components/TextInput";
import * as Yup from "yup";

const SignupSchema = Yup.object().shape({
	firstName: Yup.string().min(2, "First name must be more than 2 characters").max(50, "First name cannot be more than 50 characters").required("Required"),
	lastName: Yup.string().min(2, "Last name must be more than 2 characters").max(50, "Last name cannot be more than 50 characters").required("Required"),
	email: Yup.string().email("Invalid email").required("Required"),
	password: Yup.string().min(8, "Password must be at least 8 characters").max(50, "Password cannot be more than 50 characters").required("Required"),
});

export default function Register() {
	const handleRegisterSubmit = async (e: any) => {
		/* The inner JSON in facebookBusinessPages is snake case because that is how it is stored in the database */
		const user = { ...e, facebookBusinessPages: { page_id: "123", long_page_access_token: "abc" }, credits: 5, subscriptionType: null };
		const jsonUser = JSON.stringify(user);

		const response = await fetch("/api/users", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: jsonUser,
		});

		const data = await response.json();
		console.log(data);
	};
	return (
		<div className="flex flex-col justify-center items-center h-[70vh] gap-4">
			<h1 className="text-4xl bold">Register</h1>
			<h2>Create your account</h2>
			<Formik
				initialValues={{
					firstName: "",
					lastName: "",
					email: "",
					password: "",
				}}
				validationSchema={SignupSchema}
				onSubmit={handleRegisterSubmit}>
				{({ errors, touched }) => (
					<Form className="flex flex-col justify-center items-center gap-4">
						<div className="flex flex-col justify-center items-center gap-4">
							<TextInput text="First Name" Icon={User} id="firstName" type="text" placeholder="First Name" required />
							{errors.firstName && touched.firstName ? <p className="text-red-500">{errors.firstName}</p> : null}
							<TextInput text="Last Name" Icon={User} id="lastName" type="text" placeholder="Last Name" required />
							{errors.lastName && touched.lastName ? <p className="text-red-500">{errors.lastName}</p> : null}
							<TextInput text="Email" Icon={Mail} id="email" type="email" placeholder="Email" required />
							{errors.email && touched.email ? <p className="text-red-500">{errors.email}</p> : null}
							<TextInput text="Password" Icon={KeyRound} id="password" type="password" placeholder="Password" required />
							{errors.password && touched.password ? <p className="text-red-500">{errors.password}</p> : null}
							<p className="flex justify-center items-center text-xs max-w-[80%] text-center">
								By registering, you agree to our Terms of Service and Privacy Policy
							</p>
							<button className="btn btn-primary w-full" type="submit">
								Register
							</button>
						</div>
					</Form>
				)}
			</Formik>
		</div>
	);
}
