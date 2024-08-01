"use client";

import { signIn } from "next-auth/react";
import React from "react";
import { FaFacebook } from "react-icons/fa";

type Props = {};

function ConnectFacebookButton({}: Props) {
    return (
        <div>
            <button
                onClick={() => signIn("facebook_business")}
                className="btn btn-ghost btn-wide flex justify-center items-center border-2 border-slate-300"
            >
                <FaFacebook size={32} />
                <h1>Facebook</h1>
            </button>
        </div>
    );
}

export default ConnectFacebookButton;
