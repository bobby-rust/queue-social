import InstagramPost, { IInstagramPost } from "@/models/posts/InstagramPost";
import { ISchedulePostRequest } from "@/types/types";

export const submitInstagramPosts = async (
    userId: string,
    schedulePostRequest: ISchedulePostRequest,
) => {
    for (const page of schedulePostRequest.instagram) {
        const igPost = {
            content: schedulePostRequest.content,
            image: schedulePostRequest.image,
            link: schedulePostRequest.link,
            page: page,
            date: schedulePostRequest.date,
            social: "instagram",
        } as IInstagramPost & { social: "instagram" };

        const json = await createInstagramPostJob(userId, igPost);
        if (json.error) {
            console.log(json.error);
            return new Response(JSON.stringify({ error: json.error }), { status: 500 });
        }
    }

    return new Response(JSON.stringify({ success: true }), { status: 201 });
};

const createInstagramPostJob = async (
    userId: string,
    post: IInstagramPost & { social: "instagram" },
) => {
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
        date: post.date,
        userId: userId,
    });

    return igJson;
};
