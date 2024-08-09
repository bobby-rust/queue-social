import { utapi } from "@/app/api/uploadthing/core";
import Post from "@/models/Post";
// import { dbConnect } from "@/lib/dbConnect";

const META_API_URL = "https://graph.facebook.com/v20.0";

const postWithImage = async (body: any, id: string) => {
    const url = `${META_API_URL}/${body.page.id}/photos?access_token=${body.page.access_token}&url=${body.image.fileUrl}&message=${body.content}&link=${body.link || ""}&scheduled_publish_time=${body.unixTimestamp}&published=false`;
    // const url = `${META_API_URL}/${body.page.id}/photos?access_token=${body.page.access_token}&url=${body.image.fileUrl}&message=${body.content}&link=${body.link || ""}&published=true`;
    const reqBody: any = {
        url: body.image.fileUrl,
        published: "false",
        message: body.content,
        access_token: body.page.access_token,
        scheduled_publish_time: body.unixTimestamp,
    };

    if (body.link !== "") {
        reqBody.link = body.link;
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
    console.log(data);
    // Create post object in DB
    const post = new Post({
        userId: id,
        pageId: body.page.id,
        pageName: body.page.name,
        content: body.content,
        link: body.link || "",
        image: body.image.fileUrl || null,
        unixTimestamp: body.unixTimestamp,
    });
    // await dbConnect();
    const result = await post.save();
    console.log(result);

    // Image file is no longer needed, hosted on FB servers ? I think ?
    // await utapi.deleteFiles(body.image.fileId);

    return new Response(JSON.stringify(response));
};

export async function POST(request: Request, { params }: { params: { id: string } }) {
    const body = await request.json();
    if (body.image) {
        const data = postWithImage(body, params.id);
        return data;
    }
    console.log(body);
    const url = `${META_API_URL}/${body.page.id}/feed?access_token=${body.page.access_token}&message=${body.content}&link=${body.link || ""}&published=false&scheduled_publish_time=${body.unixTimestamp}`;
    // const url = `${META_API_URL}/${body.page.id}/feed?access_token=${body.page.access_token}&message=${body.content}&link=${body.link || ""}&published=true`;
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            access_token: body.page.accessToken,
            message: body.content,
            link: body.link || "",
            scheduled_publish_time: body.unixTimestamp,
            published: "false",
        }),
    });

    const data = await response.json();
    console.log(data);

    // Create post object in Db
    const post = new Post({
        userId: params.id,
        pageId: body.page.id,
        pageName: body.page.name,
        content: body.content,
        link: body.link || "",
        image: body.image || null,
        unixTimestamp: body.unixTimestamp,
    });

    // await dbConnect();
    await post.save();
    return new Response(JSON.stringify(data));
}

export async function GET(request: Request, { params }: { params: { id: string } }) {
    const posts = await Post.find({ userId: params.id });
    return new Response(JSON.stringify(posts));
}
