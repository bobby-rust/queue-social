import { Check } from "lucide-react";
import React from "react";

interface PricingCardProps {
	title: string;
	price: number;
	features: string[];
	targetAudience: string;
}

export default function PricingCard(props: PricingCardProps) {
	return (
		<div className="flex flex-col gap-4 border-2 rounded-lg p-8">
			<div className="flex flex-col flex-grow gap-4 items-center ">
				<div className="inline-flex flex-col gap-2 max-w-52">
					<h2 className="text-xl font-semibold">{props.title}</h2>
					<div>
						<span className="text-4xl font-semibold">{props.price}</span>
						<span className="text-slate-600">/month</span>
					</div>
					<p className="text-sm">{props.targetAudience}</p>
				</div>
				<div className="divider"></div>
				<div className="flex flex-col gap-4">
					<h3 className="text-xl">Includes</h3>
					<div>
						<ul className="flex flex-col gap-4">
							{props.features.map((feature, i) => {
								return (
									<li key={i} className="flex items-center gap-2">
										<Check /> {feature}
									</li>
								);
							})}
						</ul>
					</div>
				</div>
			</div>
			<div className="flex flex-col gap-4 justify-center items-center">
				<button className="btn btn-primary btn-wide">Try it free</button>
				<p className="max-w-52 text-sm text-center">Sign up now and get 5 free credits.</p>
			</div>
		</div>
	);
}
