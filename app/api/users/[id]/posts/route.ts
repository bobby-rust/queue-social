// import { utapi } from "@/app/api/uploadthing/core";

import type { IFacebookPost } from "@/models/FacebookPost";
import type { SchedulePostRequest } from "@/app/posts/create/page";
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

const submitFacebookPosts = async (userId: string, schedulePostRequest: SchedulePostRequest) => {
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

export async function POST(request: Request, { params: params }: { params: { id: string } }) {
    const schedulePostRequest: SchedulePostRequest = await request.json();

    // Post to Facebook
    const fbResponse = await submitFacebookPosts(params.id, schedulePostRequest);
    const fbJson = await fbResponse.json();
    if (!fbJson.success) {
        return new Response(
            JSON.stringify({ error: "Failed to post to facebook", details: fbJson.error }),
            { status: 500 },
        );
    }

    console.log("Posted to facebook: ", fbJson);

    const response = await fetch("http://localhost:3001/schedule-job", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            ...schedulePostRequest,
        }),
    });

    const igJson = await response.json();
    console.log("Scheduled post to instagram: ", igJson);
    // Todo
    // Post to X

    return new Response(JSON.stringify({ success: true, data: { fb: fbJson, ig: igJson } }), {
        status: 201,
    });
}

const postToTwitter = async (userId: string, post: any) => {
    const url = `https://api.x.com/2/tweets`;

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-Api-Key": process.env.TWITTER_API_KEY ?? "",
            "X-Api-Secret": process.env.TWITTER_API_SECRET ?? "",
            "X-Access-Token": process.env.TWITTER_ACCESS_TOKEN ?? "",
            "X-Access-Token-Secret": process.env.TWITTER_ACCESS_TOKEN_SECRET ?? "",
        },
        body: JSON.stringify(post),
    });
    const data = await response.json();
};

export async function GET(request: Request, { params }: { params: { id: string } }) {
    const posts = await FacebookPost.find({ userId: params.id });
    return new Response(JSON.stringify(posts));
}
