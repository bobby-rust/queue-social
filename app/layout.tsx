import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import NavMenu from "./components/NavMenu";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";

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
	const session = await getServerSession(authOptions);

	return (
		<html lang="en">
			<body className={`${inter.className}`}>
				<div>
					{session && <NavMenu />}
					<div className="grid min-h-[100dvh] grid-rows-[auto_1fr_auto]">
						<main className="">
							<Header />
							{children}
						</main>
						<Footer session={session} />
					</div>
				</div>
			</body>
		</html>
	);
}
