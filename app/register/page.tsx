"use client";

import React from "react";
import { Formik, Field, Form } from "formik";

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
		<div>
			<h1>Register</h1>
			<Formik
				initialValues={{
					firstName: "",
					lastName: "",
					email: "",
					password: "",
				}}
				onSubmit={handleRegisterSubmit}>
				<Form>
					<label htmlFor="firstName">First Name</label>
					<Field id="firstName" name="firstName" placeholder="First Name" />

					<label htmlFor="lastName">Last Name</label>
					<Field id="lastName" name="lastName" placeholder="Last Name" />

					<label htmlFor="email">Email</label>
					<Field id="email" name="email" placeholder="Email" />

					<label htmlFor="password">Password</label>
					<Field id="password" name="password" placeholder="Password" />

					<button type="submit">Register</button>
				</Form>
			</Formik>
		</div>
	);
}
