"use client";

import { signIn } from "next-auth/react";
import React from "react";
import Image from "next/image";

const ConnectTwitterButton = () => {
    return (
        <div>
            <button
                onClick={() => signIn("twitter")}
                className="btn btn-ghost btn-wide flex justify-center items-center border-2 border-slate-300"
            >
                <Image src="/x_icon.png" width={32} height={32} alt="twitter logo" />
                <h1>Twitter</h1>
            </button>
        </div>
    );
};

export default ConnectTwitterButton;
