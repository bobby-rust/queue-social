import { Page } from "./page";

export interface CreatePostForm {
    text: string;
    image: File[];
    pages: Page[];
    scheduledPublishTime: number;
}

export interface CreatePostRequestBody {
    pageIds: string[];
    text: string;
    imageUrl: string;
    scheduledPublishTime: number;
}
