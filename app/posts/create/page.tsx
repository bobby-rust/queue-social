import React from "react";
import { redirect } from "next/navigation";
import SchedulePostForm from "./components/SchedulePostForm";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function CreatePost() {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/api/auth/signin");
    }

    return (
        <div className="flex justify-center min-h-[70vh] max-h-[90vh] p-16">
            <div className="flex flex-col justify-center min-w-[50vw] max-w-[70vw] items-center bg-base-200 p-12 rounded-lg shadow-lg mb-12">
                <SchedulePostForm />
            </div>
        </div>
    );
}
