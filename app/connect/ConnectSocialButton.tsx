"use client";

import { signIn } from "next-auth/react";
import React from "react";
import Image from "next/image";

interface ConnectSocialButtonProps {
    social: string;
    imageSrc: string;
    signInUrl: string;
}

const ConnectSocialButton = (props: ConnectSocialButtonProps) => {
    const { social, imageSrc, signInUrl } = props;
    return (
        <div>
            <button
                onClick={() => signIn(signInUrl)}
                className="btn btn-ghost btn-wide flex justify-start"
            >
                <Image src={imageSrc} width={32} height={32} alt="twitter logo" />
                <h1>{social[0].toUpperCase() + social.slice(1)}</h1>
            </button>
        </div>
    );
};

export default ConnectSocialButton;
