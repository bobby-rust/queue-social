import { Check } from "lucide-react";
import React from "react";

interface PricingCardProps {
	title: string;
	price: number;
	features: string[];
}

export default function PricingCard(props: PricingCardProps) {
	return (
		<div className="flex flex-col gap-4 border-2 rounded-lg p-8">
			<div className="flex flex-col gap-2">
				<h2 className="text-xl font-semibold">{props.title}</h2>
				<div className="">
					<span className="text-3xl font-semibold">{props.price}</span>
					<span className="text-slate-600">/month</span>
				</div>
			</div>
			<div className="flex flex-col gap-2">
				<h3 className="text-xl">Features</h3>
				<div>
					<ul className="flex flex-col gap-2">
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
			<div className="flex justify-center items-end">
				<button className="btn btn-primary">Get Started</button>
			</div>
		</div>
	);
}
