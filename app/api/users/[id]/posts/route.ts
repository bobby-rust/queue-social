import { utapi } from "@/app/api/uploadthing/core";
import Post from "@/models/Post";
// import { dbConnect } from "@/lib/dbConnect";

const META_API_URL = "https://graph.facebook.com/v20.0";

const postToMeta = async (body: any) => {
    const url = `${META_API_URL}/${body.page.id}/${body.image ? "photos" : "feed"}?access_token=${body.page.access_token}&url=${body.image.fileUrl || ""}&message=${body.content}&link=${body.link || ""}&scheduled_publish_time=${body.unixTimestamp}&published=false`;
    // Uncomment the following line for immediate publish
    // const url = `${META_API_URL}/${body.page.id}/photos?access_token=${body.page.access_token}&url=${body.image.fileUrl}&message=${body.content}&link=${body.link || ""}&published=true`;
    const reqBody: any = {
        published: "false",
        message: body.content,
        access_token: body.page.access_token,
        scheduled_publish_time: body.unixTimestamp,
    };

    if (body.link !== "") {
        reqBody.link = body.link;
    }
    if (body.image) {
        reqBody.url = body.image.fileUrl;
    }

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "OAuth " + body.page.access_token,
        },
        body: JSON.stringify(reqBody),
    });
    const data = await response.json();

    return data;
};

const postToInstagram = async (body: any) => {
    if (!body.instagramAccountId) {
        console.log("Missing instagram account ID");
        return { success: false, message: "Missing instagram account ID" };
    }
    // const appAccessToken = await getAppAccessToken();

    console.log("Got body in post to IG func: ", body);
    const url = `https://graph.facebook.com/v20.0/${body.instagramAccountId}/media?image_url=${body.image.fileUrl}&caption=${body.content}&access_token=${body.userAccessToken}`;
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            access_token: body.userAccessToken,
            image_url: body.image.fileUrl,
            caption: body.content,
        }),
    });

    const createContainerJson = await response.json();
    console.log("Result of instagram create container: ", createContainerJson);

    const containerId = createContainerJson.id;

    const publishUrl = `https://graph.facebook.com/v20.0/${body.instagramAccountId}/media_publish?creation_id=${containerId}&access_token=${body.userAccessToken}`;
    const publishResponse = await fetch(publishUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            access_token: body.userAccessToken,
            creation_id: containerId,
        }),
    });
    const publishData = await publishResponse.json();
    return publishData;
};

export async function POST(request: Request, { params }: { params: { id: string } }) {
    const body = await request.json();
    const funcs = new Map([
        ["facebook", postToMeta],
        ["instagram", postToInstagram],
    ]);
    let responses = { data: [] };
    for (const social of body.socials) {
        const response = await funcs.get(social)(body);
        console.log("Result of posting to ", social, ": ", response);
        responses.data.push(response);
    }

    return new Response(JSON.stringify(responses));
}

export async function GET(request: Request, { params }: { params: { id: string } }) {
    const posts = await Post.find({ userId: params.id });
    return new Response(JSON.stringify(posts));
}
