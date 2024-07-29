import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import React from "react";

export default function PricingCard() {
	return (
		<div className="flex flex-col gap-4 border-2 rounded-lg p-8">
			<div className="flex flex-col gap-2">
				<h2 className="text-xl font-semibold">Premium</h2>
				<div className="">
					<span className="text-3xl font-semibold">7.99</span>
					<span className="text-slate-600">/month</span>
				</div>
			</div>
			<div className="flex flex-col gap-2">
				<h3 className="text-xl">Features</h3>
				<div>
					<ul>
						<li className="flex">
							<Check /> 5 social media accounts
						</li>
						<li className="flex">
							<Check /> Schedule content up to one week in advance
						</li>
					</ul>
				</div>
			</div>
			<Button>Get Started</Button>
		</div>
	);
}
