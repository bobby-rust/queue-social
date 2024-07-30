import { House, Newspaper, Settings, AtSign, DollarSign, Plus, User, BadgeCheck, CircleCheck, HelpCircle, Info, Mail } from "lucide-react";
import { ReactNode, useState } from "react";
import HeaderButton from "./HeaderButton";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import Image from "next/image";
import Link from "next/link";

export default async function NavMenu() {
	const session = await getServerSession(authOptions);
	console.log(session);
	return (
		<div className="flex flex-col justify-between w-64 bg-base-200 fixed top-0 h-screen overflow-y-auto p-3">
			<div className="flex justify-center items-center">
				<button className="btn btn-ghost max-w-fit">
					<h1 className="bold text-xl">QueueSocial</h1>
				</button>
			</div>
			<div className="flex flex-col w-full flex-grow p-4">
				<div className="flex flex-col h-full justify-between">
					<ul className="flex flex-col gap-4">
						<li className="flex-1">
							<Link href="/" className="btn btn-ghost w-full justify-start">
								<Newspaper />
								Feed
							</Link>
						</li>
						<li className="flex-1">
							<Link href="/posts/new" className="btn btn-ghost w-full justify-start">
								<Plus />
								Create Post
							</Link>
						</li>
						<li className="flex-1">
							<a className="btn btn-ghost w-full justify-start">
								<AtSign />
								Connect Accounts
							</a>
						</li>
					</ul>
					<ul className="flex flex-col gap-4">
						<li className="flex-1">
							<a className="btn btn-ghost w-full justify-start">
								{session?.user?.image && (
									<Image className="rounded-full" src={session?.user?.image} alt={"User profile"} width={24} height={24} />
								)}
								{session?.user?.first_name || "" + " " + session?.user?.last_name || ""}
							</a>
						</li>
						<li className="flex-1">
							<a className="btn btn-ghost w-full justify-start">
								<Settings />
								Settings
							</a>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
}
