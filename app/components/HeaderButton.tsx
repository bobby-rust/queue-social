import React from "react";

interface HeaderButtonProps {
	icon: JSX.Element;
	title: string;
	href: string;
}

export default function HeaderButton(props: HeaderButtonProps) {
	return (
		<>
			<a href={props.href} className="btn btn-ghost rounded-full flex gap-4 items-center justify-center py-3 px-4 w-40">
				<span className="flex justify-center items-center">{props.icon}</span>
				<span className="">{props.title}</span>
			</a>
		</>
	);
}
