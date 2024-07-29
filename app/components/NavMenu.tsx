"use client";

import { House, Newspaper, Settings, AtSign, DollarSign, Plus, User } from "lucide-react";
import { ReactNode, useState } from "react";
import HeaderButton from "./HeaderButton";

const buttons = [
	{
		title: "Home",
		href: "/",
		icon: <House />,
	},
	{
		title: "Settings",
		href: "/settings",
		icon: <Settings />,
	},
	{
		title: "Contact",
		href: "/contact",
		icon: <AtSign />,
	},
	{
		title: "Pricing",
		href: "/pricing",
		icon: <DollarSign />,
	},
];
export default function NavMenu() {
	return (
		<div className="flex flex-col bg-base-200 w-72 h-screen fixed p-2">
			<div className="flex justify-center items-center">
				<button className="btn btn-ghost max-w-fit">
					<h1 className="bold text-xl">QueueSocial</h1>
				</button>
			</div>
			<div className="flex flex-col w-full flex-grow p-4">
				<div className="flex flex-col h-full justify-between">
					<ul className="flex flex-col gap-4">
						<li className="flex-1">
							<a className="btn btn-ghost w-full justify-start">
								<Newspaper />
								Feed
							</a>
						</li>
						<li className="flex-1">
							<a className="btn btn-ghost w-full justify-start">
								<AtSign />
								Connect Accounts
							</a>
						</li>
						<li className="flex-1">
							<a className="btn btn-ghost w-full justify-start">
								<Plus />
								Create Post
							</a>
						</li>
					</ul>
					<ul>
						<li className="flex-1">
							<a className="btn btn-ghost w-full justify-start">
								<User /> Profile
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
