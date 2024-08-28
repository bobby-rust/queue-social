import React from "react";

import ConnectSocialButton from "./ConnectSocialButton";
type Props = {};

function ConnectAccount({}: Props) {
    return (
        <div className="flex flex-col justify-center items-center gap-4">
            <h1 className="text-3xl bold">Connect Account</h1>
            <div className="flex flex-col justify-center items-center">
                <ConnectSocialButton
                    social="facebook"
                    imageSrc="/facebook_icon.png"
                    signInUrl="facebook_business"
                />
            </div>
            <div className="flex flex-col justify-center items-center">
                <ConnectSocialButton social="twitter" imageSrc="/x_icon.png" signInUrl="twitter" />
            </div>
            <div>
                <ConnectSocialButton
                    social="instagram"
                    imageSrc="/instagram_icon.png"
                    signInUrl="instagram_business"
                />
            </div>
        </div>
    );
}

export default ConnectAccount;
