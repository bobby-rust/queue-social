// import { utapi } from "@/app/api/uploadthing/core";
import { SchedulePostRequest } from "@/types/types";
import { submitFacebookPosts } from "./facebook";
import { submitInstagramPosts } from "./instagram";
import { submitTwitterPosts } from "./twitter";

import FacebookPost from "@/models/FacebookPost";

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

    const igResponse = await submitInstagramPosts(params.id, schedulePostRequest);

    const igJson = await igResponse.json();
    if (!igJson.success) {
        return new Response(
            JSON.stringify({ error: "Failed to post to instagram", details: igJson.error }),
            { status: 500 },
        );
    }

    const xResponse = await submitTwitterPosts(params.id, schedulePostRequest);
    const xJson = await xResponse.json();
    if (!xJson.success) {
        return new Response(
            JSON.stringify({ error: "Failed to post to X", details: xJson.error }),
            { status: 500 },
        );
    }

    return new Response(JSON.stringify({ success: true, data: { fb: fbJson } }), {
        status: 201,
    });
}

export async function GET(request: Request, { params }: { params: { id: string } }) {
    const posts = await FacebookPost.find({ userId: params.id });
    return new Response(JSON.stringify(posts));
}
