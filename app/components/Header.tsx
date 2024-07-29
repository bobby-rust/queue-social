import HeaderButton from "./HeaderButton";
import Logo from "./Logo";
import React from "react";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import { getServerSession } from "next-auth";
import SignOut from "./SignOut";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { AtSign, BadgeCheck, CircleCheck, DollarSign, HelpCircle, House, Info, LayoutDashboard, Mail, Menu, Settings } from "lucide-react";

const landingButtons = [
	{
		title: "Features",
		href: "#features",
		icon: <CircleCheck />,
	},
	{
		title: "Pricing",
		href: "#pricing",
		icon: <DollarSign />,
	},
	{
		title: "Contact",
		href: "#contact",
		icon: <Mail />,
	},
	{
		title: "About Us",
		href: "#about-us",
		icon: <Info />,
	},
];

const homeButtons = [
	{
		title: "Feedback",
		href: "/feedback",
		icon: <BadgeCheck />,
	},
	{
		title: "Help",
		href: "/help",
		icon: <HelpCircle />,
	},
];

export default async function Header() {
	const session = await getServerSession(authOptions);

	return (
		<div className={`flex justify-center items-center p-4 border-b-2 fixed bg-base-100`}>
			<div className="w-1/3">{!session && <h1 className="text-xl btn btn-ghost">QueueSocial</h1>}</div>
			<div className="flex justify-center items-center w-1/3">
				<ul className="flex gap-4">
					{!session &&
						landingButtons.map((button, i) => {
							return <HeaderButton key={i} {...button} />;
						})}
					{session &&
						homeButtons.map((button, i) => {
							return <HeaderButton key={i} {...button} />;
						})}
				</ul>
			</div>

			<div className="flex justify-end w-1/3 gap-4">
				<SignUp />
				<SignIn />
			</div>
		</div>
	);
}
