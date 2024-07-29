import { Button } from "@/components/ui/button";
import { BarChart, Calendar, Repeat, Sparkle, Bell, Lock } from "lucide-react";
import Image from "next/image";
import Feature from "./components/Feature";
import PricingCard from "./components/PricingCard";
import PrimaryButton from "./components/PrimaryButton";

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

export default function Home() {
	return (
		<div className="flex flex-col justify-center items-center gap-24 w-screenm max-w-full">
			<div className="flex justify-center items-center h-[60vh]">
				<div className="flex justify-center items-center p-12">
					<div className="flex flex-col gap-8 w-1/3">
						<div className="flex flex-col gap-4">
							<h1 className="text-5xl font-semibold">Effortless Social Media Management</h1>
							<p className="text-xl font-light">
								Unlock the power of automated posting. Our platform helps you manage all your social media accounts in one place, with powerful
								tools to schedule posts, analyze performance, and engage with your audience.
							</p>
						</div>
						<div className="flex gap-4">
							<PrimaryButton text="Get Started" />
							<Button variant="outline">Learn More</Button>
						</div>
					</div>
					<div className="flex w-1/3">
						<Image src="/social_media_communication-removebg.png" width={400} height={400} alt="people on social media with notification icons" />
					</div>
				</div>
			</div>
			<div className="flex justify-center items-center h-[60vh] w-screen max-w-full bg-slate-100 p-12">
				<div className="flex flex-col gap-8 w-2/3">
					<h1 className="text-3xl font-semibold">Features</h1>
					<div className="grid grid-cols-3 gap-12">
						{features.map((feature, i) => {
							return <Feature key={i} title={feature.title} description={feature.description} icon={feature.icon} />;
						})}
					</div>
				</div>
			</div>
			<div className="flex flex-col items-center h-[60vh] w-screen max-w-full">
				<div className="flex flex-col justify-center gap-4 w-2/3">
					<div className="flex flex-col gap-2">
						<h1 className="text-3xl font-semibold">Pricing</h1>
						<p className="text-slate-600">Choose the plan that fits your needs.</p>
					</div>
					<div className="flex gap-12">
						<PricingCard />
						<PricingCard />
						<PricingCard />
					</div>
				</div>
			</div>
		</div>
	);
}
