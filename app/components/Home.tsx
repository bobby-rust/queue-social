import { Frown, Plus, Plug } from "lucide-react";

export default function Home() {
	return (
		<div className="flex flex-col justify-center items-center gap-8 min-h-[70vh]">
			<h1 className="flex gap-2 text-xl">
				No posts to show.
				<Frown />
			</h1>
			<div className="flex flex-col gap-4">
				<button className="btn btn-primary w-48">
					<Plus /> Create Post
				</button>
				<button className="btn btn-outline w-48">
					<Plug /> Connect Accounts
				</button>
			</div>
		</div>
	);
}
