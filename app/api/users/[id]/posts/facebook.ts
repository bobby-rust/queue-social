import type { IFacebookPost } from "@/models/FacebookPost";
import type { SchedulePostRequest } from "@/types/types";
import FacebookPost from "@/models/FacebookPost";

const META_API_URL = "https://graph.facebook.com/v20.0";

const postToFacebook = async (userId: string, post: IFacebookPost) => {
    const url = `${META_API_URL}/${post.page.pageId}/${post.image ? "photos" : "feed"}?access_token=${post.page.accessToken}&url=${post.image.fileUrl || ""}&message=${post.content}&link=${post.link || ""}&scheduled_publish_time=${post.unixTimestamp}&published=false`;
    // Uncomment the following line for immediate publish
    // const url = `${META_API_URL}/${body.page.id}/photos?access_token=${body.page.access_token}&url=${body.image.fileUrl}&message=${body.content}&link=${body.link || ""}&published=true`;
    const reqBody: any = {
        published: "false",
        message: post.content,
        access_token: post.page.accessToken,
        scheduled_publish_time: post.unixTimestamp,
    };

    if (post.link !== "") {
        reqBody.link = post.link;
    }
    if (post.image) {
        reqBody.url = post.image.fileUrl;
    }

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "OAuth " + post.page.accessToken,
        },
        body: JSON.stringify(reqBody),
    });
    const data = await response.json();

    await FacebookPost.create({
        content: post.content,
        image: post.image,
        link: post.link,
        page: post.page,
        unixTimestamp: post.unixTimestamp,
        userId: userId,
    });

    return data;
};

export const submitFacebookPosts = async (
    userId: string,
    schedulePostRequest: SchedulePostRequest,
) => {
    for (const page of schedulePostRequest.fbPages) {
        const fbPost = {
            content: schedulePostRequest.content,
            image: schedulePostRequest.image,
            link: schedulePostRequest.link,
            page: page,
            unixTimestamp: schedulePostRequest.unixTimestamp,
        } as IFacebookPost;

        const json = await postToFacebook(userId, fbPost);
        if (json.error) {
            console.log(json.error);
            return new Response(JSON.stringify({ error: json.error }), { status: 500 });
        }
    }

    return new Response(JSON.stringify({ success: true }), { status: 201 });
};
