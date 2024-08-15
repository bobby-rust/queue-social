// import { utapi } from "@/app/api/uploadthing/core";

import type { IFacebookPost } from "@/models/FacebookPost";
import FacebookPost from "@/models/FacebookPost";
import type { IInstagramPost } from "@/models/InstagramPost";
import InstagramPost from "@/models/InstagramPost";

import type { SchedulePostRequest } from "@/app/posts/create/page";
import { InstagramPage } from "@/models/InstagramPage";
const META_API_URL = "https://graph.facebook.com/v20.0";

// interface FBPost {
//     content: string;
//     image: { fileUrl: string; fileId: string };
//     link: string;
//     page: FacebookPage;
//     unixTimestamp: number;
// }

const postToFacebook = async (post: IFacebookPost) => {
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

    return data;
};

// interface IGPost {
//     content: string;
//     image: { fileUrl: string; fileId: string };
//     link: string;
//     page: InstagramPage;
//     unixTimestamp: number;
// }

const postToInstagram = async (post: IInstagramPost) => {
    if (!post.page.pageId) {
        console.log("Missing instagram account ID");
        return { success: false, message: "Missing instagram account ID" };
    }

    console.log("Got body in post to IG func: ", post);
    const url = `https://graph.facebook.com/v20.0/${post.page.pageId}/media?image_url=${post.image.fileUrl}&caption=${post.content}&access_token=${post.page.accessToken}`;
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            access_token: post.page.accessToken,
            image_url: post.image.fileUrl,
            caption: post.content,
        }),
    });

    const createContainerJson = await response.json();
    console.log("Result of instagram create container: ", createContainerJson);

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
        postId: publishData.id,
        content: post.content,
        image: post.image,
        link: post.link,
        page: post.page,
        unixTimestamp: post.unixTimestamp,
    });

    return publishData;
};

const submitFacebookPosts = async (schedulePostRequest: SchedulePostRequest) => {
    for (const page of schedulePostRequest.fbPages) {
        const fbPost = {
            content: schedulePostRequest.content,
            image: schedulePostRequest.image,
            link: schedulePostRequest.link,
            page: page,
            unixTimestamp: schedulePostRequest.unixTimestamp,
        } as IFacebookPost;

        const response = await postToFacebook(fbPost);
        const json = await response.json();
        if (json.error) {
            console.log(json.error);
            return new Response(JSON.stringify({ error: json.error }), { status: 500 });
        }
    }

    return new Response(JSON.stringify({ success: true }), { status: 201 });
};

const submitInstagramPosts = async (schedulePostRequest: SchedulePostRequest) => {
    for (const page of schedulePostRequest.igPages) {
        const igPost = {
            content: schedulePostRequest.content,
            image: schedulePostRequest.image,
            link: schedulePostRequest.link,
            page: page,
            unixTimestamp: schedulePostRequest.unixTimestamp,
        } as IInstagramPost;
        const response = await postToInstagram(igPost);
        const json = await response.json();
        if (json.error) {
            console.log(json.error);
            return new Response(JSON.stringify({ error: json.error }), { status: 500 });
        }
    }

    return new Response(JSON.stringify({ success: true }), { status: 201 });
};

export async function POST(request: Request, { params: id }: { params: { id: string } }) {
    const schedulePostRequest: SchedulePostRequest = await request.json();

    // Post to Facebook
    const fbResponse = await submitFacebookPosts(schedulePostRequest);
    const fbJson = await fbResponse.json();
    if (!fbJson.success)
        return new Response(
            JSON.stringify({ error: "Failed to post to facebook", details: fbJson.error }),
            { status: 500 },
        );

    // Post to Instagram
    const igResponse = await submitInstagramPosts(schedulePostRequest);
    const igJson = await igResponse.json();
    if (!igJson.success)
        return new Response(
            JSON.stringify({ error: "Failed to post to facebook", details: igJson.error }),
            { status: 500 },
        );

    // Todo
    // Post to X

    return new Response(JSON.stringify({}));
}

export async function GET(request: Request, { params }: { params: { id: string } }) {
    const posts = await Post.find({ userId: params.id });
    return new Response(JSON.stringify(posts));
}
