export interface CreatePostForm {
    text: string;
    image: File[];
    // Bunch of other stuffs eventually
}

export interface CreatePostRequestBody {
    pageId: string;
    text: string;
    imageUrl: string;
    scheduledPublishTime: string;
}
