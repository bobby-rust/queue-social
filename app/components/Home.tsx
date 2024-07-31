import { Frown, Plus, Plug } from "lucide-react";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function Home() {
	console.log("IN home page.");
	const session = await getServerSession(authOptions);
	console.log("Session in Homepage: ", session);
	return (
		<div className="flex flex-col justify-center items-center gap-8 min-h-[70vh]">
			<h1 className="flex gap-2 text-xl">
				No posts to show.
				<Frown />
			</h1>
			<div className="flex flex-col gap-4">
				<Link href="/posts/new" className="btn btn-primary w-48">
					<Plus /> Create Post
				</Link>
				<button className="btn btn-outline w-48">
					<Plug /> Connect Accounts
				</button>
			</div>
		</div>
	);
}
