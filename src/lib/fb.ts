import { CreatePostForm, CreatePostRequestBody } from "../types/post";
import { uploadImage } from "../lib/aws";

const API_URL = import.meta.env.VITE_API_URL;

export async function facebookLogin() {
    // Calls the api endpoint to log the user
    // into fb
    const response = await fetch(API_URL + "/fb/link", {
        method: "POST",
        credentials: "include",
    });

    return response;
}

export async function createFbPost(post: CreatePostForm) {
    console.log("Creating post: ", post);

    const scheduledDate = new Date(post.scheduledPublishTime);
    const timestamp = Math.floor(scheduledDate.getTime() / 1000); // ✅ UNIX timestamp in seconds

    let imageUrl;
    if (post.image.length) {
        const response = await uploadImage(post.image);
        imageUrl = response.data.fileUrl;
        console.log(response);
    }

    const body: CreatePostRequestBody = {
        pageIds: post.pages.map((page) => page.id),
        text: post.text,
        imageUrl: imageUrl,
        scheduledPublishTime: timestamp,
    };

    const response = await fetch(API_URL + "/fb/create-post", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
        credentials: "include",
    });

    const json = await response.json();
    console.log(json);
    return json;
}
