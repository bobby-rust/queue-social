import { Frown, Plus, Plug } from "lucide-react";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function Home() {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/register");
    }

    return (
        <div className="flex flex-col justify-center items-center gap-8 min-h-[70vh]">
            <h1 className="flex gap-2 text-xl">
                No upcoming posts
                <Frown />
            </h1>
            <div className="flex flex-col gap-4">
                <Link href="/posts/create" className="btn btn-primary w-48">
                    <Plus /> Create Post
                </Link>
                <Link href="/account-connect" className="btn btn-outline w-48">
                    <Plug /> Connect Accounts
                </Link>
            </div>
        </div>
    );
}
