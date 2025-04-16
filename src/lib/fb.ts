import { CreatePostForm } from "../types/post";
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
    return;
    let imageUrl;
    if (post.image.length) {
        const response = await uploadImage(post.image);
        imageUrl = response.data.fileUrl;
        console.log(response);
    }

    const body = {};
}
