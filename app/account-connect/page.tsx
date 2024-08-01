import React from "react";

import ConnectFacebookButton from "./ConnectFacebookButton";
type Props = {};

function ConnectAccount({}: Props) {
    return (
        <div className="flex flex-col justify-center items-center gap-8">
            <h1 className="text-3xl bold">ConnectAccount</h1>
            <div className="flex flex-col justify-center items-center">
                <ConnectFacebookButton />
            </div>
        </div>
    );
}

export default ConnectAccount;
