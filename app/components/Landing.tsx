import React from "react";
import Feature from "./Feature";
import PricingCard from "./PricingCard";
import Image from "next/image";
import { Lock, Sparkle, Calendar, Repeat, BarChart, Bell } from "lucide-react";

const features = [
	{
		title: "Centralized Dashboard",
		description: "Manage all your social media accounts from a single, easy-to-use interface. No more switching between tabs or apps.",
		icon: <Sparkle />,
	},
	{
		title: "Smart Scheduling",
		description:
			"Plan your posts in advance and let SocialSyncer handle the rest. Set your content calendar with just a few clicks and watch as your posts go live exactly when you want.",
		icon: <Calendar />,
	},
	{
		title: "Multi-Platform Support",
		description: "Schedule and publish posts across major social media platforms including Facebook, Twitter, Instagram, LinkedIn, and more.",
		icon: <Repeat />,
	},
	{
		title: "Analytics Integration",
		description:
			"Track the performance of your posts with built-in analytics. Understand what works best for your audience and optimize your strategy accordingly.",
		icon: <BarChart />,
	},
	{
		title: "Automated Notifications",
		description:
			"Receive notifications for scheduled posts, performance reports, and important updates, \
			ensuring you stay on top of your social media game.",
		icon: <Bell />,
	},
	{
		title: "Secure and Reliable",
		description: "We prioritize your security with top-notch encryption and data protection practices, so you can focus on creating amazing content.",
		icon: <Lock />,
	},
];

const pricingCards = [
	{
		title: "Basic",
		price: 7.99,
		features: ["2 social media accounts", "1 post per day", "2 social media platforms"],
		targetAudience: "For individuals who want to automate their social media presence.",
	},
	{
		title: "Pro",
		price: 14.99,
		features: ["5 social media accounts", "10 posts per day", "3 social media platforms", "Basic analytics", "Community support"],
		targetAudience: "For professionals who want to grow their social media presence.",
	},
	{
		title: "Business",
		price: 24.99,
		features: [
			"10 social media accounts",
			"20 posts per day",
			"5 social media platforms",
			"Advanced customer support",
			"Content curation features",
			"Advanced analytics",
		],
		targetAudience: "For businesses who want to scale their social media presence.",
	},
];

export default function Landing() {
	return (
		<div className="flex flex-col justify-center items-center max-w-full">
			<div className="flex justify-center items-center h-[70vh]">
				<div className="flex justify-center items-center p-24">
					<div className="flex flex-col gap-8 w-1/3">
						<div className="flex flex-col gap-4">
							<h1 className="text-5xl font-semibold">Effortless Social Media Management</h1>
							<p className="text-xl font-light">
								Unlock the power of automated posting. Our platform helps you manage all your social media accounts in one place, with powerful
								tools to schedule posts, analyze performance, and engage with your audience.
							</p>
						</div>
						<div className="flex gap-4">
							<button className="btn btn-primary">Get Started</button>
							<button className="btn btn-outline">Learn More</button>
						</div>
					</div>
					<div className="flex w-1/3">
						<Image
							src="/social_media_communication-removebg.png"
							width={600}
							height={500}
							alt="people on social media with notification icons"
							className="max-w-max h-auto"
							priority
						/>
					</div>
				</div>
			</div>
			<div id="features" className="flex justify-center items-center w-full bg-base-200 p-24">
				<div className="flex flex-col gap-8 w-2/3">
					<h1 className="text-3xl font-semibold">Features</h1>
					<div className="grid grid-cols-3 gap-12">
						{features.map((feature, i) => {
							return <Feature key={i} title={feature.title} description={feature.description} icon={feature.icon} />;
						})}
					</div>
				</div>
			</div>
			<div id="pricing" className="flex justify-center items-center w-full p-24">
				<div className="flex justify-center items-center">
					<div className="flex flex-col gap-4">
						<div className="flex flex-col gap-2">
							<h1 className="text-3xl font-semibold">Pricing</h1>
							<p className="text-slate-600">Choose the plan that fits your needs.</p>
						</div>
						<div className="flex gap-24">
							{pricingCards.map((card, i) => {
								return (
									<PricingCard key={i} title={card.title} price={card.price} features={card.features} targetAudience={card.targetAudience} />
								);
							})}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
