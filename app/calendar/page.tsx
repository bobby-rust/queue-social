import React from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Calendar() {
	const session = await getServerSession();
	if (!session) {
		redirect("/");
	}
	return <div>Calendar</div>;
}
