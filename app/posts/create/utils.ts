import { ISchedulePostForm, ISchedulePostRequest, SocialPages } from "@/types/types";
import { fromZonedTime } from "date-fns-tz";
import { Dispatch, SetStateAction } from "react";

export function combineDateAndTime(date: Date, hours: number, minutes: number, am: boolean) {
    console.log("date: ", date, "hours: ", hours, "minutes: ", minutes);
    if (am && hours === 12) {
        hours = 0;
    } else if (!am && hours !== 12) {
        hours += 12;
    }
    console.log("Hours after editing: ", hours);
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    console.log("timezone: ", timezone);
    const combinedDate = fromZonedTime(
        new Date(date.getFullYear(), date.getMonth(), date.getDate(), hours, minutes, 0),
        timezone,
    );
    console.log("combinedDate: ", combinedDate);
    return combinedDate;
}

export async function submitPost(userId: string, post: ISchedulePostForm) {
    console.log("Submitting post: ", post);
    const schedulePostRequest: ISchedulePostRequest = {
        userId: userId,
        content: post.content,
        image: post.image,
        link: post.link,
        facebook: post.facebook,
        instagram: post.instagram,
        x: post.x,
        date: combineDateAndTime(post.date, post.hour, post.minute, post.am),
    };

    try {
        const res = await fetch(`/api/users/${userId}/posts`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(schedulePostRequest),
        });

        const data = await res.json();

        if (data.error) {
            console.log(data);
            return;
        }
    } catch (e) {
        console.log(e);
    }
}

export function toggleSelectedPage(
    social: string,
    page: any,
    values: ISchedulePostForm,
    setFieldValue: (oldVal: any, newVal: any) => void,
) {
    page.selected = !page.selected;
    if (values[social].includes(page)) {
        setFieldValue(
            social,
            values[social].filter((p: any) => p._id !== page._id),
        );
    } else {
        setFieldValue(social, [...values[social], page]);
    }
}

export function handleImageLoad(event: React.SyntheticEvent<HTMLImageElement>) {
    const target = event.currentTarget;
    const { width, height } = target;
    console.log(width, height);
}

export function determineSelectedSocialPreview(
    values: SocialPages,
    setSelected: Dispatch<SetStateAction<string | null>>,
) {
    if (values.facebook.length > 0 && values.instagram.length === 0 && values.x.length === 0) {
        setSelected("facebook");
    }
    if (values.instagram.length > 0 && values.facebook.length === 0 && values.x.length === 0) {
        setSelected("instagram");
    }
    if (values.x.length > 0 && values.facebook.length === 0 && values.instagram.length === 0) {
        setSelected("x");
    }
    if (values.facebook.length === 0 && values.instagram.length === 0 && values.x.length === 0) {
        setSelected(null);
    }
}

export function handleChangeShouldPreviewRender(
    values: SocialPages,
    setShouldPreviewRender: Dispatch<SetStateAction<boolean>>,
) {
    if (values.facebook.length > 0 || values.instagram.length > 0 || values.x.length > 0) {
        setShouldPreviewRender(true);
    } else {
        setShouldPreviewRender(false);
    }
}
