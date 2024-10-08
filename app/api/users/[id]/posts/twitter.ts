import XPost, { IXPost } from "@/models/posts/XPost";
import { ISchedulePostRequest } from "@/types/types";

export const submitTwitterPosts = async (
    userId: string,
    schedulePostRequest: ISchedulePostRequest,
) => {
    for (const page of schedulePostRequest.x) {
        const xPost = {
            content: schedulePostRequest.content,
            image: schedulePostRequest.image,
            link: schedulePostRequest.link,
            page: page,
            date: schedulePostRequest.date,
            social: "twitter",
        } as IXPost & { social: "twitter" };

        const json = await createTwitterPostJob(userId, xPost);
        if (json.error) {
            console.log(json.error);
            return new Response(JSON.stringify({ error: json.error }), { status: 500 });
        }
    }

    return new Response(JSON.stringify({ success: true }), { status: 201 });
};

const createTwitterPostJob = async (userId: string, post: IXPost & { social: "twitter" }) => {
    const response = await fetch("http://localhost:3001/schedule-job", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...post, userId: userId }),
    });

    const xJson = await response.json();
    console.log("Scheduled post to X: ", xJson);
    await XPost.create({
        content: post.content,
        image: post.image,
        link: post.link,
        page: post.page,
        date: post.date,
        userId: userId,
    });

    return xJson;
};
