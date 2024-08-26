"use client";

import { signIn } from "next-auth/react";
import React from "react";
import Image from "next/image";

function ConnectFacebookButton() {
    return (
        <div>
            <button
                onClick={() => signIn("facebook_business")}
                className="btn btn-ghost btn-wide flex justify-center items-center border-2 border-slate-300"
            >
                <Image src="/facebook_icon.png" width={32} height={32} alt="facebook logo" />
                <h1>Facebook</h1>
            </button>
        </div>
    );
}

export default ConnectFacebookButton;
