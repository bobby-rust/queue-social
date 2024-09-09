import React from "react";

type Props = {
    disableSubmit: boolean;
};

export default function SubmitButton({ disableSubmit }: Props) {
    return (
        <button
            type="submit"
            className={`btn btn-primary w-1/5 ${disableSubmit ? "btn-disabled" : ""}`}
        >
            {disableSubmit && <span className="loading loading-spinner"></span>}
            {disableSubmit ? "Submitting Post..." : "Submit"}
        </button>
    );
}
