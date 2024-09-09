import { ISchedulePostForm, SocialPages } from "@/types/types";
import React from "react";
import PageIcon from "../PageIcon";
import { toggleSelectedPage } from "../../utils";
import { FormikErrors } from "formik";

type Props = {
    socialPages: SocialPages;
    values: ISchedulePostForm;
    setFieldValue: (
        field: string,
        value: any,
        shouldValidate?: boolean | undefined,
    ) => Promise<void | FormikErrors<ISchedulePostForm>>;
};

export default function Socials({ socialPages, values, setFieldValue }: Props) {
    return (
        <div className="flex gap-4">
            {Object.entries(socialPages).map(([social, pages]) => (
                <div className="flex gap-4">
                    {pages.map((page: any) => (
                        <PageIcon
                            social={social}
                            key={page.id}
                            page={page}
                            checked={page.selected}
                            setChecked={() =>
                                toggleSelectedPage(social, page, values, setFieldValue)
                            }
                        />
                    ))}
                </div>
            ))}
        </div>
    );
}
