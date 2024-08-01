import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import NavMenu from "./components/NavMenu";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import SessionProvider from "@/app/components/SessionProvider";

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
            {/* <body className={`${inter.className}`}>
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
			</body> */}

            <body className={`${inter.className}`}>
                <div className="flex min-h-screen">
                    {session && <NavMenu />}
                    <div className="flex-1 flex flex-col">
                        <Header />
                        <main className="flex-1 overflow-y-auto">
                            <SessionProvider session={session}>{children}</SessionProvider>
                        </main>
                        <Footer session={session} />
                    </div>
                </div>
            </body>
        </html>
    );
}
