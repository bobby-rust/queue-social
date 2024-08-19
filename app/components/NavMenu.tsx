import { Home, Settings, AtSign, Plus, CircleUser, Menu, Bell } from "lucide-react";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import Image from "next/image";
import Link from "next/link";
import SignOut from "./SignOut";
import SignUp from "./SignUp";
import SignIn from "./SignIn";

export default async function NavMenu({ children }: { children: React.ReactNode }) {
    const session = await getServerSession(authOptions);
    return (
        <div className="drawer">
            <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col">
                {/* Navbar */}
                <div className="navbar w-full">
                    {/* <div className="flex-none lg:hidden"> */}
                    {/*     <label */}
                    {/*         htmlFor="my-drawer-3" */}
                    {/*         aria-label="open sidebar" */}
                    {/*         className="btn btn-square btn-ghost" */}
                    {/*     > */}
                    {/*         <svg */}
                    {/*             xmlns="http://www.w3.org/2000/svg" */}
                    {/*             fill="none" */}
                    {/*             viewBox="0 0 24 24" */}
                    {/*             className="inline-block h-6 w-6 stroke-current" */}
                    {/*         > */}
                    {/*             <path */}
                    {/*                 strokeLinecap="round" */}
                    {/*                 strokeLinejoin="round" */}
                    {/*                 strokeWidth="2" */}
                    {/*                 d="M4 6h16M4 12h16M4 18h16" */}
                    {/*             ></path> */}
                    {/*         </svg> */}
                    <div className="mx-2 flex-1 px-2 gap-2">
                        {/* <Menu /> */}
                        <label
                            htmlFor="my-drawer-3"
                            aria-label="open sidebar"
                            className="btn btn-square btn-ghost"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                className="inline-block h-6 w-6 stroke-current"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                ></path>
                            </svg>
                        </label>
                        <Link href="/">QueueSocial</Link>
                    </div>
                    <div className="hidden flex-none lg:block">
                        <ul className="menu menu-horizontal gap-2">
                            {/* Navbar menu content here */}
                            {!session && (
                                <li>
                                    <SignUp />
                                </li>
                            )}
                            {session ? (
                                <div className="flex gap-4">
                                    <li>
                                        <a className="btn btn-ghost btn-circle">
                                            <div className="indicator">
                                                <Bell />
                                                <span className="badge badge-xs badge-primary indicator-item"></span>
                                            </div>
                                        </a>
                                    </li>
                                    <li>
                                        <SignOut />
                                    </li>
                                </div>
                            ) : (
                                <li>
                                    <SignIn />
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
                {/* Page content here */}
                {children}
            </div>
            <div className="drawer-side">
                <label
                    htmlFor="my-drawer-3"
                    aria-label="close sidebar"
                    className="drawer-overlay"
                ></label>
                <div className="menu bg-base-200 min-h-full w-80 p-4">
                    <div className="flex flex-col justify-between h-full flex-1">
                        <ul className="flex flex-col gap-4">
                            <li className="flex-1">
                                <Link href="/" className="btn btn-ghost w-full justify-start">
                                    <Home />
                                    Home
                                </Link>
                            </li>
                            <li className="flex-1">
                                <Link
                                    href="/posts/create"
                                    className="btn btn-ghost w-full justify-start"
                                >
                                    <Plus />
                                    Create Post
                                </Link>
                            </li>
                            <li className="flex-1">
                                <Link
                                    href="/connect"
                                    className="btn btn-ghost w-full justify-start"
                                >
                                    <AtSign />
                                    Connect Accounts
                                </Link>
                            </li>
                        </ul>
                        <ul className="flex flex-col gap-4">
                            <li className="flex-1">
                                <div className="btn btn-ghost w-full justify-start">
                                    {session?.user?.image ? (
                                        <Image
                                            className="rounded-full"
                                            src={session?.user?.image}
                                            alt={"User profile"}
                                            width={24}
                                            height={24}
                                        />
                                    ) : (
                                        <div>
                                            <Link
                                                className="flex gap-2 justify-center items-center"
                                                href="/api/auth/signin"
                                            >
                                                <CircleUser /> Log in
                                            </Link>
                                        </div>
                                    )}
                                    {session?.user &&
                                        `${session?.user?.first_name} ${session?.user?.last_name}`}
                                </div>
                            </li>
                            <li className="flex-1">
                                <a className="btn btn-ghost w-full justify-start">
                                    <Settings />
                                    Settings
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
