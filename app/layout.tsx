import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SessionProvider from "@/app/components/SessionProvider";
import { getServerSession } from "next-auth";

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
	const session = await getServerSession();
	return (
		<html lang="en">
			<body className={`min-h-screen flex flex-col ${inter.className}`}>
				<Header />
				<main className="flex-grow">
					<SessionProvider session={session}>{children}</SessionProvider>
				</main>
				<Footer />
			</body>
		</html>
	);
}
