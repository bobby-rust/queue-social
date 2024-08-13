"use client";

import React from "react";
import { Formik, Form } from "formik";
import { KeyRound, Mail, User } from "lucide-react";
import TextInput from "../components/TextInput";
import * as Yup from "yup";
import GoogleSignIn from "./GoogleSignIn";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

const SignupSchema = Yup.object().shape({
    firstName: Yup.string()
        .min(2, "First name must be more than 2 characters")
        .max(50, "First name cannot be more than 50 characters")
        .required("First name is required"),
    lastName: Yup.string()
        .min(2, "Last name must be more than 2 characters")
        .max(50, "Last name cannot be more than 50 characters")
        .required("Last name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .max(50, "Password cannot be more than 50 characters")
        .required("Password is required"),
    confirmPassword: Yup.string().oneOf([Yup.ref("password")], "Passwords must match"),
});

export default function Register() {
    const [disableSubmit, setDisableSubmit] = React.useState(false);
    const router = useRouter();
    const handleRegisterSubmit = async (e: any) => {
        setDisableSubmit(true);
        /* The JSON in facebookBusinessAccounts is snake case because that is how it is stored in the database */
        const user = {
            ...e,
            image: null,
            facebookBusinessAccounts: [],
            emailVerified: false,
            credits: 5,
            subscriptionType: null,
        };
        const jsonUser = JSON.stringify(user);
        const response = await fetch("/api/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: jsonUser,
        });

        const data = await response.json();
        await signIn("credentials", {
            email: user.email,
            password: user.password,
        });
        router.push("/");
    };
    return (
        <div className="flex flex-col justify-center items-center h-[70vh] gap-4">
            <div className="flex flex-col gap-4 items-center w-1/4 bg-base-200 p-8 rounded-lg shadow-lg">
                <h1 className="text-4xl bold">Sign up</h1>
                <div className="flex flex-col gap-4 justify-center items-center p-12">
                    <div className="w-full flex justify-center items-center">
                        <GoogleSignIn />
                    </div>
                    <div className="divider">OR</div>

                    <h2 className="text-xl bold">Create your account</h2>
                    <Formik
                        initialValues={{
                            firstName: "",
                            lastName: "",
                            email: "",
                            password: "",
                            confirmPassword: "",
                        }}
                        validationSchema={SignupSchema}
                        onSubmit={handleRegisterSubmit}
                    >
                        {({ errors, touched }) => (
                            <Form className="flex flex-col justify-center items-center gap-4 w-full">
                                <div className="flex flex-col justify-center items-center gap-4 w-full">
                                    <TextInput
                                        text="First Name"
                                        Icon={User}
                                        id="firstName"
                                        type="text"
                                        placeholder="First Name"
                                        error={errors.firstName}
                                        touched={touched.firstName}
                                        required
                                    />
                                    <TextInput
                                        text="Last Name"
                                        Icon={User}
                                        id="lastName"
                                        type="text"
                                        placeholder="Last Name"
                                        error={errors.lastName}
                                        touched={touched.lastName}
                                        required
                                    />
                                    <TextInput
                                        text="Email"
                                        Icon={Mail}
                                        id="email"
                                        type="email"
                                        placeholder="Email"
                                        error={errors.email}
                                        touched={touched.email}
                                        required
                                    />
                                    <TextInput
                                        text="Password"
                                        Icon={KeyRound}
                                        id="password"
                                        type="password"
                                        placeholder="Password"
                                        error={errors.password}
                                        touched={touched.password}
                                        required
                                    />
                                    <TextInput
                                        text="Confirm Password"
                                        Icon={KeyRound}
                                        id="confirmPassword"
                                        type="password"
                                        placeholder="Confirm Password"
                                        error={errors.confirmPassword}
                                        touched={touched.confirmPassword}
                                        required
                                    />
                                    <p className="flex justify-center items-center text-xs max-w-[80%] text-center">
                                        By registering, you agree to our Terms of Service and
                                        Privacy Policy
                                    </p>
                                    <button
                                        className="btn btn-primary w-full"
                                        type="submit"
                                        disabled={disableSubmit}
                                    >
                                        Register
                                    </button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    );
}
