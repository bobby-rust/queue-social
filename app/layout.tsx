import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import Footer from "./components/Footer";
import NavMenu from "./components/NavMenu";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import SessionProvider from "@/app/components/SessionProvider";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "@/app/api/uploadthing/core";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import LocalizationProvider from "@/app/components/LocalizationProvider";

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
                <div className="">
                    <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
                    <NavMenu>
                        <div>
                            <div className="flex flex-col min-h-[100vh]">
                                <main className="">
                                    <SessionProvider session={session}>
                                        <LocalizationProvider>{children}</LocalizationProvider>
                                    </SessionProvider>
                                </main>
                                <Footer session={session} />
                            </div>
                        </div>
                    </NavMenu>
                </div>
            </body>
        </html>
    );
}
