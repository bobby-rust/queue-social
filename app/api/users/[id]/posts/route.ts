import { utapi } from "@/app/api/uploadthing/core";

const META_API_URL = "https://graph.facebook.com/v20.0";
const postWithImage = async (body: any) => {
    const url = `${META_API_URL}/${body.page.id}/photos?access_token=${body.page.access_token}&url=${body.image.fileUrl}&message=${body.content}`;
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "OAuth " + body.page.access_token,
        },
        body: JSON.stringify({
            url: body.image.fileUrl,
            published: "true",
            message: body.content,
            access_token: body.page.access_token,
        }),
    });
    const data = await response.json();
    console.log(data);

    // Image file is no longer needed, hosted on FB servers ? I think ?
    await utapi.deleteFiles(body.image.fileId);

    return new Response(JSON.stringify(response));
};

export async function POST(request: Request) {
    const body = await request.json();
    if (body.image) {
        const data = postWithImage(body);
        return data;
    }
    console.log(body);
    // const url = `${META_API_URL}/${body.pageID}/feed?access_token=${body.page.accessToken}&message=${body.content}&link=${body.link}&published=false&scheduled_publish_time=${body.scheduledPublishTime}`;
    const url = `${META_API_URL}/${body.page.id}/feed?access_token=${body.page.access_token}&message=${body.content}&link=${body.link || ""}`;
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            access_token: body.page.accessToken,
            message: body.content,
            link: body.link || "",
        }),
    });

    const data = await response.json();
    console.log(data);
    return new Response(JSON.stringify(data));
}

export async function GET(request: Request) {
    return new Response(JSON.stringify({ message: "Hello, Next.js!" }));
}
