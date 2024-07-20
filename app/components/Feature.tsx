import React from "react";

interface FeatureProps {
	title: string;
	description: string;
	icon: JSX.Element;
}

export default function Feature(props: FeatureProps) {
	return (
		<div className="flex flex-col gap-2">
			<div className="flex items-center gap-2">
				{props.icon}
				<h2 className="text-xl font-semibold">{props.title}</h2>
			</div>
			<p className="text-slate-600">{props.description}</p>
		</div>
	);
}
