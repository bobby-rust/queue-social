import { InstagramPost } from "@/models/InstagramPost";
import type { IInstagramPost } from "@/models/InstagramPost";
import type { SchedulePostRequest } from "@/app/posts/create/page";

const createInstagramMediaContainer = async (post: IInstagramPost) => {
    if (!post.page.pageId) {
        console.log("Missing instagram account ID");
        return { success: false, message: "Missing instagram account ID" };
    }

    console.log("Got body in post to IG func: ", post);
    const url = `https://graph.facebook.com/v20.0/${post.page.pageId}/media?image_url=${post.image.fileUrl}&caption=${post.content}&access_token=${post.page.accessToken}&published=false&scheduled_publish_time=${post.unixTimestamp}`;
    console.log("Sending request to URL : ", url);
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            access_token: post.page.accessToken,
            image_url: post.image.fileUrl,
            caption: post.content,
            published: "false",
            scheduled_publish_time: post.unixTimestamp,
        }),
    });

    const createContainerJson = await response.json();
    console.log("Result of instagram create container: ", createContainerJson);
}

export default const publishToInstagram = async (userId: string, post: IInstagramPost) => {
    const createContainerJson = await createInstagramMediaContainer(post);
    const containerId = createContainerJson.id;

    // Todo: Ensure Facebook Posts and IG posts are the same structure
    // Either create a new type for each social or generalize the type and db models
    const publishUrl = `https://graph.facebook.com/v20.0/${post.page.pageId}/media_publish?creation_id=${containerId}&access_token=${post.page.accessToken}`;
    const publishResponse = await fetch(publishUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            access_token: post.page.accessToken,
            creation_id: containerId,
        }),
    });

    const publishData = await publishResponse.json();

    await InstagramPost.create({
        userId: userId,
        postId: publishData.id,
        content: post.content,
        image: post.image,
        link: post.link,
        page: post.page,
        unixTimestamp: post.unixTimestamp,
    });

    return publishData;
};

const submitInstagramPosts = async (userId: string, schedulePostRequest: SchedulePostRequest) => {
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
