import React from "react";

interface HeaderButtonProps {
	icon: JSX.Element;
	title: string;
	href: string;
}

export default function HeaderButton(props: HeaderButtonProps) {
	return (
		<a href={props.href} className="flex gap-2 justify-center hover:bg-gray-200 rounded-full py-3 w-40">
			{props.icon}
			{props.title}
		</a>
	);
}
