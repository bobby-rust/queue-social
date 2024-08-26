import XPost, { IXPost } from "@/models/XPost";
import { SchedulePostRequest } from "@/types/types";

export const submitTwitterPosts = async (
    userId: string,
    schedulePostRequest: SchedulePostRequest,
) => {
    for (const page of schedulePostRequest.xPages) {
        const igPost = {
            content: schedulePostRequest.content,
            image: schedulePostRequest.image,
            link: schedulePostRequest.link,
            page: page,
            unixTimestamp: schedulePostRequest.unixTimestamp,
        } as IXPost;

        const json = await postToTwitter(userId, igPost);
        if (json.error) {
            console.log(json.error);
            return new Response(JSON.stringify({ error: json.error }), { status: 500 });
        }
    }

    return new Response(JSON.stringify({ success: true }), { status: 201 });
};

const postToTwitter = async (userId: string, post: IXPost) => {
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
        unixTimestamp: post.unixTimestamp,
        userId: userId,
    });

    return xJson;
};
