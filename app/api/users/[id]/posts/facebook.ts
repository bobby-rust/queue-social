import FacebookPost, { IFacebookPost } from "@/models/FacebookPost";
import { SchedulePostRequest } from "@/types/types";

const createFacebookPostJob = async (
    userId: string,
    post: IFacebookPost & { social: "facebook" },
) => {
    console.log("creating post job: ", post);
    const response = await fetch("http://localhost:3001/schedule-job", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...post, userId: userId }),
    });

    const fbJson = await response.json();
    console.log("Scheduled post to facebook: ", fbJson);
    await FacebookPost.create({
        content: post.content,
        image: post.image,
        link: post.link,
        page: post.page,
        date: post.date,
        userId: userId,
    });
    return fbJson;
};

export const submitFacebookPosts = async (
    userId: string,
    schedulePostRequest: SchedulePostRequest,
) => {
    for (const page of schedulePostRequest.facebook) {
        const fbPost = {
            content: schedulePostRequest.content,
            image: schedulePostRequest.image,
            link: schedulePostRequest.link,
            page: page,
            date: schedulePostRequest.date,
            social: "facebook",
        } as IFacebookPost & { social: "facebook" };

        console.log("Facebook post: ", fbPost);
        const json = await createFacebookPostJob(userId, fbPost);
        if (json.error) {
            console.log(json.error);
            return new Response(JSON.stringify({ error: json.error }), { status: 500 });
        }
    }

    return new Response(JSON.stringify({ success: true }), { status: 201 });
};
