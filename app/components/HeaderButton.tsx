import React from "react";

interface HeaderButtonProps {
	icon: JSX.Element;
	title: string;
	href: string;
}

export default function HeaderButton(props: HeaderButtonProps) {
	return (
		<>
			<a href={props.href} className="btn btn-ghost rounded-full flex gap-0 items-center justify-evenly py-3 px-4 w-40">
				<div className="flex justify-center items-center">{props.icon}</div>
				<div className="flex justify-center items-center">{props.title}</div>
				<div className=""></div>
			</a>
		</>
	);
}
