import type { IFacebookPost } from "../../../models/FacebookPost";

const META_API_URL = "https://graph.facebook.com/v20.0";

const publishFacebookPost = async (post: IFacebookPost) => {
    console.log("POSTING TO FACEBOOK: ", post);
    const url = `${META_API_URL}/${post.page.pageId}/${post.image ? "photos" : "feed"}?access_token=${post.page.accessToken}&url=${post.image.fileUrl || ""}&message=${post.content}&link=${post.link || ""}&published=true`;

    const reqBody: any = {
        published: "true",
        message: post.content,
        access_token: post.page.accessToken,
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

    console.log("POSTED TO FACEBOOK: ", data);
    return data;
};

export const submitFacebookPost = async (post: IFacebookPost) => {
    const json = await publishFacebookPost(post);
    return new Response(JSON.stringify({ success: true, data: json }), { status: 201 });
};

export default submitFacebookPost;
