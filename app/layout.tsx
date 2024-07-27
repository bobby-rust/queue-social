import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "QueueSocial",
	description: "Automate your social media presence.",
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`min-h-screen flex flex-col ${inter.className}`}>
				<Header />
				<main className="flex-grow">{children}</main>
				<Footer />
			</body>
		</html>
	);
}
