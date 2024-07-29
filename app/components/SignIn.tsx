"use client";

import { signIn } from "next-auth/react";

export default function SignIn() {
	return (
		<button className="btn btn-outline" onClick={() => signIn()}>
			Sign in
		</button>
	);
}
