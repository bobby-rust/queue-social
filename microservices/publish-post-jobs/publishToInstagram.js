const createInstagramMediaContainer = async (post) => {
    if (!post.page.pageId) {
        console.log("Missing instagram account ID");
        return { success: false, message: "Missing instagram account ID" };
    }
    if (!post.image) {
        console.log("Missing image in IG post");
        return { success: false, message: "Missing image in post to IG func" };
    }

    console.log("Got body in post to IG func: ", post);
    const url = `https://graph.facebook.com/v20.0/${post.page.pageId}/media?image_url=${post.image.fileUrl}&caption=${post.content}&access_token=${post.page.accessToken}`;
    console.log("Sending request to URL : ", url);
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
    return createContainerJson;
};

/**
 * Publishes a post to Instagram
 */
const publishToInstagram = async (post) => {
    const createContainerJson = await createInstagramMediaContainer(post);
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

    return publishData;
};

/**
 * Publishes a post to Instagram.
 */
const submitInstagramPost = async (post) => {
    const json = await publishToInstagram(post);

    if (json.error) {
        console.log(json.error);
        return new Response(JSON.stringify({ error: json.error }), { status: 500 });
    }

    return new Response(JSON.stringify({ success: true }), { status: 201 });
};

export default submitInstagramPost;
