import InstagramPost, { IInstagramPost } from "@/models/InstagramPost";
import { SchedulePostRequest } from "@/types/types";

export const submitInstagramPosts = async (
    userId: string,
    schedulePostRequest: SchedulePostRequest,
) => {
    for (const page of schedulePostRequest.igPages) {
        const igPost = {
            content: schedulePostRequest.content,
            image: schedulePostRequest.image,
            link: schedulePostRequest.link,
            page: page,
            unixTimestamp: schedulePostRequest.unixTimestamp,
        } as IInstagramPost;

        const json = await postToInstagram(userId, igPost);
        if (json.error) {
            console.log(json.error);
            return new Response(JSON.stringify({ error: json.error }), { status: 500 });
        }
    }

    return new Response(JSON.stringify({ success: true }), { status: 201 });
};

const postToInstagram = async (userId: string, post: IInstagramPost) => {
    const response = await fetch("http://localhost:3001/schedule-job", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...post, userId: userId }),
    });

    const igJson = await response.json();
    console.log("Scheduled post to instagram: ", igJson);
    await InstagramPost.create({
        content: post.content,
        image: post.image,
        link: post.link,
        page: post.page,
        unixTimestamp: post.unixTimestamp,
        userId: userId,
    });

    return igJson;
};
