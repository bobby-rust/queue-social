import { CreatePostForm } from "../types/post";
import { uploadImage } from "../lib/aws";

export async function createFbPost(post: CreatePostForm) {
    let imageUrl;
    if (post.image.length) {
        const response = await uploadImage(post.image);
        imageUrl = response.data.fileUrl;
        console.log(response);
    }

    // create post route expects
    const body: CreatePostRequestBody = {};
}
