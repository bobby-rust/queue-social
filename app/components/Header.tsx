import HeaderButton from "./HeaderButton";
import Logo from "./Logo";
import React from "react";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import { getServerSession } from "next-auth";
import SignOut from "./SignOut";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { AtSign, BadgeCheck, Bell, CircleCheck, DollarSign, HelpCircle, House, Info, LayoutDashboard, Mail, Menu, Settings } from "lucide-react";

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

const timezones = [
	"UTC-12",
	"UTC-11",
	"UTC-10",
	"UTC-9",
	"UTC-8",
	"UTC-7",
	"UTC-6",
	"UTC-5",
	"UTC-4",
	"UTC-3",
	"UTC-2",
	"UTC-1",
	"UTC+0",
	"UTC+1",
	"UTC+2",
	"UTC+3",
	"UTC+4",
	"UTC+5",
	"UTC+6",
	"UTC+7",
	"UTC+8",
	"UTC+9",
	"UTC+10",
	"UTC+11",
	"UTC+12",
];

export default async function Header() {
	const session = await getServerSession(authOptions);

	return (
		<div className={`flex justify-center items-center p-4 bg-base-100`}>
			<div className="w-1/3">
				{!session && (
					<a href="/" className="btn btn-ghost">
						<h1 className="text-xl ">QueueSocial</h1>
					</a>
				)}
			</div>
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
				{session ? (
					<>
						<div className="flex justify-center items-center gap-4">
							<a className="btn btn-ghost btn-circle">
								<div className="indicator">
									<Bell />
									<span className="badge badge-xs badge-primary indicator-item"></span>
								</div>
							</a>
							<div className="flex justify-center items-center">
								<select className="select select-bordered w-full max-w-xs">
									<option disabled selected>
										Select timezone
									</option>
									{timezones.map((timezone, i) => {
										return <option key={i}>{timezone}</option>;
									})}
								</select>
							</div>
							<SignOut />
						</div>
					</>
				) : (
					<>
						<SignUp />
						<SignIn />
					</>
				)}
			</div>
		</div>
	);
}
