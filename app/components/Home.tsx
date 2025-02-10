import { Frown, Plus, Plug } from "lucide-react";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Post from "./Post";
import { Suspense } from "react";

const getPosts = async (id: string) => {
    await new Promise((resolve) => setTimeout(resolve, 3000));
    const posts = await fetch(`http://localhost:3000/api/users/${id}/posts`, {
        method: "GET",
    });
    return await posts.json();
};

export default async function Home() {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/register");
    }

    return (
        <div className="flex flex-col justify-center items-center min-h-[60vh] gap-8 p-8">
            <Suspense fallback={<div>Loading posts...</div>}>
                <PostsList userId={session.user.id} />
            </Suspense>
        </div>
    );
}

async function PostsList({ userId }: { userId: string }) {
    const posts =
        (await getPosts(userId)).sort(
            (a: any, b: any) => a.unixTimestamp - b.unixTimestamp,
        ) || [];

    return posts.length > 0 ? (
        <div>
            <h1 className="text-3xl font-semibold">Upcoming Posts</h1>
            <button className="btn btn-primary w-48">
                <Plus />
                Create Post
            </button>
            {posts.map((post: any) => (
                <Post key={post._id} post={post} />
            ))}
        </div>
    ) : (
        <>
            <h1 className="flex gap-2 text-xl">
                No upcoming posts
                <Frown />
            </h1>
            <div className="flex flex-col gap-4">
                <Link href="/posts/create" className="btn btn-primary w-48">
                    <Plus /> Create Post
                </Link>
                <Link href="/connect" className="btn btn-outline w-48">
                    <Plug /> Connect Accounts
                </Link>
            </div>
        </>
    );
}
