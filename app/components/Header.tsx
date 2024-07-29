import { AtSign, Calendar, DollarSign, House, LayoutDashboard, Settings } from "lucide-react";
import HeaderButton from "./HeaderButton";
import Logo from "./Logo";
import React from "react";
import { Button } from "@/components/ui/button";
import PrimaryButton from "./PrimaryButton";

const buttons = [
	{
		title: "Home",
		href: "/",
		icon: <House />,
	},
	{
		title: "Calendar",
		href: "/calendar",
		icon: <Calendar />,
	},
	{
		title: "Dashboard",
		href: "/dashboard",
		icon: <LayoutDashboard />,
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

export default function Header() {
	return (
		<header className="flex justify-center items-between w-screen max-w-full px-8 py-3">
			<div className="flex items-center w-1/6">
				<Logo />
			</div>
			<div className="flex justify-center items-center w-2/3">
				<ul className="flex gap-4">
					{buttons.map((button, i) => {
						return (
							<li key={i}>
								<HeaderButton title={button.title} href={button.href} icon={button.icon} />
							</li>
						);
					})}
				</ul>
			</div>
			<div className="flex items-center justify-end gap-4 w-1/6">
				<Button variant="outline">Sign in</Button>
				<a href="/register">
					<PrimaryButton text="Sign up" />
				</a>
			</div>
		</header>
	);
}
